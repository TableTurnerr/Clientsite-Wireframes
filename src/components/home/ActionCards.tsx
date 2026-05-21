import Link from "next/link";
import { ArrowUpRight, MapPin, Truck } from "lucide-react";
import QRHover from "../shared/QRHover";
import { RESTAURANT } from "@/data/restaurant";

export default function ActionCards() {
  return (
    <section className="container-pad pb-4">
      <div className="grid md:grid-cols-2 gap-4">
        <QRHover value={RESTAURANT.orderOnline} block>
          <Link
            href={RESTAURANT.orderOnline}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center justify-between p-6 md:p-7 group w-full"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[var(--color-sand)] flex items-center justify-center text-[var(--color-text)] transition-colors group-hover:bg-[var(--color-text)] group-hover:text-white">
                <MapPin size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>
                  Order Pickup
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  {RESTAURANT.address.street}
                </div>
              </div>
            </div>
            <ArrowUpRight
              size={22}
              className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
              aria-hidden="true"
            />
          </Link>
        </QRHover>

        <QRHover value={RESTAURANT.orderOnline} block>
          <Link
            href={RESTAURANT.orderOnline}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center justify-between p-6 md:p-7 group w-full"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[var(--color-sand)] flex items-center justify-center text-[var(--color-text)] transition-colors group-hover:bg-[var(--color-text)] group-hover:text-white">
                <Truck size={20} aria-hidden="true" />
              </div>
              <div>
                <div className="font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem" }}>
                  Order Delivery
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  Straight to your door
                </div>
              </div>
            </div>
            <ArrowUpRight
              size={22}
              className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
              aria-hidden="true"
            />
          </Link>
        </QRHover>
      </div>
    </section>
  );
}
