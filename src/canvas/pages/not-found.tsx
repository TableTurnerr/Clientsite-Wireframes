import Link from "next/link";
import { ArrowRight, BookOpen, Phone, Soup, UtensilsCrossed } from "lucide-react";
import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RESTAURANT } from "@/data/restaurant";
import ThemeBtn from "@/components/shared/ThemeBtn";
import QRHover from "@/components/shared/QRHover";

const QUICK_LINKS = [
  { href: "/menu/", title: "The Menu", body: `${RESTAURANT.servesCuisine} sweets, daily breakfast, fresh bakery and savory plates.`, icon: UtensilsCrossed },
  { href: "/our-story/", title: "Our Story", body: `From ${RESTAURANT.originCity} in ${RESTAURANT.familyRecipeSince} to ${RESTAURANT.address.city} — four generations of baking.`, icon: BookOpen },
  { href: "/catering/", title: "Catering", body: `Full-service ${RESTAURANT.servesCuisine} catering for events large and small.`, icon: Soup },
];

function NotFoundPage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="main">
        <section className="relative overflow-hidden bg-[var(--color-warm-white)]">
          <div className="container-pad relative pt-16 md:pt-24 pb-10 md:pb-14 text-center">
            <div className="eyebrow">404 · Off the Menu</div>
            <h1
              className="mx-auto leading-none"
              style={{ fontSize: "clamp(7rem, 20vw, 16rem)", fontFamily: "var(--font-accent)", fontWeight: 400, letterSpacing: "-0.06em", color: "var(--color-text)" }}
              aria-label="404"
            >
              <span aria-hidden="true">4</span>
              <em aria-hidden="true" className="inline-block align-baseline" style={{ fontStyle: "italic", margin: "0 0.04em" }}>0</em>
              <span aria-hidden="true">4</span>
            </h1>
            <div className="mx-auto my-6 flex items-center justify-center gap-3 text-[var(--color-gold-dark)]" aria-hidden="true">
              <span className="h-px w-12 bg-[var(--color-gold-dark)] opacity-60" />
              <span className="text-xs" style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}>◆</span>
              <span className="h-px w-12 bg-[var(--color-gold-dark)] opacity-60" />
            </div>
            <h2 className="mx-auto max-w-2xl">
              This dish isn&apos;t on our{" "}
              <em className="text-[var(--color-primary)]" style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.02em" }}>menu</em>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-text-muted)] leading-relaxed">
              The page you&apos;re looking for slipped between the trays. The link may be old, or the recipe may have moved — but the bread is still warm, and you&apos;re always welcome at our table.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ThemeBtn href="/" variant="primary">Back to Home</ThemeBtn>
              <ThemeBtn href="/menu/" variant="secondary">View Menu</ThemeBtn>
            </div>
            <QRHover value={`tel:${RESTAURANT.phoneRaw}`} className="mt-8">
              <a href={`tel:${RESTAURANT.phoneRaw}`} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                <Phone size={14} aria-hidden="true" />
                <span>Need a hand? Call <span className="font-semibold">{RESTAURANT.phone}</span></span>
              </a>
            </QRHover>
          </div>
          <div className="container-pad relative pb-20 md:pb-28">
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {QUICK_LINKS.map((q) => {
                const Icon = q.icon;
                return (
                  <Link key={q.href} href={q.href} className="card group block p-6 text-left">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-text)] group-hover:text-white">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>{q.title}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{q.body}</p>
                    <span className="link-underline mt-4 inline-flex text-sm font-medium text-[var(--color-primary)]">Go there <ArrowRight size={14} aria-hidden="true" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </Anno>
      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const notFound: WirePage = {
  id: "not-found",
  title: "404 / Error",
  route: "/404",
  group: "Shared Chrome & States",
  Page: NotFoundPage,
  notes: [
    {
      id: "n-main",
      anchor: "main",
      side: "right",
      title: "Error states",
      lines: [
        { sys: "layout", text: "`app/not-found.tsx` + `error.tsx` + `global-error.tsx`" },
        { sys: "color", text: "Big `404` in `--font-accent`; accent `--color-primary`" },
        { sys: "seo", text: "`createMetadata({ noindex: true })`" },
      ],
    },
    {
      id: "n-hdr",
      anchor: "hdr",
      side: "left",
      title: "Branded chrome",
      lines: [
        { sys: "layout", text: "Still shows shared Header / Footer" },
        { sys: "brand", text: "Quick links + call `RESTAURANT.phone`" },
      ],
    },
  ],
};
