import { MapPin, Phone, Clock, Star } from "lucide-react";
import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import QRHover from "@/components/shared/QRHover";
import SmartImage from "@/components/shared/SmartImage";
import PickupDeliveryCTA from "@/components/shared/PickupDeliveryCTA";
import { RESTAURANT } from "@/data/restaurant";

// NEW (multi-location): single branch template. Sample = Plano branch.
const LOC = {
  city: "Plano",
  address: "1900 Preston Rd, Plano, TX 75093",
  phone: "(469) 555-0142",
};

function LocationSinglePage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: "Locations", url: "/locations/" }, { name: LOC.city, url: "/locations/plano/" }]} />
      </Anno>

      <Anno id="hero">
        <section className="container-pad py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow">Now Open · {LOC.city}, {RESTAURANT.address.state}</div>
              <h1 className="mb-6">{RESTAURANT.brandShort} — {LOC.city}</h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-6">
                Our {LOC.city} bakery & café serves the same authentic {RESTAURANT.servesCuisine} sweets, fresh samoon and traditional breakfast — baked fresh on site every day.
              </p>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm"><Star size={18} className="fill-[var(--color-gold)] text-[var(--color-gold)]" /><span className="font-medium">{RESTAURANT.ratingValue} ({RESTAURANT.reviewCount.toLocaleString()} reviews)</span></div>
              </div>
              <div className="flex flex-wrap gap-3">
                <ThemeBtn href="/menu/" variant="primary">View Menu</ThemeBtn>
                <QRHover value={RESTAURANT.orderOnline}><ThemeBtn href={RESTAURANT.orderOnline} external variant="secondary">Order Delivery</ThemeBtn></QRHover>
              </div>
            </div>
            <SmartImage src="/Images/hero.webp" alt={`${RESTAURANT.brandShort} ${LOC.city}`} priority sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5] rounded-[var(--radius-section)] shadow-[0_30px_80px_-30px_rgba(26,20,16,0.35)]" />
          </div>
        </section>
      </Anno>

      <Anno id="info">
        <section className="bg-white section-pad">
          <div className="container-pad">
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 rounded-[var(--radius-section)] overflow-hidden border border-[var(--color-border)] aspect-video lg:aspect-auto lg:min-h-[440px] bg-[var(--color-sand)] wireframe-img" style={{ minHeight: 440 }}>
                <span className="wireframe-img-tag">MAP</span>
              </div>
              <div className="rounded-[var(--radius-section)] border border-[var(--color-border)] p-8 flex flex-col gap-6 bg-[var(--color-warm-white)]">
                <div className="flex items-start gap-3">
                  <MapPin size={18} strokeWidth={1.75} className="text-[var(--color-primary)] shrink-0 mt-1" />
                  <div><div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1.5">Address</div><span className="text-[var(--color-text)] leading-relaxed">{LOC.address}</span></div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} strokeWidth={1.75} className="text-[var(--color-primary)] shrink-0 mt-1" />
                  <div><div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1.5">Call</div><span className="text-[var(--color-text)]">{LOC.phone}</span></div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} strokeWidth={1.75} className="text-[var(--color-primary)] shrink-0 mt-1" />
                  <div><div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1.5">Hours</div><div className="text-[var(--color-text)] space-y-1 text-sm"><div>Mon–Thu · 10 AM – 10 PM</div><div>Fri–Sat · 10 AM – 11 PM</div><div>Sunday · 10 AM – 10 PM</div></div></div>
                </div>
                <div className="mt-auto pt-2"><ThemeBtn href="#" external variant="primary" className="w-full justify-center">Get Directions</ThemeBtn></div>
              </div>
            </div>
          </div>
        </section>
      </Anno>

      <Anno id="cta"><PickupDeliveryCTA itemName={`from ${LOC.city}`} /></Anno>
      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const locationSingle: WirePage = {
  id: "location-single",
  title: "Location (template)",
  route: "/locations/[location]/",
  group: "Multi-Location",
  Page: LocationSinglePage,
  notes: [
    {
      id: "n-route",
      anchor: "hero",
      side: "right",
      title: "Per-branch template",
      lines: [
        { sys: "layout", text: "`/locations/[location]/` — 1 per `LOCATIONS[]` entry" },
        { sys: "brand", text: "All NAP from `LOCATIONS[i]` (not single RESTAURANT)" },
        { sys: "seo", text: "Own `LocalBusiness` + geo + `openingHours`" },
      ],
    },
    {
      id: "n-info",
      anchor: "info",
      side: "left",
      title: "Branch NAP",
      lines: [
        { sys: "brand", text: "`LOCATIONS[i].address` / `phone` / `hours`" },
        { sys: "seo", text: "Map embed → box; directions per branch" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "left",
      title: "Branch hero",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "brand", text: "Order link = `LOCATIONS[i].orderOnline`" },
      ],
    },
    {
      id: "n-cta",
      anchor: "cta",
      side: "right",
      title: "Shared products",
      lines: [
        { sys: "product", text: "Menu still shared `MENU`; CTA = `PickupDeliveryCTA`" },
      ],
    },
  ],
};
