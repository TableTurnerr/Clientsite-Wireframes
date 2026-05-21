export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image?: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "iraqi-breakfast",
    name: "Iraqi Breakfast",
    description:
      "Traditional Iraqi breakfast served every day except Monday, 10:00 AM – 12:30 PM. Every plate paired with hot chai and fresh samoon.",
    image: "/Images/hero.webp",
    items: [
      {
        name: "Albaghdady Plate (طبق البغدادي)",
        description:
          "Our signature breakfast spread. Ground meat kabab, golden potatoes, eggplant tomato stew, and two pieces of handmade kubbah — all on one tray.",
        price: "$23.99",
        popular: true,
        image: "/Images/specialties/albaghdady-plate.webp",
      },
      {
        name: "Kahi & Qeimar (كاهي وقيمر)",
        description:
          "Iraq's most beloved sweet breakfast. Layers of flaky golden kahi pastry drizzled with syrup, served with rich clotted cream (qeimar).",
        price: "$12.99",
        popular: true,
        image: "/Images/specialties/kahi-qeimar.webp",
      },
      {
        name: "Baqila (باقلاء بالدهن)",
        description:
          "Tender fava beans simmered in their own broth, served with eggs, crispy fried onions, and warm bread soaked in the broth. A national Iraqi tradition.",
        price: "$14.99 / plate",
        popular: true,
        image: "/Images/specialties/breakfast.webp",
      },
      {
        name: "Kubba (كبة)",
        description:
          "Four hand-rolled pieces of Iraqi kubba — bulgur shells stuffed with seasoned meat, onions, and herbs, fried until golden and crisp.",
        price: "$15.99 / plate · $7.99 / sandwich",
      },
      {
        name: "Qeimar & Debes (قيمر ودبس)",
        description:
          "Fresh clotted cream and pure date syrup, served with warm samoon. Simple, ancient, unforgettable.",
        price: "$7.99 / plate · $4.99 / sandwich",
      },
      {
        name: "Chelfry (جلفراي)",
        description:
          "Traditional Iraqi morning hash of slow-cooked lamb pieces, golden potatoes, onions, and tomatoes. Bold and warming.",
        price: "$15.99 / plate · $7.99 / sandwich",
      },
      {
        name: "Omlet (مخلمة)",
        description:
          "Iraqi-style omelette with ground meat, fresh tomatoes, onions, and eggs cooked together until tender and rich.",
        price: "$15.99 / plate · $7.99 / sandwich",
      },
      {
        name: "Bastirma (باسترما بالبيض)",
        description:
          "Spiced cured beef sausage sizzled with eggs until the edges crisp. Deep, smoky flavor in every bite.",
        price: "$14.99 / plate · $7.99 / sandwich",
      },
      {
        name: "Lamb Liver (معلاك غنم)",
        description:
          "Fresh lamb liver sautéed with onions and tomatoes until tender. The way Baghdadi mornings have started for generations.",
        price: "$15.99 / plate · $7.99 / sandwich",
      },
      {
        name: "Beef & Egg (لحم وبيض)",
        description:
          "Tender beef shawarma topped with a perfectly cooked egg. Savory, satisfying, ready to fuel your whole morning.",
        price: "$16.99 / plate · $7.99 / sandwich",
      },
      {
        name: "Potato with Egg (بطاطا مع بيض)",
        description:
          "Pan-fried potatoes scrambled with farm-fresh eggs. Simple, comforting, pairs perfectly with hot chai.",
        price: "$9.99 / plate · $5.99 / sandwich",
      },
      {
        name: "Tomato with Egg (طماطم مع بيض)",
        description:
          "Ripe tomatoes slow-cooked with eggs into a rich, savory scramble. Light, fresh, a Middle Eastern breakfast staple.",
        price: "$9.99 / plate · $5.99 / sandwich",
      },
      {
        name: "Fried Kabab (كباب عروق)",
        description:
          "Hand-formed patties of seasoned ground meat with fresh parsley and onions, pan-fried golden and crisp.",
        price: "$15.99 / plate · $7.99 / sandwich",
      },
    ],
  },
  {
    id: "bakery-sweets",
    name: "Bakery & Iraqi Sweets",
    description:
      "Baked fresh in our in-house bakery — baklava, kunafa, mabrouma, ladyfingers and more.",
    image: "/Images/menu/bakery-sweets.webp",
    items: [
      {
        name: "Pistachio Mabrouma",
        description:
          "A premium version of our house mabrouma — loaded with fresh-ground pistachios throughout, baked deep gold and finished with syrup.",
        price: "$25.00",
      },
      {
        name: "Bird's Nest (Osh Al Asfour)",
        description:
          "Delicate shredded phyllo nests filled with pistachios and soaked in floral syrup. A beautiful and festive Iraqi sweet.",
        price: "$21.99",
      },
      {
        name: "Burma (Turkish Style)",
        description:
          "Long, cigar-rolled phyllo packed with pistachios and finished with syrup. Crisp, nutty, and one of the lesser-known Iraqi sweets.",
        price: "$20.00",
      },
      {
        name: "Mabrouma with Cream",
        description:
          "Our classic coiled phyllo pastry filled with luscious sweet cream and pistachios, baked until golden.",
        price: "$20.00",
        popular: true,
        image: "/Images/specialties/burma.webp",
      },
      {
        name: "Pistachio Baklava",
        description:
          "Our most-ordered variety. Generous layers of fresh-ground pistachios between paper-thin phyllo, soaked in just enough syrup.",
        price: "$17.99",
        popular: true,
        image: "/Images/gallery/baklava-pistachio-plate.webp",
      },
      {
        name: "Mixed Baklava",
        description:
          "Layers of phyllo, walnut, pistachio and honey. A mixed selection of our house baklava varieties.",
        price: "$17.99",
        popular: true,
        image: "/Images/gallery/baklava-tiered-tray.webp",
      },
      {
        name: "Walnut Baklava",
        description:
          "A traditional baklava variety made with fresh walnuts. Layers of paper-thin phyllo, walnuts, and our family's signature honey syrup. The recipe we've been making since 1919.",
        price: "$15.99",
      },
      {
        name: "Kanafa",
        description:
          "Sticky shredded phyllo with melted cheese, soaked in rose-water syrup and topped with crushed pistachios.",
        price: "$15.00",
        popular: true,
        image: "/Images/specialties/kunafa.webp",
      },
      {
        name: "Ladyfingers (Znood Al Sit)",
        description:
          "Znood Al Sit — crisp phyllo rolls filled with sweet cream and dipped in our family's honey syrup, finished with pistachios. One of Iraq's most elegant desserts.",
        price: "$12.00",
      },
      {
        name: "Awama (Luqaimat)",
        description:
          "Bite-sized fried dough fritters, crisp on the outside, soft inside, soaked in our family's honey syrup. A celebration favorite at every Iraqi gathering — most often spotted on Eid and wedding trays.",
        price: "$12.00",
      },
      {
        name: "Dehena (Iraqi Dessert)",
        description:
          "A traditional Iraqi sweet made with date syrup and butter — warm, rich, and deeply comforting. A true taste of Baghdad.",
        price: "$12.00",
      },
    ],
  },
  {
    id: "bread",
    name: "Bread",
    description:
      "Iraq's traditional breads, baked fresh in our stone oven and tandoor throughout the day.",
    image: "/Images/bakery.webp",
    items: [
      {
        name: "Iraqi Samoon (4 pc)",
        description:
          "Iraq's traditional oval-shaped bread, baked fresh in our stone oven throughout the day.",
        price: "$4.49",
        popular: true,
        image: "/Images/specialties/bread.webp",
      },
      {
        name: "Tandoor Bread (6 pc)",
        description:
          "Traditional Iraqi flatbread baked in our clay tandoor until soft, chewy, and lightly charred. The everyday bread of Iraq — perfect with stews, dips, breakfast plates, or warm on its own.",
        price: "$6.99",
      },
      {
        name: "Iraqi Bread (3 pc)",
        description:
          "Classic round Iraqi-style bread, hand-shaped and baked fresh daily in our Richardson bakery. Soft and warm — perfect for scooping stews, dips, and qeimar.",
        price: "$3.99",
      },
      {
        name: "Bread (1 pc)",
        description:
          "A single piece of our freshly baked halal Iraqi bread — warm from the oven, ready to pair with any breakfast plate or dip.",
        price: "$1.99",
      },
      {
        name: "Samoon (1 pc)",
        description:
          "A single piece of our signature Iraqi samoon — the diamond-shaped tandoor bread, crisp outside and pillowy soft inside, baked fresh throughout the day.",
        price: "$1.25",
      },
    ],
  },
  {
    id: "manakish-fatayer",
    name: "Manakish & Fatayer",
    description:
      "Hand-stretched flatbreads and hand-folded savory pies, baked fresh daily. All items $3.50.",
    image: "/Images/bakery.webp",
    items: [
      {
        name: "Manakish",
        description:
          "Flatbread topped with za'atar, cheese, or meat — Middle Eastern breakfast at its most authentic. A weekend staple in our Richardson bakery.",
        price: "$3.50",
        popular: true,
        image: "/Images/specialties/manakish.webp",
      },
      {
        name: "Fatayer — Spinach",
        description:
          "Hand-folded savory pies with spinach filling, baked fresh daily. Soft, golden, perfect with chai.",
        price: "$3.50 / pc",
        vegetarian: true,
      },
      {
        name: "Fatayer — Cheese",
        description:
          "Hand-folded savory pies stuffed with melted cheese, baked fresh daily until soft and golden. A vegetarian favorite, perfect with hot chai.",
        price: "$3.50 / pc",
        vegetarian: true,
      },
      {
        name: "Fatayer — Meat",
        description:
          "Hand-folded savory pies filled with seasoned ground meat, onions and spices, baked fresh daily until golden. A hearty Middle Eastern classic.",
        price: "$3.50 / pc",
      },
    ],
  },
  {
    id: "appetizers",
    name: "Appetizers",
    description: "Hot starters and Iraqi street-food classics, made fresh daily.",
    image: "/Images/dish-1.webp",
    items: [
      {
        name: "Sour Kibbeh (Bowl)",
        description:
          "Kibbeh served in a tangy tamarind-based broth. A beloved Iraqi comfort dish, best eaten with fresh samoon.",
        price: "$9.99",
        popular: true,
      },
      {
        name: "Kibbeh",
        description:
          "Fried bulgur shell stuffed with spiced ground meat, onions, and pine nuts. Crispy outside, rich and savory inside.",
        price: "$3.99 / pc",
      },
      {
        name: "Chickpea Soup (Leblebi)",
        description:
          "Hearty chickpea soup seasoned with cumin and lemon, served with toasted bread. A classic Iraqi street-food staple.",
        price: "$3.99",
        vegetarian: true,
      },
      {
        name: "Samosa",
        description:
          "Hand-folded and pan-fried golden. Choose from seasoned ground meat or vegetable filling — crispy on the outside, savory inside. Perfect as a quick snack, an appetizer, or by the tray for your next gathering.",
        price: "$2.75 / pc",
      },
      {
        name: "Egg Roll",
        description:
          "Crispy hand-rolled pastry with a savory filling, fried golden and served hot — a quick, crunchy bite or party-tray favorite.",
        price: "$1.99 / pc",
      },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Traditional Iraqi tea, coffee and dried-fruit drinks.",
    image: "/Images/gallery/baklava-pistachio-plate.webp",
    items: [
      {
        name: "Karak Chai",
        description:
          "Our signature variety. Rich, creamy black tea slowly steeped with cardamom, milk, and a touch of sweetness — the way Iraqi mornings are meant to start.",
        price: "$3.99",
        popular: true,
        image: "/Images/specialties/chai.webp",
      },
      {
        name: "Yemeni Coffee",
        description:
          "Aromatic spiced coffee brewed Yemeni-style — warm, fragrant, and deeply satisfying.",
        price: "$3.99",
      },
      {
        name: "Apricot Drink (Torshana)",
        description:
          "A traditional Iraqi dried-apricot drink — sweet, tangy, and refreshing. A Ramadan and celebration staple.",
        price: "$4.99",
      },
      {
        name: "Raisin Juice",
        description:
          "Naturally sweet juice made from soaked raisins. Light, refreshing, and full of flavor.",
        price: "$4.99",
      },
      {
        name: "Dried Lime Juice (Loomi)",
        description:
          "A uniquely Iraqi drink made from dried black limes. Tart, earthy, and unlike anything else.",
        price: "$4.99",
      },
    ],
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    description: "Cool off with our classic ice cream — available by the cone or cup.",
    image: "/Images/hero.webp",
    items: [
      {
        name: "Small Cone",
        description: "A single scoop of creamy ice cream in a classic crispy cone.",
        price: "$1.50",
      },
      {
        name: "Large Cone",
        description: "A generous scoop of creamy ice cream in a large crispy cone.",
        price: "$2.99",
      },
      {
        name: "Ice Cream Cup",
        description: "Creamy ice cream served in a cup — no cone, just the good stuff.",
        price: "$3.00",
      },
    ],
  },
];
