import type { WirePage } from "@/canvas/types";
import { home } from "./home";
import { menu } from "./menu";
import { bakery } from "./bakery";
import { catering } from "./catering";
import { iraqiCuisine } from "./iraqi-cuisine";
import { ourStory } from "./our-story";
import { returnPolicy } from "./return-policy";
import { nearHub } from "./near-hub";
import { nearCity } from "./near-city";
import { specialtiesHub } from "./specialties-hub";
import { specialtiesTopic } from "./specialties-topic";
import { dishCityMesh } from "./dish-city-mesh";
import { locationsHub } from "./locations-hub";
import { locationSingle } from "./location-single";
import { header } from "./header";
import { footer } from "./footer";
import { reviewModal } from "./review-modal";
import { notFound } from "./not-found";

// Wireframe pages = the real Al-Baghdady pages, composed from the real
// components, with images shown as wireframe boxes.
export const WIRE_PAGES: WirePage[] = [
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
