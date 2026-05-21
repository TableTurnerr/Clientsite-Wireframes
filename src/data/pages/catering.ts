import type { WireframePage } from "@/canvas/types";

// Mirrors src/app/catering/page.tsx: text hero, then a 2-column block
// (left: "What We Cater" checklist + "How It Works" steps; right: CateringForm),
// then a closing SEO content block. No menu cards, no map.
export const catering: WireframePage = {
  id: "catering",
  title: "Catering",
  route: "/catering/",
  group: "Core Pages",
  blurb: "Catering page. Checklist + steps beside the mailto inquiry form.",
  width: 400,
  sections: [
    { id: "hdr", kind: "header", label: "Header (global)", heading: "Al-Baghdady", buttons: ["Order Online"], items: 6 },
    { id: "bc", kind: "breadcrumb", label: "BreadcrumbNav", chips: ["Home", "Catering"] },
    {
      id: "hero",
      kind: "hero",
      label: "Catering hero (text only)",
      eyebrow: "CATERING",
      heading: "Iraqi Dessert Catering in Dallas — Kunafa, Baklava Trays & More",
      body: 2,
    },
    {
      id: "whatwecater",
      kind: "list",
      label: "What We Cater (left col)",
      heading: "What We Cater",
      items: 6,
      image: false,
    },
    {
      id: "howitworks",
      kind: "list",
      label: "How It Works (left col)",
      heading: "How It Works",
      items: 3,
      image: false,
    },
    {
      id: "form",
      kind: "form",
      label: "CateringForm (right col)",
      heading: "Request a quote",
      items: 6,
      buttons: ["Send Inquiry"],
    },
    {
      id: "seo",
      kind: "text",
      label: "SEO content block",
      accent: "sand",
      eyebrow: "CATERING ACROSS DFW",
      heading: "Halal Iraqi & Middle Eastern Catering for Every Occasion",
      body: 4,
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
      title: "Catering hero",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "seo", text: "`cateringServiceSchema()` + `createMetadata()`" },
      ],
    },
    {
      id: "n-what",
      anchor: "whatwecater",
      side: "left",
      title: "Left column",
      lines: [
        { sys: "layout", text: "`What We Cater` + `How It Works` stack left" },
        { sys: "color", text: "Check icons / step badges `--color-primary`" },
        { sys: "brand", text: "Delivery areas = `RESTAURANT.cateringAreas`" },
      ],
    },
    {
      id: "n-form",
      anchor: "form",
      side: "right",
      title: "CateringForm",
      lines: [
        { sys: "layout", text: "Mailto-based — NO backend" },
        { sys: "brand", text: "Recipient = `RESTAURANT.email`" },
        { sys: "layout", text: "Sits in the right column" },
      ],
    },
    {
      id: "n-seo",
      anchor: "seo",
      side: "left",
      title: "SEO content",
      lines: [
        { sys: "seo", text: "Topical copy + links to `/specialties/*`, `/menu/`" },
        { sys: "color", text: "Band bg `--color-sand`" },
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
