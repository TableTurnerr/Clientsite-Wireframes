# TableTurnerr — Client Site Wireframe Canvas

An annotated, interactive wireframe tool for the TableTurnerr restaurant website template. It renders the **real site components** inside a pan/zoom infinite canvas, with side-notes that map every UI element to the variable or data source that drives it.

## What it is

The canvas shows all unique pages of the child-site template grouped into four clusters:

| Cluster | Pages |
|---------|-------|
| **01 · Core Pages** | Home, Menu, Bakery, Catering, Iraqi Cuisine, Our Story, Return Policy |
| **02 · Dynamic SEO Templates** | Near Hub, Near City, Specialties Hub, Specialties Topic, Dish×City Mesh |
| **03 · Multi-Location** | Locations Hub, Location Single |
| **04 · Shared Chrome & States** | Header, Footer, Review Modal, 404 |

Each frame renders at full desktop width (1280 px) with annotation cards on the left and right connected by leader lines. Annotations are color-coded:

- **Gray** — design token (`--color-*`, fonts)
- **Gold** — brand / NAP / social (`RESTAURANT.*` variables)
- **Green** — product data (menu, dishes, neighborhoods)
- **Blue** — SEO (metadata, JSON-LD schema, breadcrumbs)
- **Purple** — layout / shared component

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Canvas controls

| Action | Input |
|--------|-------|
| Pan | Click and drag |
| Zoom | Ctrl / ⌘ + scroll |
| Zoom in / out | `+` / `-` keys or toolbar buttons |
| Fit all frames | `F` key or toolbar button |
| Reset view | `0` key or toolbar button |

## Config panel (gear icon)

The side panel lets you edit every client-specific variable and see all frames update live:

- **Brand kit presets** — one-click palette + font swap to preview a different client's look
- **Colors** — all 11 design tokens (primary, gold, sand, cream, text, border…)
- **Canvas background** — separate from the site palette; auto-flips text to light when dark
- **Typography** — display, body, and accent font stacks
- **Brand & contact** — name, address, phone, cuisine, founding year, ratings, dietary flags
- **Links & social** — order-online URL, Instagram, Facebook, Google Business
- **Page copy** — homepage hero headline, featured eyebrow, etc.
- **Products (menu)** — every category and item; edits flow to the menu page, featured dishes row, and dish pages

Theme (color/font) changes apply as CSS variables only — the 18 page frames don't re-render. Content edits (brand/menu/copy) do re-render the frames because the real components read the data modules directly.

## Tech stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4
- No backend, no database — pure static client-side tool

## Project structure

```
src/
  app/           # Next.js root layout + globals.css
  canvas/        # Pan/zoom Canvas, page registry, layout engine
    pages/       # One file per wireframe page (WirePage exports)
  wireframe/     # FrameGroup (leader-line drawing), Note, Anno
  config/        # ConfigPanel, store, types, defaults + brand presets
  components/    # Real site components (Header, Footer, HeroBanner, …)
  data/          # RESTAURANT, MENU, COPY, and supporting data files
```

Images in the real components are replaced by a `SmartImage` shim that renders wireframe placeholder boxes with identical dimensions.
