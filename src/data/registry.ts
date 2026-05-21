import type {
  WireframePage,
  CanvasPlacement,
  ClusterLabel,
} from "@/canvas/types";

import { home } from "./pages/home";
import { menu } from "./pages/menu";
import { bakery } from "./pages/bakery";
import { catering } from "./pages/catering";
import { iraqiCuisine } from "./pages/iraqi-cuisine";
import { ourStory } from "./pages/our-story";
import { returnPolicy } from "./pages/return-policy";
import { nearHub } from "./pages/near-hub";
import { nearCity } from "./pages/near-city";
import { specialtiesHub } from "./pages/specialties-hub";
import { specialtiesTopic } from "./pages/specialties-topic";
import { dishCityMesh } from "./pages/dish-city-mesh";
import { locationsHub } from "./pages/locations-hub";
import { locationSingle } from "./pages/location-single";
import { header } from "./pages/header";
import { footer } from "./pages/footer";
import { reviewModal } from "./pages/review-modal";
import { notFound } from "./pages/not-found";

export const PAGES: WireframePage[] = [
  home,
  menu,
  bakery,
  catering,
  iraqiCuisine,
  ourStory,
  returnPolicy,
  nearHub,
  nearCity,
  specialtiesHub,
  specialtiesTopic,
  dishCityMesh,
  locationsHub,
  locationSingle,
  header,
  footer,
  reviewModal,
  notFound,
];

// --- canvas layout (desktop-width frames) ---
// Each frame group = left notes (248) + gap (96) + frame (1200) + gap (96) + right notes (248) = 1888 wide.
const X0 = 80;
const STEP_X = 2120;
const ROW_STEP = 3350; // tall enough for the tallest desktop page (home) + notes
const LABEL_BAND = 210;
const CLUSTER_GAP = 360;
const PER_ROW = 4;
const GROUP_W = 1888;

interface ClusterDef {
  kicker: string;
  title: string;
  desc: string;
  ids: string[];
}

const CLUSTERS: ClusterDef[] = [
  {
    kicker: "01 · Live today",
    title: "Core Pages",
    desc: "The seven hand-built pages every client site ships with.",
    ids: ["home", "menu", "bakery", "catering", "iraqi-cuisine", "our-story", "return-policy"],
  },
  {
    kicker: "02 · The growth engine",
    title: "Dynamic SEO Templates",
    desc: "One file → many pages. generateStaticParams() pre-renders every city, topic, and (planned) dish×city combination.",
    ids: ["near-hub", "near-city", "specialties-hub", "specialties-topic", "dish-city-mesh"],
  },
  {
    kicker: "03 · Optional extension",
    title: "Multi-Location",
    desc: "For clients with more than one venue — the single RESTAURANT object becomes a LOCATIONS[] array, each branch with its own NAP, geo and schema.",
    ids: ["locations-hub", "location-single"],
  },
  {
    kicker: "04 · Reused everywhere",
    title: "Shared Chrome & States",
    desc: "Header, footer, review modal and error states rendered across every page.",
    ids: ["header", "footer", "review-modal", "not-found"],
  },
];

function buildLayout() {
  const placements: CanvasPlacement[] = [];
  const labels: ClusterLabel[] = [];
  let y = 80;
  for (const c of CLUSTERS) {
    labels.push({ kicker: c.kicker, title: c.title, desc: c.desc, x: X0, y });
    y += LABEL_BAND;
    for (let i = 0; i < c.ids.length; i += PER_ROW) {
      const rowIds = c.ids.slice(i, i + PER_ROW);
      rowIds.forEach((id, col) => {
        placements.push({ id, x: X0 + col * STEP_X, y });
      });
      y += ROW_STEP;
    }
    y += CLUSTER_GAP;
  }
  const width = X0 + (PER_ROW - 1) * STEP_X + GROUP_W + 120;
  const height = y + 200;
  return { placements, labels, world: { width, height } };
}

const LAYOUT = buildLayout();

export const PLACEMENTS: CanvasPlacement[] = LAYOUT.placements;
export const LABELS: ClusterLabel[] = LAYOUT.labels;
export const WORLD = LAYOUT.world;
