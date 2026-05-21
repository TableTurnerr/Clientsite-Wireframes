export const RESTAURANT = {
  name: "Al-Baghdady Bakery & Café",
  legalName: "Al-Baghdady Restaurant & Bakery",
  // Short brand shown in the header/footer logotype. (The small subtitle under
  // it is composed from servesCuisine, e.g. "Iraqi Restaurant & Bakery".)
  brandShort: "Al-Baghdady",
  tagline: "Authentic Iraqi Bakery & Breakfast Café in Richardson, TX",
  shortDescription:
    "Family-owned Iraqi bakery and breakfast café in Richardson, TX — serving authentic baklava, kunafa, samoon, ladyfingers, and traditional Iraqi breakfast since 2012, with family recipes dating back to Baghdad, 1919. Halal. Dine-in, takeout, delivery and catering.",
  longDescription:
    "Al-Baghdady has been serving the Dallas-Fort Worth community since 2012 with authentic Iraqi sweets and an in-house Arabic bakery rooted in over a century of family tradition. Our master baker Salah Hassan has spent 50 years perfecting the recipes his father passed down — baklava, kunafa, ladyfingers, burma, fatayer, and fresh samoon baked daily in our tandoor. Every morning except Monday, we serve a full traditional Iraqi breakfast: Kahi & Qeimar, Baqila, Kubba, the Albaghdady Plate, and more — paired with hot chai, the way Baghdad intended. Halal across the entire menu and Zabihah-verified.",
  footerDescription:
    "An authentic Iraqi bakery and breakfast café in the heart of Richardson, Texas. From traditional Iraqi breakfast and fresh-baked samoon to baklava, kunafa, mabrouma and our family's Iraqi sweets, every item is rooted in recipes carried from Baghdad to Dallas. Halal across the entire menu, Zabihah verified, with an in-house bakery firing fresh bread and pastries throughout the day. Whether you're here for a morning chai, a box of sweets, or catering for a hundred guests, we're glad you found us. Come hungry — leave full.",

  address: {
    street: "327 N Greenville Ave",
    city: "Richardson",
    state: "TX",
    zip: "75081",
    country: "US",
    full: "327 N Greenville Ave, Richardson, TX 75081",
  },

  geo: {
    latitude: 32.9582,
    longitude: -96.7295,
  },

  phone: process.env.NEXT_PUBLIC_PHONE ?? "(469) 547-2042",
  phoneRaw: process.env.NEXT_PUBLIC_PHONE_RAW ?? "+14695472042",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "albaghdady.bakery@gmail.com",
  url: "https://al-baghdady.com",

  priceRange: "$$",
  cuisine: ["Iraqi", "Middle Eastern", "Halal", "Arabic", "Bakery"],
  servesCuisine: "Iraqi",
  // Brand-term variables — used in copy so the template carries no hardcoded
  // place/cuisine/heritage strings. Defaults match the current site.
  stateFull: "Texas",
  region: "Dallas–Fort Worth",
  regionShort: "DFW",
  originCity: "Baghdad",
  dietary: "Halal",
  paymentAccepted: "Cash, Credit Card",
  currenciesAccepted: "USD",

  founded: "2012",
  familyRecipeSince: "1919",

  hours: [
    { day: "Monday",    open: "10:00", close: "22:00" },
    { day: "Tuesday",   open: "10:00", close: "22:00" },
    { day: "Wednesday", open: "10:00", close: "22:00" },
    { day: "Thursday",  open: "10:00", close: "22:00" },
    { day: "Friday",    open: "10:00", close: "23:00" },
    { day: "Saturday",  open: "10:00", close: "23:00" },
    { day: "Sunday",    open: "10:00", close: "22:00" },
  ],

  breakfastHours: {
    note: "Iraqi breakfast served every day except Monday",
    open: "10:00",
    close: "12:30",
    closedDays: ["Monday"] as string[],
  },

  ratingValue: 4.4,
  reviewCount: 1899,

  instagramHandle: "@albaghdadyrestaurant",

  socials: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/albaghdadyrestaurant/",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/AlBaghdadyRestaurant/",
    googleBusinessProfile:
      process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ?? "https://www.google.com/maps/place/Al-Baghdady+Restaurant",
    googleReview:
      process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? "https://www.google.com/maps/place/Al-Baghdady+Restaurant",
  },

  orderOnline:
    process.env.NEXT_PUBLIC_ORDER_ONLINE_URL ?? "https://zingmyorder.com/restaurants/al-baghdady-bakery-and-cafe-327-n-greenville-ave-richardson-tx-75081-usa-4llydt",

  features: [
    "Halal Certified",
    "Zabihah Verified",
    "In-House Arabic Bakery",
    "Iraqi Breakfast Served Daily (Except Monday)",
    "Catering Available",
    "Dine-In",
    "Takeout",
    "Delivery",
    "Family Owned",
    "Est. 2012 — Family Recipes Since 1919",
  ],

  areasServed: [
    "Richardson",
    "Plano",
    "Garland",
    "Addison",
    "North Dallas",
    "Far North Dallas",
    "Lake Highlands",
    "Murphy",
    "Sachse",
    "University Park",
    "Highland Park",
    "Frisco",
    "Allen",
    "McKinney",
    "Carrollton",
    "The Colony",
    "Coppell",
    "Irving",
    "Rowlett",
    "Wylie",
    "Mesquite",
    "Preston Hollow",
    "Park Cities",
  ],

  cateringAreas:
    "Richardson, Plano, Garland, Addison, Carrollton, Frisco, and the greater Dallas-Fort Worth metroplex",

  pressQuote: {
    text: "This hole-in-the-wall bakery in Richardson is a treasure.",
    source: "D Magazine",
  },
};

export type RestaurantHours = (typeof RESTAURANT.hours)[number];
// Full mutable shape of the restaurant data — used by the live config store.
export type RestaurantData = typeof RESTAURANT;
