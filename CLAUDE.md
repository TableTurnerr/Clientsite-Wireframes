# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server at localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

No test suite or linter is configured. TypeScript type-checking runs through Next.js's build pipeline (`npm run build`).

## What this project is

An infinite-canvas wireframe tool for the **TableTurnerr client-site template**. It renders the *real* restaurant website components (Al-Baghdady) inside a pannable, zoomable board, with annotated side-notes explaining which data variable drives each UI element. The intended audience is TableTurnerr clients and prospects — it doubles as a sales demo and onboarding reference.

## Architecture

### Two independent layers

**Canvas / tool chrome** lives in `src/canvas/` and `src/wireframe/`:
- `Canvas.tsx` — the pan/zoom viewport (drag, Ctrl+scroll, keyboard shortcuts F/0/+/-)
- `FrameGroup.tsx` — renders one page frame at 1280 px width, draws SVG leader lines from annotation notes to their anchored sections
- `Anno.tsx` — a layout-neutral `<div data-anchor="id">` wrapper placed around each real section to give leader lines something to point at
- `Note.tsx` — the annotation card component; backtick spans become `<code>`
- `src/data/registry.ts` — `computeLayout()` positions frames in four cluster rows, height-aware so tall frames don't overlap the next row

**Site components** live in `src/components/` and are the *actual* restaurant site code (Header, Footer, HeroBanner, etc.), rendered inside the canvas frames with real CSS.

### Page definitions (`src/canvas/pages/*.tsx`)

Each file exports a `WirePage` object:
```ts
{ id, title, route, group, Page, notes }
```
- `Page` is a React component that composes real site components exactly as the live site would, with each section wrapped in `<Anno id="...">`.
- `notes` is the array of annotation cards. Each note's `anchor` field must match an `Anno` id; `side: "left" | "right"` picks which column it goes in.
- `group` assigns the page to one of four canvas clusters: `"Core Pages"`, `"Dynamic SEO Templates"`, `"Multi-Location"`, `"Shared Chrome & States"`.

All pages are registered in `src/canvas/pages/index.ts`.

### Data / config system

Three data modules are the single source of truth for all rendered content:
- `src/data/restaurant.ts` — `RESTAURANT` (brand, NAP, hours, socials, ratings)
- `src/data/menu.ts` — `MENU` (categories and items)
- `src/data/copy.ts` — `COPY` (homepage marketing strings)

`src/config/store.ts` is a tiny external store (no library) that mutates these modules **in place** via `Object.assign` / `MENU.splice`. This means the real components — which import these modules directly — automatically reflect live edits from the config panel without any prop threading.

The store has **two independent snapshots** to avoid unnecessary re-renders:
- `getThemeSnapshot()` — consumed by `ThemeApplier` in `page.tsx`; theme changes write CSS variables directly onto `.canvas-world` and never trigger frame re-renders.
- `getDataSnapshot()` — consumed by the canvas root; data changes (brand/content/menu) do re-render the frames.

`src/config/ConfigPanel.tsx` is `memo`-wrapped and uses uncontrolled inputs so it never re-renders during typing. A `key={resetNonce}` trick is used to reset all uncontrolled inputs cleanly.

Brand presets (`BRAND_PRESETS` in `src/config/defaults.ts`) are full palette + font bundles applied in one click via `configStore.applyPreset()`.

### SmartImage shim

`src/components/shared/SmartImage.tsx` is the wireframe version of the real site's image component. It accepts the identical props but renders a grey placeholder box. This lets all real page components import it unchanged while images appear as wireframe placeholders in the canvas.

### Canvas layout

`registry.ts` defines four clusters with fixed column stepping (`STEP_X = 2240 px`). Row heights are measured live via `ResizeObserver` (reported up from `FrameGroup` via `onHeight`), and baked estimates in `EST_H` prevent layout shift on first paint. `computeLayout()` is called on every height change but is fast (pure calculation over ≤18 pages).

## Adding a new wireframe page

1. Create `src/canvas/pages/my-page.tsx`. Export a `WirePage` with a `Page` component that wraps sections in `<Anno id="...">` and a `notes` array referencing those ids.
2. Import and add it to `WIRE_PAGES` in `src/canvas/pages/index.ts`.
3. Add its estimated height to `EST_H` in `src/data/registry.ts` (measure from the dev server; the value only affects first-paint spacing).
4. Assign it to an existing `group` string or add a new entry to `CLUSTER_META` in `registry.ts`.

## CSS conventions

All design tokens are CSS custom properties defined in `src/app/globals.css` under `@theme` (Tailwind v4) and mirrored on `:root`. The theme system writes to them at runtime via `applyTheme()`. Use `var(--color-primary)` etc. rather than hardcoded values so the live theme picker works correctly.

Canvas-specific chrome (frames, leader lines, notes, toolbar, config panel, legend) is all styled in `globals.css` under clearly labeled comment blocks. Page-level site styles are in the same file but separated from canvas chrome.
