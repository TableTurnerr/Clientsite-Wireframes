"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { WireframePage } from "@/canvas/types";
import { WireframeFrame } from "./WireframeFrame";
import { Note } from "./Note";

const NOTE_W = 232;
const GAP = 78;
const PACK_GAP = 14;

interface NoteMeta {
  id: string;
  anchor: string;
  side: "left" | "right";
  h: number;
  target: number;
}

interface LeaderPath {
  d: string;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
}

function packColumn(notes: NoteMeta[], out: Record<string, number>) {
  const sorted = [...notes].sort((a, b) => a.target - b.target);
  let prevBottom = -Infinity;
  for (const n of sorted) {
    let top = n.target - n.h / 2;
    if (top < prevBottom + PACK_GAP) top = prevBottom + PACK_GAP;
    if (top < 0) top = 0;
    out[n.id] = top;
    prevBottom = top + n.h;
  }
}

/** sum offsetLeft/Top up the offsetParent chain until `ancestor`. Zoom-independent. */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function FrameGroup({
  page,
  x,
  y,
}: {
  page: WireframePage;
  x: number;
  y: number;
}) {
  const frameW = page.width ?? 380;
  const frameLeft = NOTE_W + GAP;
  const frameRight = frameLeft + frameW;
  const rightColLeft = frameRight + GAP;
  const groupW = rightColLeft + NOTE_W;

  const groupRef = useRef<HTMLDivElement>(null);
  const [tops, setTops] = useState<Record<string, number>>({});
  const [paths, setPaths] = useState<LeaderPath[]>([]);
  const [groupH, setGroupH] = useState(700);

  const measure = useCallback(() => {
    const group = groupRef.current;
    if (!group) return;

    // anchor Y (center) per section id, in group coords
    const anchorY: Record<string, number> = {};
    group
      .querySelectorAll<HTMLElement>(".wf-frame [data-anchor]")
      .forEach((el) => {
        const id = el.getAttribute("data-anchor");
        if (!id) return;
        const { y: oy } = offsetWithin(el, group);
        anchorY[id] = oy + el.offsetHeight / 2;
      });

    // notes
    const metas: NoteMeta[] = [];
    group.querySelectorAll<HTMLElement>("[data-note]").forEach((el) => {
      const id = el.getAttribute("data-note");
      const anchor = el.getAttribute("data-anchor");
      const side = (el.getAttribute("data-side") as "left" | "right") || "right";
      if (!id || !anchor) return;
      metas.push({
        id,
        anchor,
        side,
        h: el.offsetHeight,
        target: anchorY[anchor] ?? 0,
      });
    });

    const newTops: Record<string, number> = {};
    packColumn(
      metas.filter((m) => m.side === "left"),
      newTops
    );
    packColumn(
      metas.filter((m) => m.side === "right"),
      newTops
    );

    const newPaths: LeaderPath[] = [];
    for (const n of metas) {
      if (anchorY[n.anchor] === undefined) continue;
      const sy = newTops[n.id] + n.h / 2;
      const ey = anchorY[n.anchor];
      const sx = n.side === "left" ? NOTE_W : rightColLeft;
      const ex = n.side === "left" ? frameLeft : frameRight;
      const mx = (sx + ex) / 2;
      newPaths.push({
        d: `M${sx},${sy} C${mx},${sy} ${mx},${ey} ${ex},${ey}`,
        sx,
        sy,
        ex,
        ey,
      });
    }

    let maxBottom = 0;
    const frameEl = group.querySelector<HTMLElement>(".wf-frame");
    if (frameEl) maxBottom = frameEl.offsetHeight;
    for (const n of metas) {
      maxBottom = Math.max(maxBottom, newTops[n.id] + n.h);
    }

    setTops(newTops);
    setPaths(newPaths);
    setGroupH(maxBottom + 24);
  }, [frameLeft, frameRight, rightColLeft]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (groupRef.current) ro.observe(groupRef.current);
    let cancelled = false;
    const fonts = (document as unknown as { fonts?: { ready: Promise<unknown> } })
      .fonts;
    if (fonts?.ready) {
      fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }
    const t = window.setTimeout(measure, 400);
    return () => {
      cancelled = true;
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [measure]);

  const leftNotes = page.notes.filter((n) => n.side === "left");
  const rightNotes = page.notes.filter((n) => n.side === "right");

  return (
    <div
      className="frame-group"
      ref={groupRef}
      style={{ left: x, top: y, width: groupW, height: groupH }}
    >
      <svg className="leader-svg" width={groupW} height={groupH}>
        {paths.map((p, i) => (
          <g key={i}>
            <path className="leader-path" d={p.d} />
            <circle className="leader-dot" cx={p.ex} cy={p.ey} r={3} />
            <circle className="leader-dot-hollow" cx={p.sx} cy={p.sy} r={3} />
          </g>
        ))}
      </svg>

      <div className="note-col" style={{ left: 0, width: NOTE_W }}>
        {leftNotes.map((n) => (
          <div
            key={n.id}
            className="note-area"
            style={{
              top: tops[n.id] ?? 0,
              right: 0,
              width: NOTE_W,
              opacity: tops[n.id] !== undefined ? 1 : 0,
            }}
          >
            <Note note={n} />
          </div>
        ))}
      </div>

      <div className="wf-frame-wrap" style={{ left: frameLeft, width: frameW }}>
        <WireframeFrame page={page} width={frameW} />
      </div>

      <div className="note-col" style={{ left: rightColLeft, width: NOTE_W }}>
        {rightNotes.map((n) => (
          <div
            key={n.id}
            className="note-area"
            style={{
              top: tops[n.id] ?? 0,
              left: 0,
              width: NOTE_W,
              opacity: tops[n.id] !== undefined ? 1 : 0,
            }}
          >
            <Note note={n} />
          </div>
        ))}
      </div>
    </div>
  );
}
