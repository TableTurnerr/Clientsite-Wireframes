import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import SmartImage from "@/components/shared/SmartImage";

const SPECIALTY_LINKS: Record<string, { href: string; label: string }> = {
  "Samoon": { href: "/specialties/bread/", label: "Read more about our samoon →" },
  "Kahi & Qeimar": {
    href: "/specialties/breakfast/",
    label: "Read more about our Iraqi breakfast →",
  },
  "Kanafa": { href: "/specialties/kunafa/", label: "Read more about our kunafa →" },
  "Baklava": { href: "/specialties/baklava/", label: "Read more about our baklava →" },
  "Burma": { href: "/specialties/burma/", label: "Read more about our burma →" },
  "Ladyfingers (Znood Al Sit)": {
    href: "/specialties/lady-fingers/",
    label: "Read more about our ladyfingers →",
  },
  "Fatayer": { href: "/specialties/fatayer/", label: "Read more about our fatayer →" },
  "Manakish": { href: "/specialties/manakish/", label: "Read more about our manakish →" },
};

const DISHES = [
  {
    name: "Samoon",
    summary: "Iraq's traditional oval-shaped bread.",
    body: "Samoon is what holds an Iraqi table together. It's an oval-shaped, diamond-faceted bread baked at high heat — crisp on the outside, pillowy and chewy inside. We bake fresh samoon throughout the day in our in-house stone oven. It's the perfect partner to a breakfast plate, a piece of baklava, or a glass of hot chai.",
  },
  {
    name: "Kahi & Qeimar",
    summary: "Iraq's most beloved sweet breakfast.",
    body: "Kahi is flaky, golden, layered pastry — shatteringly crisp, brushed with syrup — and qeimar is the rich clotted cream served alongside it. Together they're the breakfast Iraqis grew up on. We make kahi fresh every morning; it's the first thing many of our regulars order.",
  },
  {
    name: "Baqila",
    summary: "Fava beans simmered in their own broth.",
    body: "Baqila bil-dihin is a national Iraqi breakfast tradition — tender fava beans slow-simmered in their own broth, served with eggs, crispy fried onions, and warm bread soaked in the broth. Warming, humble, and deeply satisfying.",
  },
  {
    name: "Kubba",
    summary: "Bulgur shells stuffed with spiced meat.",
    body: "Iraqi kubba is hand-rolled — a bulgur shell wrapped around seasoned ground meat, onions and herbs, then fried until golden and crisp. We serve it as a breakfast plate or a sandwich, and it's just as good torn into a bowl of sour kibbeh broth.",
  },
  {
    name: "Kanafa",
    summary: "Sticky cheese pastry soaked in syrup.",
    body: "Kanafa is the dessert that's having a moment everywhere — and we've been making it the right way for years. Shredded phyllo dough, melted cheese, rose-water syrup and crushed pistachios. The trick is the contrast: crispy top, gooey cheese center, syrupy sweetness.",
  },
  {
    name: "Baklava",
    summary: "Layered phyllo with nuts and honey.",
    body: "Our baklava is made fresh in the bakery — paper-thin phyllo layered with walnut or pistachio and our family's honey syrup. We sell it by the piece or by the tray, perfect for parties, Eid and weddings. The recipe has been in our family since 1919.",
  },
  {
    name: "Mabrouma",
    summary: "Coiled phyllo packed with pistachios.",
    body: "Mabrouma is the showpiece of the Iraqi sweets case — long strands of phyllo coiled tight around fresh pistachios, baked deep gold and finished with syrup. We make it plain, with cream, and in a premium pistachio-loaded version.",
  },
  {
    name: "Burma",
    summary: "Cigar-rolled phyllo with pistachios.",
    body: "Burma is rolled phyllo, packed end to end with pistachios and finished with syrup — crisp, nutty, and one of the lesser-known Iraqi sweets worth seeking out. Cut into rounds, it's a favorite on celebration trays.",
  },
  {
    name: "Ladyfingers (Znood Al Sit)",
    summary: "Crispy phyllo rolls filled with sweet cream.",
    body: "Znood al sit — literally 'the lady's arms' — are crisp phyllo rolls stuffed with sweet cream and dipped in fragrant syrup. Light, crunchy and beautifully sweet. A bakery-case favorite.",
  },
  {
    name: "Awama",
    summary: "Bite-sized fried dough fritters in syrup.",
    body: "Awama (luqaimat) are little fried dough fritters — crisp outside, soft inside, soaked in our family's honey syrup. A celebration favorite at every Iraqi gathering, most often spotted on Eid and wedding trays.",
  },
  {
    name: "Fatayer",
    summary: "Hand-folded savory pies.",
    body: "Fatayer are hand-folded savory pies, baked fresh daily — spinach, cheese or seasoned meat tucked into soft, golden dough. Perfect with chai, by the box for an office breakfast, or by the tray for a gathering.",
  },
  {
    name: "Manakish",
    summary: "Hand-stretched flatbread, baked to order.",
    body: "Manakish is hand-stretched flatbread topped with za'atar, cheese, or meat — Middle Eastern breakfast at its most authentic. A weekend staple in our Richardson bakery, baked fresh on the spot.",
  },
];

