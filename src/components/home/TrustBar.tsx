import { Wheat, Users, ChefHat } from "lucide-react";
import { RESTAURANT } from "@/data/restaurant";

export default function TrustBar() {
  // Computed in render so live config edits propagate.
  const ITEMS = [
    { icon: Wheat, label: "In-House Bakery", sub: "Daily fresh samoon" },
    { icon: ChefHat, label: `Authentic ${RESTAURANT.servesCuisine}`, sub: "Traditional recipes" },
    { icon: Users, label: "Family Owned", sub: `Since ${RESTAURANT.founded}` },
  ];
  return (
    <section className="container-pad py-6 md:py-8 border-t border-b border-[var(--color-border)]">
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {ITEMS.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center text-center gap-2 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-text)] transition-transform duration-300 group-hover:scale-110">
              <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className="font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem" }}>
              {label}
            </div>
            <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.18em]">
              {sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
