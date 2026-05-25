import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Link from "next/link";
import { MapPin, Clock, Star } from "lucide-react";
import { NEIGHBORHOODS } from "@/data/neighborhoods";
import { RESTAURANT } from "@/data/restaurant";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import QRHover from "@/components/shared/QRHover";
import SmartImage from "@/components/shared/SmartImage";

// EXACT composition of src/app/near/[city]/page.tsx — real components, real CSS.
// Async dynamic route made sync by hardcoding a sample city; one file renders
// all NEIGHBORHOODS via generateStaticParams() on the real site.
function NeighborhoodPage() {
  // Profiles renamed from the Al-Baghdady defaults won't have a "plano-tx"
  // neighborhood, so fall back to the first entry rather than crashing.
  const n = NEIGHBORHOODS.find((x) => x.slug === "plano-tx") ?? NEIGHBORHOODS[0];
  if (!n) return null;

  return (
    <>
      <Anno id="hdr"><Header /></Anno>

      <Anno id="crumbs">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/near/" },
            { name: n.city, url: `/near/${n.slug}/` },
          ]}
        />
      </Anno>

      <Anno id="hero">
        <section className="container-pad py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow">Serving {n.city}, {n.state}</div>
              <h1 className="mb-6">{n.heroHeadline}</h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-6">{n.heroSubheadline}</p>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={18} className="text-[var(--color-primary)]" />
                  <span className="font-medium">{n.driveTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star size={18} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  <span className="font-medium">
                    {RESTAURANT.ratingValue} ({RESTAURANT.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <ThemeBtn href="/menu/" variant="primary">View Menu</ThemeBtn>
                <QRHover value={RESTAURANT.orderOnline}>
                  <ThemeBtn href={RESTAURANT.orderOnline} external variant="secondary">Order Delivery</ThemeBtn>
                </QRHover>
              </div>
            </div>

            <SmartImage
              src="/Images/hero.webp"
              alt={`${RESTAURANT.servesCuisine} bakery and sweets at ${RESTAURANT.name}, serving ${n.city}, ${n.state}`}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/5] rounded-[var(--radius-section)] shadow-[0_30px_80px_-30px_rgba(26,20,16,0.35)]"
            />
          </div>
        </section>
      </Anno>

      <Anno id="dishes">
        <section className="bg-[var(--color-warm-white)] section-pad">
          <div className="container-pad max-w-3xl">
            <h2 className="mb-6">{RESTAURANT.servesCuisine} Food for {n.city}</h2>
            <p className="text-lg text-[var(--color-text-muted)] mb-6">{n.intro}</p>
            <p className="text-base text-[var(--color-text-muted)] mb-8">{n.body}</p>

            <h3 className="mb-4">Popular Dishes for {n.city} Diners</h3>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {n.popularDishes.map((dish) => (
                <li key={dish} className="card p-4 flex items-center gap-3">
                  <Clock size={18} className="text-[var(--color-primary)]" />
                  <span className="font-medium">{dish}</span>
                </li>
              ))}
            </ul>

            <ThemeBtn href="/menu/" variant="primary">See Full Menu</ThemeBtn>
          </div>
        </section>
      </Anno>

      <Anno id="visit">
        <section className="container-pad section-pad text-center max-w-2xl mx-auto">
          <h2 className="mb-4">Visit Us From {n.city}</h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            We&apos;re at {RESTAURANT.address.full} — {n.driveTime.toLowerCase()}. Free parking, {RESTAURANT.dietary} across the
            menu, and an in-house bakery for fresh samoon, kanafa and dessert trays.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <ThemeBtn
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(RESTAURANT.address.full)}`}
              external
              variant="primary"
            >
              Get Directions
            </ThemeBtn>
            <ThemeBtn href="/catering/" variant="secondary">Catering for {n.city}</ThemeBtn>
          </div>
        </section>
      </Anno>

      <Anno id="mesh">
        <section className="bg-[var(--color-warm-white)] section-pad">
          <div className="container-pad max-w-5xl">
            <h2 className="mb-3 text-center">Other {RESTAURANT.regionShort} Neighborhoods We Serve</h2>
            <p className="text-center text-[var(--color-text-muted)] mb-8">
              Authentic {RESTAURANT.servesCuisine} food, {RESTAURANT.dietary} bakery and catering — across the metroplex.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {NEIGHBORHOODS.filter((other) => other.slug !== n.slug).map((other) => (
                <Link
                  key={other.slug}
                  href={`/near/${other.slug}/`}
                  className="px-4 py-2 rounded-full border border-[var(--color-border)] bg-white text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {RESTAURANT.servesCuisine} food in {other.city}
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/near/"
                className="text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                View all service areas →
              </Link>
            </div>
          </div>
        </section>
      </Anno>

      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const nearCity: WirePage = {
  id: "near-city",
  title: "City (template)",
  route: "/near/[city]/",
  group: "Dynamic SEO Templates",
  Page: NeighborhoodPage,
  notes: [
    {
      id: "n-near-crumbs",
      anchor: "crumbs",
      side: "left",
      title: "One template, every city",
      lines: [
        { sys: "seo", text: "`/near/[city]/` — ONE file renders all 10 cities" },
        { sys: "product", text: "`generateStaticParams()` maps over `NEIGHBORHOODS`" },
        { sys: "seo", text: "`<BreadcrumbNav>` injects `BreadcrumbList` schema" },
      ],
    },
    {
      id: "n-near-hero",
      anchor: "hero",
      side: "right",
      title: "Per-city hero",
      lines: [
        { sys: "brand", text: "Copy = `neighborhood.heroHeadline` / `heroSubheadline`" },
        { sys: "brand", text: "Drive time = `n.driveTime`; rating = `RESTAURANT.ratingValue`" },
        { sys: "brand", text: "Delivery CTA = `RESTAURANT.orderOnline` (QR on hover)" },
        { sys: "seo", text: "Only H1 on the page" },
      ],
    },
    {
      id: "n-near-dishes",
      anchor: "dishes",
      side: "left",
      title: "Products = per-city dishes",
      lines: [
        { sys: "product", text: "List = `neighborhood.popularDishes`" },
        { sys: "brand", text: "Long-form `n.intro` + `n.body` (unique per city)" },
        { sys: "color", text: "Band bg `--color-warm-white`" },
      ],
    },
    {
      id: "n-near-visit",
      anchor: "visit",
      side: "right",
      title: "Visit / directions",
      lines: [
        { sys: "brand", text: "Address = `RESTAURANT.address.full`" },
        { sys: "layout", text: "Maps deep-link + `Catering for {city}` CTA" },
      ],
    },
    {
      id: "n-near-mesh",
      anchor: "mesh",
      side: "left",
      title: "Internal-link mesh",
      lines: [
        { sys: "seo", text: "Links every OTHER city in `NEIGHBORHOODS`" },
        { sys: "seo", text: "Cross-links spread crawl equity across the cluster" },
      ],
    },
    {
      id: "n-near-meta",
      anchor: "hdr",
      side: "right",
      title: "Per-city metadata",
      lines: [
        { sys: "seo", text: "`createMetadata()` from `n.metaTitle` / `metaDescription`" },
        { sys: "seo", text: "`<title>` + canonical `/near/{slug}/` per city" },
        { sys: "seo", text: "`keywords` = `n.keywords` (city-scoped)" },
      ],
    },
    {
      id: "n-near-ftr",
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
