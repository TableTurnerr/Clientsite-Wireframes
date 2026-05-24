import { RESTAURANT } from "@/data/restaurant";
import { MENU } from "@/data/menu";
import { COPY } from "@/data/copy";
import { FAQS } from "@/data/faqs";
import { REVIEWS } from "@/data/reviews";
import { SPECIALTIES } from "@/data/specialties";
import { NEIGHBORHOODS } from "@/data/neighborhoods";
import { DISHES } from "@/data/dishes";
import type { BrandPreset, SiteConfig, ThemeColors } from "./types";

// Defaults mirror the @theme tokens in globals.css so "Reset" returns the
// board to the default look.
export const DEFAULT_COLORS: ThemeColors = {
  primary: "#8B1A1A",
  primaryDark: "#6B1414",
  primaryLight: "#B22222",
  gold: "#C9A84C",
  goldDark: "#A88838",
  sand: "#F7F4EE",
  warmWhite: "#FAFAF7",
  cream: "#FFFFFF",
  text: "#111110",
  textMuted: "#6B6258",
  border: "#ECE7DD",
};

// Labels for the color controls, in display order.
export const COLOR_FIELDS: { key: keyof ThemeColors; label: string; cssVar: string }[] = [
  { key: "primary", label: "Primary (brand)", cssVar: "--color-primary" },
  { key: "primaryDark", label: "Primary dark", cssVar: "--color-primary-dark" },
  { key: "primaryLight", label: "Primary light", cssVar: "--color-primary-light" },
  { key: "gold", label: "Gold accent", cssVar: "--color-gold" },
  { key: "goldDark", label: "Gold dark", cssVar: "--color-gold-dark" },
  { key: "sand", label: "Sand surface", cssVar: "--color-sand" },
  { key: "warmWhite", label: "Warm white", cssVar: "--color-warm-white" },
  { key: "cream", label: "Cream / white", cssVar: "--color-cream" },
  { key: "text", label: "Text", cssVar: "--color-text" },
  { key: "textMuted", label: "Text muted", cssVar: "--color-text-muted" },
  { key: "border", label: "Border", cssVar: "--color-border" },
];

// The default font stacks (Inter for UI/body, Fraunces for the italic serif
// accent — both loaded via next/font).
export const DEFAULT_FONT_DISPLAY = "var(--font-inter), system-ui, -apple-system, sans-serif";
export const DEFAULT_FONT_BODY = "var(--font-inter), system-ui, -apple-system, sans-serif";
export const DEFAULT_FONT_ACCENT = 'var(--font-fraunces), "Georgia", serif';
const FONT_GEORGIA = 'Georgia, "Times New Roman", serif';

