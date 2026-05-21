import ThemeBtn from "../shared/ThemeBtn";
import SmartImage from "../shared/SmartImage";
import { RESTAURANT } from "@/data/restaurant";

export default function BakerySpotlight() {
  return (
    <section className="bg-[var(--color-warm-white)] section-pad">
      <div className="container-pad grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="card-img rounded-[28px] overflow-hidden aspect-square">
          <SmartImage
            src="/Images/bakery.webp"
            alt={`Fresh-baked ${RESTAURANT.servesCuisine} sweets and samoon at ${RESTAURANT.brandShort} bakery`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full h-full"
          />
        </div>

        <div>
          <div className="eyebrow">Since {RESTAURANT.familyRecipeSince} · Four Generations</div>
          <h2 className="mb-6">A dessert for every craving.</h2>
          <p className="text-lg text-[var(--color-text-muted)] mb-8 leading-relaxed">
            Our menu is built on the authentic {RESTAURANT.servesCuisine} recipes our family has baked for four generations. From kunafa, manakish, ladyfingers, and fatayer to the baklava that put our name on the map, every item is made the same way it&apos;s been made since {RESTAURANT.familyRecipeSince}.
          </p>
          <div className="flex flex-wrap gap-3">
            <ThemeBtn href="/bakery/" variant="primary">Explore the Bakery</ThemeBtn>
            <ThemeBtn href="/catering/" variant="secondary">Order a Tray</ThemeBtn>
          </div>
        </div>
      </div>
    </section>
  );
}
