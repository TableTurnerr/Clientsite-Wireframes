import { RESTAURANT } from "@/data/restaurant";
import { MENU } from "@/data/menu";
import { COPY } from "@/data/copy";
import { FAQS } from "@/data/faqs";
import { REVIEWS } from "@/data/reviews";
import { SPECIALTIES } from "@/data/specialties";
import { NEIGHBORHOODS } from "@/data/neighborhoods";
import { DISHES } from "@/data/dishes";
import { COLOR_FIELDS, DEFAULT_CANVAS_DOT, makeDefaultConfig } from "./defaults";
import type {
  BrandPreset,
  ConfigData,
  FrameOverrides,
  SiteConfig,
  ThemeConfig,
} from "./types";

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
//
// Inline-edit overrides live inside `data` so they're saved + loaded with
// every other content change.
// ------------------------------------------------------------------

let state: SiteConfig = makeDefaultConfig();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

// Walk an in-place data module after assignment and replace any empty leaf
// (null, undefined, or "") with a labelled placeholder like
// "{{ RESTAURANT.address.city }}". Lets the wireframe stay self-documenting
// when a profile is missing copy — readers see what variable drives each spot
// instead of blank space (or crashes from rendered-as-empty downstream code).
// Mutates in place so it doesn't change the saved data shape.
function labelEmpties(value: unknown, path: string): void {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      if (item === null || item === undefined || item === "") {
        value[i] = `{{ ${path}[${i}] }}`;
      } else if (typeof item === "object") {
        labelEmpties(item, `${path}[${i}]`);
      }
    }
    return;
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (v === null || v === undefined || v === "") {
        obj[k] = `{{ ${path}.${k} }}`;
      } else if (typeof v === "object") {
        labelEmpties(v, `${path}.${k}`);
      }
    }
  }
}

// Mirror the editable data into the real data-module references *in place* so
// every real component (which imports those references) renders live values
// without any component edits.
function syncDataModules(data: ConfigData) {
  Object.assign(RESTAURANT as Record<string, unknown>, data.restaurant);
  Object.assign(COPY as Record<string, unknown>, data.copy);
  MENU.splice(0, MENU.length, ...data.menu);
  FAQS.splice(0, FAQS.length, ...data.faqs);
  REVIEWS.splice(0, REVIEWS.length, ...data.reviews);
  SPECIALTIES.splice(0, SPECIALTIES.length, ...data.specialties);
  NEIGHBORHOODS.splice(0, NEIGHBORHOODS.length, ...data.neighborhoods);
  DISHES.splice(0, DISHES.length, ...data.dishes);

  labelEmpties(RESTAURANT, "RESTAURANT");
  labelEmpties(COPY, "COPY");
  labelEmpties(MENU, "MENU");
  labelEmpties(FAQS, "FAQS");
  labelEmpties(REVIEWS, "REVIEWS");
  labelEmpties(SPECIALTIES, "SPECIALTIES");
  labelEmpties(NEIGHBORHOODS, "NEIGHBORHOODS");
  labelEmpties(DISHES, "DISHES");
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
  root.setProperty("--canvas-ink", dark ? "#F4EFE6" : "#111110");
  root.setProperty("--canvas-ink-muted", dark ? "rgba(244,239,230,0.62)" : "#6B6258");
  root.setProperty("--canvas-kicker", dark ? "#E2C572" : "#A88838");
  root.setProperty("--canvas-dot", dark ? "rgba(255,255,255,0.13)" : DEFAULT_CANVAS_DOT);
}

// ------------------------------------------------------------------
// Serialisation format. Bumped when the shape of `data` changes in a
// backwards-incompatible way; loaders below tolerate older versions by
// merging missing keys from defaults.
// ------------------------------------------------------------------
export const STORE_VERSION = 1;

export interface SerializedState {
  version: number;
  theme: ThemeConfig;
  data: ConfigData;
}

function shallowValidate(input: unknown): input is { theme?: unknown; data?: unknown } {
  return typeof input === "object" && input !== null;
}

