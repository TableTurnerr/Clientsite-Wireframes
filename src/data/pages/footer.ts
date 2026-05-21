import type { WireframePage } from "@/canvas/types";

// Shared chrome: <Footer> renders on EVERY page. NAP, hours, socials and
// blurb are all driven from RESTAURANT — re-skin once, propagates everywhere.
export const footer: WireframePage = {
  id: "footer",
  title: "Footer",
  route: "/ · global",
  group: "Shared Chrome & States",
  blurb: "Global footer — NAP, hours, social icon set, blurb, legal row. All from the data layer.",
  width: 440,
  sections: [
    {
      id: "main",
      kind: "footer",
      label: "Footer (global)",
      heading: "Al-Baghdady",
    },
    {
      id: "legal",
      kind: "text",
      label: "Legal row",
      body: 1,
      chips: ["Return Policy", "Sitemap", "© 2026 Al-Baghdady"],
      chipStyle: "plain",
    },
  ],
  notes: [
    {
      id: "n-main",
      anchor: "main",
      side: "left",
      title: "Global Footer",
      lines: [
        { sys: "layout", text: "Shared `<Footer>` renders on every page" },
        { sys: "color", text: "Bg `--color-sand`, accents `--color-primary` / `--color-gold`" },
      ],
    },
    {
      id: "n-nap",
      anchor: "main",
      side: "left",
      title: "NAP + hours",
      lines: [
        { sys: "brand", text: "NAP = `RESTAURANT.address` / `phone` / `email`" },
        { sys: "brand", text: "Hours grid from `RESTAURANT.hours`" },
      ],
    },
    {
      id: "n-socials",
      anchor: "main",
      side: "right",
      title: "Social icons = a variable SET",
      lines: [
        { sys: "brand", text: "Icons map `RESTAURANT.socials.{instagram,facebook}`" },
        { sys: "brand", text: "…plus `.googleBusinessProfile` / `.googleReview`" },
        { sys: "layout", text: "Add/remove a social = edit this one object" },
      ],
    },
    {
      id: "n-blurb",
      anchor: "main",
      side: "left",
      title: "Brand blurb",
      lines: [
        { sys: "brand", text: "Paragraph = `RESTAURANT.footerDescription`" },
      ],
    },
    {
      id: "n-consolidate",
      anchor: "main",
      side: "right",
      title: "Brand consolidation",
      lines: [
        { sys: "seo", text: "`organizationSchema().alternateName` carries legacy brand variants" },
        { sys: "seo", text: "One domain / one brand → consolidates authority" },
      ],
    },
    {
      id: "n-legal",
      anchor: "legal",
      side: "right",
      title: "Legal row",
      lines: [
        { sys: "layout", text: "Links `/return-policy/` + sitemap (trailing slash)" },
        { sys: "seo", text: "Sitemap auto-generated at build from the data layer" },
        { sys: "color", text: "Muted text `--color-text-muted`, border `--color-border`" },
      ],
    },
  ],
};
