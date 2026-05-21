import { RESTAURANT } from "./restaurant";

export type FAQ = { question: string; answer: string };

// Inline links use markdown-style syntax: [anchor text](/url/).
// FAQSection renders these as <Link> elements; faqSchema strips them to plain text.
export const FAQS: FAQ[] = [
  {
    question: "Is everything on your menu halal?",
    answer:
      "Yes. Every dish at Al-Baghdady is 100% [halal and Zabihah-verified](/specialties/halal-food/). We source only from halal-certified suppliers, and [our entire kitchen is halal](/our-story/).",
  },
  {
    question: "Where are you located?",
    answer:
      `We're at ${RESTAURANT.address.full} — minutes from [Plano](/near/plano-tx/), [Garland](/near/garland-tx/), [Addison](/near/addison-tx/), [North Dallas](/near/north-dallas-tx/), [Irving](/near/irving-tx/) and [Frisco](/near/frisco-tx/). Free parking on site.`,
  },
  {
    question: "Do you offer catering for weddings and corporate events?",
    answer:
      `Yes — Al-Baghdady caters weddings, corporate lunches, Ramadan iftars, Eid celebrations and private events across DFW. We're especially known for [baklava and kunafa trays](/specialties/baklava/), [fatayer boxes](/specialties/fatayer/) and full Iraqi sweets spreads. Visit our [Catering page](/catering/) or call ${RESTAURANT.phone} for a quote.`,
  },
  {
    question: "What is samoon bread?",
    answer:
      "Samoon is the traditional Iraqi oval-shaped bread, with a crisp crust and pillowy interior. We bake it fresh [in our tandoor](/specialties/bread/) throughout the day. It's the perfect partner to chai, baklava and our [Iraqi breakfast plates](/specialties/breakfast/).",
  },
  {
    question: "What is kanafa?",
    answer:
      "Kanafa (also spelled kunafa) is a beloved Iraqi-Levantine dessert — shredded phyllo dough layered with melted cheese, soaked in syrup and topped with crushed pistachios. We make [our kanafa fresh to order](/specialties/kunafa/) so it arrives hot from the oven.",
  },
  {
    question: "Do you have a bakery on site?",
    answer:
      "Yes. [Our in-house bakery](/bakery/) makes fresh [samoon](/specialties/bread/), [kunafa](/specialties/kunafa/), [baklava](/specialties/baklava/), [ladyfingers (znood al sit)](/specialties/lady-fingers/), burma, mabrouma, [fatayer](/specialties/fatayer/) and [manakish](/specialties/manakish/) — all from family recipes since 1919. Custom trays available for [catering](/catering/).",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Yes — order delivery directly through our website or via Postmates. We deliver across Richardson, [Plano](/near/plano-tx/), [Garland](/near/garland-tx/), [Addison](/near/addison-tx/) and most of [North Dallas](/near/north-dallas-tx/).",
  },
  {
    question: "Do you take reservations?",
    answer:
      `We don't take reservations — Al-Baghdady is walk-ins only. Most parties are seated within 15 minutes. For large catering or group orders, please call ${RESTAURANT.phone}.`,
  },
  {
    question: "Are you family-friendly?",
    answer:
      "Absolutely. Al-Baghdady is a [family-owned restaurant](/our-story/) and we welcome guests of all ages. We have a [kids menu](/menu/) and high chairs available.",
  },
  {
    question: "Do you have vegetarian options?",
    answer:
      "Yes. Our spinach and cheese fatayer, cheese manakish, chickpea soup (leblebi), and the full bakery case of baklava, kunafa and Iraqi sweets are all vegetarian. Several can be made vegan on request.",
  },
  {
    question: "What's the difference between Iraqi and Mediterranean food?",
    answer:
      "Iraqi cuisine has its own distinct character — unique breads like samoon and tandoor bread, a beloved morning tradition of kahi & qeimar and baqila, and a bakery heritage of mabrouma, burma and bird's nest rooted in Mesopotamian baking. While there's overlap with Lebanese and Mediterranean sweets, [dishes like samoon, kahi and mabrouma](/iraqi-cuisine/) are uniquely Iraqi.",
  },
  {
    question: "Do you offer custom dessert trays for parties?",
    answer:
      "Yes — we make [custom trays of baklava, kanafa, mabrouma and ladyfingers](/bakery/) for [weddings, Eid and Ramadan](/catering/) and any celebration. Call ahead at least 24 hours.",
  },
  {
    question: "What are your hours?",
    answer:
      "We're open Tuesday through Thursday and Sunday from 10 AM to 9 PM, Friday and Saturday from 10 AM to 10 PM, and Monday from 11 AM to 9 PM. [Iraqi breakfast](/menu/) is served every day except Monday, 10:00 AM – 12:30 PM.",
  },
  {
    question: "Do you offer gluten-free options?",
    answer:
      "We're a traditional bakery, so most of what we make is built on wheat flour. Please let our team know about any allergies and we'll happily talk through ingredients and point you toward what works.",
  },
  {
    question: "Where can I park?",
    answer:
      "Free parking is available in our lot on N Greenville Ave and on adjacent streets.",
  },
  {
    question: "Do you serve breakfast?",
    answer:
      "Yes — [Iraqi breakfast](/menu/) is one of our specialties. Every day except Monday, from 10:00 AM to 12:30 PM, we serve traditional breakfast plates like Albaghdady Plate, Kahi & Qeimar, Baqila, fresh Kubba and warm samoon from our tandoor, all paired with hot chai. Walk in any morning Tue–Sun.",
  },
  {
    question: "Are there really two Al-Baghdady locations?",
    answer:
      `Our restaurant and bakery share one location at ${RESTAURANT.address.full} [under the same ownership](/our-story/). The [bakery](/bakery/) serves fresh samoon, kanafa and traditional sweets; the [restaurant](/menu/) serves the full menu of Iraqi specialties.`,
  },
  {
    question: "Do you accept large catering orders?",
    answer:
      "Yes, we cater events from 20 to 500+ guests. Wedding banquets, corporate lunches, Ramadan iftars and Eid parties are all welcome. Submit a [catering inquiry on our Catering page](/catering/).",
  },
  {
    question: "Is your samoon bread baked daily?",
    answer:
      "Fresh samoon comes out of [our stone oven](/bakery/) every few hours, all day long. You can buy loaves to take home or have it served warm with your meal.",
  },
  {
    question: "What is mabrouma?",
    answer:
      "Mabrouma is one of the showpiece sweets in our [bakery case](/bakery/) — long strands of phyllo coiled tight around fresh pistachios, baked deep gold and finished with syrup. We make it plain, with cream, and in a premium pistachio-loaded version.",
  },
];
