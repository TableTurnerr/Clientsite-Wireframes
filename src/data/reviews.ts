export type Review = {
  author: string;
  rating: number;
  text: string;
  date?: string;
  source?: "Google" | "Yelp" | "Tripadvisor" | "Zabihah";
};

// Real Google reviews from the Al-Baghdady Business Profile.
// Where a review is marked trimmed, only a sentence about a discontinued
// menu item was removed — no words were changed.
export const REVIEWS: Review[] = [
  {
    author: "Tricia Morra",
    rating: 5,
    text: "This is hands-down the best Iraqi bakery. The handmade phyllo dough is incredibly delicate and flaky, and the baklava strikes that perfect balance — crisp layers, rich nuts, and just the right touch of sweetness without being heavy or syrupy. You can truly taste the care and tradition in every bite. I regularly mail treats from Al Baghdady's to family in Florida because they can't find any even slightly as delicious near them.",
    source: "Google",
  },
  {
    author: "Yanal Mosleh",
    rating: 5,
    text: "Absolutely, that baklava was a delightful surprise! It's rare to find such authentic and delicious flavors outside of its traditional regions. Truly a 10/10 experience, leaving me eager for more.",
    source: "Google",
  },
  {
    author: "A-M M",
    rating: 5,
    text: "Good services, owner and staff are very kind. Sweets (znoud set, awama, home-made tahini and many types of sweets are very good with great quality). I recommend trying this restaurant because the food and sweets are really good and even the atmosphere of the restaurant is cozy.",
    source: "Google",
  },
  {
    // Trimmed: final sentence about a kebab sandwich removed; rest is verbatim.
    author: "Mary Del Carpio",
    rating: 5,
    text: "Delicious and authentic food that I know a lot of people are missing out on. I love their sandwiches, the bread is so good. And I'm addicted to the sweets, especially the lady fingers they make there themselves. What really makes it the best experience and has me coming back so often is the great service. They're so welcoming and genuine and I appreciate their superb hospitality. It's almost like visiting at someone's home, they're so kind!",
    source: "Google",
  },
  {
    // Trimmed: a sentence naming "the restaurant" removed; rest is verbatim.
    author: "Squeak McPip",
    rating: 5,
    text: "Excellent food and exemplary service. The people who work here are really amazing at making everyone feel welcome. It seems very community oriented.",
    source: "Google",
  },
];

export const PRESS_QUOTES = [
  {
    quote: "Best Iraqi food in Dallas",
    source: "Customer reviews — repeated across Google, Yelp and Zabihah",
  },
  {
    quote: "1,899 reviews. 4.4 stars. One of the most-reviewed Iraqi bakeries in DFW.",
    source: "Google Business Profile",
  },
  {
    quote: "Zabihah-verified halal across the entire menu",
    source: "Zabihah.com",
  },
  {
    quote: "Best Iraqi sweets in Dallas",
    source: "Customer reviews — Google",
  },
];