import { RESTAURANT } from "@/data/restaurant";
import { MENU } from "@/data/menu";
import { COPY } from "@/data/copy";
import { COLOR_FIELDS, DEFAULT_CANVAS_DOT, makeDefaultConfig } from "./defaults";
import type { BrandPreset, ConfigData, SiteConfig, ThemeConfig } from "./types";

// Perceived luminance (0–1) of a #rgb / #rrggbb color; used to decide whether
// on-canvas text needs to flip to a light ink for readability.
function isDarkColor(hex: string): boolean {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((ch) => ch + ch).join("");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return false;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

// ------------------------------------------------------------------
// A tiny external store with TWO independent snapshots:
//   - theme  → consumed by <ThemeApplier>, applied as CSS variables.
//   - data   → consumed by the canvas, drives a re-render of the frames.
// Splitting them means dragging a color picker (theme) never re-renders
// the 18 heavy page frames, while editing brand/product text (data) does.
// ------------------------------------------------------------------

let state: SiteConfig = makeDefaultConfig();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

// Mirror the editable data into the real RESTAURANT / MENU objects *in place*
// so every real component (which imports those references) renders live values
// without any component edits.
function syncDataModules(data: ConfigData) {
  Object.assign(RESTAURANT as Record<string, unknown>, data.restaurant);
  Object.assign(COPY as Record<string, unknown>, data.copy);
  MENU.splice(0, MENU.length, ...data.menu);
}

// Apply theme tokens as CSS variables on the canvas world so only the frames
// (and cluster labels / leader lines) re-theme — the tool chrome stays put.
export function applyTheme(theme: ThemeConfig) {
  if (typeof document === "undefined") return;
  const el =
    (document.querySelector(".canvas-world") as HTMLElement | null) ??
    document.documentElement;
  const c = theme.colors;
  for (const f of COLOR_FIELDS) el.style.setProperty(f.cssVar, c[f.key]);
  el.style.setProperty("--font-display", theme.fontDisplay);
  el.style.setProperty("--font-body", theme.fontBody);
  el.style.setProperty("--font-accent", theme.fontAccent);

  // Canvas (board) environment lives on :root so it covers the viewport, the
  // dotted world, and the on-canvas chrome (cluster labels + brand subtitle).
  const root = document.documentElement.style;
  root.setProperty("--canvas-bg", theme.canvasBg);
  const dark = isDarkColor(theme.canvasBg);
  // On-canvas text + dots flip to light values when the background is dark.
  root.setProperty("--canvas-ink", dark ? "#F4EFE6" : "#111110");
  root.setProperty("--canvas-ink-muted", dark ? "rgba(244,239,230,0.62)" : "#6B6258");
  root.setProperty("--canvas-kicker", dark ? "#E2C572" : "#A88838");
  root.setProperty("--canvas-dot", dark ? "rgba(255,255,255,0.13)" : DEFAULT_CANVAS_DOT);
}

export const configStore = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  getThemeSnapshot: (): ThemeConfig => state.theme,
  getDataSnapshot: (): ConfigData => state.data,
  getState: (): SiteConfig => state,

  // Edit theme — only the theme snapshot identity changes.
  updateTheme(producer: (theme: ThemeConfig) => void) {
    const theme = structuredClone(state.theme);
    producer(theme);
    state = { ...state, theme };
    emit();
  },

  // Apply a full brand kit (palette + fonts) without touching content data or
  // the canvas/board background (which is a tool setting, not client branding).
  applyPreset(preset: BrandPreset) {
    state = {
      ...state,
      theme: {
        ...state.theme,
        colors: { ...preset.colors },
        fontDisplay: preset.fontDisplay,
        fontBody: preset.fontBody,
        fontAccent: preset.fontAccent,
      },
    };
    emit();
  },

  // Edit content — only the data snapshot identity changes; mirror to modules.
  updateData(producer: (data: ConfigData) => void) {
    const data = structuredClone(state.data);
    producer(data);
    state = { ...state, data };
    syncDataModules(state.data);
    emit();
  },

  reset() {
    state = makeDefaultConfig();
    syncDataModules(state.data);
    emit();
  },
};
