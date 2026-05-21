import { RESTAURANT } from "./restaurant";
import { MENU } from "./menu";
import { FAQS, type FAQ } from "./faqs";

const BASE_URL = RESTAURANT.url;

// Canonical brand name matching Google Business Profile exactly.
// Keeping this in one place so any rename only happens here.
const CANONICAL_NAME = "Al Baghdady | Bakery and Cafe";

// All historical / variant spellings Google may encounter across the web.
// Including every variant here helps Google consolidate authority for the
// brand and prevents duplicate-entity confusion in the Knowledge Graph.
const ALTERNATE_NAMES = [
  "Al Baghdady",
  "Albaghdady",
  "Al-Baghdady",
  "Al-Baghdady Restaurant",
  "Al-Baghdady Restaurant & Bakery",
  "Al-Baghdady Bakery & Café",
  "Al-Baghdady Bakery and Cafe",
  "Albaghdady Bakery & Cafe",
  "Albaghdady Bakery and Cafe",
  "Albaghdady Restaurant",
  "Al Baghdady Bakery",
  "Salam Grill",
];

const KEYWORDS_STRING = [
  "iraqi bakery richardson",
  "iraqi bakery dallas",
  "halal bakery dallas",
  "halal restaurant richardson tx",
  "iraqi breakfast richardson",
  "iraqi breakfast cafe dfw",
  "baklava dallas",
  "kunafa richardson",
  "samoon bread",
  "fatayer",
  "manakish",
  "mabrouma",
  "awama luqaimat",
  "leblebi chickpea soup",
  "kibbeh richardson",
  "kahi qeimar",
  "karak chai",
  "yemeni coffee",
  "iraqi sweets dallas",
  "iraqi catering dallas",
  "zabihah verified richardson",
  "albaghdady",
  "al baghdady",
].join(", ");

const KNOWS_ABOUT = [
  "Iraqi cuisine",
  "Iraqi bakery tradition",
  "Halal food preparation",
  "Iraqi breakfast",
  "Baklava (pistachio, walnut, mixed)",
  "Kunafa (kanafa)",
  "Samoon bread",
  "Tandoor bread",
  "Fatayer",
  "Manakish",
  "Mabrouma",
  "Awama (Luqaimat)",
  "Ladyfingers (Znood Al Sit)",
  "Burma pastry",
  "Bird's Nest (Osh Al Asfour)",
  "Dehena",
  "Leblebi (Iraqi chickpea soup)",
  "Kibbeh",
  "Kahi & Qeimar",
  "Baqila",
  "Karak chai",
  "Yemeni coffee",
  "Dried lime drink (Loomi)",
  "Apricot torshana",
  "Iraqi catering",
];

const AMENITY_FEATURES = [
  { name: "Halal Certified", value: true },
  { name: "Zabihah Verified", value: true },
  { name: "In-House Arabic Bakery", value: true },
  { name: "Iraqi Breakfast Daily (Except Monday)", value: true },
  { name: "Family Owned", value: true },
  { name: "Catering Available", value: true },
  { name: "Dine-In", value: true },
  { name: "Takeout", value: true },
  { name: "Delivery", value: true },
  { name: "Free On-Site Parking", value: true },
  { name: "Vegetarian Options", value: true },
  { name: "Cash Accepted", value: true },
  { name: "Credit Card Accepted", value: true },
].map((f) => ({
  "@type": "LocationFeatureSpecification",
  name: f.name,
  value: f.value,
}));

const PRIMARY_IMAGES = [
  `${BASE_URL}/Images/hero.webp`,
  `${BASE_URL}/Images/bakery.webp`,
  `${BASE_URL}/Images/gallery/baklava-pistachio-copper.webp`,
  `${BASE_URL}/Images/gallery/baklava-tiered-tray.webp`,
  `${BASE_URL}/Images/gallery/sweets-platter-lamps.webp`,
  `${BASE_URL}/Images/gallery/zalabia-rings.webp`,
];

