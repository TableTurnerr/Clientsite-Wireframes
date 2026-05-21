import type { WfSection } from "@/canvas/types";
import type { LucideIcon } from "lucide-react";
import {
  MapPin,
  Truck,
  ArrowUpRight,
  ArrowRight,
  Wheat,
  ChefHat,
  Users,
  Star,
  Plus,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Menu as MenuIcon,
} from "lucide-react";

/* ---------- primitives ---------- */

const WIDTHS = ["w-100", "w-90", "w-100", "w-75", "w-90", "w-60", "w-40"];

function Bars({ n = 3, start = 0 }: { n?: number; start?: number }) {
  return (
    <div className="wf-bars">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className={`wf-bar ${WIDTHS[(i + start) % WIDTHS.length]}`} />
      ))}
    </div>
  );
}

function Btns({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="wf-btnrow">
      {items.map((raw, i) => {
        let style = i === 0 ? "solid" : "ghost";
        let label = raw;
        const m = raw.match(/^(solid|ghost|gold):(.*)$/);
        if (m) {
          style = m[1];
          label = m[2];
        }
        return (
          <span key={i} className={`wf-btn ${style}`}>
            {label}
          </span>
        );
      })}
    </div>
  );
}

function Img({ h = 90, label = "IMG" }: { h?: number; label?: string }) {
  return (
    <div className="wf-img" style={{ height: h }}>
      <span>{label}</span>
    </div>
  );
}

