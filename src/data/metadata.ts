import type { Metadata } from "next";
import { RESTAURANT } from "./restaurant";

const BASE_URL = RESTAURANT.url;
// TODO: replace with dedicated 1200×630 OG card when client provides a branded version.
const DEFAULT_OG = `${BASE_URL}/Images/hero.webp`;

export type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
  noindex?: boolean;
};

const BASE_KEYWORDS = [
  // Brand variants
  "albaghdady",
  "al-baghdady",
  "al baghdady",
  "al-baghdady bakery",
  "al baghdady bakery and cafe",
  "al baghdady richardson",

  // Bakery + halal (local intent)
  "iraqi bakery Richardson TX",
  "iraqi bakery Dallas",
  "halal bakery Richardson TX",
  "halal bakery Dallas",
  "halal bakery near me",
  "arabic bakery Richardson",
  "middle eastern bakery Dallas",
  "halal cake shop near me",
  "zabihah verified Richardson",

  // Cafe
  "iraqi cafe Richardson TX",
  "middle eastern cafe Dallas",
  "arabic cafe Richardson",
  "halal cafe near me",
  "baghdadi cafe Texas",

  // Breakfast + catering
  "iraqi breakfast Richardson",
  "halal breakfast Dallas",
  "iraqi breakfast cafe DFW",
  "iraqi catering Dallas",

  // Baklava family
  "baklava",
  "baklawa",
  "baklava near me",
  "pistachio baklava",
  "turkish baklava",
  "baklava bakery",
  "baklava dessert",

  // Kanafa / Kunafa / Knafeh
  "kanafa",
  "kanafa Dallas",
  "kunafa",
  "kunafa Dallas",
  "knafeh",

  // Other core dishes
  "fatayer",
  "manakish",
  "manakeesh",
  "iraqi samoon",
  "samoon bread Dallas",
  "halal bread",

  // Sweets category
  "iraqi sweets Dallas",
  "arabic sweets Dallas",
  "middle eastern sweets Richardson",
];

export function createMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG,
  keywords,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const fullTitle =
    title.includes(RESTAURANT.name) ||
    title.includes("Al-Baghdady") ||
    title.includes("Al Baghdady") ||
    title.includes("Albaghdady")
      ? title
      : `${title} | ${RESTAURANT.name}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: fullTitle,
    description,
    keywords: [...BASE_KEYWORDS, ...(keywords ?? [])],
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: RESTAURANT.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${RESTAURANT.name} in Richardson, TX — halal Iraqi bakery & breakfast`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    icons: {
      // Next.js auto-discovers src/app/icon.png as the favicon. Listing it explicitly here keeps the metadata honest.
      icon: "/icon.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    other: {
      "theme-color": "#8B1A1A",
    },
  };
}
