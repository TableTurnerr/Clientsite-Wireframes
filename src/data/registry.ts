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

const X0 = 60;
const STEP_X = 1240;

function row(ids: string[], y: number, startX = X0, step = STEP_X): CanvasPlacement[] {
  return ids.map((id, i) => ({ id, x: startX + i * step, y }));
}

export const PLACEMENTS: CanvasPlacement[] = [
  // 01 — Core Pages
  ...row(["home", "menu", "bakery", "catering"], 220),
  ...row(["iraqi-cuisine", "our-story", "return-policy"], 1990),

  // 02 — Dynamic SEO Templates
  ...row(["near-hub", "near-city", "specialties-hub", "specialties-topic"], 3520),
  ...row(["dish-city-mesh"], 5290),

  // 03 — Multi-Location
  ...row(["locations-hub", "location-single"], 6720),

  // 04 — Shared Chrome & States
  ...row(["header", "footer", "review-modal", "not-found"], 8250),
];

export const LABELS: ClusterLabel[] = [
  {
    kicker: "01 · Live today",
    title: "Core Pages",
    desc: "The seven hand-built pages every client site ships with.",
    x: X0,
    y: 40,
  },
  {
    kicker: "02 · The growth engine",
    title: "Dynamic SEO Templates",
    desc: "One file → many pages. generateStaticParams() pre-renders every city, topic, and (planned) dish×city combination.",
    x: X0,
    y: 3340,
  },
  {
    kicker: "03 · Optional extension",
    title: "Multi-Location",
    desc: "For clients with more than one venue — the single RESTAURANT object becomes a LOCATIONS[] array, each branch with its own NAP, geo and schema.",
    x: X0,
    y: 6540,
  },
  {
    kicker: "04 · Reused everywhere",
    title: "Shared Chrome & States",
    desc: "Header, footer, review modal and error states rendered across every page.",
    x: X0,
    y: 8070,
  },
];

export const WORLD = { width: 5320, height: 9520 };
