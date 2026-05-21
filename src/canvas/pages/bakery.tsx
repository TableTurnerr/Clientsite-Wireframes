import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import QRHover from "@/components/shared/QRHover";
import SmartImage from "@/components/shared/SmartImage";
import { RESTAURANT } from "@/data/restaurant";
import { MENU } from "@/data/menu";
import { SPECIALTIES } from "@/data/specialties";

const BAKERY_CATEGORY_IMAGE = "/Images/gallery/baklava-tiered-tray.webp";

const featuredBakeryItems = (
  MENU.find((c) => c.id === "bakery-sweets")?.items.filter((i) => i.popular) ?? []
).slice(0, 6);

const BAKERY_SPECIALTY_SLUGS = [
  "baklava",
  "kunafa",
  "burma",
  "lady-fingers",
  "manakish",
  "fatayer",
  "bread",
] as const;

const bakerySpecialties = BAKERY_SPECIALTY_SLUGS
  .map((slug) => SPECIALTIES.find((s) => s.slug === slug))
  .filter((s): s is NonNullable<typeof s> => s !== undefined);

// EXACT composition of src/app/bakery/page.tsx — real components, real CSS.
function BakeryPage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Bakery", url: "/bakery/" },
          ]}
        />
      </Anno>

      <Anno id="hero">
        <section className="container-pad py-10 md:py-16 max-w-3xl">
          <div className="eyebrow">Four Generations · Since {RESTAURANT.familyRecipeSince}</div>
          <h1 className="mb-6">Our Bakery — Fresh {RESTAURANT.servesCuisine} Sweets, Bread &amp; Breakfast</h1>
          <p className="text-lg text-[var(--color-text-muted)] mb-4 leading-relaxed">
            Our in-house bakery is the heart of {RESTAURANT.brandShort}. Every morning we fire up the tandoor for fresh samoon, layer phyllo for kunafa and baklava, hand-roll burma and ladyfingers, and hand-fold fatayer and manakish — all from the recipes our family has been baking since {RESTAURANT.familyRecipeSince}.
          </p>
          <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
            Stop in for a warm samoon, pick up a tray of mixed sweets, or order ahead for your next celebration. Everything is baked the day you eat it.
          </p>
        </section>
      </Anno>

      <Anno id="case">
        <section className="container-pad pb-16 md:pb-24">
          <h2 className="mb-8">What&apos;s in the case today.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBakeryItems.map((item) => (
              <article key={item.name} className="card p-0">
                <div className="card-img aspect-[4/3]">
                  <SmartImage
                    src={item.image ?? BAKERY_CATEGORY_IMAGE}
                    alt={`${item.name} — fresh-baked ${RESTAURANT.servesCuisine} bakery sweets at ${RESTAURANT.brandShort} in ${RESTAURANT.address.city}, ${RESTAURANT.address.state}`}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl mb-2"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 max-w-3xl">
            <h2 className="mb-3">Browse our specialties</h2>
            <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
              Each one has its own page — story, recipe, and how to order.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bakerySpecialties.map((s) => (
              <Link
                key={s.slug}
                href={`/specialties/${s.slug}/`}
                className="card p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  {s.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed mb-3">
                  {s.primaryBlock.body}
                </p>
                <span className="text-sm font-medium text-[var(--color-primary)]">
                  View →
                </span>
              </Link>
            ))}
          </div>

          {/* DRAFT (2026-05-21) — topical SEO content for the bakery page. Pending Hasham/client brand-voice review. */}
          <div className="mt-20 max-w-3xl">
            <div className="eyebrow">Our Bakery</div>
            <h2 className="mb-5">An Authentic {RESTAURANT.servesCuisine} &amp; Arabic Bakery in {RESTAURANT.address.city}, {RESTAURANT.address.state}</h2>
            <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
              <p>
                At {RESTAURANT.brandShort}, every tray of{" "}
                <Link href="/specialties/baklava/" className="link-underline text-[var(--color-text)]">baklava</Link>,{" "}
                <Link href="/specialties/kunafa/" className="link-underline text-[var(--color-text)]">kunafa</Link> and{" "}
                <Link href="/specialties/burma/" className="link-underline text-[var(--color-text)]">burma</Link> is baked in-house from
                recipes our family has carried from {RESTAURANT.originCity} since {RESTAURANT.familyRecipeSince}. Master baker Salah Hassan layers
                paper-thin phyllo by hand, grinds fresh pistachios and walnuts daily, and finishes each batch
                with our signature honey syrup — the way an {RESTAURANT.servesCuisine} bakery is meant to.
              </p>
              <p>
                Looking for a {RESTAURANT.dietary.toLowerCase()} cake shop or Arabic bakery near you in the {RESTAURANT.region} area? Our case
                is stocked fresh every day with pistachio and walnut baklava, cream-filled mabrouma,{" "}
                <Link href="/specialties/lady-fingers/" className="link-underline text-[var(--color-text)]">znood al sit ladyfingers</Link>,
                bird&apos;s nest, awama and dehena, alongside fresh-baked{" "}
                <Link href="/specialties/bread/" className="link-underline text-[var(--color-text)]">samoon and tandoor bread</Link>.
                Whether you want a single piece with your chai or a full sweets tray for Eid, a wedding or a
                Ramadan iftar, everything is 100% {RESTAURANT.dietary.toLowerCase()} and Zabihah-verified.
              </p>
            </div>
          </div>

          <div className="bg-[var(--color-warm-white)] rounded-[var(--radius-section)] p-10 md:p-16 mt-16 text-center border border-[var(--color-border)]">
            <h2 className="mb-4">Custom dessert trays for your celebration.</h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8 leading-relaxed">
              Hosting an Eid party, wedding, baby shower or corporate event? Our custom trays make
              beautiful, traditional centerpieces. Mix kanafa, baklava, ladyfingers and ma&apos;amoul,
              sized for any guest count.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <ThemeBtn href="/catering/" variant="primary">Request a Tray</ThemeBtn>
              <QRHover value={`tel:${RESTAURANT.phoneRaw}`}>
                <ThemeBtn href={`tel:${RESTAURANT.phoneRaw}`} variant="secondary">Call Us</ThemeBtn>
              </QRHover>
            </div>
          </div>
        </section>
      </Anno>
      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const bakery: WirePage = {
  id: "bakery",
  title: "Bakery",
  route: "/bakery/",
  group: "Core Pages",
  Page: BakeryPage,
  notes: [
    {
      id: "n-hdr",
      anchor: "hdr",
      side: "left",
      title: "Global Header",
      lines: [
        { sys: "layout", text: "Shared sticky `<Header>` on every page" },
        { sys: "brand", text: "Name = `RESTAURANT.name`; phone = `RESTAURANT.phone`" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [
        { sys: "seo", text: "`<BreadcrumbNav>` auto-injects `BreadcrumbList` schema" },
        { sys: "layout", text: "Home → Bakery trail" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "right",
      title: "Page Hero",
      lines: [
        { sys: "color", text: "Eyebrow `.eyebrow`, H1 `--font-display`" },
        { sys: "brand", text: "Eyebrow “Four Generations · Since 1919”" },
        { sys: "seo", text: "Only H1 on the page" },
      ],
    },
    {
      id: "n-case",
      anchor: "case",
      side: "right",
      title: "Products = parent → child",
      lines: [
        { sys: "product", text: "Source: `MENU` → category `bakery-sweets`" },
        { sys: "product", text: "`.items.filter(popular)` slice 6 (`featuredBakeryItems`)" },
        { sys: "product", text: "Specialty cards = `SPECIALTIES` by `BAKERY_SPECIALTY_SLUGS`" },
      ],
    },
    {
      id: "n-seo",
      anchor: "case",
      side: "left",
      title: "SEO mesh + CTA",
      lines: [
        { sys: "seo", text: "Internal links to `/specialties/*`" },
        { sys: "color", text: "CTA panel bg `--color-warm-white`, `--radius-section`" },
        { sys: "brand", text: "Call CTA = `RESTAURANT.phoneRaw` via `QRHover`" },
      ],
    },
    {
      id: "n-ftr",
      anchor: "ftr",
      side: "right",
      title: "Global Footer (dark)",
      lines: [
        { sys: "color", text: "Bg `--color-text`; bottom bar `--color-primary-dark`" },
        { sys: "brand", text: "Socials `RESTAURANT.socials.{instagram,facebook}`" },
      ],
    },
  ],
};
