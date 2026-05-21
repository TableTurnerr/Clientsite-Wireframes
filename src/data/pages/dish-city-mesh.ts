import type { WireframePage } from "@/canvas/types";

// PLANNED (not built yet): the dish × city mesh.
// 10 NEIGHBORHOODS × 7 DISHES = 70 hyper-local pages, gated by MATRIX_ALLOWLIST.
export const dishCityMesh: WireframePage = {
  id: "dish-city-mesh",
  title: "Dish × City (planned)",
  route: "/[dish]-in-[city]/",
  group: "Dynamic SEO Templates",
  blurb: "PLANNED mesh: DISHES × NEIGHBORHOODS = 70 pages, gated by MATRIX_ALLOWLIST.",
  width: 400,
  sections: [
    { id: "hdr", kind: "header", label: "Header (global)", heading: "Al-Baghdady", buttons: ["Order Online"], items: 6 },
    {
      id: "bc",
      kind: "breadcrumb",
      label: "BreadcrumbNav",
      chips: ["Home", "Baklava in Plano"],
    },
    {
      id: "hero",
      kind: "hero",
      label: "Mesh Hero",
      accent: "sand",
      eyebrow: "PLANNED MESH PAGE",
      heading: "Baklava in Plano",
      body: 1,
      buttons: ["View Menu", "ghost:Order Online"],
    },
    {
      id: "intro",
      kind: "text",
      label: "Intro block",
      heading: "Fresh baklava, delivered to Plano",
      body: 4,
    },
    {
      id: "related",
      kind: "cards",
      label: "Order this dish",
      heading: "Order baklava",
      cols: 3,
      items: 3,
      itemLabel: "DISH",
      source: "DISHES × NEIGHBORHOODS (gated by MATRIX_ALLOWLIST) → MENU",
    },
    {
      id: "faq",
      kind: "faq",
      label: "Hyper-local FAQs",
      heading: "Baklava in Plano — FAQs",
      items: 3,
    },
    {
      id: "cta",
      kind: "cta",
      label: "Conversion band",
      accent: "primary",
      heading: "Order baklava to Plano",
      buttons: ["Order Online", "gold:Call"],
    },
    {
      id: "loc",
      kind: "map",
      label: "OurLocation",
      heading: "A short drive away",
      body: 2,
      buttons: ["Directions"],
    },
    { id: "ftr", kind: "footer", label: "Footer (global)", heading: "Al-Baghdady" },
  ],
  notes: [
    {
      id: "n-planned",
      anchor: "hero",
      side: "right",
      title: "PLANNED — not built yet",
      lines: [
        { sys: "layout", text: "Future route `/[dish]-in-[city]/page.tsx`" },
        { sys: "layout", text: "10 cities × 7 dishes = 70 pages" },
        { sys: "layout", text: "`generateStaticParams()` over the matrix" },
      ],
    },
    {
      id: "n-matrix",
      anchor: "related",
      side: "right",
      title: "Products = dish × city",
      lines: [
        { sys: "product", text: "Reads `DISHES` × `NEIGHBORHOODS`" },
        { sys: "product", text: "Gated by `MATRIX_ALLOWLIST` (only approved pairs render)" },
        { sys: "product", text: "Cards resolve dish → `menu.ts` → `MENU`" },
      ],
    },
    {
      id: "n-dish",
      anchor: "hero",
      side: "left",
      title: "Dish + city variables",
      lines: [
        { sys: "product", text: "Product = dish var (Baklava, Kanafa, Samoon…)" },
        { sys: "brand", text: "City = `neighborhood` var (`NEIGHBORHOODS`)" },
        { sys: "color", text: "Eyebrow `--color-primary`, bg `--color-sand`" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [
        { sys: "seo", text: "Auto-injects `BreadcrumbList` JSON-LD" },
        { sys: "brand", text: "Crumb = `<dish> in <city>`" },
      ],
    },
    {
      id: "n-intro",
      anchor: "intro",
      side: "left",
      title: "Body copy",
      lines: [
        { sys: "brand", text: "Composed from dish + `neighborhood.driveTime`" },
        { sys: "color", text: "Heading `--font-accent`" },
      ],
    },
    {
      id: "n-seo",
      anchor: "faq",
      side: "right",
      title: "Hyper-local SEO",
      lines: [
        { sys: "seo", text: "`createMetadata()` = `<dish> in <city>` title/desc" },
        { sys: "seo", text: "`LocalBusiness` + `BreadcrumbList` JSON-LD" },
        { sys: "seo", text: "FAQs → `FAQPage` schema per pair" },
      ],
    },
    {
      id: "n-cta",
      anchor: "cta",
      side: "left",
      title: "Conversion band",
      lines: [
        { sys: "color", text: "`.btn-primary` + `.btn-gold` (`--color-gold`)" },
        { sys: "brand", text: "Order = `RESTAURANT.orderOnline`, phone = `RESTAURANT.phone`" },
      ],
    },
    {
      id: "n-loc",
      anchor: "loc",
      side: "right",
      title: "OurLocation",
      lines: [
        { sys: "brand", text: "Shared `RESTAURANT.address` / `geo`" },
        { sys: "seo", text: "`LocalBusiness` with `areaServed` = city" },
      ],
    },
  ],
};
