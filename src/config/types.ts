import type { RestaurantData } from "@/data/restaurant";
import type { MenuCategory } from "@/data/menu";
import type { CopyData } from "@/data/copy";
import type { FAQ } from "@/data/faqs";
import type { Review } from "@/data/reviews";
import type { Specialty } from "@/data/specialties";
import type { Neighborhood } from "@/data/neighborhoods";
import type { Dish } from "@/data/dishes";

/**
 * Per-frame per-DOM-path content overrides.
 *
 * Created when an inline edit's text cannot be matched back to a unique field
 * in the data tree (hardcoded UI strings, or ambiguous text that appears in
 * multiple data fields). Keyed by `frameId` then by a stable node path within
 * that frame. Values are HTML strings (so B/I/U markup round-trips).
 */
export type FrameOverrides = Record<string, Record<string, string>>;

/** Themeable color tokens — mirror the CSS custom properties in globals.css. */
export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  gold: string;
  goldDark: string;
  sand: string;
  warmWhite: string;
  cream: string;
  text: string;
  textMuted: string;
  border: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  /** CSS font-family stacks applied to --font-display / --font-body / --font-accent. */
  fontDisplay: string;
  fontBody: string;
  fontAccent: string;
  /** Infinite-canvas (board) background. On-canvas text auto-lightens when dark. */
  canvasBg: string;
}

/** A one-click brand kit: a full color palette + the three font stacks. */
export interface BrandPreset {
  id: string;
  label: string;
  note?: string;
  colors: ThemeColors;
  fontDisplay: string;
  fontBody: string;
  fontAccent: string;
}

/**
 * The content data that drives every page.
 *
 * The non-override fields are mirrored back into the underlying data modules
 * (RESTAURANT / MENU / COPY / FAQS / REVIEWS / PRESS_QUOTES / SPECIALTIES /
 * NEIGHBORHOODS / DISHES) in place by `syncDataModules`, so the real
 * components keep importing them as before and re-render against live values.
 */
export interface ConfigData {
  restaurant: RestaurantData;
  menu: MenuCategory[];
  copy: CopyData;
  faqs: FAQ[];
  reviews: Review[];
  specialties: Specialty[];
  neighborhoods: Neighborhood[];
  dishes: Dish[];
  overrides: FrameOverrides;
}

export interface SiteConfig {
  theme: ThemeConfig;
  data: ConfigData;
}
