import type { WireframePage } from "@/canvas/types";

// Mirrors src/app/iraqi-cuisine/page.tsx: text hero, a vertical list of 12
// alternating dish cards (image + name + summary + body + specialty link),
// then a closing "Visit Us" SEO block with two buttons. No gallery, no FAQ.
export const iraqiCuisine: WireframePage = {
  id: "iraqi-cuisine",
  title: "Iraqi Cuisine",
  route: "/iraqi-cuisine/",
  group: "Core Pages",
  blurb: "Cornerstone guide. 12 alternating dish cards linking to specialties.",
  width: 400,
  sections: [
    { id: "hdr", kind: "header", label: "Header (global)", heading: "Al-Baghdady", buttons: ["Order Online"], items: 6 },
    { id: "bc", kind: "breadcrumb", label: "BreadcrumbNav", chips: ["Home", "Iraqi Cuisine"] },
    {
      id: "hero",
      kind: "hero",
      label: "Guide hero (text only)",
      eyebrow: "FROM BAGHDAD TO RICHARDSON",
      heading: "Iraqi Cuisine — A Guide to the Bakery & Breakfast Tradition",
      body: 2,
    },
    {
      id: "dishes",
      kind: "list",
      label: "Dish guide (×12, alternating L/R)",
      items: 6,
      image: true,
      source: "page-local DISHES[] → links to /specialties/*",
    },
    {
      id: "seo",
      kind: "text",
      label: "Visit Us block",
      accent: "sand",
      eyebrow: "VISIT US",
      heading: "Taste Authentic Iraqi Cuisine in Richardson, TX",
      body: 3,
      buttons: ["See Everything on the Menu", "ghost:Explore Our Specialties"],
    },
    { id: "ftr", kind: "footer", label: "Footer (global)", heading: "Al-Baghdady" },
  ],
  notes: [
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [{ sys: "seo", text: "Auto-injects `breadcrumbSchema()`" }],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "right",
      title: "Guide hero",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "seo", text: "`createMetadata()` + `webPageSchema()`" },
      ],
    },
    {
      id: "n-dishes",
      anchor: "dishes",
      side: "right",
      title: "Dish guide (×12)",
      lines: [
        { sys: "product", text: "Local `DISHES[]` (name · summary · body)" },
        { sys: "layout", text: "Alternating image/text cards (odd rows reverse)" },
        { sys: "seo", text: "Each links to a `/specialties/[slug]/` page" },
      ],
    },
    {
      id: "n-summary",
      anchor: "dishes",
      side: "left",
      title: "Summary accent",
      lines: [
        { sys: "color", text: "Dish summary line `--color-primary`" },
        { sys: "color", text: "“NN — Dish” label `--color-text-muted`" },
      ],
    },
    {
      id: "n-seo",
      anchor: "seo",
      side: "left",
      title: "Visit Us / SEO",
      lines: [
        { sys: "seo", text: "Internal links to breakfast, chai, baklava…" },
        { sys: "color", text: "`.btn-primary` + `.btn-secondary`" },
      ],
    },
    {
      id: "n-ftr",
      anchor: "ftr",
      side: "right",
      title: "Global Footer",
      lines: [{ sys: "brand", text: "NAP + `RESTAURANT.socials.*`" }],
    },
  ],
};
