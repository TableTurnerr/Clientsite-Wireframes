import type { WireframePage } from "@/canvas/types";

// Mirrors src/app/specialties/page.tsx: text hero + a 3-col grid of 11 specialty
// cards (image + heroEyebrow + name + body + "Learn more"), then a button CTA.
export const specialtiesHub: WireframePage = {
  id: "specialties-hub",
  title: "Specialties",
  route: "/specialties/",
  group: "Dynamic SEO Templates",
  blurb: "Hub linking to all 11 /specialties/[topic]/ pages.",
  width: 400,
  sections: [
    { id: "hdr", kind: "header", label: "Header (global)", heading: "Al-Baghdady", buttons: ["Order Online"], items: 6 },
    { id: "bc", kind: "breadcrumb", label: "BreadcrumbNav", chips: ["Home", "Specialties"] },
    {
      id: "hero",
      kind: "hero",
      label: "Specialties hero (text)",
      eyebrow: "OUR CRAFT",
      heading: "Our Iraqi Bakery & Breakfast Specialties",
      body: 1,
    },
    {
      id: "grid",
      kind: "cards",
      label: "Specialty cards (×11)",
      cols: 3,
      items: 9,
      itemLabel: "TOPIC",
      source: "specialties.ts → SPECIALTIES",
    },
    {
      id: "cta",
      kind: "cta",
      label: "Button CTA band",
      buttons: ["View Full Menu", "ghost:Order Online"],
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
        { sys: "brand", text: "“since” date = `RESTAURANT.familyRecipeSince`" },
        { sys: "seo", text: "`createMetadata()`" },
      ],
    },
    {
      id: "n-grid",
      anchor: "grid",
      side: "right",
      title: "Specialty cards = parent",
      lines: [
        { sys: "product", text: "One card per `SPECIALTIES` entry" },
        { sys: "brand", text: "image · `heroEyebrow` · name · `primaryBlock.body`" },
        { sys: "layout", text: "Link → `/specialties/[slug]/`" },
      ],
    },
    {
      id: "n-schema",
      anchor: "grid",
      side: "left",
      title: "Hub SEO",
      lines: [
        { sys: "seo", text: "`ItemList` of all specialties" },
        { sys: "layout", text: "`generateStaticParams()` pre-renders each" },
      ],
    },
    {
      id: "n-cta",
      anchor: "cta",
      side: "left",
      title: "CTA band",
      lines: [
        { sys: "color", text: "`.btn-primary` + `.btn-secondary`" },
        { sys: "brand", text: "Order = `RESTAURANT.orderOnline`" },
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
