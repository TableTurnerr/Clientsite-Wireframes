import type { CanvasPlacement, ClusterLabel } from "@/canvas/types";
import { WIRE_PAGES } from "@/canvas/pages";

// One horizontal row per cluster. Frames are real desktop pages, so their
// heights vary enormously (the home page is ~15,600px tall, the review modal
// ~640px). Row spacing is therefore HEIGHT-AWARE: each row begins below the
// tallest frame of the row above it, instead of a fixed step that the tall
// frames would overflow.
const X0 = 80;
const STEP_X = 2240; // horizontal column step (GROUP_W 2016 + ~224 gap)
const TOP = 80;
const LABEL_BAND = 240; // gap between a cluster label and its row of frames
const CLUSTER_GAP = 720; // gap below the tallest frame before the next label
const GROUP_W = 2016; // 248 + 120 + 1280 + 120 + 248
const FALLBACK_H = 8000; // used for an unmeasured page with no baked estimate

// Measured group heights (frame + side notes) at desktop width. Used for the
// very first paint so rows are already spaced correctly before the live
// ResizeObserver measurements arrive; runtime heights override these.
const EST_H: Record<string, number> = {
  home: 15650,
  menu: 10981,
  bakery: 4743,
  catering: 3341,
  "iraqi-cuisine": 7430,
  "our-story": 3363,
  "return-policy": 2407,
  "near-hub": 3005,
  "near-city": 4746,
  "specialties-hub": 5974,
  "specialties-topic": 5736,
  "dish-city-mesh": 4779,
  "locations-hub": 2735,
  "location-single": 4845,
  header: 470,
  footer: 975,
  "review-modal": 637,
  "not-found": 2279,
};

const CLUSTER_META: { group: string; kicker: string; desc: string }[] = [
  {
    group: "Core Pages",
    kicker: "01 · Live today",
    desc: "The hand-built pages every client site ships with — rendered from the real components.",
  },
  {
    group: "Dynamic SEO Templates",
    kicker: "02 · The growth engine",
    desc: "One file → many pages. generateStaticParams() pre-renders every city, topic, and (planned) dish×city combination.",
  },
  {
    group: "Multi-Location",
    kicker: "03 · Optional extension",
    desc: "For clients with more than one venue — the single RESTAURANT object becomes a LOCATIONS[] array, each branch with its own NAP, geo and schema.",
  },
  {
    group: "Shared Chrome & States",
    kicker: "04 · Reused everywhere",
    desc: "Header, footer, review modal and error states reused across every page.",
  },
];

export interface Layout {
  placements: CanvasPlacement[];
  labels: ClusterLabel[];
  world: { width: number; height: number };
}

// Build the board layout. `heights` maps page id -> measured group height; any
// page not present falls back to its baked estimate, then to FALLBACK_H.
export function computeLayout(heights: Record<string, number> = {}): Layout {
  const placements: CanvasPlacement[] = [];
  const labels: ClusterLabel[] = [];
  let y = TOP;
  let maxRight = X0 + GROUP_W;

  for (const meta of CLUSTER_META) {
    const pages = WIRE_PAGES.filter((p) => p.group === meta.group);
    if (pages.length === 0) continue;

    labels.push({ kicker: meta.kicker, title: meta.group, desc: meta.desc, x: X0, y });
    y += LABEL_BAND;

    let rowH = 0;
    pages.forEach((p, col) => {
      const px = X0 + col * STEP_X;
      placements.push({ id: p.id, x: px, y });
      rowH = Math.max(rowH, heights[p.id] ?? EST_H[p.id] ?? FALLBACK_H);
      maxRight = Math.max(maxRight, px + GROUP_W);
    });

    y += rowH + CLUSTER_GAP;
  }

  return { placements, labels, world: { width: maxRight + 160, height: y + 200 } };
}

const DEFAULT_LAYOUT = computeLayout();

export const PLACEMENTS: CanvasPlacement[] = DEFAULT_LAYOUT.placements;
export const LABELS: ClusterLabel[] = DEFAULT_LAYOUT.labels;
export const WORLD = DEFAULT_LAYOUT.world;
