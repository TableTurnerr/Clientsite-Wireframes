"use client";

import { Canvas } from "@/canvas/Canvas";
import { FrameGroup } from "@/wireframe/FrameGroup";
import { WIRE_PAGES } from "@/canvas/pages";
import { PLACEMENTS, LABELS, WORLD } from "@/data/registry";

const BY_ID = new Map(WIRE_PAGES.map((p) => [p.id, p] as const));

function Legend() {
  return (
    <div className="tt-legend tt-ui">
      <h4>Annotation key</h4>
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
  return (
    <>
      <div className="tt-brand tt-ui">
        <span className="pill">
          <span className="d" />
          TableTurnerr · Child-Site Wireframes
        </span>
        <div className="sub">
          The real client-site components, rendered with images as wireframe boxes.
          Each note maps a UI element to the variable that drives it.
        </div>
      </div>

      <Legend />

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
            >
              <P />
            </FrameGroup>
          );
        })}
      </Canvas>
    </>
  );
}
