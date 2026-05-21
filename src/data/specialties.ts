export type Specialty = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroEyebrow?: string;
  heroHeadline: string;
  heroSubheadline?: string;
  primaryBlock: { heading: string; body: string };
  image?: string;
  relatedMenuItemNames?: string[];
  /** Optional per-specialty FAQs. Each pair renders inline on the topic page and is injected as FAQPage JSON-LD. */
  faqs?: { question: string; answer: string }[];
};

// All 11 specialty slugs have dedicated photos in /Images/specialties/<slug>.webp.
export const SPECIALTIES: Specialty[] = [
  {
    slug: "bread",
    name: "Bread",
    metaTitle: "Bread in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Fresh Iraqi samoon bread baked daily in our traditional tandoor — crisp outside, soft inside. Pickup and delivery across Richardson and Dallas.",
    keywords: [
      "iraqi bread richardson tx",
      "iraqi bread dallas",
      "samoon bread dallas",
      "tandoor bread richardson",
      "fresh baked bread richardson",
      "halal bread richardson",
      "halal bread shop richardson",
      "arabic bread dallas",
      "arabic flatbread dallas",
      "iraqi samoon richardson",
    ],
    heroEyebrow: "FRESH DAILY",
    heroHeadline: "Authentic bread in Richardson, TX",
    primaryBlock: {
      heading: "Fresh Baked Bread From Iraq, Baked Daily in Our Tandoor",
      body: "Iraqi bread, especially our handmade samoon, is a daily staple at Albaghdady. Our bread is baked fresh every morning in a traditional tandoor — diamond-shaped, crisp on the outside, soft and chewy inside. Perfect with chai for breakfast, paired with stews and dips, or enjoyed warm on its own. Try our authentic Iraqi bread today and taste a hundred years of family baking tradition.",
    },
    image: "/Images/specialties/bread.webp",
    relatedMenuItemNames: ["Iraqi Samoon (4 pc)", "Tandoor Bread (6 pc)", "Iraqi Bread (3 pc)"],
    faqs: [
      {
        question: "What is samoon?",
        answer:
          "Samoon is the traditional Iraqi oval-shaped bread — diamond-faceted, baked at high heat in a tandoor until the crust is crisp and the inside stays pillowy and soft. We bake fresh samoon throughout the day at Albaghdady.",
      },
      {
        question: "Is your samoon vegan?",
        answer:
          "Yes — our samoon is made with flour, water, salt and yeast. No eggs, no dairy, no animal fat. It pairs beautifully with chai, fresh stews, dips, and our [Iraqi breakfast plates](/specialties/breakfast/).",
      },
      {
        question: "Do you sell samoon to take home?",
        answer:
          "Yes, you can buy fresh samoon by the loaf for pickup or delivery. Order online or stop by — every loaf is baked the day you eat it.",
      },
      // DRAFT (2026-05-20) — keyword-coverage FAQ (halal bread / halal bread shop). Pending Hasham/client brand-voice review.
      {
        question: "Is your bread halal?",
        answer:
          "Yes — all our bread is halal. Our samoon and tandoor breads are made with simple halal ingredients (flour, water, salt, yeast) and baked fresh daily. Albaghdady is a Zabihah-verified halal bakery, so the halal bread you pick up here meets traditional standards.",
      },
    ],
  },
  {
    slug: "chai",
    name: "Chai",
    metaTitle: "Chai in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Traditional Iraqi karak chai brewed the old way — black tea slow-steeped with cardamom, milk and a touch of sweetness. Pickup and delivery across Richardson, TX.",
    keywords: [
      "iraqi chai richardson",
      "karak chai richardson tx",
      "karak chai dallas",
      "middle eastern tea dallas",
      "cardamom tea richardson",
      "arabic chai dallas",
      "iraqi tea dallas",
      "masala chai richardson",
      "halal cafe richardson",
    ],
    heroEyebrow: "BREWED THE OLD WAY",
    heroHeadline: "Chai in Richardson, TX",
    primaryBlock: {
      heading: "Sip Hot Chai in Richardson",
      body: "Chai is the heart of every Iraqi morning, and ours is brewed the traditional way — strong black tea steeped slowly with cardamom, milk and a touch of sweetness into a rich, creamy karak. Every cup is poured with the same care our family has used for four generations. Try our authentic Iraqi karak chai today.",
    },
    image: "/Images/specialties/chai.webp",
    relatedMenuItemNames: ["Karak Chai"],
    faqs: [
      {
        question: "What's the difference between Iraqi chai and karak chai?",
        answer:
          "Iraqi chai is a strong black tea steeped slowly with cardamom and a touch of sweetness — sipped clear from small glass cups. Karak chai adds milk and more spice to make a rich, creamy variation popular across the Gulf.",
      },
      {
        question: "Do you serve chai all day?",
        answer:
          "Yes — chai is the heart of every Iraqi morning, afternoon and evening. Walk in any time we're open for a freshly brewed cup, or pair it with our [Iraqi breakfast](/specialties/breakfast/).",
      },
      {
        question: "Can I order chai for delivery?",
        answer:
          "Yes — our karak chai is available for pickup and delivery across Richardson and the Dallas area.",
      },
    ],
  },
  {
    slug: "burma",
    name: "Burma",
    metaTitle: "Burma in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Hand-rolled Iraqi burma — crisp phyllo wrapped tight with fresh pistachios and honey syrup. Pickup and delivery across Richardson and Dallas.",
    keywords: [
      "iraqi burma richardson",
      "burma dessert richardson tx",
      "turkish burma dallas",
      "mabrouma dallas",
      "pistachio burma richardson",
      "middle eastern dessert dallas",
      "phyllo dessert richardson",
      "pistachio dessert dallas",
      "iraqi sweets richardson",
      "arabic sweets dallas",
    ],
    heroEyebrow: "HAND-ROLLED",
    heroHeadline: "Handmade Burma in Richardson, TX",
    primaryBlock: {
      heading: "Try Iraqi Burma Hand-Rolled at Our Bakery",
      body: "Burma, a beloved Middle Eastern dessert, is a must-try at our bakery. Our handmade burma is rolled cigar-thin from layers of crisp phyllo, packed with fresh pistachios, baked golden, and finished with our family's signature honey syrup. Perfect with chai or as a dessert tray centerpiece. Experience the authentic Iraqi flavors that have made our burma a Richardson favorite.",
    },
    image: "/Images/specialties/burma.webp",
    relatedMenuItemNames: ["Burma (Turkish Style)"],
    faqs: [
      {
        question: "What is burma made of?",
        answer:
          "Burma is layers of crisp, paper-thin phyllo rolled cigar-style around fresh-ground pistachios, baked golden, then finished with our family's signature honey syrup. Light, nutty, crisp throughout.",
      },
      {
        question: "How is burma different from baklava?",
        answer:
          "Both use phyllo and pistachios, but burma is cigar-rolled and crisper, while [baklava](/specialties/baklava/) is layered flat and slightly softer. Burma is one of the lesser-known Iraqi sweets — an instant favorite for anyone who tries it.",
      },
      {
        question: "Can I order a burma tray for an event?",
        answer:
          "Yes — burma is a popular addition to our custom dessert trays for Eid, weddings and Ramadan iftars. Order ahead through our [catering page](/catering/).",
      },
    ],
  },
  {
    slug: "lady-fingers",
    name: "Lady Fingers",
    metaTitle: "Lady Fingers in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Iraqi Znood El Sit ladyfingers — delicate phyllo, fresh pistachios, honey syrup. Hand-rolled daily. Pickup and delivery across Richardson, TX.",
    keywords: [
      "lady fingers dessert richardson",
      "lady fingers dallas",
      "ladyfingers dessert dallas",
      "znood al sit dallas",
      "znood el sit richardson",
      "iraqi ladyfingers richardson tx",
      "pistachio lady fingers dallas",
      "phyllo lady fingers richardson",
      "middle eastern dessert dallas",
      "iraqi sweets richardson",
      "arabic sweets dallas",
    ],
    heroEyebrow: "HAND-FOLDED",
    heroHeadline: "Lady fingers in Richardson, TX",
    primaryBlock: {
      heading: "Try Our Iraqi Lady Fingers (Znood El Sit)",
      body: "Lady fingers, known in Arabic as Znood El Sit, are one of Iraq's most elegant desserts. Our hand-rolled lady fingers are made from delicate phyllo, filled with fresh pistachios, baked deep golden, and dipped in our signature honey syrup. Light, crisp, and unforgettable. Try our authentic lady fingers today and taste a century of Iraqi family baking.",
    },
    image: "/Images/specialties/lady-fingers.webp",
    relatedMenuItemNames: ["Ladyfingers (Znood Al Sit)"],
    faqs: [
      {
        question: "What are lady fingers (znood al sit)?",
        answer:
          "Lady fingers — known in Arabic as znood al sit, which translates to the lady's arms — are delicate phyllo rolls wrapped around fresh pistachios, baked deep golden, then dipped in our signature honey syrup. Lighter than [baklava](/specialties/baklava/), twice as elegant.",
      },
      {
        question: "Are lady fingers nut-free?",
        answer:
          "No — our lady fingers contain fresh pistachios. If you need a nut-free dessert, our [samoon](/specialties/bread/), kunafa cheese filling and select bakery items are nut-free; please ask when ordering.",
      },
      {
        question: "Can I order lady fingers by the tray?",
        answer:
          "Yes, lady fingers are a staple in our custom dessert trays and are also available by the piece. Order ahead through our [catering page](/catering/).",
      },
    ],
  },
  {
    slug: "samosa",
    name: "Samosa",
    metaTitle: "Samosa in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Hand-folded Iraqi samosas — meat or veg, crispy and golden. Perfect snack, appetizer, or tray for events. Pickup and delivery in Richardson, TX.",
    keywords: [
      "iraqi samosa richardson tx",
      "best samosa texas",
      "best samosa dallas",
      "fried samosa richardson",
      "middle eastern samosa dallas",
      "halal samosa richardson",
      "halal samosa dallas",
      "vegetarian samosa richardson",
      "meat samosa dallas",
      "samosa near me",
      "appetizer richardson",
    ],
    heroEyebrow: "CRISPY & FRESH",
    heroHeadline: "Best samosa in Texas",
    primaryBlock: {
      heading: "Satisfy Your Cravings with Crispy Iraqi Samosas",
      body: "Samosa, a beloved Middle Eastern appetizer, is a must-try at Albaghdady. Our golden, crispy samosas are hand-folded and filled with savory seasoned meat or vegetables — perfect as a quick snack, an appetizer, or a tray for your next gathering. Try our handmade samosas today and experience authentic Iraqi flavors.",
    },
    image: "/Images/specialties/samosa.webp",
    relatedMenuItemNames: ["Samosa"],
    faqs: [
      {
        question: "Are your samosas baked or fried?",
        answer:
          "Our samosas are hand-folded then pan-fried until the outside is crisp and golden, with the seasoned filling tender inside.",
      },
      {
        question: "What fillings are available?",
        answer:
          "We offer both meat (seasoned ground beef with onions and spices) and vegetable (potato, peas and spices) samosas — perfect together for a mixed appetizer tray.",
      },
      {
        question: "Can I order samosa trays for an event?",
        answer:
          "Yes — samosa platters are one of our most-requested appetizer trays for catering and corporate events. Order through our [catering page](/catering/).",
      },
    ],
  },
  {
    slug: "kunafa",
    name: "Kunafa",
    metaTitle: "Kunafa in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Hot, fresh kunafa made to order — shredded phyllo, melted cheese, warm honey syrup. Pickup and delivery across Richardson and Dallas.",
    keywords: [
      "kunafa richardson tx",
      "kunafa dallas",
      "kunafa near me",
      "kanafa richardson",
      "kanafa dallas",
      "knafeh dallas",
      "knafeh richardson tx",
      "iraqi kunafa richardson",
      "cheese kunafa dallas",
      "hot kunafa near me",
      "best kunafa dallas",
      "pistachio kunafa richardson",
      "middle eastern dessert dallas",
      "arabic sweets dallas",
    ],
    heroEyebrow: "MADE TO ORDER",
    heroHeadline: "Delicious kunafa in Richardson, TX",
    primaryBlock: {
      heading: "Hot, Fresh Kunafa — Ready To Order",
      body: "Kunafa is one of the Middle East's most-loved desserts, and we make ours the way it's meant to be eaten — hot from the oven. Our handmade kunafa layers shredded phyllo with melted cheese, finished with warm honey syrup and chopped pistachios. Stretchy, fragrant, and made fresh to order. Try our authentic Iraqi kunafa today.",
    },
    image: "/Images/specialties/kunafa.webp",
    relatedMenuItemNames: ["Kanafa"],
    faqs: [
      {
        question: "Is kunafa served hot?",
        answer:
          "Yes — we make kunafa fresh to order so it arrives hot from the oven. The cheese is stretchy, the phyllo is crisp, the syrup is warm. That's how it's meant to be eaten.",
      },
      {
        question: "How is kunafa pronounced — kunafa, kanafa, or knafeh?",
        answer:
          "All three are correct — they're regional spellings of the same dessert. We use Kanafa on the menu following Iraqi spelling, though we accept all variations.",
      },
      {
        question: "Can I order kunafa for delivery?",
        answer:
          "Yes, kunafa is available for pickup and delivery, though we recommend pickup for the best out-of-the-oven experience. Available across Richardson, [Plano](/near/plano-tx/), [Garland](/near/garland-tx/) and the greater Dallas area.",
      },
    ],
  },
  {
    slug: "baklava",
    name: "Baklava",
    metaTitle: "Baklava in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "100-year-old Iraqi baklava — paper-thin phyllo, fresh pistachios and walnuts, signature honey syrup. Pickup and delivery across Richardson, TX.",
    keywords: [
      "authentic baklava richardson tx",
      "baklava richardson",
      "baklava dallas",
      "baklava near me",
      "baklawa dallas",
      "iraqi baklava dallas",
      "turkish baklava dallas",
      "greek baklava dessert",
      "baklava filo",
      "baklava filo pastry",
      "filo baklava richardson",
      "pistachio baklava richardson",
      "walnut baklava dallas",
      "mixed baklava richardson",
      "best baklava dallas",
      "baklava cake",
      "baklava pastry",
      "baklava dessert dallas",
      "baklava bakery richardson",
      "baklava cafe dallas",
      "halal baklava richardson",
    ],
    heroEyebrow: "OUR FLAGSHIP",
    heroHeadline: "Authentic baklava in Richardson, TX",
    primaryBlock: {
      heading: "Indulge in 100-Year-Old Iraqi Baklava",
      body: "Baklava, the crown of Middle Eastern desserts, is what our family has been baking since 1919. Our handmade baklava layers paper-thin filo (phyllo) pastry with fresh pistachios and walnuts, soaked in our signature honey syrup. Choose from pistachio baklava, walnut baklava, or our mixed baklava tray — every piece carries four generations of Iraqi tradition. Try authentic Iraqi baklava in Richardson today.",
    },
    image: "/Images/specialties/baklava.webp",
    relatedMenuItemNames: [
      "Mixed Baklava",
      "Pistachio Baklava",
      "Walnut Baklava",
    ],
    faqs: [
      {
        question: "What kinds of baklava do you make?",
        answer:
          "We make three varieties: Pistachio Baklava (our most-ordered, made with fresh-ground pistachios), Walnut Baklava (a traditional richer variety), and Mixed Baklava (a tray combining our walnut and pistachio varieties). All baked fresh in our [in-house bakery](/bakery/).",
      },
      {
        question: "How long does your baklava stay fresh?",
        answer:
          "Our baklava is best within 5–7 days at room temperature in a sealed container. For longer storage, refrigerate up to 2 weeks. For events, we recommend buying it the day of or one day prior.",
      },
      {
        question: "Do you offer baklava trays for catering?",
        answer:
          "Yes — assorted baklava trays are one of our most-requested items for Eid, weddings, Ramadan iftars and corporate events. Custom sizes available; order at least 24 hours ahead through our [catering page](/catering/).",
      },
      // DRAFT (2026-05-20) — keyword-coverage FAQ (greek/turkish baklava, filo/phyllo). Pending Hasham/client brand-voice review.
      {
        question: "Is baklava Greek, Turkish, or Iraqi — and is it filo or phyllo?",
        answer:
          "Baklava is shared across the Middle East and Mediterranean, so you'll see Greek baklava, Turkish baklava, and Arab versions, each a little different. Ours is Iraqi-style: paper-thin filo (also spelled phyllo) pastry layered with fresh pistachios and walnuts and our family's honey syrup. Whatever you call it, it's the baklava our family has baked since 1919.",
      },
    ],
  },
  {
    slug: "breakfast",
    name: "Breakfast",
    metaTitle: "Breakfast in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Authentic Iraqi breakfast in Richardson — Kahi & Qeimar, Baqila, Kubba, Albaghdady Plate, samoon and chai. Every morning except Monday.",
    keywords: [
      "iraqi breakfast richardson tx",
      "iraqi breakfast dallas",
      "middle eastern breakfast dallas",
      "halal breakfast richardson",
      "halal breakfast dallas",
      "traditional iraqi breakfast",
      "traditional breakfast near me",
      "iraqi breakfast cafe",
      "iraqi breakfast plate",
      "albaghdady plate",
      "kahi and qeimar dallas",
      "baqila richardson",
      "best breakfast richardson",
      "arabic breakfast dallas",
    ],
    heroEyebrow: "EVERY MORNING EXCEPT MONDAY",
    heroHeadline: "Traditional breakfast place in Richardson, TX",
    primaryBlock: {
      heading: "Start Your Day with Iraqi Breakfast",
      body: "Iraqi breakfast is a tradition all its own, and at Albaghdady, we serve it the way it's been made for generations. From Kahi & Qeimar and Baqila to fresh Kubba, the famous Albaghdady Plate, and warm samoon from our tandoor, our breakfast menu features authentic plates and sandwiches paired with hot chai. Stop in any morning except Monday for an authentic Iraqi breakfast in Richardson.",
    },
    image: "/Images/specialties/breakfast.webp",
    relatedMenuItemNames: [
      "Albaghdady Plate (طبق البغدادي)",
      "Kahi & Qeimar (كاهي وقيمر)",
      "Baqila (باقلاء بالدهن)",
      "Kubba (كبة)",
    ],
    faqs: [
      {
        question: "When do you serve Iraqi breakfast?",
        answer: "Every day except Monday, 10:00 AM – 12:30 PM. Walk-ins welcome.",
      },
      {
        question: "What's in the Albaghdady Plate?",
        answer:
          "Our signature breakfast spread — tender ground meat kabab, golden potatoes, eggplant tomato stew, and two pieces of handmade kubbah, all on one tray. A full Iraqi feast before noon.",
      },
      {
        question: "Do you serve Kahi & Qeimar?",
        answer:
          "Yes — Kahi & Qeimar is Iraq's most beloved sweet breakfast. Layers of flaky golden kahi pastry drizzled with syrup, served with rich clotted cream (qeimar). A morning indulgence our [family has been making since 1919](/our-story/).",
      },
    ],
  },
  {
    slug: "manakish",
    name: "Manakish",
    metaTitle: "Manakish in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Manakish baked fresh daily — za'atar, cheese, or meat on soft golden flatbread. Pickup and delivery across Richardson and Dallas.",
    keywords: [
      "manakish richardson tx",
      "manakish dallas",
      "manakeesh dallas",
      "manakeesh richardson",
      "zaatar manakish dallas",
      "cheese manakish richardson",
      "meat manakish dallas",
      "iraqi manakish richardson",
      "lebanese manakish dallas",
      "middle eastern flatbread dallas",
      "halal manakish near me",
      "arabic flatbread richardson",
    ],
    heroEyebrow: "BAKED FRESH DAILY",
    heroHeadline: "Manakish in Richardson, TX",
    primaryBlock: {
      heading: "Baked-the-Old-Way Manakish",
      body: "Manakish, a Middle Eastern breakfast favorite, is baked fresh at Albaghdady every day. Our handmade manakish features soft, golden flatbread topped with za'atar, melted cheese, or seasoned meat — the perfect savory pairing with hot chai. Try our authentic manakish today for a taste of traditional Middle Eastern flavors.",
    },
    image: "/Images/specialties/manakish.webp",
    relatedMenuItemNames: ["Manakish"],
    faqs: [
      {
        question: "What toppings are on your manakish?",
        answer:
          "We make three classic varieties: za'atar (the traditional thyme-and-sesame blend), cheese, and seasoned meat — all on soft, golden flatbread baked fresh.",
      },
      {
        question: "Is manakish a breakfast food?",
        answer:
          "Traditionally yes — manakish is a Middle Eastern breakfast staple, especially za'atar manakish paired with [chai](/specialties/chai/). But it's served all day at Albaghdady.",
      },
      {
        question: "Can I order manakish for an event?",
        answer:
          "Yes, manakish platters are great for breakfast catering, corporate events and large family gatherings. Order ahead through our [catering page](/catering/).",
      },
    ],
  },
  {
    slug: "fatayer",
    name: "Fatayer",
    metaTitle: "Fatayer in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Hand-folded fatayer baked fresh daily — spinach, cheese, or seasoned meat. Pickup and delivery across Richardson and the Dallas area.",
    keywords: [
      "fatayer richardson tx",
      "fatayer dallas",
      "fatayer near me",
      "spinach fatayer dallas",
      "cheese fatayer richardson",
      "meat fatayer richardson",
      "lebanese fatayer dallas",
      "arabic fatayer richardson",
      "middle eastern pastry dallas",
      "spinach pies dallas",
      "cheese pies richardson",
      "savory pies dallas",
      "iraqi savory pies richardson",
    ],
    heroEyebrow: "HAND-FOLDED, BAKED FRESH",
    heroHeadline: "Fatayer in Richardson, TX",
    primaryBlock: {
      heading: "Hand-Folded Fatayer, Baked Fresh Daily",
      body: "Fatayer, a beloved Middle Eastern savory pastry, is hand-folded and baked fresh at Albaghdady every day. Our authentic fatayer comes filled with spinach (sabanekh), cheese, or seasoned ground meat — soft, golden, and perfect with chai. Try our handmade fatayer today for a true taste of Middle Eastern tradition.",
    },
    image: "/Images/specialties/fatayer.webp",
    relatedMenuItemNames: ["Fatayer — Spinach", "Fatayer — Cheese", "Fatayer — Meat"],
    faqs: [
      {
        question: "What fillings does fatayer come in?",
        answer:
          "We hand-fold three varieties: spinach (sabanekh, vegetarian), cheese (vegetarian), and seasoned ground meat. All baked fresh daily.",
      },
      {
        question: "Is fatayer vegetarian?",
        answer:
          "Two of our three fatayer varieties — spinach and cheese — are fully vegetarian. The meat fatayer contains seasoned ground beef.",
      },
      {
        question: "Can I order a fatayer box for an event?",
        answer:
          "Yes, fatayer boxes are popular for office breakfasts, Ramadan iftars, and family gatherings. Mix-and-match any varieties; order ahead via our [catering page](/catering/).",
      },
    ],
  },
  {
    slug: "halal-food",
    name: "Halal Food",
    metaTitle: "Halal Food in Richardson, TX | Al-Baghdady — Iraqi Bakery & Café",
    metaDescription:
      "Every dish 100% halal — Iraqi bakery, breakfast, and sweets. Zabihah-verified family bakery in Richardson, TX since 2012.",
    keywords: [
      "halal food richardson tx",
      "halal food dallas",
      "halal food near me",
      "halal restaurant richardson",
      "halal restaurant near me",
      "halal cafe richardson",
      "halal certified food dallas",
      "zabihah verified richardson",
      "zabihah halal dallas",
      "middle eastern halal dallas",
      "arabic halal food richardson",
      "iraqi halal food richardson",
    ],
    heroEyebrow: "ZABIHAH VERIFIED",
    heroHeadline: "Halal food in Richardson, TX",
    primaryBlock: {
      heading: "Best Halal and Middle Eastern Cuisine",
      body: "At Albaghdady, every dish on our menu is 100% halal. From our bakery to every item on the breakfast menu, every ingredient is sourced and prepared to traditional halal standards. Experience authentic halal Middle Eastern cuisine made by a family bakery serving Richardson since 2012.",
    },
    image: "/Images/specialties/halal-food.webp",
    relatedMenuItemNames: [
      "Albaghdady Plate (طبق البغدادي)",
      "Mixed Baklava",
      "Manakish",
      "Kanafa",
    ],
    faqs: [
      {
        question: "Is everything on your menu halal?",
        answer:
          "Yes — every dish at Albaghdady is 100% halal and Zabihah-verified. From our bakery to every item on the breakfast and main menus, every ingredient is sourced and prepared to traditional halal standards.",
      },
      {
        question: "Are you Zabihah certified?",
        answer:
          "Yes, our kitchen is Zabihah-verified halal. You'll find us listed on Zabihah.com along with reviews from the Muslim community in Richardson and the greater DFW area.",
      },
      {
        question: "Do you offer halal catering for large events?",
        answer:
          "Yes — we cater fully halal events of every size, from corporate lunches and Ramadan iftars to weddings of 200+ guests. All catering uses the same halal sourcing as our restaurant. See our [catering page](/catering/).",
      },
    ],
  },
];

export const SPECIALTY_SLUGS = SPECIALTIES.map((s) => s.slug);