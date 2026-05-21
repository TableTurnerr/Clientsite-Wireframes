// Editable, free-form marketing copy for the big homepage blocks. Place /
// cuisine / heritage terms are NOT baked in here — those are composed from
// RESTAURANT.* variables in the components, so editing a term propagates.
// These keys hold only the bespoke marketing wording a client would rewrite.
export type CopyData = {
  homeHeroLead: string;
  homeHeroAccent: string;
  homeHeroDish: string;
  homeHeroTrust: string;
  homeFeaturedEyebrow: string;
  homeFeaturedHeading: string;
};

export const COPY: CopyData = {
  homeHeroLead: "The most",
  homeHeroAccent: "Authentic",
  homeHeroDish: "Baklava",
  homeHeroTrust: "Zabihah Verified Halal",
  homeFeaturedEyebrow: "Most Loved",
  homeFeaturedHeading: "Featured dishes.",
};

// Drives the "Page copy" section of the config form (label + control type).
export const COPY_FIELDS: { key: keyof CopyData; label: string; multiline?: boolean }[] = [
  { key: "homeHeroLead", label: "Home hero · headline lead" },
  { key: "homeHeroAccent", label: "Home hero · accent word" },
  { key: "homeHeroDish", label: "Home hero · signature dish" },
  { key: "homeHeroTrust", label: "Home hero · trust line" },
  { key: "homeFeaturedEyebrow", label: "Home · featured eyebrow" },
  { key: "homeFeaturedHeading", label: "Home · featured heading" },
];