const HAS_MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  RESTAURANT.address.full
)}`;

const AWARD = `Featured in ${RESTAURANT.pressQuote.source}: "${RESTAURANT.pressQuote.text}"`;

const openingHoursSpecification = RESTAURANT.hours.map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: h.day,
  opens: h.open,
  closes: h.close,
}));

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: RESTAURANT.address.street,
  addressLocality: RESTAURANT.address.city,
  addressRegion: RESTAURANT.address.state,
  postalCode: RESTAURANT.address.zip,
  addressCountry: RESTAURANT.address.country,
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: RESTAURANT.geo.latitude,
  longitude: RESTAURANT.geo.longitude,
};

const areaServed = RESTAURANT.areasServed.map((city) => ({
  "@type": "City",
  name: city,
}));

const brand = {
  "@type": "Brand",
  "@id": `${BASE_URL}/#brand`,
  name: CANONICAL_NAME,
  alternateName: ALTERNATE_NAMES,
  logo: `${BASE_URL}/Images/logo.webp`,
  slogan: RESTAURANT.tagline,
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: CANONICAL_NAME,
    legalName: RESTAURANT.legalName,
    alternateName: ALTERNATE_NAMES,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/Images/logo.webp`,
      caption: `${CANONICAL_NAME} logo`,
    },
    image: PRIMARY_IMAGES,
    telephone: RESTAURANT.phone,
    email: RESTAURANT.email,
    address: postalAddress,
    foundingDate: RESTAURANT.founded,
    foundingLocation: {
      "@type": "Place",
      name: "Baghdad, Iraq",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Baghdad",
        addressCountry: "IQ",
      },
    },
    founder: {
      "@type": "Person",
      name: "Salah Hassan",
      jobTitle: "Master Baker",
      description:
        "Fourth-generation Iraqi master baker, 50+ years carrying his father's recipes from Baghdad to Richardson, TX.",
    },
    slogan: RESTAURANT.tagline,
    description: `${RESTAURANT.legalName} — family-owned Iraqi bakery and breakfast café in Richardson, TX. Founded in the US in ${RESTAURANT.founded}; family recipes since ${RESTAURANT.familyRecipeSince}. Halal across the entire menu, Zabihah-verified.`,
    knowsAbout: KNOWS_ABOUT,
    keywords: KEYWORDS_STRING,
    award: AWARD,
    hasMap: HAS_MAP,
    areaServed,
    brand,
    sameAs: Object.values(RESTAURANT.socials),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: CANONICAL_NAME,
    alternateName: ALTERNATE_NAMES,
    description: RESTAURANT.shortDescription,
    inLanguage: "en-US",
    publisher: { "@id": `${BASE_URL}/#organization` },
    keywords: KEYWORDS_STRING,
  };
}

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${BASE_URL}/#restaurant`,
    name: CANONICAL_NAME,
    legalName: RESTAURANT.legalName,
    alternateName: ALTERNATE_NAMES,
    description: RESTAURANT.longDescription,
    slogan: RESTAURANT.tagline,
    url: BASE_URL,
    telephone: RESTAURANT.phone,
    email: RESTAURANT.email,
    priceRange: RESTAURANT.priceRange,
    image: PRIMARY_IMAGES,
    logo: `${BASE_URL}/Images/logo.webp`,
    address: postalAddress,
    geo,
    hasMap: HAS_MAP,
    servesCuisine: RESTAURANT.cuisine,
    paymentAccepted: ["Cash", "Credit Card"],
    currenciesAccepted: RESTAURANT.currenciesAccepted,
    openingHoursSpecification,
    hasMenu: `${BASE_URL}/menu/`,
    acceptsReservations: "False",
    areaServed,
    knowsAbout: KNOWS_ABOUT,
    keywords: KEYWORDS_STRING,
    award: AWARD,
    amenityFeature: AMENITY_FEATURES,
    publicAccess: true,
    isAccessibleForFree: true,
    smokingAllowed: false,
    foundingDate: RESTAURANT.founded,
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    brand,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RESTAURANT.ratingValue,
      reviewCount: RESTAURANT.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: Object.values(RESTAURANT.socials),
  };
}

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${BASE_URL}/menu/#menu`,
    name: `${CANONICAL_NAME} Menu`,
    description:
      "Authentic Iraqi bakery and breakfast café menu: baklava, kunafa, ladyfingers, samoon, fatayer, manakish, awama, mabrouma, bird's nest, leblebi, kibbeh, traditional Iraqi breakfast plates, and karak chai.",
    inLanguage: "en-US",
    provider: { "@id": `${BASE_URL}/#restaurant` },
    hasMenuSection: MENU.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      description: category.description,
      hasMenuItem: category.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: item.price.replace(/[^0-9.]/g, ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        suitableForDiet: [
          ...(item.vegetarian ? ["https://schema.org/VegetarianDiet"] : []),
          "https://schema.org/HalalDiet",
        ],
      })),
    })),
  };
}

function stripMarkdownLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

export function faqSchema(faqs: FAQ[] = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripMarkdownLinks(faq.answer),
      },
    })),
  };
}

export type CateringServiceInput = {
  name?: string;
  description?: string;
  areaServedCities?: string[];
  offerings?: string[];
};