function Stars({ size = 11 }: { size?: number }) {
  return (
    <span className="wf-stars" style={{ display: "inline-flex", gap: 1 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

function Source({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="wf-source">
      <span>↳ fetched from</span>{" "}
      <code style={{ background: "transparent" }}>{text}</code>
    </div>
  );
}

function Chips({ chips, style = "plain" }: { chips?: string[]; style?: string }) {
  if (!chips || chips.length === 0) return null;
  return (
    <div className="wf-chiprow">
      {chips.map((c, i) => (
        <span key={i} className={`wf-chip ${style}`}>
          {c}
        </span>
      ))}
    </div>
  );
}

function SecHead({
  eyebrow,
  heading,
  align = "center",
  size = "lg",
}: {
  eyebrow?: string;
  heading?: string;
  align?: "center" | "left";
  size?: "lg" | "md";
}) {
  if (!eyebrow && !heading) return null;
  return (
    <div className={`wf-sechead ${align}`}>
      {eyebrow && <span className="wf-eyebrow">{eyebrow}</span>}
      {heading && <div className={`wf-h ${size}`}>{heading}</div>}
    </div>
  );
}

function bgClass(accent?: string) {
  if (accent === "primary") return "bg-primary";
  if (accent === "sand" || accent === "warm") return "bg-sand";
  if (accent === "dark") return "bg-dark";
  return "";
}

const TRUST_ICONS: LucideIcon[] = [Wheat, ChefHat, Users];
const ACTION_ICONS: LucideIcon[] = [MapPin, Truck];

/* ---------- renderer ---------- */

export function Section({ s }: { s: WfSection }) {
  // footer renders its own dark background, so skip the section bg class
  const cls = s.kind === "footer" ? "" : bgClass(s.accent);
  return (
    <div className={`wf-section ${cls}`} data-anchor={s.id}>
      {s.label && <div className="wf-seclabel">{s.label}</div>}
      <Body s={s} />
    </div>
  );
}

function Body({ s }: { s: WfSection }) {
  switch (s.kind) {
    case "header":
      return (
        <div className="wf-nav">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--color-sand)", border: "1px solid var(--color-border)", display: "inline-block" }} />
            <span className="wf-logo">{s.heading || "Brand"}</span>
          </span>
          <div className="links" style={{ flex: 1, justifyContent: "center" }}>
            {(s.chips ?? ["Menu", "Specialties", "Our Story", "Bakery", "Catering"]).map((c, i) => (
              <span key={i} style={{ fontSize: 8.5, color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>{c}</span>
            ))}
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 8, color: "var(--color-text-muted)" }}>
              <Phone size={9} /> {s.sub ?? "(469) 547-2042"}
            </span>
            <span className="wf-btn solid" style={{ fontSize: 9, padding: "5px 10px" }}>
              {s.buttons?.[0] ?? "Order Online"}
            </span>
            <MenuIcon size={13} style={{ color: "var(--color-text-muted)" }} />
          </span>
        </div>
      );

    case "breadcrumb":
      return (
        <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 10, color: "var(--color-text-muted)", fontFamily: "ui-monospace, monospace" }}>
          {(s.chips ?? ["Home", "Page"]).map((c, i, a) => (
            <span key={i}>
              {c}
              {i < a.length - 1 ? "  ›" : ""}
            </span>
          ))}
        </div>
      );

    case "hero": {
      const v = s.variant;
      const twoCol = s.image && v !== "wide" && v !== "text";
      const textCol = (
        <div>
          {s.eyebrow && <span className="wf-eyebrow">{s.eyebrow}</span>}
          {s.heading && <div className="wf-h xl">{s.heading}</div>}
          <Bars n={s.body ?? 2} />
          <Btns items={s.buttons} />
          {v === "home" && (
            <>
              <div className="wf-rating">
                <Star size={11} fill="var(--color-gold)" strokeWidth={0} className="wf-stars" />
                <Stars />
                <b>4.4</b> · 1,899 reviews
              </div>
              <div style={{ fontSize: 9.5, color: "var(--color-text-muted)", marginTop: 5 }}>
                ✓ Iraqi breakfast every day except Monday
              </div>
            </>
          )}
          <Chips chips={s.chips} style={s.chipStyle} />
          <Source text={s.source} />
        </div>
      );
      if (twoCol) {
        return (
          <div className="wf-hero2">
            {textCol}
            <div className="wf-hero-img">
              <Img h={230} label="HERO IMG" />
              {v === "home" && (
                <>
                  <div className="wf-hero-badge-since">
                    <div>
                      <span>SINCE</span>
                      <b>1919</b>
                    </div>
                  </div>
                  <div className="wf-hero-badge-status">
                    <div className="lab"><i />OPEN</div>
                    <div className="val">10 AM</div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      }
      return (
        <div>
          {textCol}
          {s.image && v === "wide" && (
            <div style={{ marginTop: 12 }}>
              <Img h={210} label="WIDE IMG (16:9)" />
            </div>
          )}
        </div>
      );
    }

    case "pressquote":
      return (
        <div className="wf-pressquote">
          <div className="mark">&ldquo;</div>
          <blockquote>{s.heading ?? "A short press quote."}</blockquote>
          <cite>— {s.sub ?? "D Magazine"}</cite>
        </div>
      );

    case "actioncards": {
      const labels = s.chips ?? ["Order Pickup", "Order Delivery"];
      const subs = s.subs ?? ["327 N Greenville Ave", "Straight to your door"];
      return (
        <div className="wf-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {labels.map((lab, i) => {
            const Icon = ACTION_ICONS[i % ACTION_ICONS.length];
            return (
              <div key={i} className="wf-card wf-actioncard">
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span className="ic"><Icon size={15} /></span>
                  <div>
                    <div className="ttl">{lab}</div>
                    <div className="sub">{subs[i] ?? ""}</div>
                  </div>
                </div>
                <ArrowUpRight size={15} style={{ color: "var(--color-text-muted)" }} />
              </div>
            );
          })}
        </div>
      );
    }

    case "trustbar": {
      const labels = s.chips ?? ["In-House Bakery", "Authentic Iraqi", "Family Owned"];
      const subs = s.subs ?? ["Daily fresh samoon", "Traditional recipes", "Since 2012"];
      return (
        <div className="wf-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          {labels.map((lab, i) => {
            const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
            return (
              <div key={i} className="wf-trustitem">
                <span className="ic"><Icon size={17} strokeWidth={1.5} /></span>
                <span className="lab">{lab}</span>
                <span className="sub">{subs[i] ?? ""}</span>
              </div>
            );
          })}
        </div>
      );
    }

    case "featured": {
      const items = s.items ?? 4;
      return (
        <div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 10 }}>
            <SecHead eyebrow={s.eyebrow ?? "MOST LOVED"} heading={s.heading ?? "Featured dishes."} align="left" />
            <span style={{ fontSize: 9.5, color: "var(--color-text)", display: "inline-flex", alignItems: "center", gap: 3 }}>
              View Full Menu <ArrowRight size={11} />
            </span>
          </div>
          <div className="wf-featrow">
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="wf-featcard">
                <Img h={48} label={s.itemLabel ?? "DISH"} />
                <div className="cat">CATEGORY</div>
                <div className="nm">Dish name</div>
                <div className="pr">$00.00</div>
              </div>
            ))}
          </div>
          <Source text={s.source} />
        </div>
      );
    }

    case "split": {
      const reverse = s.variant === "reverse";
      const imgBlock = (
        <div style={{ flex: 1 }}>
          <Img h={130} label={s.itemLabel ?? "IMG"} />
        </div>
      );
      const textBlock = (
        <div style={{ flex: 1 }}>
          {s.eyebrow && <span className="wf-eyebrow">{s.eyebrow}</span>}
          {s.heading && <div className="wf-h lg">{s.heading}</div>}
          <Bars n={s.body ?? 3} />
          <Btns items={s.buttons} />
          <Chips chips={s.chips} style={s.chipStyle} />
          <Source text={s.source} />
        </div>
      );
      return (
        <div className="wf-row" style={{ alignItems: "center", gap: 14 }}>
          {reverse ? (
            <>
              {textBlock}
              {imgBlock}
            </>
          ) : (
            <>
              {imgBlock}
              {textBlock}
            </>
          )}
        </div>
      );
    }

    case "cards": {
      const cols = s.cols ?? 3;
      const items = s.items ?? cols;
      return (
        <div>
          <SecHead eyebrow={s.eyebrow} heading={s.heading} align={s.align ?? "left"} />
          <div className="wf-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="wf-card">
                {s.image !== false && <Img h={48} label={s.itemLabel ?? "IMG"} />}
                <div className="wf-bar w-90" style={{ marginTop: 7 }} />
                <div className="wf-bar w-40" />
              </div>
            ))}
          </div>
          <Source text={s.source} />
        </div>
      );
    }

    case "grid": {
      const cols = s.cols ?? 2;
      const items = s.items ?? 4;
      return (
        <div>
          <SecHead eyebrow={s.eyebrow} heading={s.heading} align={s.align ?? "left"} />
          {s.buttons && (
            <div style={{ marginBottom: 8 }}>
              <Btns items={s.buttons} />
            </div>
          )}
          <div className="wf-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="wf-card flat">
                {s.image !== false && <Img h={42} label={s.itemLabel ?? "IMG"} />}
                <div className="wf-bar w-90" style={{ marginTop: 6 }} />
                <div className="wf-bar w-60" />
              </div>
            ))}
          </div>
          <Source text={s.source} />
        </div>
      );
    }

    case "list": {
      const items = s.items ?? 4;
      const isCheck = s.variant === "check";
      const isSteps = s.variant === "steps";
      return (
        <div>
          {s.heading && <div className="wf-h md" style={{ marginBottom: 8 }}>{s.heading}</div>}
          {Array.from({ length: items }).map((_, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 10, alignItems: "center", padding: "7px 0", borderBottom: isCheck || isSteps ? "none" : "1px dashed var(--color-border)" }}
            >
              {isCheck && <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: 12 }}>✓</span>}
              {isSteps && <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--color-primary)", color: "#fff", fontSize: 10, display: "grid", placeItems: "center", flexShrink: 0 }}>{i + 1}</span>}
              {s.image && <Img h={32} label="IMG" />}
              <div style={{ flex: 1 }}>
                <div className="wf-bar w-75" style={{ marginTop: 0 }} />
                {!isCheck && <div className="wf-bar w-100" />}
              </div>
              {!isCheck && !isSteps && <div className="wf-bar" style={{ width: 26, marginTop: 0 }} />}
            </div>
          ))}
          <Source text={s.source} />
        </div>
      );
    }

    case "gallery": {
      const SPANS: Array<[number, number]> = [
        [2, 2], [2, 1], [1, 1], [1, 1], [2, 1], [2, 1], [2, 1], [1, 1], [1, 1],
      ];
      const items = Math.min(s.items ?? 9, SPANS.length);
      return (
        <div>
          <SecHead eyebrow={s.eyebrow ?? "Gallery"} heading={s.heading} align="center" />
          <div className="wf-bento">
            {Array.from({ length: items }).map((_, i) => {
              const [c, r] = SPANS[i];
              return (
                <div key={i} className="wf-img" style={{ gridColumn: `span ${c}`, gridRow: `span ${r}` }}>
                  <span>IMG</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "instagram": {
      const cols = 3;
      const heights = [120, 150, 108, 140, 116, 146];
      return (
        <div>
          <SecHead eyebrow={s.eyebrow ?? "@albaghdadyrestaurant"} heading={s.heading ?? "Follow along on Instagram"} align="center" />
          <div className="wf-igcols">
            {Array.from({ length: cols }).map((_, col) => (
              <div key={col} className="wf-igcol">
                {[0, 1].map((row) => {
                  const idx = row * cols + col;
                  return (
                    <div key={row} className="wf-igcard wf-img" style={{ height: heights[idx % heights.length] }}>
                      <span className="ig"><Instagram size={10} /></span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 10, fontSize: 9.5, color: "var(--color-text)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <Instagram size={11} /> Follow @albaghdadyrestaurant
          </div>
        </div>
      );
    }

    case "reviews": {
      const items = s.items ?? 3;
      return (
        <div>
          <SecHead eyebrow={s.eyebrow ?? "Customer Reviews"} heading={s.heading ?? "Loved by guests."} align="center" />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 12, fontSize: 10, color: "var(--color-text-muted)" }}>
            <Stars /> <b style={{ color: "var(--color-text)" }}>4.4</b> on Google
          </div>
          <div className="wf-grid" style={{ gridTemplateColumns: `repeat(${Math.min(items, 3)}, 1fr)` }}>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="wf-card">
                <Stars />
                <Bars n={2} start={1} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 6, borderTop: "1px solid var(--color-border)" }}>
                  <div className="wf-bar" style={{ width: 40, marginTop: 0 }} />
                  <div className="wf-bar" style={{ width: 24, marginTop: 0 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 12 }}>
            <Btns items={s.buttons ?? ["Leave a Review"]} />
            <span style={{ fontSize: 9, color: "var(--color-primary)", textDecoration: "underline" }}>Read all reviews on Google</span>
          </div>
          <Source text={s.source} />
        </div>
      );
    }

    case "faq": {
      const items = s.items ?? 4;
      return (
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <SecHead eyebrow={s.eyebrow ?? "Got Questions?"} heading={s.heading ?? "Frequently asked questions."} align="center" />
          <div>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className={`wf-faqrow ${i === 0 ? "open" : ""}`}>
                <div className="q">
                  <div className="wf-bar" style={{ width: i === 0 ? "60%" : "72%", marginTop: 0 }} />
                  <span className="plus"><Plus size={12} /></span>
                </div>
                {i === 0 && <Bars n={2} start={2} />}
              </div>
            ))}
          </div>
          <Source text={s.source} />
        </div>
      );
    }

    case "map":
      return (
        <div>
          <SecHead eyebrow={s.eyebrow ?? "Find Us"} heading={s.heading ?? "Visit us."} align="center" />
          <div className="wf-loc">
            <Img h={140} label="MAP" />
            <div className="wf-infocard">
              {[["Address", MapPin], ["Call", Phone], ["Hours", Clock]].map(([k, Ic], i) => {
                const Icon = Ic as LucideIcon;
                return (
                  <div key={i} className="wf-inforow">
                    <span className="ic"><Icon size={13} strokeWidth={1.75} /></span>
                    <div style={{ flex: 1 }}>
                      <div className="k">{k as string}</div>
                      <div className="wf-bar w-90" style={{ marginTop: 4 }} />
                    </div>
                  </div>
                );
              })}
              <span className="wf-btn solid" style={{ justifyContent: "center", fontSize: 9, padding: "6px 10px", marginTop: "auto" }}>
                {s.buttons?.[0] ?? "Get Directions"}
              </span>
            </div>
          </div>
        </div>
      );

    case "cta":
      return (
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          {s.eyebrow && <span className="wf-eyebrow">{s.eyebrow}</span>}
          {s.heading && <div className="wf-h lg">{s.heading}</div>}
          {s.body ? <Bars n={s.body} /> : null}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Btns items={s.buttons ?? ["Order Online", "gold:Call Us"]} />
          </div>
        </div>
      );

    case "tabs":
      return (
        <div>
          <div className="wf-chiprow" style={{ marginTop: 0 }}>
            {(s.chips ?? ["All", "Tab", "Tab"]).map((c, i) => (
              <span key={i} className={`wf-chip ${i === 0 ? "city" : ""}`}>
                {c}
              </span>
            ))}
          </div>
          <Source text={s.source} />
        </div>
      );

    case "logos":
      return (
        <div className="wf-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          {Array.from({ length: s.items ?? 5 }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 24, border: "1px solid var(--color-border)", borderRadius: 6, background: "#fff" }} />
          ))}
        </div>
      );

    case "stat":
      return (
        <div className="wf-row" style={{ justifyContent: "space-between", textAlign: "center" }}>
          {(s.chips ?? ["1919", "2012", "4 gen"]).map((c, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div className="wf-h lg" style={{ color: "var(--color-primary)" }}>{c}</div>
              <div className="wf-bar w-75" style={{ margin: "5px auto 0" }} />
            </div>
          ))}
        </div>
      );

    case "form":
      return (
        <div>
          {s.heading && <div className="wf-h md" style={{ marginBottom: 10 }}>{s.heading}</div>}
          <div className="wf-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {Array.from({ length: s.items ?? 4 }).map((_, i) => (
              <div
                key={i}
                style={{ gridColumn: i >= (s.items ?? 4) - 1 ? "1 / -1" : undefined, border: "1px solid var(--color-border)", background: "#fff", borderRadius: 8, height: i >= (s.items ?? 4) - 1 ? 50 : 28 }}
              />
            ))}
          </div>
          <Btns items={s.buttons ?? ["Submit"]} />
        </div>
      );

    case "modal":
      return (
        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 12, boxShadow: "var(--shadow-lift)", padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="wf-h md">{s.heading ?? "Modal"}</div>
            <span style={{ color: "var(--color-text-muted)" }}>✕</span>
          </div>
          <Bars n={1} />
          <div className="wf-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 8 }}>
            {Array.from({ length: s.items ?? 4 }).map((_, i) => (
              <div key={i} style={{ gridColumn: i >= (s.items ?? 4) - 1 ? "1 / -1" : undefined, border: "1px solid var(--color-border)", borderRadius: 8, height: i >= (s.items ?? 4) - 1 ? 44 : 28 }} />
            ))}
          </div>
          <div style={{ marginTop: 10, height: 38, borderRadius: 8, border: "1px dashed var(--color-border)", display: "grid", placeItems: "center", color: "var(--color-text-muted)", fontSize: 10 }}>
            {s.variant ?? "Cloudflare Turnstile"}
          </div>
          <Btns items={s.buttons ?? ["Submit Review"]} />
        </div>
      );

    case "locationcard": {
      const items = s.items ?? 2;
      return (
        <div>
          <SecHead eyebrow={s.eyebrow} heading={s.heading} align="left" />
          <div className="wf-grid" style={{ gridTemplateColumns: `repeat(${s.cols ?? 1}, 1fr)` }}>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="wf-card" style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 64, flexShrink: 0 }}>
                  <Img h={64} label="MAP" />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="wf-h sm" style={{ color: "var(--color-primary)" }}>
                    {s.itemLabel ?? "Location"} {items > 1 ? i + 1 : ""}
                  </div>
                  <div className="wf-bar w-90" />
                  <div className="wf-bar w-60" />
                  <div className="wf-btnrow" style={{ marginTop: 8 }}>
                    <span className="wf-btn solid" style={{ fontSize: 9, padding: "5px 9px" }}>Directions</span>
                    <span className="wf-btn ghost" style={{ fontSize: 9, padding: "5px 9px" }}>Order</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Source text={s.source} />
        </div>
      );
    }

    case "footer":
      return (
        <div className="wf-footer-dark">
          <div className="wordmark">{s.heading ?? "Al-Baghdady"}</div>
          <div className="fdesc" style={{ width: "70%" }} />
          <div className="fdesc" style={{ width: "55%" }} />
          <div className="wf-row" style={{ gap: 12, marginTop: 12, alignItems: "flex-start" }}>
            <div className="wf-footcol" style={{ flex: 1, display: "flex", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(255,255,255,0.10)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span className="wf-footsocial"><Instagram size={13} /></span>
                <span className="wf-footsocial"><Facebook size={13} /></span>
              </div>
            </div>
            <div className="wf-footcol" style={{ flex: 1, textAlign: "center" }}>
              <h5>Contact Us</h5>
              <div className="fl w-75" style={{ width: "80%", margin: "6px auto 0" }} />
              <div className="fl" style={{ width: "90%", margin: "6px auto 0" }} />
              <div className="fl" style={{ width: "70%", margin: "6px auto 0" }} />
            </div>
            <div className="wf-footcol" style={{ flex: 1, textAlign: "center" }}>
              <h5>Quick Links</h5>
              <div className="wf-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 4 }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="fl" />
                ))}
              </div>
            </div>
          </div>
          <div className="wf-footbar">
            <span>© 2026 Al-Baghdady Restaurant &amp; Bakery</span>
            <span>Made with TableTurnerr.com</span>
          </div>
        </div>
      );

    case "text":
    default:
      return (
        <div style={{ maxWidth: 820, margin: s.align === "center" ? "0 auto" : undefined }}>
          <SecHead eyebrow={s.eyebrow} heading={s.heading} align={s.align ?? "left"} />
          <Bars n={s.body ?? 5} />
          <Btns items={s.buttons} />
          <Chips chips={s.chips} style={s.chipStyle} />
          <Source text={s.source} />
        </div>
      );
  }
}
