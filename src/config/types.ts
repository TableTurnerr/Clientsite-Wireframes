import type { RestaurantData } from "@/data/restaurant";
import type { MenuCategory } from "@/data/menu";
import type { CopyData } from "@/data/copy";

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

/** The content data that drives every page (mutated into RESTAURANT / MENU / COPY live). */
export interface ConfigData {
  restaurant: RestaurantData;
  menu: MenuCategory[];
  copy: CopyData;
}

export interface SiteConfig {
  theme: ThemeConfig;
  data: ConfigData;
}