export function cateringServiceSchema(input: CateringServiceInput = {}) {
  const {
    name = "Iraqi & Middle Eastern Catering — Al-Baghdady",
    description = "Authentic Iraqi and Middle Eastern catering across the Dallas-Fort Worth metroplex — baklava and kunafa trays, fatayer and manakish boxes, ladyfingers, burma, mabrouma, awama, full Iraqi sweets spreads, and savory platters for Eid, weddings, Ramadan iftars, engagements, corporate lunches and family gatherings. Halal certified, Zabihah-verified. 48-hour notice for large events.",
    areaServedCities = RESTAURANT.areasServed as unknown as string[],
    offerings = [
      "Baklava trays (pistachio, walnut, mixed)",
      "Kunafa platters",
      "Fatayer boxes (cheese, spinach, meat)",
      "Manakish trays",
      "Ladyfingers (Znood Al Sit)",
      "Burma & Mabrouma",
      "Awama (Luqaimat)",
      "Bird's Nest (Osh Al Asfour)",
      "Custom dessert trays",
      "Iraqi breakfast catering",
      "Full Iraqi sweets spreads",
      "Eid and Ramadan iftar catering",
      "Wedding & engagement dessert tables",
      "Corporate lunch catering",
    ],
  } = input;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/catering/#service`,
    name,
    serviceType: "Catering",
    category: "Iraqi & Middle Eastern catering",
    description,
    provider: { "@id": `${BASE_URL}/#restaurant` },
    areaServed: areaServedCities.map((city) => ({ "@type": "City", name: city })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${BASE_URL}/catering/`,
      servicePhone: RESTAURANT.phone,
      serviceSmsNumber: RESTAURANT.phone,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catering offerings",
      itemListElement: offerings.map((o, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: o },
      })),
    },
    audience: {
      "@type": "Audience",
      audienceType:
        "Wedding planners, corporate events, families, Eid and Ramadan gatherings",
    },
    termsOfService: "48-hour minimum advance notice for large catering orders.",
    image: PRIMARY_IMAGES,
    url: `${BASE_URL}/catering/`,
    brand,
  };
}

export type ArticleSchemaInput = {
  url: string;
  headline: string;
  description: string;
  /** Path or absolute URL to the article's primary image. */
  image?: string;
  datePublished?: string;
  dateModified?: string;
  /**
   * Author name — defaults to the organization (brand-authored content). Pass a
   * Person name to attribute to an individual (e.g. "Salah Hassan").
   */
  authorName?: string;
};

export function articleSchema({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
}: ArticleSchemaInput) {
  const absoluteUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${BASE_URL}${image}`
    : PRIMARY_IMAGES[0];
  const today = new Date().toISOString().slice(0, 10);

  const author = authorName
    ? { "@type": "Person", name: authorName }
    : { "@id": `${BASE_URL}/#organization` };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl}#article`,
    headline,
    description,
    image: imageUrl,
    url: absoluteUrl,
    mainEntityOfPage: { "@id": `${absoluteUrl}#webpage` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    author,
    inLanguage: "en-US",
    datePublished: datePublished ?? today,
    dateModified: dateModified ?? today,
  };
}

export type WebPageSchemaInput = {
  url: string;
  name: string;
  description: string;
  /** Path or absolute URL to the primary image for this page. */
  primaryImage?: string;
  /** ISO 8601 date string (e.g. "2026-05-13"). Defaults to today. */
  dateModified?: string;
  /** Optional breadcrumb items (will reference the breadcrumb @id automatically). */
  hasBreadcrumb?: boolean;
};

export function webPageSchema({
  url,
  name,
  description,
  primaryImage,
  dateModified,
  hasBreadcrumb = true,
}: WebPageSchemaInput) {
  const absoluteUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  const today = new Date().toISOString().slice(0, 10);
  const modified = dateModified ?? today;
  const imageUrl = primaryImage
    ? primaryImage.startsWith("http")
      ? primaryImage
      : `${BASE_URL}${primaryImage}`
    : PRIMARY_IMAGES[0];

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl}#webpage`,
    url: absoluteUrl,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#restaurant` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
    },
    dateModified: modified,
    ...(hasBreadcrumb && {
      breadcrumb: { "@id": `${absoluteUrl}#breadcrumb` },
    }),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  const lastItem = items[items.length - 1];
  const pageUrl = lastItem
    ? lastItem.url.startsWith("http")
      ? lastItem.url
      : `${BASE_URL}${lastItem.url}`
    : BASE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: CANONICAL_NAME,
    legalName: RESTAURANT.legalName,
    alternateName: ALTERNATE_NAMES,
    description: RESTAURANT.shortDescription,
    image: PRIMARY_IMAGES,
    logo: `${BASE_URL}/Images/logo.webp`,
    telephone: RESTAURANT.phone,
    email: RESTAURANT.email,
    address: postalAddress,
    geo,
    hasMap: HAS_MAP,
    url: BASE_URL,
    priceRange: RESTAURANT.priceRange,
    paymentAccepted: ["Cash", "Credit Card"],
    currenciesAccepted: RESTAURANT.currenciesAccepted,
    openingHoursSpecification,
    areaServed,
    keywords: KEYWORDS_STRING,
    foundingDate: RESTAURANT.founded,
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RESTAURANT.ratingValue,
      reviewCount: RESTAURANT.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: Object.values(RESTAURANT.socials),
  };
}
