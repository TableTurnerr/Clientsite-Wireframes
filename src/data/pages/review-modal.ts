import type { WireframePage } from "@/canvas/types";

// Overlay (not a route): ReviewModal is gated by Cloudflare Turnstile and
// POSTs user-generated reviews to the TableTurnerr ParentSite endpoint.
export const reviewModal: WireframePage = {
  id: "review-modal",
  title: "Review Modal",
  route: "(overlay on any page)",
  group: "Shared Chrome & States",
  blurb: "Turnstile-gated review submission overlay — POSTs to the ParentSite review API.",
  width: 380,
  sections: [
    {
      id: "trigger",
      kind: "text",
      label: "Opens from",
      heading: "Triggered from Reviews / Header",
      body: 1,
    },
    {
      id: "mod",
      kind: "modal",
      label: "ReviewModal",
      heading: "Share your experience",
      variant: "Cloudflare Turnstile",
      items: 4,
      buttons: ["Submit Review"],
    },
  ],
  notes: [
    {
      id: "n-trigger",
      anchor: "trigger",
      side: "left",
      title: "Open triggers",
      lines: [
        { sys: "layout", text: "Opened from homepage `Reviews` (\"Leave a Review\")" },
        { sys: "layout", text: "`\"use client\"` overlay — portal over current page" },
      ],
    },
    {
      id: "n-brand",
      anchor: "trigger",
      side: "left",
      title: "Modal brand",
      lines: [
        { sys: "brand", text: "Header title brand = `RESTAURANT.name`" },
        { sys: "color", text: "Heading `--font-accent`, `--color-text`" },
      ],
    },
    {
      id: "n-gate",
      anchor: "mod",
      side: "right",
      title: "Anti-spam gate",
      lines: [
        { sys: "product", text: "`ReviewModal` gated by `Turnstile`" },
        { sys: "product", text: "Site key `NEXT_PUBLIC_TURNSTILE_SITE_KEY`" },
        { sys: "product", text: "Test key `1x00000000000000000000AA` always passes" },
      ],
    },
    {
      id: "n-submit",
      anchor: "mod",
      side: "right",
      title: "Submit → ParentSite API",
      lines: [
        { sys: "product", text: "POSTs to `NEXT_PUBLIC_REVIEW_API_URL`" },
        { sys: "product", text: "Auth header `NEXT_PUBLIC_REVIEW_API_KEY`" },
        { sys: "product", text: "Target = TableTurnerr ParentSite endpoint" },
      ],
    },
    {
      id: "n-fields",
      anchor: "mod",
      side: "left",
      title: "Form fields & style",
      lines: [
        { sys: "layout", text: "Fields = name, rating (stars), review text" },
        { sys: "color", text: "Submit `.btn-primary`, stars `--color-gold`" },
      ],
    },
    {
      id: "n-schema",
      anchor: "mod",
      side: "right",
      title: "No schema here",
      lines: [
        { sys: "seo", text: "NO JSON-LD — user-generated, post-load only" },
        { sys: "seo", text: "Aggregate rating lives in `restaurantSchema()`, not here" },
      ],
    },
  ],
};
