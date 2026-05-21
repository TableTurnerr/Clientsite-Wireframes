import { Star, X } from "lucide-react";
import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";

// Static repro of ReviewModal's open "rating" step (the real component is gated
// by ?review=open + Turnstile; here we show the open card inside the frame).
function ReviewModalPage() {
  return (
    <Anno id="modal">
      <div
        className="flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
        style={{ minHeight: 560, paddingTop: 48, paddingBottom: 48 }}
      >
        <div className="bg-white rounded-[var(--radius-section)] shadow-[var(--shadow-lift)] w-full max-w-md p-7 md:p-10 relative">
          <button type="button" className="absolute top-4 right-4 text-[var(--color-text-muted)] p-1 rounded-full" aria-label="Close review dialog">
            <X size={18} />
          </button>
          <h3 className="!text-2xl md:!text-3xl mb-2">How was your visit?</h3>
          <p className="text-[var(--color-text-muted)] mb-7">Tap a star to share.</p>
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className="p-1">
                <Star size={40} className="text-[var(--color-border)]" />
              </span>
            ))}
          </div>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
            4★+ → Google · under 4★ → private feedback form (name, email, phone, message) + Cloudflare Turnstile
          </p>
        </div>
      </div>
    </Anno>
  );
}

export const reviewModal: WirePage = {
  id: "review-modal",
  title: "Review Modal",
  route: "(overlay)",
  group: "Shared Chrome & States",
  Page: ReviewModalPage,
  notes: [
    {
      id: "n-1",
      anchor: "modal",
      side: "left",
      title: "ReviewModal",
      lines: [
        { sys: "layout", text: "Opens via `?review=open` (search param)" },
        { sys: "layout", text: "Star-gate: 4★+ → Google, else private form" },
        { sys: "brand", text: "Header brand = `RESTAURANT.name`" },
      ],
    },
    {
      id: "n-2",
      anchor: "modal",
      side: "right",
      title: "Submission",
      lines: [
        { sys: "layout", text: "Gated by `Turnstile` (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`)" },
        { sys: "brand", text: "POST → `NEXT_PUBLIC_REVIEW_API_URL` + `_API_KEY`" },
        { sys: "color", text: "Stars `--color-gold`; submit `.btn-primary`" },
      ],
    },
  ],
};
