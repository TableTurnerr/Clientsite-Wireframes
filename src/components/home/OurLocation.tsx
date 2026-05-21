import { MapPin, Phone, Clock } from "lucide-react";
import ThemeBtn from "../shared/ThemeBtn";
import QRHover from "../shared/QRHover";
import { RESTAURANT } from "@/data/restaurant";

function formatHour(time: string): string {
  const hour = parseInt(time.split(":")[0], 10);
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

export default function OurLocation() {
  // Computed in render so live config edits to RESTAURANT propagate here.
  const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    RESTAURANT.address.full
  )}`;
  // Day index in RESTAURANT.hours: 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun.
  const WEEKDAY = RESTAURANT.hours[0];
  const FRIDAY = RESTAURANT.hours[4];
  const SUNDAY = RESTAURANT.hours[6];
  return (
    <section className="bg-white section-pad">
      <div className="container-pad">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow">Find Us</div>
          <h2>Visit us in {RESTAURANT.address.city}.</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-[var(--radius-section)] overflow-hidden border border-[var(--color-border)] aspect-video lg:aspect-auto lg:min-h-[440px] bg-[var(--color-sand)] wireframe-img" style={{ minHeight: 440 }}>
            <span className="wireframe-img-tag">MAP</span>
          </div>

          <div className="rounded-[var(--radius-section)] border border-[var(--color-border)] p-8 flex flex-col gap-6 bg-[var(--color-warm-white)]">
            <div className="flex items-start gap-3">
              <MapPin size={18} strokeWidth={1.75} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1.5">Address</div>
                <QRHover value={DIRECTIONS}>
                  <span className="text-[var(--color-text)] leading-relaxed">
                    {RESTAURANT.address.full}
                  </span>
                </QRHover>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={18} strokeWidth={1.75} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1.5">Call</div>
                <QRHover value={`tel:${RESTAURANT.phoneRaw}`}>
                  <a
                    href={`tel:${RESTAURANT.phoneRaw}`}
                    className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {RESTAURANT.phone}
                  </a>
                </QRHover>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={18} strokeWidth={1.75} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1.5">Hours</div>
                <div className="text-[var(--color-text)] space-y-1 text-sm">
                  <div>Mon–Thu &nbsp;·&nbsp; {formatHour(WEEKDAY.open)} – {formatHour(WEEKDAY.close)}</div>
                  <div>Fri–Sat &nbsp;·&nbsp; {formatHour(FRIDAY.open)} – {formatHour(FRIDAY.close)}</div>
                  <div>Sunday &nbsp;·&nbsp; {formatHour(SUNDAY.open)} – {formatHour(SUNDAY.close)}</div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-2">
              <QRHover value={DIRECTIONS} block>
                <ThemeBtn href={DIRECTIONS} external variant="primary" className="w-full justify-center">
                  Get Directions
                </ThemeBtn>
              </QRHover>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
