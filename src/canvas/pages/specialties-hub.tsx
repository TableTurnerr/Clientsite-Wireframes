import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import { RESTAURANT } from "@/data/restaurant";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import SmartImage from "@/components/shared/SmartImage";

function SpecialtiesIndexPage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Specialties", url: "/specialties/" },
          ]}
        />
      </Anno>

      <Anno id="intro">
        <section className="container-pad py-12 md:py-20 max-w-3xl">
          <div className="eyebrow">Our Craft</div>
          <h1 className="mb-6">Our {RESTAURANT.servesCuisine} Bakery &amp; Breakfast Specialties</h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Hand-baked daily — the dishes our family has made since {RESTAURANT.familyRecipeSince}.
          </p>
        </section>
      </Anno>

      <Anno id="grid">
        <section className="container-pad pb-12 md:pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map((s) => (
              <Link
                key={s.slug}
                href={`/specialties/${s.slug}/`}
                className="card overflow-hidden transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                {s.image && (
                  <div className="card-img aspect-[4/3]">
                    <SmartImage
                      src={s.image}
                      alt={`${s.name} — authentic ${RESTAURANT.servesCuisine} specialty at ${RESTAURANT.name}, ${RESTAURANT.dietary} bakery & café in ${RESTAURANT.address.city}, ${RESTAURANT.address.state}`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-full"
                    />
                  </div>
                )}
                <div className="p-6">
                  {s.heroEyebrow && (
                    <div className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-2">
                      {s.heroEyebrow}
                    </div>
                  )}
                  <h3
                    className="text-xl mb-3"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    {s.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 leading-relaxed mb-4">
                    {s.primaryBlock.body}
                  </p>
                  <span className="link-underline text-[var(--color-text)] font-medium text-sm inline-flex items-center gap-1">
                    Learn more about {s.name} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Anno>

      <Anno id="cta">
        <section className="container-pad section-pad text-center max-w-2xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <ThemeBtn href="/menu/" variant="primary">View Full Menu</ThemeBtn>
            <ThemeBtn href={RESTAURANT.orderOnline} external variant="secondary">
              Order Online
            </ThemeBtn>
          </div>
        </section>
      </Anno>

      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const specialtiesHub: WirePage = {
  id: "specialties-hub",
  title: "Specialties",
  route: "/specialties/",
  group: "Dynamic SEO Templates",
  Page: SpecialtiesIndexPage,
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
        { sys: "layout", text: "Home → Specialties trail" },
      ],
    },
    {
      id: "n-intro",
      anchor: "intro",
      side: "right",
      title: "Hub Intro",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "brand", text: "Subhead since `RESTAURANT.familyRecipeSince`" },
        { sys: "seo", text: "Only H1; `createMetadata()` title/canonical/OG" },
      ],
    },
    {
      id: "n-grid",
      anchor: "grid",
      side: "right",
      title: "Hub → Detail (parent → child)",
      lines: [
        { sys: "product", text: "Source: `specialties.ts` → `SPECIALTIES` (11 topics)" },
        { sys: "product", text: "Each card links `/specialties/[topic]/` — `generateStaticParams()`" },
        { sys: "layout", text: "3-col `card` grid; `s.image/heroEyebrow/primaryBlock.body`" },
      ],
    },
    {
      id: "n-seo",
      anchor: "grid",
      side: "left",
      title: "ItemList Schema",
      lines: [
        { sys: "seo", text: "Hub emits `ItemList` of all topic URLs for crawl coverage" },
      ],
    },
    {
      id: "n-color",
      anchor: "grid",
      side: "left",
      title: "Card Tokens",
      lines: [
        { sys: "color", text: "Image → box; heading `--font-display`; hover `--shadow-lift`" },
        { sys: "color", text: "`link-underline` on `--color-text`" },
      ],
    },
    {
      id: "n-cta",
      anchor: "cta",
      side: "right",
      title: "Closing CTAs",
      lines: [
        { sys: "brand", text: "`ThemeBtn` → `/menu/` + external `RESTAURANT.orderOnline`" },
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
