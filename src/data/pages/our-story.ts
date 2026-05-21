import type { WireframePage } from "@/canvas/types";

// Mirrors src/app/our-story/page.tsx: a single editorial article — eyebrow + H1,
// one wide hero image, then long prose (6 H2 sections), then two buttons.
// No stat band, no gallery, no split.
export const ourStory: WireframePage = {
  id: "our-story",
  title: "Our Story",
  route: "/our-story/",
  group: "Core Pages",
  blurb: "Brand-story article. Editorial prose driven by RESTAURANT dates.",
  width: 400,
  sections: [
    { id: "hdr", kind: "header", label: "Header (global)", heading: "Al-Baghdady", buttons: ["Order Online"], items: 6 },
    { id: "bc", kind: "breadcrumb", label: "BreadcrumbNav", chips: ["Home", "Our Story"] },
    {
      id: "hero",
      kind: "hero",
      label: "Story hero + wide image",
      variant: "wide",
      eyebrow: "OUR STORY",
      heading: "The 100-Year Story of Dallas's Best Iraqi Bakery & Breakfast Café",
      body: 1,
      image: true,
    },
    {
      id: "article",
      kind: "text",
      label: "Article prose (×6 H2 sections)",
      heading: "It All Started in Baghdad, 1919",
      body: 6,
      buttons: ["See the Menu", "ghost:Catering Inquiries"],
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
      title: "Story hero",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "brand", text: "Dates = `RESTAURANT.founded` / `familyRecipeSince`" },
        { sys: "layout", text: "Wide 16:9 `SmartImage` (priority)" },
      ],
    },
    {
      id: "n-seo",
      anchor: "hero",
      side: "left",
      title: "Page-level SEO",
      lines: [
        { sys: "seo", text: "`articleSchema()` (author: Salah Hassan)" },
        { sys: "seo", text: "`webPageSchema()` + `createMetadata()`" },
      ],
    },
    {
      id: "n-article",
      anchor: "article",
      side: "right",
      title: "Editorial prose",
      lines: [
        { sys: "brand", text: "Hand-written copy — not data-driven" },
        { sys: "layout", text: "6 H2 sections (Baghdad 1919 → today)" },
        { sys: "color", text: "Body `--color-text`, `--font-accent` subheads" },
      ],
    },
    {
      id: "n-cta",
      anchor: "article",
      side: "left",
      title: "Closing CTAs",
      lines: [
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
