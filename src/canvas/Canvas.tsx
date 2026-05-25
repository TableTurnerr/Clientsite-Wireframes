"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Minus, Plus, Maximize2, Locate, Palette } from "lucide-react";
import { configStore } from "@/config/store";
import { CANVAS_SWATCHES } from "@/config/defaults";
import { frameSelectionStore } from "@/lib/wireframe/frame-selection";

interface View {
  scale: number;
  tx: number;
  ty: number;
}

const MIN = 0.12;
const MAX: number = 2.4;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

const INITIAL: View = { scale: 0.55, tx: 90, ty: 150 };

export function Canvas({
  worldWidth,
  worldHeight,
  children,
}: {
  worldWidth: number;
  worldHeight: number;
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>(INITIAL);
  const [dragging, setDragging] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);
  const drag = useRef<{
    x: number;
    y: number;
    tx: number;
    ty: number;
    onEmpty: boolean;
    moved: boolean;
  } | null>(null);

  const theme = useSyncExternalStore(
    configStore.subscribe,
    configStore.getThemeSnapshot,
    configStore.getThemeSnapshot
  );
  const setCanvas = (val: string) =>
    configStore.updateTheme((t) => { t.canvasBg = val; });

  const zoomAround = useCallback(
    (px: number, py: number, factor: number) => {
      setView((v) => {
        const ns = clamp(v.scale * factor, MIN, MAX);
        const k = ns / v.scale;
        return {
          scale: ns,
          tx: px - (px - v.tx) * k,
          ty: py - (py - v.ty) * k,
        };
      });
    },
    []
  );

  // wheel: ctrl/cmd => zoom at cursor, else pan
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = vp.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey) {
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        zoomAround(px, py, Math.exp(-e.deltaY * 0.0016));
      } else {
        setView((v) => ({ ...v, tx: v.tx - e.deltaX, ty: v.ty - e.deltaY }));
      }
    };
    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => vp.removeEventListener("wheel", onWheel);
  }, [zoomAround]);

  const onPointerDown = (e: React.PointerEvent) => {
    // ignore drags that start on the fixed UI
    const tgt = e.target as HTMLElement;
    if (tgt.closest(".tt-ui")) return;
    // …or on a contentEditable frame (so the browser can place a text caret
    // instead of starting a pan). The closest() walk handles clicks on inner
    // text nodes; we look for the wf-editable-host marker class set by
    // EditableFrame when the user holds the edit lock.
    if (tgt.closest(".wf-editable-host")) return;
    // Track whether the pointerdown landed on a frame; if it didn't and the
    // user releases without dragging, treat it as a click on empty canvas and
    // clear any frame selection.
    const onEmpty = !tgt.closest(".frame-group");
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      tx: view.tx,
      ty: view.ty,
      onEmpty,
      moved: false,
    };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    // Capture deltas now — don't read the ref inside the async state updater,
    // since pointerup may null it before React runs the reducer.
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) > 4) d.moved = true;
    const nx = d.tx + dx;
    const ny = d.ty + dy;
    setView((v) => ({ ...v, tx: nx, ty: ny }));
  };
  const endDrag = () => {
    const d = drag.current;
    if (d && d.onEmpty && !d.moved) frameSelectionStore.clear();
    drag.current = null;
    setDragging(false);
  };

  const btnZoom = (factor: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    zoomAround(rect.width / 2, rect.height / 2, factor);
  };

  const fitAll = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const pad = 80;
    const s = clamp(
      Math.min(
        (rect.width - pad * 2) / worldWidth,
        (rect.height - pad * 2) / worldHeight
      ),
      MIN,
      MAX
    );
    setView({
      scale: s,
      tx: (rect.width - worldWidth * s) / 2,
      ty: (rect.height - worldHeight * s) / 2,
    });
  }, [worldWidth, worldHeight]);

  // keyboard: +/- zoom, 0 reset, f fit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "+" || e.key === "=") btnZoom(1.2);
      else if (e.key === "-" || e.key === "_") btnZoom(1 / 1.2);
      else if (e.key === "0") setView(INITIAL);
      else if (e.key.toLowerCase() === "f") fitAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitAll]);

  return (
    <div
      ref={viewportRef}
      className={`canvas-viewport ${dragging ? "dragging" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <div
        className="canvas-world"
        style={{
          width: worldWidth,
          height: worldHeight,
          transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.scale})`,
        }}
      >
        {children}
      </div>

      <div className="tt-toolbar tt-ui">
        <button onClick={() => btnZoom(1 / 1.2)} title="Zoom out (-)">
          <Minus size={17} />
        </button>
        <span className="zoomval">{Math.round(view.scale * 100)}%</span>
        <button onClick={() => btnZoom(1.2)} title="Zoom in (+)">
          <Plus size={17} />
        </button>
        <span className="divider" />
        <button onClick={() => setView(INITIAL)} title="Reset view (0)">
          <Locate size={16} />
        </button>
        <button onClick={fitAll} title="Fit all (F)">
          <Maximize2 size={16} />
        </button>
        <span className="divider" />
        <button
          className={`tt-canvas-toggle${colorsOpen ? " open" : ""}`}
          onClick={() => setColorsOpen((o) => !o)}
          title="Canvas colour"
        >
          <span className="tt-canvas-toggle-swatch" style={{ background: theme.canvasBg }} />
          <Palette size={12} />
        </button>
        <div
          className={`tt-canvas-dots-wrap${colorsOpen ? " open" : ""}`}
          aria-hidden={!colorsOpen}
        >
          <span className="divider" />
          <div className="tt-canvas-dots">
            {CANVAS_SWATCHES.map((s) => (
              <button
                key={s.value}
                className={`tt-canvas-dot${theme.canvasBg === s.value ? " active" : ""}`}
                style={{ background: s.value }}
                title={`Canvas: ${s.label}`}
                onClick={() => setCanvas(s.value)}
                tabIndex={colorsOpen ? 0 : -1}
              />
            ))}
            <label
              className="tt-canvas-picker"
              style={{ background: theme.canvasBg }}
              title="Custom canvas colour"
            >
              <input
                type="color"
                value={theme.canvasBg}
                onChange={(e) => setCanvas(e.target.value)}
                tabIndex={colorsOpen ? 0 : -1}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
