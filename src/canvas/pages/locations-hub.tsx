import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import SmartImage from "@/components/shared/SmartImage";

// NEW (multi-location): hub listing physical branches. Sample = 3 branches.
const LOCATIONS = [
  { slug: "richardson", city: "Richardson", address: "327 N Greenville Ave, Richardson, TX 75081", hours: "Mon–Sun · 10 AM – 10 PM" },
  { slug: "plano", city: "Plano", address: "1900 Preston Rd, Plano, TX 75093", hours: "Mon–Sun · 10 AM – 10 PM" },
  { slug: "frisco", city: "Frisco", address: "8980 Preston Rd, Frisco, TX 75034", hours: "Mon–Sun · 10 AM – 10 PM" },
];

function LocationsHubPage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Locations", url: "/locations/" }]} />
      </Anno>

      <Anno id="hero">
        <section className="container-pad py-10 md:py-16 max-w-3xl">
          <div className="eyebrow">Our Locations</div>
          <h1 className="mb-6">Visit Us Across Dallas–Fort Worth</h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Find your nearest Al-Baghdady bakery & café. Each location bakes fresh daily — pick the one closest to you for hours, directions and online ordering.
          </p>
        </section>
      </Anno>

      <Anno id="branches">
        <section className="container-pad pb-16 md:pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <div key={loc.slug} className="card p-0 overflow-hidden">
                <div className="card-img aspect-[16/10]">
                  <SmartImage src="/Images/hero.webp" alt={`Al-Baghdady ${loc.city} map`} sizes="(min-width: 1024px) 33vw, 100vw" className="w-full h-full" />
                </div>
                <div className="p-6">
                  <h2 className="!text-xl !mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>{loc.city}</h2>
                  <div className="flex items-start gap-2 text-sm text-[var(--color-text-muted)] mb-2">
                    <MapPin size={15} className="text-[var(--color-primary)] shrink-0 mt-0.5" />{loc.address}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-5">
                    <Clock size={15} className="text-[var(--color-primary)] shrink-0" />{loc.hours}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <ThemeBtn href={`/locations/${loc.slug}/`} variant="primary">View Location</ThemeBtn>
                    <ThemeBtn href="/menu/" variant="secondary">Order</ThemeBtn>
                  </div>
                  <Link href={`/locations/${loc.slug}/`} className="link-underline text-[var(--color-primary)] font-medium text-sm mt-4 inline-flex">
                    Directions <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Anno>

      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const locationsHub: WirePage = {
  id: "locations-hub",
  title: "Locations",
  route: "/locations/",
  group: "Multi-Location",
  Page: LocationsHubPage,
  notes: [
    {
      id: "n-new",
      anchor: "branches",
      side: "right",
      title: "NEW: LOCATIONS[] array",
      lines: [
        { sys: "product", text: "Source = NEW `locations.ts` → `LOCATIONS[]`" },
        { sys: "brand", text: "Single `RESTAURANT` object becomes an array" },
        { sys: "layout", text: "`generateStaticParams()` → 1 page per branch" },
      ],
    },
    {
      id: "n-card",
      anchor: "branches",
      side: "left",
      title: "Branch card",
      lines: [
        { sys: "brand", text: "Each card: branch `name` / `address` / `hours`" },
        { sys: "seo", text: "Each branch → its own `LocalBusiness` (distinct geo)" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "left",
      title: "Hub hero",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "seo", text: "`createMetadata()`" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "right",
      title: "BreadcrumbNav",
      lines: [{ sys: "seo", text: "`breadcrumbSchema()` (Home › Locations)" }],
    },
  ],
};
