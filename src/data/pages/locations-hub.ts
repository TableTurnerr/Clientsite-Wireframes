import type { WireframePage } from "@/canvas/types";

// NEW multi-location extension: the single RESTAURANT object becomes LOCATIONS[].
// This hub lists every branch; each branch links to /locations/[location]/.
export const locationsHub: WireframePage = {
  id: "locations-hub",
  title: "Locations",
  route: "/locations/",
  group: "Multi-Location",
  blurb: "NEW branch hub. Lists every entry in LOCATIONS[] (multi-location template).",
  width: 400,
  sections: [
    { id: "hdr", kind: "header", label: "Header (global)", heading: "Al-Baghdady", buttons: ["Order Online"], items: 6 },
    {
      id: "bc",
      kind: "breadcrumb",
      label: "BreadcrumbNav",
      chips: ["Home", "Locations"],
    },
    {
      id: "hero",
      kind: "hero",
      label: "Locations Hero",
      accent: "primary",
      eyebrow: "OUR LOCATIONS",
      heading: "Visit Us",
      body: 2,
    },
    {
      id: "intro",
      kind: "text",
      label: "Intro block",
      body: 2,
    },
    {
      id: "branches",
      kind: "locationcard",
      label: "Branch list",
      heading: "Choose a location",
      items: 3,
      cols: 1,
      itemLabel: "Branch",
      source: "locations.ts → LOCATIONS[] (NEW)",
    },
    {
      id: "allmap",
      kind: "map",
      label: "All-locations map",
      heading: "All locations",
      body: 2,
      buttons: ["Get Directions"],
    },
    {
      id: "cta",
      kind: "cta",
      label: "Conversion band",
      accent: "primary",
      heading: "Order from your nearest branch",
      buttons: ["Order Online", "gold:Call"],
    },
    { id: "ftr", kind: "footer", label: "Footer (global)", heading: "Al-Baghdady" },
  ],
  notes: [
    {
      id: "n-new",
      anchor: "hero",
      side: "right",
      title: "NEW — multi-location",
      lines: [
        { sys: "layout", text: "Al-Baghdady is single-location today; this is the extension" },
        { sys: "brand", text: "Single `RESTAURANT` object becomes `LOCATIONS[]`" },
        { sys: "brand", text: "New data file `locations.ts`" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "left",
      title: "Locations Hero",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, bg `--color-primary` tint" },
        { sys: "color", text: "H1 `--font-accent`" },
        { sys: "seo", text: "`createMetadata()` → title/desc/canonical" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [
        { sys: "seo", text: "Auto-injects `BreadcrumbList` JSON-LD" },
        { sys: "brand", text: "Last crumb = \"Locations\"" },
      ],
    },
    {
      id: "n-branches",
      anchor: "branches",
      side: "right",
      title: "Branches = parent → child",
      lines: [
        { sys: "product", text: "Source of truth: `locations.ts` → `LOCATIONS[]`" },
        { sys: "brand", text: "Each card: `LOCATIONS[i].name` / `address` / `hours`" },
        { sys: "layout", text: "`generateStaticParams()` over `LOCATIONS` builds child pages" },
        { sys: "color", text: "Card `.card`, accents `--color-primary`" },
      ],
    },
    {
      id: "n-schema",
      anchor: "branches",
      side: "left",
      title: "Per-branch schema",
      lines: [
        { sys: "seo", text: "Each branch emits its OWN `LocalBusiness`" },
        { sys: "seo", text: "Distinct `geo` per `LOCATIONS[i].geo`" },
      ],
    },
    {
      id: "n-allmap",
      anchor: "allmap",
      side: "right",
      title: "All-locations map",
      lines: [
        { sys: "brand", text: "Pins from every `LOCATIONS[i].geo`" },
        { sys: "brand", text: "Address labels = `LOCATIONS[i].address`" },
      ],
    },
    {
      id: "n-cta",
      anchor: "cta",
      side: "left",
      title: "Conversion band",
      lines: [
        { sys: "color", text: "`.btn-primary` + `.btn-gold` (`--color-gold`)" },
        { sys: "brand", text: "Phone = nearest `LOCATIONS[i].phone`" },
      ],
    },
  ],
};