// Merge any missing top-level keys from defaults so older payloads (or partial
// JSON pastes) don't blow up consumers that assume every array exists.
function hydrateData(partial: Partial<ConfigData>): ConfigData {
  const fresh = makeDefaultConfig().data;
  return {
    restaurant: partial.restaurant ?? fresh.restaurant,
    menu: partial.menu ?? fresh.menu,
    copy: partial.copy ?? fresh.copy,
    faqs: partial.faqs ?? fresh.faqs,
    reviews: partial.reviews ?? fresh.reviews,
    specialties: partial.specialties ?? fresh.specialties,
    neighborhoods: partial.neighborhoods ?? fresh.neighborhoods,
    dishes: partial.dishes ?? fresh.dishes,
    overrides: partial.overrides ?? {},
  };
}

function hydrateTheme(partial: Partial<ThemeConfig>): ThemeConfig {
  const fresh = makeDefaultConfig().theme;
  return {
    colors: { ...fresh.colors, ...(partial.colors ?? {}) },
    fontDisplay: partial.fontDisplay ?? fresh.fontDisplay,
    fontBody: partial.fontBody ?? fresh.fontBody,
    fontAccent: partial.fontAccent ?? fresh.fontAccent,
    canvasBg: partial.canvasBg ?? fresh.canvasBg,
  };
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

  // Per-frame override helpers. The HTML string is what gets stored, so B/I/U
  // markup round-trips through serialize/load and across users.
  setOverride(frameId: string, nodePath: string, html: string) {
    this.updateData((d) => {
      const forFrame = d.overrides[frameId] ?? {};
      forFrame[nodePath] = html;
      d.overrides[frameId] = forFrame;
    });
  },

  clearOverride(frameId: string, nodePath: string) {
    this.updateData((d) => {
      const forFrame = d.overrides[frameId];
      if (!forFrame) return;
      delete forFrame[nodePath];
      if (Object.keys(forFrame).length === 0) delete d.overrides[frameId];
    });
  },

  clearAllOverrides() {
    this.updateData((d) => {
      d.overrides = {};
    });
  },

  getOverrides: (): FrameOverrides => state.data.overrides,

  // Serialise the entire content + theme to a JSON-safe payload. This is the
  // shape stored in `wireframe_content.content` and what the JSON panel
  // exports.
  serialize(): SerializedState {
    return {
      version: STORE_VERSION,
      theme: structuredClone(state.theme),
      data: structuredClone(state.data),
    };
  },

  // Serialise a single frame's slice — used by the per-frame JSON view.
  // Includes only overrides for that frame plus the full shared data tier so
  // pasted edits still resolve against the live data.
  serializeFrame(frameId: string): SerializedState {
    const full = this.serialize();
    const forFrame = full.data.overrides[frameId];
    full.data.overrides = forFrame ? { [frameId]: forFrame } : {};
    return full;
  },

  // Apply a parsed JSON payload from an export or paste. Permissive: missing
  // keys fall back to current defaults so partial pastes don't wipe the rest.
  // Returns true on success; throws on invalid JSON shape.
  loadFullState(input: unknown): boolean {
    if (!shallowValidate(input)) {
      throw new Error("Expected an object with `theme` and/or `data`");
    }
    const incoming = input as Partial<SerializedState>;
    const theme = hydrateTheme((incoming.theme as Partial<ThemeConfig>) ?? state.theme);
    const data = hydrateData((incoming.data as Partial<ConfigData>) ?? state.data);
    state = { theme, data };
    syncDataModules(state.data);
    emit();
    return true;
  },

  // Merge an incoming payload into the current data tier (rather than replacing
  // it). Used when applying a per-frame JSON to the whole canvas — the frame's
  // overrides get merged in without dropping overrides on other frames.
  mergeData(partial: Partial<ConfigData>) {
    this.updateData((d) => {
      if (partial.restaurant) Object.assign(d.restaurant, partial.restaurant);
      if (partial.copy) Object.assign(d.copy, partial.copy);
      if (partial.menu) d.menu = partial.menu;
      if (partial.faqs) d.faqs = partial.faqs;
      if (partial.reviews) d.reviews = partial.reviews;
      if (partial.specialties) d.specialties = partial.specialties;
      if (partial.neighborhoods) d.neighborhoods = partial.neighborhoods;
      if (partial.dishes) d.dishes = partial.dishes;
      if (partial.overrides) {
        for (const [frameId, paths] of Object.entries(partial.overrides)) {
          d.overrides[frameId] = { ...(d.overrides[frameId] ?? {}), ...paths };
        }
      }
    });
  },

  reset() {
    state = makeDefaultConfig();
    syncDataModules(state.data);
    emit();
  },
};
