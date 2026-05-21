import { Star, Sunrise } from "lucide-react";
import ThemeBtn from "../shared/ThemeBtn";
import SmartImage from "../shared/SmartImage";
import QRHover from "../shared/QRHover";
import HeroStatusBadge from "./HeroStatusBadge";
import { RESTAURANT } from "@/data/restaurant";
import { COPY } from "@/data/copy";

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${period}` : `${hour} ${period}`;
}

export default function HeroBanner() {
  const BREAKFAST_RANGE = `${fmtTime(RESTAURANT.breakfastHours.open)} – ${fmtTime(RESTAURANT.breakfastHours.close)}`;
  return (
    <section className="relative bg-white">
      <div className="container-pad relative grid gap-12 lg:grid-cols-2 lg:gap-20 items-center pt-12 pb-16 md:pt-24 md:pb-28">
        <div className="animate-fade-up">
          <div className="eyebrow">{RESTAURANT.servesCuisine} Bakery &amp; Café · {RESTAURANT.dietary} · Family-Owned Since {RESTAURANT.founded}</div>
          <h1 className="mb-7">
            {COPY.homeHeroLead}{" "}
            <em
              className="text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              {COPY.homeHeroAccent}
            </em>{" "}
            {COPY.homeHeroDish}<br />in {RESTAURANT.address.city}, {RESTAURANT.stateFull}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] max-w-xl mb-10 leading-relaxed">
            Located in the heart of {RESTAURANT.address.city}, {RESTAURANT.address.state}, {RESTAURANT.brandShort} has been a family-run {RESTAURANT.servesCuisine} bakery and café since {RESTAURANT.founded} — serving authentic {RESTAURANT.servesCuisine} sweets our family has perfected since {RESTAURANT.familyRecipeSince}.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <ThemeBtn href="/menu/" variant="primary">View Menu</ThemeBtn>
            <QRHover value={RESTAURANT.orderOnline}>
              <ThemeBtn href={RESTAURANT.orderOnline} external variant="secondary">
                Order Online
              </ThemeBtn>
            </QRHover>
          </div>

          <div className="flex items-center gap-6 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className="fill-[var(--color-gold)] text-[var(--color-gold)]"
                  />
                ))}
              </div>
              <span className="font-semibold">{RESTAURANT.ratingValue}</span>
              <span className="text-[var(--color-text-muted)]">
                · {RESTAURANT.reviewCount.toLocaleString()} reviews
              </span>
            </div>
            <div className="font-medium text-[var(--color-text-muted)]">
              ✓ {COPY.homeHeroTrust}
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm">
            <Sunrise size={16} className="text-[var(--color-gold-dark)]" aria-hidden="true" />
            <span className="font-semibold text-[var(--color-text)]">{`${RESTAURANT.servesCuisine} breakfast served every day except Monday`}</span>
            <span className="text-[var(--color-text-muted)]">· {BREAKFAST_RANGE}</span>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <SmartImage
            src="/Images/hero.webp"
            alt={`${COPY.homeHeroDish} at ${RESTAURANT.brandShort}, a ${RESTAURANT.servesCuisine} bakery in ${RESTAURANT.address.city}, ${RESTAURANT.address.state}`}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] rounded-[28px] shadow-[0_30px_80px_-30px_rgba(26,20,16,0.35)]"
          />

          <HeroStatusBadge />

          <div className="hidden md:flex absolute -top-6 -right-6 bg-[var(--color-primary)] text-white rounded-full w-28 h-28 items-center justify-center text-center px-4 shadow-[var(--shadow-lift)]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-90">Since</div>
              <div
                className="text-sm mt-1 italic"
                style={{ fontFamily: "var(--font-accent)", fontWeight: 500 }}
              >
                {RESTAURANT.familyRecipeSince}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
