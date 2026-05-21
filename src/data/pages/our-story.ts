import type { WireframePage } from "@/canvas/types";

// Brand-story page. Mostly editorial copy + brand vars; the "since" dates and
// founder name are the re-skinnable hooks per client.
export const ourStory: WireframePage = {
  id: "our-story",
  title: "Our Story",
  route: "/our-story/",
  group: "Core Pages",
  blurb: "Heritage / about page — founder narrative, the family timeline, gallery.",
  width: 400,
  sections: [
    {
      id: "hdr",
      kind: "header",
      label: "Header (global)",
      heading: "Al-Baghdady",
      buttons: ["Order Online"],
      items: 6,
    },
    {
      id: "bc",
      kind: "breadcrumb",
      label: "BreadcrumbNav",
      chips: ["Home", "Our Story"],
    },
    {
      id: "hero",
      kind: "hero",
      label: "Story Hero",
      accent: "primary",
      eyebrow: "OUR STORY",
      heading: "From Baghdad, 1919 — to Richardson",
      body: 2,
    },
    {
      id: "founder",
      kind: "split",
      label: "Founder block",
      heading: "Master baker Salah Hassan",
      body: 3,
      itemLabel: "PORTRAIT",
      buttons: ["See the Bakery"],
    },
    {
      id: "heritage",
      kind: "text",
      label: "Heritage copy",
      heading: "Four generations of recipes",
      body: 4,
    },
    {
      id: "stats",
      kind: "stat",
      label: "Timeline stats",
      chips: ["1919", "2012", "4 gen"],
    },
    {
      id: "gallery",
      kind: "gallery",
      label: "Gallery",
      heading: "Through the years",
      cols: 3,
      items: 6,
    },
    {
      id: "cta",
      kind: "cta",
      label: "Conversion band",
      accent: "primary",
      heading: "Taste a century of family baking",
      buttons: ["View Menu", "gold:Call Us"],
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
      id: "n-seo",
      anchor: "hero",
      side: "left",
      title: "Page-level SEO",
      lines: [
        { sys: "seo", text: "`createMetadata()` → title/desc/canonical/OG" },
        { sys: "seo", text: "Schema: `AboutPage` + `Organization` (founder/foundingDate)" },
        { sys: "seo", text: "Single H1; section headings are H2s" },
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "right",
      title: "BreadcrumbNav",
      lines: [
        { sys: "seo", text: "Auto-injects `BreadcrumbList` JSON-LD" },
        { sys: "layout", text: "Shared `<BreadcrumbNav>` component" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "right",
      title: "Heritage dates = brand vars",
      lines: [
        { sys: "brand", text: "US founding = `RESTAURANT.founded` (\"2012\")" },
        { sys: "brand", text: "Recipe origin = `RESTAURANT.familyRecipeSince` (\"1919\")" },
        { sys: "color", text: "Hero tint bg `--color-primary` wash" },
      ],
    },
    {
      id: "n-founder",
      anchor: "founder",
      side: "left",
      title: "Founder block",
      lines: [
        { sys: "brand", text: "Name + bio = `Organization.founder` (Salah Hassan)" },
        { sys: "layout", text: "Portrait via `SmartImage` (shimmer + lazy)" },
        { sys: "layout", text: "Image-left / text-right split" },
        { sys: "brand", text: "CTA → `/bakery/`" },
      ],
    },
    {
      id: "n-heritage",
      anchor: "heritage",
      side: "right",
      title: "Heritage copy",
      lines: [
        { sys: "brand", text: "Narrative from data layer (`RESTAURANT.longDescription`)" },
        { sys: "color", text: "Body `--color-text-muted`, heading `--font-accent`" },
      ],
    },
    {
      id: "n-stats",
      anchor: "stats",
      side: "left",
      title: "Timeline stats",
      lines: [
        { sys: "brand", text: "`familyRecipeSince` · `founded` · generations" },
        { sys: "color", text: "Stat numerals `--color-gold`" },
      ],
    },
    {
      id: "n-gallery",
      anchor: "gallery",
      side: "right",
      title: "Gallery",
      lines: [
        { sys: "layout", text: "Tiles rendered via `SmartImage` from `/Images/gallery/`" },
        { sys: "seo", text: "Keyword-bearing `alt` text per image" },
      ],
    },
    {
      id: "n-cta",
      anchor: "cta",
      side: "left",
      title: "Conversion band",
      lines: [
        { sys: "color", text: "Band bg `--color-primary`, gold CTA `--color-gold`" },
        { sys: "brand", text: "Call = `RESTAURANT.phone`" },
      ],
    },
    {
      id: "n-ftr",
      anchor: "ftr",
      side: "right",
      title: "Global Footer",
      lines: [
        { sys: "layout", text: "Shared `<Footer>` on every page" },
        { sys: "brand", text: "NAP + hours from `RESTAURANT`" },
        { sys: "color", text: "Bg `--color-sand`, accents `--color-primary`" },
      ],
    },
  ],
};
