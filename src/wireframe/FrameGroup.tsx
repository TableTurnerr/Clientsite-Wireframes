"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { WfNote } from "@/canvas/types";
import { Note } from "./Note";

const NOTE_W = 248;
const GAP = 120;
const PACK_GAP = 16;
export const DESKTOP_W = 1280;

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
  id,
  title,
  route,
  notes,
  x,
  y,
  children,
}: {
  id: string;
  title: string;
  route: string;
  notes: WfNote[];
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  const frameW = DESKTOP_W;
  const frameLeft = NOTE_W + GAP;
  const frameRight = frameLeft + frameW;
  const rightColLeft = frameRight + GAP;
  const groupW = rightColLeft + NOTE_W;

  const groupRef = useRef<HTMLDivElement>(null);
  const [tops, setTops] = useState<Record<string, number>>({});
  const [paths, setPaths] = useState<LeaderPath[]>([]);
  const [groupH, setGroupH] = useState(900);

  const measure = useCallback(() => {
    const group = groupRef.current;
    if (!group) return;

    const anchorY: Record<string, number> = {};
    group.querySelectorAll<HTMLElement>(".wf-frame [data-anchor]").forEach((el) => {
      const aid = el.getAttribute("data-anchor");
      if (!aid || aid in anchorY) return;
      const { y: oy } = offsetWithin(el, group);
      anchorY[aid] = oy + el.offsetHeight / 2;
    });

    const metas: NoteMeta[] = [];
    group.querySelectorAll<HTMLElement>("[data-note]").forEach((el) => {
      const nid = el.getAttribute("data-note");
      const anchor = el.getAttribute("data-anchor");
      const side = (el.getAttribute("data-side") as "left" | "right") || "right";
      if (!nid || !anchor) return;
      metas.push({ id: nid, anchor, side, h: el.offsetHeight, target: anchorY[anchor] ?? 0 });
    });

    const newTops: Record<string, number> = {};
    packColumn(metas.filter((m) => m.side === "left"), newTops);
    packColumn(metas.filter((m) => m.side === "right"), newTops);

    const newPaths: LeaderPath[] = [];
    for (const n of metas) {
      if (anchorY[n.anchor] === undefined) continue;
      const sy = newTops[n.id] + n.h / 2;
      const ey = anchorY[n.anchor];
      const sx = n.side === "left" ? NOTE_W : rightColLeft;
      const ex = n.side === "left" ? frameLeft : frameRight;
      const mx = (sx + ex) / 2;
      newPaths.push({ d: `M${sx},${sy} C${mx},${sy} ${mx},${ey} ${ex},${ey}`, sx, sy, ex, ey });
    }

    let maxBottom = 0;
    const frameEl = group.querySelector<HTMLElement>(".wf-frame");
    if (frameEl) maxBottom = frameEl.offsetHeight;
    for (const n of metas) maxBottom = Math.max(maxBottom, newTops[n.id] + n.h);

    setTops(newTops);
    setPaths(newPaths);
    setGroupH(maxBottom + 24);
  }, [frameLeft, frameRight, rightColLeft]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (groupRef.current) ro.observe(groupRef.current);
    let cancelled = false;
    const fonts = (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts;
    if (fonts?.ready) fonts.ready.then(() => { if (!cancelled) measure(); });
    const t1 = window.setTimeout(measure, 400);
    const t2 = window.setTimeout(measure, 1200);
    return () => {
      cancelled = true;
      ro.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [measure]);

  const leftNotes = notes.filter((n) => n.side === "left");
  const rightNotes = notes.filter((n) => n.side === "right");

  return (
    <div className="frame-group" ref={groupRef} style={{ left: x, top: y, width: groupW, height: groupH }} data-frame={id}>
      <svg className="leader-svg" width={groupW} height={groupH}>
        {paths.map((p, i) => (
          <g key={i}>
            <path className="leader-path" d={p.d} />
            <circle className="leader-dot" cx={p.ex} cy={p.ey} r={3.5} />
            <circle className="leader-dot-hollow" cx={p.sx} cy={p.sy} r={3.5} />
          </g>
        ))}
      </svg>

      <div className="note-col" style={{ left: 0, width: NOTE_W }}>
        {leftNotes.map((n) => (
          <div key={n.id} className="note-area" style={{ top: tops[n.id] ?? 0, right: 0, width: NOTE_W, opacity: tops[n.id] !== undefined ? 1 : 0 }}>
            <Note note={n} />
          </div>
        ))}
      </div>

      <div className="wf-frame-wrap" style={{ left: frameLeft, width: frameW }}>
        <div className="wf-frame" style={{ width: frameW }}>
          <div className="wf-chrome">
            <div className="wf-dots"><i /><i /><i /></div>
            <div className="wf-url">al-baghdady.com{route}</div>
            <div className="wf-pagetag">{title}</div>
          </div>
          <div className="wf-page">{children}</div>
        </div>
      </div>

      <div className="note-col" style={{ left: rightColLeft, width: NOTE_W }}>
        {rightNotes.map((n) => (
          <div key={n.id} className="note-area" style={{ top: tops[n.id] ?? 0, left: 0, width: NOTE_W, opacity: tops[n.id] !== undefined ? 1 : 0 }}>
            <Note note={n} />
          </div>
        ))}
      </div>
    </div>
  );
}
