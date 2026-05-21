import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Link from "next/link";
import { Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import CateringForm from "@/components/catering/CateringForm";
import { RESTAURANT } from "@/data/restaurant";

// EXACT composition of src/app/catering/page.tsx — real components, real CSS.
function CateringPage() {
  // Computed in render so live config edits propagate.
  const SERVICES = [
    "Eid celebrations — assorted baklava and kunafa trays, full sweets spreads",
    "Weddings & engagements — custom dessert tables, ladyfingers, burma, mabrouma",
    `Ramadan iftars — full ${RESTAURANT.servesCuisine} spread ready at sunset, samoon, fatayer, manakish`,
    `Corporate lunches — breakfast catering, dessert boxes, ${RESTAURANT.dietary.toLowerCase()}-friendly options`,
    "Family gatherings — baklava trays, kunafa platters, fatayer boxes (cheese, spinach, meat)",
    `Delivery across ${RESTAURANT.cateringAreas}`,
  ];

  const STEPS = [
    {
      n: "1",
      title: "Submit your inquiry",
      body: "Fill out the form below or call us. Tell us your date, guest count and event type.",
    },
    {
      n: "2",
      title: "We design your menu",
      body: `Our team builds a ${RESTAURANT.dietary.toLowerCase()} ${RESTAURANT.servesCuisine} spread that fits your event, dietary needs and budget.`,
    },
    {
      n: "3",
      title: "We deliver and set up",
      body: "Drop-off or full-service catering with warming trays, serving ware and our team on site.",
    },
  ];
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Catering", url: "/catering/" },
          ]}
        />
      </Anno>

      <Anno id="hero">
        <section className="container-pad py-10 md:py-16 max-w-3xl">
          <div className="eyebrow">Catering</div>
          <h1 className="mb-6">{RESTAURANT.servesCuisine} Dessert Catering in {RESTAURANT.region} — Authentic Kunafa, Baklava Trays and More</h1>
          <p className="text-lg text-[var(--color-text-muted)] mb-5 leading-relaxed">
            Sweets, savories, and trays that make the event. For over a decade, {RESTAURANT.brandShort} has catered Middle Eastern desserts and {RESTAURANT.servesCuisine} savories all across {RESTAURANT.address.city}, {RESTAURANT.stateFull} — Eid celebrations, weddings, engagement parties, Ramadan iftars, corporate lunches, and family gatherings of every size. If it&apos;s worth celebrating, it&apos;s worth doing right.
          </p>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Our catering menu spans the full range of what we bake fresh in-house: assorted baklava trays, kunafa platters, ladyfingers, burma, fatayer (cheese, spinach, meat), manakish, samoon, and full {RESTAURANT.servesCuisine} sweets spreads with mabrouma, awama, and the rest of our family menu. Everything is made the day of your event. Nothing is frozen, nothing is pre-packed, nothing tastes like it sat on a shelf.
          </p>
        </section>
      </Anno>

      <Anno id="services">
        <section className="container-pad pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="mb-6">What We Cater</h2>
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <Check size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                    <span className="text-[var(--color-text)]">{s}</span>
                  </li>
                ))}
              </ul>

              <h2 className="!mt-12 !mb-6">How It Works</h2>
              <div className="space-y-5">
                {STEPS.map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold shrink-0">
                      {step.n}
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                        {step.title}
                      </div>
                      <p className="text-sm text-[var(--color-text-muted)]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm italic text-[var(--color-text-muted)]">
                Catering minimums apply. Please order at least 48 hours in advance for large events.
              </p>
            </div>

            <div>
              <CateringForm />
            </div>
          </div>
        </section>
      </Anno>

      {/* DRAFT (2026-05-21) — topical SEO content + internal links for the catering page. Pending Hasham/client brand-voice review. */}
      <Anno id="seo">
        <section className="container-pad pb-16 max-w-3xl">
          <div className="eyebrow">Catering Across {RESTAURANT.regionShort}</div>
          <h2 className="mb-5">{RESTAURANT.dietary} {RESTAURANT.servesCuisine} &amp; Middle Eastern Catering for Every Occasion</h2>
          <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
            <p>
              From intimate family gatherings to weddings of several hundred guests, {RESTAURANT.brandShort} caters
              authentic {RESTAURANT.servesCuisine} and Middle Eastern food across {RESTAURANT.address.city}, Plano, Garland, Allen, Frisco,
              Carrollton and the wider {RESTAURANT.region} area. Our most-requested trays are assorted{" "}
              <Link href="/specialties/baklava/" className="link-underline text-[var(--color-text)]">baklava</Link>, hot{" "}
              <Link href="/specialties/kunafa/" className="link-underline text-[var(--color-text)]">kunafa</Link>,{" "}
              <Link href="/specialties/burma/" className="link-underline text-[var(--color-text)]">burma</Link> and{" "}
              <Link href="/specialties/lady-fingers/" className="link-underline text-[var(--color-text)]">ladyfingers</Link>, but we
              build the full spread to fit your event.
            </p>
            <p>
              Planning an Eid celebration, Ramadan iftar or engagement party? Pair a sweets tray with savory{" "}
              <Link href="/specialties/fatayer/" className="link-underline text-[var(--color-text)]">fatayer</Link> and{" "}
              <Link href="/specialties/manakish/" className="link-underline text-[var(--color-text)]">manakish</Link>, fresh{" "}
              <Link href="/specialties/bread/" className="link-underline text-[var(--color-text)]">samoon</Link>, and urns of cardamom{" "}
              <Link href="/specialties/chai/" className="link-underline text-[var(--color-text)]">karak chai</Link>. Browse the full{" "}
              <Link href="/menu/" className="link-underline text-[var(--color-text)]">menu</Link> for ideas, then send your date and
              guest count above — everything is baked the day of your event and is 100% {RESTAURANT.dietary.toLowerCase()} and Zabihah-verified.
            </p>
          </div>
        </section>
      </Anno>
      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const catering: WirePage = {
  id: "catering",
  title: "Catering",
  route: "/catering/",
  group: "Core Pages",
  Page: CateringPage,
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
        { sys: "layout", text: "Home → Catering trail" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "right",
      title: "Page Hero",
      lines: [
        { sys: "color", text: "Eyebrow `.eyebrow`, H1 `--font-display`" },
        { sys: "seo", text: "Only H1; page also injects `cateringServiceSchema()`" },
      ],
    },
    {
      id: "n-services",
      anchor: "services",
      side: "left",
      title: "What We Cater / How It Works",
      lines: [
        { sys: "product", text: "Lists from local `SERVICES` + `STEPS` consts" },
        { sys: "color", text: "Check icons + step badges `--color-primary`" },
      ],
    },
    {
      id: "n-form",
      anchor: "services",
      side: "right",
      title: "CateringForm",
      lines: [
        { sys: "layout", text: "`<CateringForm>` — mailto-based, no backend" },
        { sys: "brand", text: "Sends to `RESTAURANT.email`" },
      ],
    },
    {
      id: "n-seo",
      anchor: "seo",
      side: "left",
      title: "SEO content mesh",
      lines: [
        { sys: "seo", text: "Internal links to `/specialties/*` and `/menu/`" },
        { sys: "color", text: "Links `.link-underline`" },
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
