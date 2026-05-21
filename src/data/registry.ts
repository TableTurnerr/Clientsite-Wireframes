import type { CanvasPlacement, ClusterLabel } from "@/canvas/types";
import { WIRE_PAGES } from "@/canvas/pages";

// One horizontal row per cluster. Frames are real desktop pages (tall), so
// rows are spaced generously.
const X0 = 80;
const STEP_X = 2240;
const ROW_STEP = 7400;
const LABEL_BAND = 240;
const CLUSTER_GAP = 460;
const GROUP_W = 2016; // 248 + 120 + 1280 + 120 + 248

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

function buildLayout() {
  const placements: CanvasPlacement[] = [];
  const labels: ClusterLabel[] = [];
  let y = 80;
  let maxRowLen = 1;

  for (const meta of CLUSTER_META) {
    const pages = WIRE_PAGES.filter((p) => p.group === meta.group);
    if (pages.length === 0) continue;
    maxRowLen = Math.max(maxRowLen, pages.length);
    labels.push({ kicker: meta.kicker, title: meta.group, desc: meta.desc, x: X0, y });
    y += LABEL_BAND;
    pages.forEach((p, col) => {
      placements.push({ id: p.id, x: X0 + col * STEP_X, y });
    });
    y += ROW_STEP + CLUSTER_GAP;
  }

  const width = X0 + (maxRowLen - 1) * STEP_X + GROUP_W + 160;
  const height = y + 200;
  return { placements, labels, world: { width, height } };
}

const LAYOUT = buildLayout();

export const PLACEMENTS: CanvasPlacement[] = LAYOUT.placements;
export const LABELS: ClusterLabel[] = LAYOUT.labels;
export const WORLD = LAYOUT.world;