function IraqiCuisinePage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Iraqi Cuisine", url: "/iraqi-cuisine/" },
          ]}
        />
      </Anno>

      <Anno id="intro">
        <section className="container-pad py-10 md:py-16 max-w-3xl">
          <div className="eyebrow">From Baghdad to Richardson</div>
          <h1 className="mb-6">Iraqi Cuisine — A Guide to the Iraqi Bakery &amp; Breakfast Tradition</h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Iraqi cuisine is its own world — distinct breads like samoon, a beloved morning tradition of kahi, qeimar and baqila, and a bakery heritage of baklava, kanafa and mabrouma stretching back over a century. The techniques, spice blends, and family recipes carry their own Baghdadi heritage. Here&apos;s a guide to what we bake fresh every day at Albaghdady.
          </p>
        </section>
      </Anno>

      <Anno id="dishes">
        <section className="container-pad pb-16 md:pb-24">
          <div className="grid gap-6">
            {DISHES.map((dish, i) => {
              const images = ["/Images/hero.webp", "/Images/dish-1.webp", "/Images/dish-2.webp", "/Images/dish-3.webp", "/Images/dish-4.webp", "/Images/bakery.webp"];
              const reverse = i % 2 === 1;
              const specialtyLink = SPECIALTY_LINKS[dish.name];
              return (
                <article
                  key={dish.name}
                  className={`card p-7 md:p-10 grid md:grid-cols-3 gap-7 md:gap-12 items-center ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="card-img aspect-square rounded-2xl overflow-hidden">
                    <SmartImage
                      src={images[i % images.length]}
                      alt={`${dish.name} — authentic Iraqi dish at Al-Baghdady, halal bakery & café in Richardson, TX`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.2em] mb-3">
                      {String(i + 1).padStart(2, "0")} — Dish
                    </div>
                    <h2 className="!text-2xl md:!text-3xl mb-3">{dish.name}</h2>
                    <div className="text-[var(--color-primary)] font-medium mb-4">{dish.summary}</div>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">{dish.body}</p>
                    {specialtyLink && (
                      <Link
                        href={specialtyLink.href}
                        className="text-sm font-medium text-[var(--color-primary)] hover:underline mt-3 inline-flex"
                      >
                        {specialtyLink.label}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* DRAFT (2026-05-21) — closing topical content + internal links. Pending Hasham/client brand-voice review. */}
          <div className="max-w-3xl mt-20">
            <div className="eyebrow">Visit Us</div>
            <h2 className="mb-5">Taste Authentic Iraqi Cuisine in Richardson, TX</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Every dish in this guide is baked or cooked fresh at Al-Baghdady, a family-run halal Iraqi
              bakery and breakfast café in Richardson serving the greater Dallas–Fort Worth area. Stop in for
              a traditional{" "}
              <Link href="/specialties/breakfast/" className="link-underline text-[var(--color-text)]">Iraqi breakfast</Link> with hot{" "}
              <Link href="/specialties/chai/" className="link-underline text-[var(--color-text)]">karak chai</Link>, take home a box of{" "}
              <Link href="/specialties/baklava/" className="link-underline text-[var(--color-text)]">baklava</Link> and{" "}
              <Link href="/specialties/kunafa/" className="link-underline text-[var(--color-text)]">kunafa</Link>, or order a full Iraqi
              spread for your next event through our{" "}
              <Link href="/catering/" className="link-underline text-[var(--color-text)]">catering</Link> team. Come hungry — leave full.
            </p>
          </div>

          <div className="text-center mt-16 flex flex-wrap gap-3 justify-center">
            <ThemeBtn href="/menu/" variant="primary">See Everything on the Menu</ThemeBtn>
            <ThemeBtn href="/specialties/" variant="secondary">Explore Our Specialties</ThemeBtn>
          </div>
        </section>
      </Anno>

      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const iraqiCuisine: WirePage = {
  id: "iraqi-cuisine",
  title: "Iraqi Cuisine",
  route: "/iraqi-cuisine/",
  group: "Core Pages",
  Page: IraqiCuisinePage,
  notes: [
    {
      id: "n-hdr",
      anchor: "hdr",
      side: "left",
      title: "Global Header",
      lines: [
        { sys: "layout", text: "Shared sticky `<Header>` on every page" },
        { sys: "brand", text: "Logo + name = `RESTAURANT.name`; CTA = `RESTAURANT.orderOnline`" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [
        { sys: "seo", text: "Auto-injects `breadcrumbSchema()` (BreadcrumbList)" },
        { sys: "layout", text: "Home → Iraqi Cuisine trail" },
      ],
    },
    {
      id: "n-intro",
      anchor: "intro",
      side: "right",
      title: "Guide Intro",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "seo", text: "Only H1; `createMetadata()` drives title/canonical/OG" },
      ],
    },
    {
      id: "n-dishes",
      anchor: "dishes",
      side: "left",
      title: "Dish Guide (local data)",
      lines: [
        { sys: "product", text: "Maps module-level `DISHES` array (12 articles)" },
        { sys: "product", text: "`SPECIALTY_LINKS` cross-links to `/specialties/[topic]/`" },
        { sys: "layout", text: "Alternating image/text, `card` rows; image → box" },
      ],
    },
    {
      id: "n-visit",
      anchor: "dishes",
      side: "right",
      title: "Topical Content + Mesh",
      lines: [
        { sys: "seo", text: "Internal-link mesh to specialties + `/catering/`" },
        { sys: "color", text: "`link-underline` hover on `--color-text`" },
      ],
    },
    {
      id: "n-cta",
      anchor: "dishes",
      side: "right",
      title: "Closing CTAs",
      lines: [
        { sys: "brand", text: "`ThemeBtn` → `/menu/` + `/specialties/`" },
        { sys: "color", text: "`.btn-primary` `--color-primary`, `.btn-secondary`" },
      ],
    },
    {
      id: "n-ftr",
      anchor: "ftr",
      side: "left",
      title: "Global Footer (dark)",
      lines: [
        { sys: "color", text: "Bg `--color-text`; bottom bar `--color-primary-dark`" },
        { sys: "brand", text: "Socials `RESTAURANT.socials.{instagram,facebook}`" },
      ],
    },
  ],
};
