import type { WireframePage } from "@/canvas/types";

// Shared chrome: <Header> renders on EVERY page (not a route of its own).
// "use client" — sticky bar, mobile drawer, QR hover. Re-skin via RESTAURANT.
export const header: WireframePage = {
  id: "header",
  title: "Header",
  route: "/ · global",
  group: "Shared Chrome & States",
  blurb: "Sticky global header — logo, static nav (trailing-slash links), QR hover, Order CTA.",
  width: 440,
  sections: [
    {
      id: "bar",
      kind: "header",
      label: "Header (global)",
      heading: "Al-Baghdady",
      items: 7,
      buttons: ["Order Online"],
    },
    {
      id: "nav",
      kind: "tabs",
      label: "Nav routes (trailing slash)",
      chips: [
        "Menu",
        "Bakery",
        "Catering",
        "Iraqi Cuisine",
        "Our Story",
        "Service Areas",
        "Specialties",
      ],
      chipStyle: "plain",
    },
    {
      id: "drawer",
      kind: "modal",
      label: "Mobile drawer",
      heading: "Mobile menu",
      variant: "Mobile drawer",
      items: 4,
      buttons: ["Order Online"],
    },
  ],
  notes: [
    {
      id: "n-bar",
      anchor: "bar",
      side: "left",
      title: "Global Header",
      lines: [
        { sys: "layout", text: "Shared `<Header>` renders on every page" },
        { sys: "layout", text: "Sticky + `\"use client\"` (scroll state, drawer)" },
        { sys: "color", text: "Bar bg `#fff`, links `--color-text`" },
      ],
    },
    {
      id: "n-logo",
      anchor: "bar",
      side: "left",
      title: "Brand logo",
      lines: [
        { sys: "brand", text: "Logo / wordmark = `RESTAURANT.name`" },
        { sys: "color", text: "Wordmark `--font-accent`, `--color-primary`" },
      ],
    },
    {
      id: "n-cta",
      anchor: "bar",
      side: "right",
      title: "Order CTA + QR",
      lines: [
        { sys: "brand", text: "Order button href = `RESTAURANT.orderOnline`" },
        { sys: "brand", text: "`QRHover` = \"scan to view menu/order\"" },
        { sys: "brand", text: "Tel link = `RESTAURANT.phone`" },
        { sys: "color", text: "CTA `.btn-primary`, gold accent `--color-gold`" },
      ],
    },
    {
      id: "n-nav",
      anchor: "nav",
      side: "right",
      title: "Nav = static route list",
      lines: [
        { sys: "layout", text: "Hardcoded route list (not data-driven)" },
        { sys: "layout", text: "Links MUST use trailing slash, e.g. `/menu/`" },
        { sys: "color", text: "Link hover `--color-text` → `--color-primary`" },
      ],
    },
    {
      id: "n-drawer",
      anchor: "drawer",
      side: "left",
      title: "Mobile drawer",
      lines: [
        { sys: "layout", text: "Same routes collapse into a slide-in drawer" },
        { sys: "layout", text: "Toggle is client state (`\"use client\"`)" },
      ],
    },
    {
      id: "n-drawer-cta",
      anchor: "drawer",
      side: "right",
      title: "Drawer CTA",
      lines: [
        { sys: "brand", text: "Drawer footer repeats `RESTAURANT.orderOnline`" },
        { sys: "color", text: "Full-width `.btn-primary`" },
      ],
    },
  ],
};
