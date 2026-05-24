"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Canvas } from "@/canvas/Canvas";
import { FrameGroup } from "@/wireframe/FrameGroup";
import { WIRE_PAGES } from "@/canvas/pages";
import { computeLayout } from "@/data/registry";
import { ConfigPanel } from "@/config/ConfigPanel";
import { configStore, applyTheme } from "@/config/store";
import { UserChip } from "@/components/auth/UserChip";

const BY_ID = new Map(WIRE_PAGES.map((p) => [p.id, p] as const));

// Applies the live theme as CSS variables on the canvas world. Renders nothing;
// re-themes without re-rendering the frames.
function ThemeApplier() {
  const theme = useSyncExternalStore(
    configStore.subscribe,
    configStore.getThemeSnapshot,
    configStore.getThemeSnapshot
  );
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  return null;
}

function Legend() {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button
        className="tt-legend-collapsed tt-ui"
        onClick={() => setOpen(true)}
        title="Show annotation key"
      >
        Annotation key
      </button>
    );
  }

  return (
    <div className="tt-legend tt-ui">
      <div className="tt-legend-header">
        <h4>Annotation key</h4>
        <button
          className="tt-legend-close"
          onClick={() => setOpen(false)}
          title="Close"
          aria-label="Close annotation key"
        >
          ×
        </button>
      </div>
      <div className="row">
        <span className="dot" style={{ background: "var(--sys-color)" }} />
        <span className="lab"><b>Color token</b> — design tokens (--color-*, fonts)</span>
      </div>
      <div className="row">
        <span className="dot" style={{ background: "var(--sys-brand)" }} />
        <span className="lab"><b>Brand / NAP / social</b> — RESTAURANT.* variables</span>
      </div>
      <div className="row">
        <span className="dot" style={{ background: "var(--sys-product)" }} />
        <span className="lab"><b>Product data</b> — parent file → child fetch</span>
      </div>
      <div className="row">
        <span className="dot" style={{ background: "var(--sys-seo)" }} />
        <span className="lab"><b>SEO</b> — metadata, JSON-LD schema, breadcrumbs</span>
      </div>
      <div className="row">
        <span className="dot" style={{ background: "var(--sys-layout)" }} />
        <span className="lab"><b>Layout</b> — shared component / page structure</span>
      </div>
      <div className="hint">
        Real component code · images shown as boxes. Drag to pan ·{" "}
        <kbd>Ctrl</kbd>+scroll zoom · <kbd>F</kbd> fit · <kbd>0</kbd> reset
      </div>
    </div>
  );
}

export default function Page() {
  // Live-measured group heights, keyed by page id. Frames report their height
  // via onHeight; the layout spaces each cluster row by its tallest frame so
  // nothing overlaps the row below.
  const [heights, setHeights] = useState<Record<string, number>>({});
  const onHeight = useCallback((id: string, h: number) => {
    setHeights((prev) => (prev[id] === h ? prev : { ...prev, [id]: h }));
  }, []);

  // Re-render the frames when product / brand data changes. Theme (color/font)
  // changes are applied as CSS variables only, so they bypass this on purpose.
  useSyncExternalStore(
    configStore.subscribe,
    configStore.getDataSnapshot,
    configStore.getDataSnapshot
  );

  const layout = useMemo(() => computeLayout(heights), [heights]);
  const { placements: PLACEMENTS, labels: LABELS, world: WORLD } = layout;

  return (
    <>
      <Legend />
      <ThemeApplier />
      <ConfigPanel />
      <UserChip />

      <Canvas worldWidth={WORLD.width} worldHeight={WORLD.height}>
        {LABELS.map((l, i) => (
          <div key={i} className="cluster-label" style={{ left: l.x, top: l.y, width: 720 }}>
            <div className="kicker">{l.kicker}</div>
            <div className="title">{l.title}</div>
            {l.desc && <div className="desc">{l.desc}</div>}
          </div>
        ))}

        {PLACEMENTS.map((pl) => {
          const page = BY_ID.get(pl.id);
          if (!page) return null;
          const P = page.Page;
          return (
            <FrameGroup
              key={pl.id}
              id={page.id}
              title={page.title}
              route={page.route}
              notes={page.notes}
              x={pl.x}
              y={pl.y}
              onHeight={onHeight}
            >
              <P />
            </FrameGroup>
          );
        })}
      </Canvas>
    </>
  );
}
