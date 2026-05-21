/**
 * Hero dishes for the city × dish mesh route (`/[dish]-in-[city]/`).
 *
 * The 7 candidates below come from the 2026-05-18 brief and are PENDING
 * client confirmation on Tuesday 2026-05-19. Once confirmed:
 *   - Fill `intro` and `body` with copy from docs/content-source.md
 *   - Confirm `heroImage` paths against /public/Images/specialties/ or /public/Images/gallery/
 *   - Populate `keywords` per dish (mirror the NEIGHBORHOODS keyword shape — long-tail, city-agnostic)
 *
 * Do NOT use this list to add menu items — the bakery/breakfast menu in `menu.ts` is the
 * authoritative serving list. These entries are SEO/content surfaces only.
 */

export type Dish = {
  slug: string;
  name: string;
  /** Alternate spellings and English-equivalents — used in copy and JSON-LD `alternateName`. */
  aliases: string[];
  /** Path under /public/. TODO Tuesday: confirm or swap to /Images/specialties/<slug>.webp. */
  heroImage: string;
  /** Long-tail keywords, city-agnostic. Combined with the city-axis keyword at render time. */
  keywords: string[];
  /** Short paragraph used as the meta description seed and intro lede. */
  intro: string;
  /** Slug of the canonical `/specialties/[topic]/` page this dish maps to, if any. */
  relatedSpecialtySlug?: string;
  /** Names of menu items in `menu.ts` that should appear in the related-items section. */
  relatedMenuItemNames?: string[];
};

export const DISHES: Dish[] = [
  {
    slug: "baklava",
    name: "Baklava",
    aliases: ["Baqlawa", "Iraqi Baklava", "Arabic Baklava"],
    heroImage: "/Images/specialties/baklava.webp",
    keywords: [],
    intro: "",
    relatedSpecialtySlug: "baklava",
  },
  {
    slug: "kanafa",
    name: "Kanafa",
    aliases: ["Kunafa", "Kunafeh", "Knafeh", "Kanafeh"],
    heroImage: "/Images/gallery/kunafa.webp",
    keywords: [],
    intro: "",
    relatedSpecialtySlug: "kunafa",
  },
  {
    slug: "kahi-and-qeimar",
    name: "Kahi & Qeimar",
    aliases: ["Kahi w Qeimar", "Khagineh", "Iraqi Cream Pastry"],
    heroImage: "/Images/gallery/kahi.webp",
    keywords: [],
    intro: "",
    relatedSpecialtySlug: "breakfast",
  },
  {
    slug: "mabrouma",
    name: "Mabrouma",
    aliases: ["Mabroumeh", "Rolled Baklava", "Pistachio Mabrouma"],
    heroImage: "/Images/gallery/mabrouma.webp",
    keywords: [],
    intro: "",
    relatedSpecialtySlug: "baklava",
  },
  {
    slug: "samoon",
    name: "Samoon",
    aliases: ["Iraqi Bread", "Tandoor Bread", "Samoun"],
    heroImage: "/Images/gallery/samoon.webp",
    keywords: [],
    intro: "",
    relatedSpecialtySlug: "bread",
  },
  {
    slug: "manakish",
    name: "Manakish",
    aliases: ["Manakeesh", "Manaeesh", "Za'atar Flatbread"],
    heroImage: "/Images/gallery/manakish.webp",
    keywords: [],
    intro: "",
    relatedSpecialtySlug: "manakish",
  },
  {
    slug: "fatayer",
    name: "Fatayer",
    aliases: ["Fatayir", "Sfeeha", "Iraqi Hand Pies"],
    heroImage: "/Images/gallery/fatayer.webp",
    keywords: [],
    intro: "",
    relatedSpecialtySlug: "fatayer",
  },
];

export const DISH_SLUGS = DISHES.map((d) => d.slug);
