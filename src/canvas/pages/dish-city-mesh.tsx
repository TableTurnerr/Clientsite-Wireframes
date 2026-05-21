import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import QRHover from "@/components/shared/QRHover";
import SmartImage from "@/components/shared/SmartImage";
import MenuItemCard from "@/components/menu/MenuItemCard";
import PickupDeliveryCTA from "@/components/shared/PickupDeliveryCTA";
import { RESTAURANT } from "@/data/restaurant";
import { MENU } from "@/data/menu";

// PLANNED mesh template: /[dish]-in-[city]/. Sample = Baklava in Plano.
const DISH = "Baklava";
const CITY = "Plano";
const RELATED = ["Mixed Baklava", "Pistachio Baklava", "Walnut Baklava"]
  .map((name) => {
    for (const c of MENU) {
      const item = c.items.find((i) => i.name === name);
      if (item) return { item, category: c };
    }
    return null;
  })
  .filter((x): x is NonNullable<typeof x> => Boolean(x));

function DishCityMeshPage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav items={[{ name: "Home", url: "/" }, { name: `${DISH} in ${CITY}`, url: "/baklava-in-plano/" }]} />
      </Anno>

      <Anno id="hero">
        <section className="container-pad py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow">{DISH} · {CITY}, TX</div>
              <h1 className="mb-6">{DISH} in {CITY}, TX</h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-6">
                Fresh {DISH.toLowerCase()} delivered across {CITY} from our Richardson bakery — paper-thin phyllo, fresh pistachios and our family&apos;s honey syrup, baked daily.
              </p>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-sm"><MapPin size={18} className="text-[var(--color-primary)]" /><span className="font-medium">12 minutes from {CITY}</span></div>
                <div className="flex items-center gap-2 text-sm"><Star size={18} className="fill-[var(--color-gold)] text-[var(--color-gold)]" /><span className="font-medium">{RESTAURANT.ratingValue} ({RESTAURANT.reviewCount.toLocaleString()} reviews)</span></div>
              </div>
              <div className="flex flex-wrap gap-3">
                <ThemeBtn href="/menu/" variant="primary">View Menu</ThemeBtn>
                <QRHover value={RESTAURANT.orderOnline}><ThemeBtn href={RESTAURANT.orderOnline} external variant="secondary">Order Delivery</ThemeBtn></QRHover>
              </div>
            </div>
            <SmartImage src="/Images/specialties/baklava.webp" alt={`${DISH} in ${CITY}`} priority sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5] rounded-[var(--radius-section)] shadow-[0_30px_80px_-30px_rgba(26,20,16,0.35)]" />
          </div>
        </section>
      </Anno>

      <Anno id="body">
        <section className="bg-[var(--color-warm-white)] section-pad">
          <div className="container-pad max-w-3xl">
            <h2 className="mb-6">Authentic {DISH} for {CITY} Diners</h2>
            <p className="text-lg text-[var(--color-text-muted)] mb-6">
              {CITY} residents drive to Al-Baghdady for baklava they can&apos;t find closer — made the way our family has baked it since 1919. Order online for same-day pickup or delivery across {CITY}.
            </p>
          </div>
        </section>
      </Anno>

      <Anno id="related">
        <section className="container-pad section-pad">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <h2>{DISH} on the menu</h2>
              <Link href="/menu/" className="link-underline text-[var(--color-text)] font-medium text-sm">View Full Menu</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RELATED.map(({ item, category }) => (
                <MenuItemCard key={item.name} item={item} categoryLabel={category.name} href="/menu/" />
              ))}
            </div>
          </div>
        </section>
      </Anno>

      <Anno id="cta"><PickupDeliveryCTA itemName={`${DISH} in ${CITY}`} /></Anno>
      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const dishCityMesh: WirePage = {
  id: "dish-city-mesh",
  title: "Dish × City (planned)",
  route: "/[dish]-in-[city]/",
  group: "Dynamic SEO Templates",
  Page: DishCityMeshPage,
  notes: [
    {
      id: "n-plan",
      anchor: "hero",
      side: "right",
      title: "Planned mesh route",
      lines: [
        { sys: "layout", text: "`/[dish]-in-[city]/` — 10 cities × 7 dishes = 70 pages" },
        { sys: "product", text: "`DISHES` × `NEIGHBORHOODS`, gated by `MATRIX_ALLOWLIST`" },
        { sys: "seo", text: "Hyper-local `createMetadata()` + `LocalBusiness`" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [{ sys: "seo", text: "`breadcrumbSchema()` (Home › Dish in City)" }],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "left",
      title: "Hero (dish × city)",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "brand", text: "Rating = `RESTAURANT.ratingValue` / `reviewCount`" },
      ],
    },
    {
      id: "n-related",
      anchor: "related",
      side: "right",
      title: "Products = variable",
      lines: [
        { sys: "product", text: "Dish items resolved from `menu.ts` → `MENU`" },
        { sys: "layout", text: "`MenuItemCard` grid, links to `/menu/`" },
      ],
    },
    {
      id: "n-cta",
      anchor: "cta",
      side: "left",
      title: "PickupDeliveryCTA",
      lines: [{ sys: "brand", text: "Shared CTA; order = `RESTAURANT.orderOnline`" }],
    },
  ],
};