// Font stacks offered in the typography selects. Only Inter + Fraunces are
// loaded as webfonts (the rest are system fallbacks).
export const FONT_OPTIONS: { label: string; value: string }[] = [
  { label: "Inter — sans (default)", value: DEFAULT_FONT_DISPLAY },
  { label: "Fraunces — serif (default)", value: DEFAULT_FONT_ACCENT },
  { label: "Georgia (serif)", value: FONT_GEORGIA },
  { label: "System UI", value: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" },
  { label: "Helvetica / Arial", value: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  { label: "Times", value: '"Times New Roman", Times, serif' },
  { label: "Monospace", value: "ui-monospace, 'SFMono-Regular', Menlo, monospace" },
];

// One-click brand kits. The first is the default (the current site's exact
// palette + fonts); the others show how a client site re-skins instantly from
// the same template.
export const BRAND_PRESETS: BrandPreset[] = [
  {
    id: "default",
    label: "Default — current site",
    note: "The default palette + fonts",
    colors: { ...DEFAULT_COLORS },
    fontDisplay: DEFAULT_FONT_DISPLAY,
    fontBody: DEFAULT_FONT_BODY,
    fontAccent: DEFAULT_FONT_ACCENT,
  },
  {
    id: "emerald-sand",
    label: "Emerald & Sand (example)",
    colors: {
      primary: "#0F5132",
      primaryDark: "#0B3D27",
      primaryLight: "#198754",
      gold: "#C8902E",
      goldDark: "#A6741F",
      sand: "#F2F4EF",
      warmWhite: "#FAFBF7",
      cream: "#FFFFFF",
      text: "#13211A",
      textMuted: "#566B5F",
      border: "#E2E8DF",
    },
    fontDisplay: DEFAULT_FONT_DISPLAY,
    fontBody: DEFAULT_FONT_BODY,
    fontAccent: DEFAULT_FONT_ACCENT,
  },
  {
    id: "royal-editorial",
    label: "Royal Blue, serif headings (example)",
    colors: {
      primary: "#1D4ED8",
      primaryDark: "#1E40AF",
      primaryLight: "#3B82F6",
      gold: "#D97706",
      goldDark: "#B45309",
      sand: "#F1F3F7",
      warmWhite: "#F9FAFC",
      cream: "#FFFFFF",
      text: "#0F172A",
      textMuted: "#586074",
      border: "#E3E7EF",
    },
    fontDisplay: FONT_GEORGIA,
    fontBody: DEFAULT_FONT_BODY,
    fontAccent: DEFAULT_FONT_ACCENT,
  },
];

// Infinite-canvas (board) background. Default mirrors --canvas-bg in globals.css.
export const DEFAULT_CANVAS_BG = "#EFEAE0";
export const DEFAULT_CANVAS_DOT = "#D8CFBD";

// Quick canvas presets shown as swatches (light defaults + dark options that
// trigger the auto-lightening of on-canvas text).
export const CANVAS_SWATCHES: { label: string; value: string }[] = [
  { label: "Cream (default)", value: DEFAULT_CANVAS_BG },
  { label: "Paper white", value: "#FFFFFF" },
  { label: "Cool grey", value: "#E6E8EC" },
  { label: "Warm charcoal", value: "#211D18" },
  { label: "Slate", value: "#12161D" },
  { label: "Near black", value: "#0B0B0C" },
];

// Capture pristine snapshots at module load — BEFORE the store ever mutates
// the underlying arrays in place — so "Reset" always restores the original
// data rather than whatever the live (already-edited) objects currently hold.
const PRISTINE_RESTAURANT = structuredClone(RESTAURANT);
const PRISTINE_MENU = structuredClone(MENU);
const PRISTINE_COPY = structuredClone(COPY);
const PRISTINE_FAQS = structuredClone(FAQS);
const PRISTINE_REVIEWS = structuredClone(REVIEWS);
const PRISTINE_SPECIALTIES = structuredClone(SPECIALTIES);
const PRISTINE_NEIGHBORHOODS = structuredClone(NEIGHBORHOODS);
const PRISTINE_DISHES = structuredClone(DISHES);

export function makeDefaultConfig(): SiteConfig {
  return {
    theme: {
      colors: { ...DEFAULT_COLORS },
      fontDisplay: DEFAULT_FONT_DISPLAY,
      fontBody: DEFAULT_FONT_BODY,
      fontAccent: DEFAULT_FONT_ACCENT,
      canvasBg: DEFAULT_CANVAS_BG,
    },
    data: {
      restaurant: structuredClone(PRISTINE_RESTAURANT),
      menu: structuredClone(PRISTINE_MENU),
      copy: structuredClone(PRISTINE_COPY),
      faqs: structuredClone(PRISTINE_FAQS),
      reviews: structuredClone(PRISTINE_REVIEWS),
      specialties: structuredClone(PRISTINE_SPECIALTIES),
      neighborhoods: structuredClone(PRISTINE_NEIGHBORHOODS),
      dishes: structuredClone(PRISTINE_DISHES),
      overrides: {},
    },
  };
}
