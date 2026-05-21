import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Link from "next/link";
import { Sunrise } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MENU } from "@/data/menu";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import QRHover from "@/components/shared/QRHover";
import CategoryNav from "@/components/menu/CategoryNav";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { RESTAURANT } from "@/data/restaurant";

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${period}` : `${hour} ${period}`;
}

const BREAKFAST_RANGE = `${fmtTime(RESTAURANT.breakfastHours.open)} – ${fmtTime(RESTAURANT.breakfastHours.close)}`;

// EXACT composition of src/app/menu/page.tsx — real components, real CSS.
function MenuPage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Menu", url: "/menu/" },
          ]}
        />
      </Anno>

      <Anno id="hero">
        <section className="container-pad py-10 md:py-16">
          <div className="max-w-3xl">
            <div className="eyebrow">Our Menu</div>
            <h1 className="mb-5">Authentic Iraqi Cuisine & Bakery</h1>
            <p className="text-lg text-[var(--color-text-muted)]">
              Every dish is made with traditional Iraqi spices and family recipes. Halal across the
              entire menu, with fresh samoon bread baked throughout the day in our in-house bakery.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <QRHover value={RESTAURANT.orderOnline}>
                <ThemeBtn href={RESTAURANT.orderOnline} external variant="primary">
                  Order Online
                </ThemeBtn>
              </QRHover>
              <ThemeBtn href="/catering/" variant="secondary">Catering Inquiries</ThemeBtn>
            </div>

            <div className="mt-8 inline-flex items-start gap-3 rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/[0.07] px-4 py-3">
              <Sunrise size={18} className="text-[var(--color-gold-dark)] mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-dark)]">
                  Breakfast Service · {BREAKFAST_RANGE}
                </div>
                <div className="text-sm text-[var(--color-text)] mt-1 font-medium">
                  {RESTAURANT.breakfastHours.note}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Anno>

      <Anno id="catnav">
        <CategoryNav categories={MENU.map(({ id, name }) => ({ id, name }))} />
      </Anno>

      <Anno id="cat">
        {MENU.map((category) => (
          <section key={category.id} id={category.id} className="container-pad section-pad scroll-mt-[152px]">
            <header className="mb-10 max-w-2xl">
              <h2 className="mb-3">{category.name}</h2>
              <p className="text-[var(--color-text-muted)]">{category.description}</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.items.map((item) => (
                <MenuItemCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}
      </Anno>

      {/* DRAFT (2026-05-21) — topical SEO content + internal links to specialty pages. Pending Hasham/client brand-voice review. */}
      <Anno id="seo">
        <section className="container-pad section-pad border-t border-[var(--color-border)]">
          <div className="max-w-3xl">
            <div className="eyebrow">More About Our Kitchen</div>
            <h2 className="mb-5">Authentic Iraqi Bakery &amp; Breakfast in Richardson, TX</h2>
            <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
              <p>
                Al-Baghdady is a family-run halal Iraqi bakery and breakfast café in Richardson, serving
                the Dallas–Fort Worth area with recipes carried from Baghdad. Every morning our bakers fire
                fresh{" "}
                <Link href="/specialties/bread/" className="link-underline text-[var(--color-text)]">samoon and tandoor bread</Link>, hand-fold{" "}
                <Link href="/specialties/fatayer/" className="link-underline text-[var(--color-text)]">fatayer</Link>, and stretch{" "}
                <Link href="/specialties/manakish/" className="link-underline text-[var(--color-text)]">manakish</Link> — the savory
                backbone of a traditional Iraqi breakfast.
              </p>
              <p>
                Our in-house bakery is best known for Iraqi sweets: paper-thin{" "}
                <Link href="/specialties/baklava/" className="link-underline text-[var(--color-text)]">baklava</Link> layered with
                pistachios and walnuts, hot{" "}
                <Link href="/specialties/kunafa/" className="link-underline text-[var(--color-text)]">kunafa</Link> with melted cheese
                and syrup, cigar-rolled{" "}
                <Link href="/specialties/burma/" className="link-underline text-[var(--color-text)]">burma</Link>, and cream-filled{" "}
                <Link href="/specialties/lady-fingers/" className="link-underline text-[var(--color-text)]">ladyfingers (znood al sit)</Link>.
                Pair any of them with a glass of cardamom{" "}
                <Link href="/specialties/chai/" className="link-underline text-[var(--color-text)]">karak chai</Link>.
              </p>
              <p>
                Come in for a sit-down{" "}
                <Link href="/specialties/breakfast/" className="link-underline text-[var(--color-text)]">Iraqi breakfast</Link> — Kahi
                &amp; Qeimar, Baqila, Kubba and the signature Albaghdady Plate — or order baklava and kunafa
                trays for pickup, delivery and{" "}
                <Link href="/catering/" className="link-underline text-[var(--color-text)]">catering</Link> across Richardson, Plano,
                Garland and the wider DFW area. Every item on our menu is 100% halal and Zabihah-verified.
              </p>
            </div>
          </div>
        </section>
      </Anno>
      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const menu: WirePage = {
  id: "menu",
  title: "Menu",
  route: "/menu/",
  group: "Core Pages",
  Page: MenuPage,
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
        { sys: "layout", text: "Home → Menu trail" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "right",
      title: "Page Hero",
      lines: [
        { sys: "color", text: "Eyebrow `.eyebrow`, H1 `--font-display`" },
        { sys: "brand", text: "CTA `RESTAURANT.orderOnline` via `QRHover` + `ThemeBtn`" },
        { sys: "brand", text: "Breakfast band = `RESTAURANT.breakfastHours` (`fmtTime`)" },
        { sys: "seo", text: "Only H1 on the page" },
      ],
    },
    {
      id: "n-catnav",
      anchor: "catnav",
      side: "left",
      title: "CategoryNav (sticky)",
      lines: [
        { sys: "product", text: "Built from `MENU.map({id,name})`" },
        { sys: "layout", text: "Client component; jump-links to category ids" },
      ],
    },
    {
      id: "n-cat",
      anchor: "cat",
      side: "right",
      title: "Products = parent → child",
      lines: [
        { sys: "product", text: "Source: `menu.ts` → `MENU`" },
        { sys: "product", text: "`category.items` → `MenuItemCard` (child fetch)" },
        { sys: "layout", text: "3-col grid per category" },
      ],
    },
    {
      id: "n-seo",
      anchor: "seo",
      side: "left",
      title: "SEO content mesh",
      lines: [
        { sys: "seo", text: "Internal links to `/specialties/*` pages" },
        { sys: "color", text: "Top hairline `--color-border`, links `.link-underline`" },
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
