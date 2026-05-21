import type { WireframePage } from "@/canvas/types";

// Legal / policy template. Almost entirely hardcoded prose — the only
// re-skinnable hooks are the brand contact vars and page metadata.
export const returnPolicy: WireframePage = {
  id: "return-policy",
  title: "Return Policy",
  route: "/return-policy/",
  group: "Core Pages",
  blurb: "Static legal/policy page — hardcoded copy, brand contact, minimal schema.",
  width: 380,
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
      chips: ["Home", "Return Policy"],
    },
    {
      id: "hero",
      kind: "hero",
      label: "Policy Hero",
      accent: "sand",
      heading: "Return & Refund Policy",
      body: 1,
    },
    {
      id: "policy",
      kind: "text",
      label: "Policy body",
      heading: "Our policy",
      body: 6,
    },
    {
      id: "perishable",
      kind: "text",
      label: "Perishable clause",
      heading: "Perishable & custom orders",
      body: 4,
    },
    {
      id: "contact",
      kind: "text",
      label: "Contact block",
      heading: "Questions?",
      body: 2,
      buttons: ["Call Us", "ghost:Email"],
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
        { sys: "seo", text: "Minimal schema: `webPageSchema()` (`WebPage`) only" },
        { sys: "seo", text: "No product/menu schema — informational page" },
        { sys: "color", text: "Hero tint bg `--color-sand`" },
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
      id: "n-policy",
      anchor: "policy",
      side: "left",
      title: "Hardcoded legal copy",
      lines: [
        { sys: "layout", text: "Body text is hardcoded JSX — NOT data-driven" },
        { sys: "layout", text: "Reused as-is across clients; edit per legal review" },
        { sys: "color", text: "Body `--color-text-muted`, inline links `--color-primary`" },
      ],
    },
    {
      id: "n-perishable",
      anchor: "perishable",
      side: "right",
      title: "Perishable clause",
      lines: [
        { sys: "layout", text: "Food-specific carve-out (no returns on perishables)" },
        { sys: "brand", text: "Mentions custom-order policy → `/catering/`" },
      ],
    },
    {
      id: "n-contact",
      anchor: "contact",
      side: "left",
      title: "Contact block",
      lines: [
        { sys: "brand", text: "Call = `RESTAURANT.phone`" },
        { sys: "brand", text: "Email = `RESTAURANT.email`" },
        { sys: "color", text: "Primary `.btn-primary`, ghost `--color-border`" },
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
