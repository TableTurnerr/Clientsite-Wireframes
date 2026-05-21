import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Link from "next/link";
import { SPECIALTIES } from "@/data/specialties";
import { MENU, type MenuItem, type MenuCategory } from "@/data/menu";
import { RESTAURANT } from "@/data/restaurant";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import SmartImage from "@/components/shared/SmartImage";
import FAQSection from "@/components/home/FAQSection";
import MenuItemCard from "@/components/menu/MenuItemCard";
import PickupDeliveryCTA from "@/components/shared/PickupDeliveryCTA";

type ResolvedRelatedItem = { item: MenuItem; category: MenuCategory };

function resolveRelatedItems(names: string[] | undefined): ResolvedRelatedItem[] {
  if (!names || names.length === 0) return [];
  const lookup = new Map<string, ResolvedRelatedItem>();
  for (const category of MENU) {
    for (const item of category.items) {
      lookup.set(item.name, { item, category });
    }
  }
  return names
    .map((name) => lookup.get(name))
    .filter((entry): entry is ResolvedRelatedItem => Boolean(entry));
}

// EXACT composition of src/app/specialties/[topic]/page.tsx — real components, real CSS.
// Async dynamic route made sync by hardcoding a sample topic; one file renders
// all SPECIALTIES via generateStaticParams(). "On the menu" items resolve from
// specialty.relatedMenuItemNames → MENU via resolveRelatedItems().
function SpecialtyPage() {
  const specialty = SPECIALTIES.find((s) => s.slug === "baklava")!;

  const related = resolveRelatedItems(specialty.relatedMenuItemNames);

  return (
    <>
      <Anno id="hdr"><Header /></Anno>

      <Anno id="crumbs">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Specialties", url: "/specialties/" },
            { name: specialty.name, url: `/specialties/${specialty.slug}/` },
          ]}
        />
      </Anno>

      <Anno id="hero">
        <section className="container-pad py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {specialty.heroEyebrow && (
                <div className="eyebrow">{specialty.heroEyebrow}</div>
              )}
              <h1 className="mb-6">{specialty.heroHeadline}</h1>
              {specialty.heroSubheadline && (
                <p className="text-lg text-[var(--color-text-muted)] mb-6">
                  {specialty.heroSubheadline}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <ThemeBtn href="/menu/" variant="primary">View Full Menu</ThemeBtn>
                <ThemeBtn href={RESTAURANT.orderOnline} external variant="secondary">
                  Order Online
                </ThemeBtn>
              </div>
            </div>

            {specialty.image && (
              <SmartImage
                src={specialty.image}
                alt={`${specialty.heroHeadline} — ${specialty.name} at ${RESTAURANT.name}, halal Iraqi bakery in ${RESTAURANT.address.city}, ${RESTAURANT.address.state}`}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/5] rounded-[var(--radius-section)] shadow-[0_30px_80px_-30px_rgba(26,20,16,0.35)]"
              />
            )}
          </div>
        </section>
      </Anno>

      <Anno id="primary">
        <section className="bg-[var(--color-warm-white)] section-pad">
          <div className="container-pad max-w-3xl">
            <h2 className="mb-6">{specialty.primaryBlock.heading}</h2>
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
              {specialty.primaryBlock.body}
            </p>
          </div>
        </section>
      </Anno>

      {related.length > 0 && (
        <Anno id="related">
          <section className="container-pad section-pad">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <h2>On the menu</h2>
                <Link
                  href="/menu/"
                  className="link-underline text-[var(--color-text)] font-medium text-sm"
                >
                  View Full Menu
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map(({ item, category }) => (
                  <MenuItemCard
                    key={item.name}
                    item={item}
                    categoryLabel={category.name}
                    href="/menu/"
                  />
                ))}
              </div>
            </div>
          </section>
        </Anno>
      )}

      <Anno id="cta">
        <PickupDeliveryCTA itemName={specialty.name} />
      </Anno>

      {specialty.faqs && specialty.faqs.length > 0 && (
        <Anno id="faq">
          <FAQSection
            faqs={specialty.faqs}
            eyebrow={`Common questions about ${specialty.name.toLowerCase()}`}
            title="Frequently asked questions."
          />
        </Anno>
      )}

      <Anno id="closing">
        <section className="container-pad section-pad text-center max-w-2xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <ThemeBtn href="/menu/" variant="primary">View Full Menu</ThemeBtn>
            <ThemeBtn href={RESTAURANT.orderOnline} external variant="secondary">
              Order Online
            </ThemeBtn>
            <ThemeBtn href={`tel:${RESTAURANT.phoneRaw}`} variant="secondary">
              Call Us
            </ThemeBtn>
          </div>
        </section>
      </Anno>

      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const specialtiesTopic: WirePage = {
  id: "specialties-topic",
  title: "Topic (template)",
  route: "/specialties/[topic]/",
  group: "Dynamic SEO Templates",
  Page: SpecialtyPage,
  notes: [
    {
      id: "n-topic-crumbs",
      anchor: "crumbs",
      side: "left",
      title: "One template, every topic",
      lines: [
        { sys: "seo", text: "`/specialties/[topic]/` — ONE file renders all 11 topics" },
        { sys: "product", text: "`generateStaticParams()` maps over `SPECIALTIES`" },
        { sys: "seo", text: "`<BreadcrumbNav>` injects `BreadcrumbList` schema" },
      ],
    },
    {
      id: "n-topic-hero",
      anchor: "hero",
      side: "right",
      title: "Per-topic hero",
      lines: [
        { sys: "brand", text: "Eyebrow / H1 = `specialty.heroEyebrow` / `heroHeadline`" },
        { sys: "brand", text: "Image = `specialty.image` → wireframe box" },
        { sys: "seo", text: "Only H1 on the page" },
      ],
    },
    {
      id: "n-topic-primary",
      anchor: "primary",
      side: "left",
      title: "Editorial block",
      lines: [
        { sys: "brand", text: "`specialty.primaryBlock.heading` + `.body`" },
        { sys: "seo", text: "Feeds `articleSchema()` on the real route" },
        { sys: "color", text: "Band bg `--color-warm-white`" },
      ],
    },
    {
      id: "n-topic-related",
      anchor: "related",
      side: "right",
      title: "Products = resolved menu items",
      lines: [
        { sys: "product", text: "`specialty.relatedMenuItemNames` → looked up in `MENU`" },
        { sys: "product", text: "`resolveRelatedItems()` returns `{item, category}`" },
        { sys: "layout", text: "Rendered via shared `<MenuItemCard>`" },
      ],
    },
    {
      id: "n-topic-cta",
      anchor: "cta",
      side: "left",
      title: "PickupDeliveryCTA",
      lines: [
        { sys: "layout", text: "Shared CTA, `itemName` = `specialty.name`" },
        { sys: "brand", text: "Buttons = `RESTAURANT.orderOnline` / `phoneRaw`" },
      ],
    },
    {
      id: "n-topic-faq",
      anchor: "faq",
      side: "right",
      title: "Per-topic FAQs",
      lines: [
        { sys: "product", text: "`specialty.faqs` (unique per topic)" },
        { sys: "seo", text: "Injected as `faqSchema()` (FAQPage) on the route" },
      ],
    },
    {
      id: "n-topic-meta",
      anchor: "hdr",
      side: "left",
      title: "Per-topic metadata",
      lines: [
        { sys: "seo", text: "`createMetadata()` from `specialty.metaTitle` / `metaDescription`" },
        { sys: "seo", text: "`keywords` = `specialty.keywords`; OG image = `specialty.image`" },
      ],
    },
    {
      id: "n-topic-ftr",
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
