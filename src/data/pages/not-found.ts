import type { WireframePage } from "@/canvas/types";

// Error / non-success states. app/not-found.tsx (404) is the canvas example;
// app/error.tsx and app/global-error.tsx share the same branded treatment.
export const notFound: WireframePage = {
  id: "not-found",
  title: "404 / Error",
  route: "/404",
  group: "Shared Chrome & States",
  blurb: "Branded 404 / error state — shared Header & Footer, helpful links, noindex.",
  width: 400,
  sections: [
    {
      id: "hdr",
      kind: "header",
      label: "Header (global)",
      heading: "Al-Baghdady",
      items: 6,
      buttons: ["Order Online"],
    },
    {
      id: "hero",
      kind: "hero",
      label: "Error hero",
      accent: "primary",
      heading: "404 — Page not found",
      body: 1,
      buttons: ["Back home", "ghost:View Menu"],
    },
    {
      id: "links",
      kind: "text",
      label: "Helpful links",
      heading: "Try one of these",
      chips: ["Menu", "Catering", "Service Areas", "Specialties"],
      chipStyle: "city",
    },
    {
      id: "ftr",
      kind: "footer",
      label: "Footer (global)",
      heading: "Al-Baghdady",
    },
  ],
  notes: [
    {
      id: "n-states",
      anchor: "hero",
      side: "left",
      title: "The only non-success states",
      lines: [
        { sys: "layout", text: "`app/not-found.tsx` = 404" },
        { sys: "layout", text: "`app/error.tsx` = per-segment runtime error" },
        { sys: "layout", text: "`app/global-error.tsx` = root fallback" },
        { sys: "layout", text: "All kept branded & on-theme" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "right",
      title: "Error hero",
      lines: [
        { sys: "color", text: "Tint bg `--color-primary`, H1 `--font-accent`" },
        { sys: "color", text: "Primary `.btn-primary`, ghost border `--color-border`" },
        { sys: "brand", text: "\"Back home\" → `/`, copy is hardcoded" },
      ],
    },
    {
      id: "n-seo",
      anchor: "hero",
      side: "right",
      title: "Page-level SEO",
      lines: [
        { sys: "seo", text: "`createMetadata()` with `noindex` for 404" },
        { sys: "seo", text: "No breadcrumb / product schema on error states" },
      ],
    },
    {
      id: "n-links",
      anchor: "links",
      side: "left",
      title: "Recovery links",
      lines: [
        { sys: "layout", text: "Links use trailing slash, e.g. `/catering/`" },
        { sys: "brand", text: "Points back to core routes (no dead ends)" },
      ],
    },
    {
      id: "n-chips",
      anchor: "links",
      side: "left",
      title: "Link chips",
      lines: [
        { sys: "color", text: "Chips accent `--color-gold` / `--color-primary`" },
        { sys: "layout", text: "Same chip component as city/topic pills" },
      ],
    },
    {
      id: "n-chrome",
      anchor: "ftr",
      side: "right",
      title: "Still wears the chrome",
      lines: [
        { sys: "layout", text: "Shared `<Header>` + `<Footer>` still render" },
        { sys: "brand", text: "NAP / socials from `RESTAURANT` (consistent)" },
        { sys: "color", text: "Footer bg `--color-sand`, accents `--color-primary`" },
      ],
    },
  ],
};
