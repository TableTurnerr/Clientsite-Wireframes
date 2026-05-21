import ThemeBtn from "./ThemeBtn";
import { RESTAURANT } from "@/data/restaurant";

type Props = {
  /** Optional dish/topic name — used only in the heading for a light keyword touch. */
  itemName?: string;
};

// Single shared pickup/delivery CTA. Replaces the 11 near-identical per-specialty pickup
// paragraphs (doorway-content pattern). Page uniqueness lives in primaryBlock + FAQs, not here.
// DRAFT copy — pending Hasham/client brand-voice review.
export default function PickupDeliveryCTA({ itemName }: Props) {
  const heading = itemName
    ? `Order ${itemName} for Pickup or Delivery`
    : "Order for Pickup or Delivery";

  return (
    <section className="bg-[var(--color-warm-white)] section-pad">
      <div className="container-pad max-w-3xl">
        <h2 className="mb-6">{heading}</h2>
        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
          Skip the wait — order online for same-day pickup at our {RESTAURANT.address.city} bakery,
          or have your order delivered across the Dallas–Fort Worth area. Everything is baked fresh
          daily and ready when you are.
        </p>
        <div className="flex flex-wrap gap-3">
          <ThemeBtn href={RESTAURANT.orderOnline} external variant="primary">
            Order Online
          </ThemeBtn>
          <ThemeBtn href={`tel:${RESTAURANT.phoneRaw}`} variant="secondary">
            Call Us
          </ThemeBtn>
        </div>
      </div>
    </section>
  );
}