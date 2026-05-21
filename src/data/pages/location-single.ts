import type { WireframePage } from "@/canvas/types";

// NEW multi-location template: ONE file renders every branch page.
// generateStaticParams() pre-renders 1 per entry in LOCATIONS[].
export const locationSingle: WireframePage = {
  id: "location-single",
  title: "Location (template)",
  route: "/locations/[location]/",
  group: "Multi-Location",
  blurb: "NEW branch page. One file renders every entry in LOCATIONS[] with its own NAP.",
  width: 400,
  sections: [
    { id: "hdr", kind: "header", label: "Header (global)", heading: "Al-Baghdady", buttons: ["Order Online"], items: 6 },
    {
      id: "bc",
      kind: "breadcrumb",
      label: "BreadcrumbNav",
      chips: ["Home", "Locations", "Plano"],
    },
    {
      id: "hero",
      kind: "hero",
      label: "Branch Hero",
      accent: "sand",
      heading: "Al-Baghdady — Plano",
      body: 1,
      buttons: ["Order Online", "ghost:Directions"],
    },
    {
      id: "loc",
      kind: "map",
      label: "Branch location",
      heading: "Address & directions",
      body: 3,
      buttons: ["Get Directions"],
    },
    {
      id: "hours",
      kind: "list",
      label: "Hours & features",
      heading: "Hours & features",
      items: 5,
      image: false,
    },
    {
      id: "menu",
      kind: "cards",
      label: "Order from this branch",
      heading: "Order from this location",
      cols: 3,
      items: 3,
      itemLabel: "DISH",
      source: "menu.ts → MENU (+ branch.orderOnline)",
    },
    {
      id: "reviews",
      kind: "reviews",
      label: "Reviews",
      heading: "What guests say",
      items: 3,
    },
    {
      id: "cta",
      kind: "cta",
      label: "Conversion band",
      accent: "primary",
      heading: "Order from Plano",
      buttons: ["Order Online", "gold:Call"],
    },
    { id: "ftr", kind: "footer", label: "Footer (global)", heading: "Al-Baghdady" },
  ],
  notes: [
    {
      id: "n-route",
      anchor: "hero",
      side: "right",
      title: "Dynamic route (NEW)",
      lines: [
        { sys: "layout", text: "One file = `/locations/[location]/page.tsx`" },
        { sys: "layout", text: "`generateStaticParams()` reads `LOCATIONS`" },
        { sys: "brand", text: "Heading = `LOCATIONS[i].name`" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "left",
      title: "Branch Hero",
      lines: [
        { sys: "color", text: "Bg `--color-sand`, H1 `--font-accent`" },
        { sys: "brand", text: "Order CTA = `LOCATIONS[i].orderOnline` (branch-specific)" },
        { sys: "seo", text: "`createMetadata()` per location title/desc" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [
        { sys: "seo", text: "Auto-injects `BreadcrumbList` JSON-LD" },
        { sys: "brand", text: "Last crumb = `LOCATIONS[i].name`" },
      ],
    },
    {
      id: "n-loc",
      anchor: "loc",
      side: "right",
      title: "Per-branch location",
      lines: [
        { sys: "brand", text: "`LOCATIONS[i].address` / `geo` / `phone`" },
        { sys: "seo", text: "Own `LocalBusiness` + `geo` + `openingHours` schema" },
      ],
    },
    {
      id: "n-hours",
      anchor: "hours",
      side: "left",
      title: "Hours & features",
      lines: [
        { sys: "brand", text: "Rows = `LOCATIONS[i].hours`" },
        { sys: "brand", text: "Badges = `LOCATIONS[i].features`" },
      ],
    },
    {
      id: "n-menu",
      anchor: "menu",
      side: "right",
      title: "Products = shared parent",
      lines: [
        { sys: "product", text: "Cards still from shared `menu.ts` → `MENU`" },
        { sys: "brand", text: "Order link points at `LOCATIONS[i].orderOnline`" },
        { sys: "layout", text: "Menu is shared; only the order target differs per branch" },
      ],
    },
    {
      id: "n-cta",
      anchor: "cta",
      side: "left",
      title: "Conversion band",
      lines: [
        { sys: "color", text: "`.btn-gold` CTA (`--color-gold`)" },
        { sys: "brand", text: "Phone = `LOCATIONS[i].phone`" },
      ],
    },
  ],
};
