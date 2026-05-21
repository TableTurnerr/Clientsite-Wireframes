import type { WireframePage } from "@/canvas/types";

// Mirrors src/app/near/page.tsx: text hero (2 buttons) + a 3-col grid of 10
// text-only city cards (state · city · driveTime · intro · "Visit page →").
export const nearHub: WireframePage = {
  id: "near-hub",
  title: "Service Areas",
  route: "/near/",
  group: "Dynamic SEO Templates",
  blurb: "Hub linking to all 10 /near/[city]/ pages.",
  width: 400,
  sections: [
    { id: "hdr", kind: "header", label: "Header (global)", heading: "Al-Baghdady", buttons: ["Order Online"], items: 6 },
    { id: "bc", kind: "breadcrumb", label: "BreadcrumbNav", chips: ["Home", "Service Areas"] },
    {
      id: "hero",
      kind: "hero",
      label: "Service-areas hero (text)",
      eyebrow: "ACROSS THE DFW METROPLEX",
      heading: "Iraqi Food, Halal Bakery & Catering — Serving DFW",
      body: 1,
      buttons: ["View Full Menu", "ghost:Catering Inquiries"],
    },
    {
      id: "cities",
      kind: "grid",
      label: "City cards (×10)",
      cols: 3,
      items: 9,
      image: false,
      itemLabel: "CITY",
      source: "neighborhoods.ts → NEIGHBORHOODS",
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
      title: "Hub hero",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "brand", text: "Areas = `RESTAURANT.areasServed`" },
        { sys: "seo", text: "`createMetadata()` (DFW keywords)" },
      ],
    },
    {
      id: "n-cities",
      anchor: "cities",
      side: "right",
      title: "City cards = parent",
      lines: [
        { sys: "product", text: "One card per `NEIGHBORHOODS` entry" },
        { sys: "brand", text: "state · `driveTime` · `intro` per city" },
        { sys: "layout", text: "Link → `/near/[slug]/`" },
      ],
    },
    {
      id: "n-schema",
      anchor: "cities",
      side: "left",
      title: "Hub SEO",
      lines: [
        { sys: "seo", text: "`ItemList` of all service areas" },
        { sys: "layout", text: "`generateStaticParams()` pre-renders each" },
        { sys: "color", text: "MapPin icon `--color-primary`" },
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
