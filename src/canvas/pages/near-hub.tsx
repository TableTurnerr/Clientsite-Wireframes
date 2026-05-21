import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { NEIGHBORHOODS } from "@/data/neighborhoods";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";

function ServiceAreasIndex() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/near/" },
          ]}
        />
      </Anno>

      <Anno id="intro">
        <section className="container-pad py-10 md:py-16 max-w-3xl">
          <div className="eyebrow">Across the DFW Metroplex</div>
          <h1 className="mb-6">Iraqi Food, Halal Bakery &amp; Catering — Serving DFW</h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            From our home in Richardson, we serve authentic Iraqi food, fresh-baked bakery items,
            and full catering across the Dallas-Fort Worth metroplex. Click your city for the
            neighborhood&apos;s dedicated page — drive times, popular dishes, and delivery info.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <ThemeBtn href="/menu/" variant="primary">View Full Menu</ThemeBtn>
            <ThemeBtn href="/catering/" variant="secondary">Catering Inquiries</ThemeBtn>
          </div>
        </section>
      </Anno>

      <Anno id="grid">
        <section className="container-pad pb-16 md:pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEIGHBORHOODS.map((n) => (
              <Link
                key={n.slug}
                href={`/near/${n.slug}/`}
                className="card p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--color-text-muted)] mb-3">
                  <MapPin size={12} className="text-[var(--color-primary)]" />
                  {n.state}
                </div>
                <h2
                  className="!text-xl !mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  {n.city}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] mb-3">
                  <Clock size={12} />
                  <span>{n.driveTime}</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 leading-relaxed mb-3">
                  {n.intro}
                </p>
                <span className="text-sm font-medium text-[var(--color-primary)]">
                  Visit page →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Anno>

      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const nearHub: WirePage = {
  id: "near-hub",
  title: "Service Areas",
  route: "/near/",
  group: "Dynamic SEO Templates",
  Page: ServiceAreasIndex,
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
        { sys: "layout", text: "Home → Service Areas trail" },
      ],
    },
    {
      id: "n-intro",
      anchor: "intro",
      side: "right",
      title: "Hub Intro",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "seo", text: "Only H1; `createMetadata()` title/canonical/OG" },
        { sys: "brand", text: "`ThemeBtn` → `/menu/` + `/catering/`" },
      ],
    },
    {
      id: "n-grid",
      anchor: "grid",
      side: "right",
      title: "Hub → Detail (parent → child)",
      lines: [
        { sys: "product", text: "Source: `neighborhoods.ts` → `NEIGHBORHOODS` (10 cities)" },
        { sys: "product", text: "Each card links `/near/[city]/` — `generateStaticParams()`" },
        { sys: "layout", text: "3-col `card` grid; `n.city/state/driveTime/intro`" },
      ],
    },
    {
      id: "n-seo",
      anchor: "grid",
      side: "left",
      title: "ItemList Schema",
      lines: [
        { sys: "seo", text: "Hub emits `ItemList` of all city URLs for crawl coverage" },
      ],
    },
    {
      id: "n-color",
      anchor: "grid",
      side: "left",
      title: "Card Tokens",
      lines: [
        { sys: "color", text: "Pin/CTA `--color-primary`; hover `--shadow-lift`" },
        { sys: "color", text: "City heading `--font-display`" },
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
