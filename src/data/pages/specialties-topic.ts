import type { WireframePage } from "@/canvas/types";

// Mirrors src/app/specialties/[topic]/page.tsx. ONE file renders all 11 topics.
// 2-col hero (text + image) → warm-white primaryBlock → "On the menu" related
// items → PickupDeliveryCTA → per-topic FAQ → closing button row.
export const specialtiesTopic: WireframePage = {
  id: "specialties-topic",
  title: "Topic (template)",
  route: "/specialties/[topic]/",
  group: "Dynamic SEO Templates",
  blurb: "Specialty page. generateStaticParams() → 1 per topic.",
  width: 400,
  sections: [
    { id: "hdr", kind: "header", label: "Header (global)", heading: "Al-Baghdady", buttons: ["Order Online"], items: 6 },
    {
      id: "bc",
      kind: "breadcrumb",
      label: "BreadcrumbNav",
      chips: ["Home", "Specialties", "Baklava"],
    },
    {
      id: "hero",
      kind: "hero",
      label: "Topic hero (text + image)",
      variant: "topic",
      eyebrow: "OUR FLAGSHIP",
      heading: "Authentic baklava in Richardson, TX",
      body: 1,
      image: true,
      buttons: ["View Full Menu", "ghost:Order Online"],
    },
    {
      id: "primary",
      kind: "text",
      label: "primaryBlock",
      accent: "sand",
      heading: "Indulge in 100-Year-Old Iraqi Baklava",
      body: 3,
    },
    {
      id: "related",
      kind: "cards",
      label: "On the menu",
      heading: "On the menu",
      cols: 3,
      items: 3,
      itemLabel: "ITEM",
      source: "specialty.relatedMenuItemNames → MENU",
    },
    {
      id: "pickup",
      kind: "cta",
      label: "PickupDeliveryCTA",
      heading: "Order baklava for pickup or delivery",
      body: 1,
      buttons: ["Order Online", "gold:Call"],
    },
    {
      id: "faq",
      kind: "faq",
      label: "FAQSection (per topic)",
      heading: "Frequently asked questions.",
      items: 4,
      source: "specialty.faqs",
    },
    {
      id: "endcta",
      kind: "cta",
      label: "Closing button row",
      buttons: ["View Full Menu", "ghost:Order Online", "gold:Call Us"],
    },
    { id: "ftr", kind: "footer", label: "Footer (global)", heading: "Al-Baghdady" },
  ],
  notes: [
    {
      id: "n-route",
      anchor: "hero",
      side: "right",
      title: "Dynamic route",
      lines: [
        { sys: "layout", text: "One file = `/specialties/[topic]/page.tsx`" },
        { sys: "layout", text: "`generateStaticParams()` reads `SPECIALTIES`" },
        { sys: "brand", text: "`heroEyebrow` / `heroHeadline` / `heroSubheadline`" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [
        { sys: "seo", text: "`breadcrumbSchema()` (3 crumbs)" },
        { sys: "brand", text: "Last crumb = `specialty.name`" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "left",
      title: "Topic hero",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "brand", text: "Image = `specialty.image`" },
        { sys: "seo", text: "`createMetadata()` from `metaTitle`/`keywords`" },
      ],
    },
    {
      id: "n-primary",
      anchor: "primary",
      side: "left",
      title: "primaryBlock",
      lines: [
        { sys: "brand", text: "`primaryBlock.heading` + `.body`" },
        { sys: "color", text: "Block bg `--color-warm-white`" },
      ],
    },
    {
      id: "n-related",
      anchor: "related",
      side: "right",
      title: "Products = parent → child",
      lines: [
        { sys: "product", text: "`specialty.relatedMenuItemNames` (string keys)" },
        { sys: "product", text: "Resolved against `menu.ts` → `MENU`" },
        { sys: "seo", text: "Emits `ItemList` of MenuItems" },
      ],
    },
    {
      id: "n-faq",
      anchor: "faq",
      side: "right",
      title: "Per-topic FAQ",
      lines: [
        { sys: "product", text: "`specialty.faqs` (optional)" },
        { sys: "seo", text: "`faqSchema()` → FAQPage (only if present)" },
      ],
    },
    {
      id: "n-pickup",
      anchor: "pickup",
      side: "left",
      title: "PickupDeliveryCTA",
      lines: [
        { sys: "layout", text: "Shared `<PickupDeliveryCTA itemName={…} />`" },
        { sys: "brand", text: "Order = `RESTAURANT.orderOnline`" },
      ],
    },
  ],
};
