import type { WfSection } from "@/canvas/types";

/* ---------- small primitives ---------- */

const WIDTHS = ["w-100", "w-90", "w-100", "w-75", "w-90", "w-60", "w-40"];

function Bars({ n = 3, start = 0 }: { n?: number; start?: number }) {
  return (
    <div className="wf-bars">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className={`wf-bar ${WIDTHS[(i + start) % WIDTHS.length]}`}
        />
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

function Stars() {
  return <span className="wf-stars">★★★★★</span>;
}

function Source({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="wf-source">
      <span>↳ fetched from</span> <code style={{ background: "transparent" }}>{text}</code>
    </div>
  );
}

function Chips({
  chips,
  style = "plain",
}: {
  chips?: string[];
  style?: string;
}) {
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

function bgClass(accent?: string) {
  if (accent === "primary") return "bg-primary";
  if (accent === "sand") return "bg-sand";
  if (accent === "dark") return "bg-dark";
  return "";
}

/* ---------- the section renderer ---------- */

export function Section({ s }: { s: WfSection }) {
  return (
    <div className={`wf-section ${bgClass(s.accent)}`} data-anchor={s.id}>
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
          <span className="wf-logo">{s.heading || "BRAND"}</span>
          <div className="links">
            {Array.from({ length: s.items ?? 5 }).map((_, i) => (
              <b key={i} />
            ))}
          </div>
          <Img h={26} label="QR" />
          <span className="wf-btn solid" style={{ fontSize: 9, padding: "5px 10px" }}>
            {s.buttons?.[0] ?? "Order"}
          </span>
        </div>
      );

    case "breadcrumb":
      return (
        <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 10, color: "var(--color-text-muted)", fontFamily: "ui-monospace, monospace" }}>
          {(s.chips ?? ["Home", "Section", "Page"]).map((c, i, a) => (
            <span key={i}>
              {c}
              {i < a.length - 1 ? "  ›" : ""}
            </span>
          ))}
        </div>
      );

    case "hero":
      return (
        <div>
          {s.eyebrow && <span className="wf-eyebrow">{s.eyebrow}</span>}
          {s.heading && <div className="wf-h xl">{s.heading}</div>}
          <Bars n={s.body ?? 2} />
          <Btns items={s.buttons} />
          {s.image && (
            <div style={{ marginTop: 12 }}>
              <Img h={110} label="HERO IMG" />
            </div>
          )}
          <Chips chips={s.chips} style={s.chipStyle} />
          <Source text={s.source} />
        </div>
      );

    case "trustbar":
      return (
        <div className="wf-row" style={{ justifyContent: "space-between" }}>
          {(s.chips ?? ["Halal", "Est. 2012", "4.4★ · 1,899", "Catering"]).map((c, i) => (
            <span key={i} className="wf-chip gold" style={{ flex: 1, textAlign: "center", justifyContent: "center" }}>
              {c}
            </span>
          ))}
        </div>
      );

    case "stat":
      return (
        <div className="wf-row" style={{ justifyContent: "space-between", textAlign: "center" }}>
          {(s.chips ?? ["31", "+70", "100+"]).map((c, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div className="wf-h lg" style={{ color: "var(--color-primary)" }}>{c}</div>
              <div className="wf-bar w-75" style={{ margin: "5px auto 0" }} />
            </div>
          ))}
        </div>
      );

    case "cards": {
      const cols = s.cols ?? 3;
      const items = s.items ?? cols;
      return (
        <div>
          {s.heading && <div className="wf-h lg" style={{ marginBottom: 10 }}>{s.heading}</div>}
          <div className="wf-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="wf-card">
                <Img h={54} label={s.itemLabel ?? "IMG"} />
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
          {s.heading && <div className="wf-h lg" style={{ marginBottom: 10 }}>{s.heading}</div>}
          <div className="wf-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="wf-card flat">
                {s.image !== false && <Img h={44} label={s.itemLabel ?? "IMG"} />}
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
      return (
        <div>
          {s.heading && <div className="wf-h md" style={{ marginBottom: 8 }}>{s.heading}</div>}
          {Array.from({ length: items }).map((_, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 10, alignItems: "center", padding: "7px 0", borderBottom: "1px dashed var(--color-border)" }}
            >
              {s.image && <Img h={34} label="IMG" />}
              <div style={{ flex: 1 }}>
                <div className="wf-bar w-75" style={{ marginTop: 0 }} />
                <div className="wf-bar w-100" />
              </div>
              <div className="wf-bar" style={{ width: 26, marginTop: 0 }} />
            </div>
          ))}
          <Source text={s.source} />
        </div>
      );
    }

    case "gallery": {
      const cols = s.cols ?? 3;
      const items = s.items ?? 6;
      return (
        <div>
          {s.heading && <div className="wf-h lg" style={{ marginBottom: 10 }}>{s.heading}</div>}
          <div className="wf-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: items }).map((_, i) => (
              <Img key={i} h={i % 3 === 0 ? 68 : 50} label="IMG" />
            ))}
          </div>
        </div>
      );
    }

    case "reviews": {
      const items = s.items ?? 3;
      return (
        <div>
          {s.heading && <div className="wf-h lg" style={{ marginBottom: 10 }}>{s.heading}</div>}
          <div className="wf-grid" style={{ gridTemplateColumns: `repeat(${Math.min(items, 3)}, 1fr)` }}>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="wf-card">
                <Stars />
                <Bars n={2} start={1} />
                <div className="wf-bar w-40" style={{ marginTop: 8 }} />
              </div>
            ))}
          </div>
          <Btns items={s.buttons} />
          <Source text={s.source} />
        </div>
      );
    }

    case "faq": {
      const items = s.items ?? 4;
      return (
        <div>
          {s.heading && <div className="wf-h lg" style={{ marginBottom: 10 }}>{s.heading}</div>}
          {Array.from({ length: items }).map((_, i) => (
            <div
              key={i}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="wf-bar" style={{ width: "70%", marginTop: 0 }} />
              <span style={{ color: "var(--color-text-muted)", fontSize: 13 }}>+</span>
            </div>
          ))}
          <Source text={s.source} />
        </div>
      );
    }

    case "form": {
      const items = s.items ?? 4;
      return (
        <div>
          {s.heading && <div className="wf-h lg" style={{ marginBottom: 10 }}>{s.heading}</div>}
          <div className="wf-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {Array.from({ length: items }).map((_, i) => (
              <div
                key={i}
                style={{
                  gridColumn: i >= items - 1 ? "1 / -1" : undefined,
                  border: "1px solid var(--color-border)",
                  background: "#fff",
                  borderRadius: 8,
                  height: i >= items - 1 ? 54 : 30,
                }}
              />
            ))}
          </div>
          <Btns items={s.buttons ?? ["Submit"]} />
        </div>
      );
    }

    case "map":
      return (
        <div className="wf-row" style={{ alignItems: "stretch" }}>
          <div style={{ flex: 1.3 }}>
            <Img h={110} label="MAP" />
          </div>
          <div style={{ flex: 1 }}>
            {s.heading && <div className="wf-h md">{s.heading}</div>}
            <Bars n={s.body ?? 3} />
            <Btns items={s.buttons} />
          </div>
        </div>
      );

    case "cta":
      return (
        <div style={{ textAlign: "center" }}>
          {s.eyebrow && <span className="wf-eyebrow">{s.eyebrow}</span>}
          {s.heading && <div className="wf-h lg">{s.heading}</div>}
          <Bars n={1} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Btns items={s.buttons ?? ["Order Online", "gold:Call Us"]} />
          </div>
        </div>
      );

    case "split": {
      const reverse = s.variant === "reverse";
      const imgBlock = (
        <div style={{ flex: 1 }}>
          <Img h={120} label={s.itemLabel ?? "IMG"} />
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

    case "tabs":
      return (
        <div>
          <div className="wf-chiprow" style={{ marginTop: 0 }}>
            {(s.chips ?? ["All", "Tab", "Tab", "Tab"]).map((c, i) => (
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
            <div
              key={i}
              style={{ flex: 1, height: 26, border: "1px solid var(--color-border)", borderRadius: 6, background: "#fff" }}
            />
          ))}
        </div>
      );

    case "modal":
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            boxShadow: "var(--shadow-lift)",
            padding: 12,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="wf-h md">{s.heading ?? "Modal"}</div>
            <span style={{ color: "var(--color-text-muted)" }}>✕</span>
          </div>
          <Bars n={1} />
          <div className="wf-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 8 }}>
            {Array.from({ length: s.items ?? 4 }).map((_, i) => (
              <div
                key={i}
                style={{ gridColumn: i >= (s.items ?? 4) - 1 ? "1 / -1" : undefined, border: "1px solid var(--color-border)", borderRadius: 8, height: i >= (s.items ?? 4) - 1 ? 44 : 28 }}
              />
            ))}
          </div>
          <div style={{ marginTop: 10, height: 40, borderRadius: 8, border: "1px dashed var(--color-border)", display: "grid", placeItems: "center", color: "var(--color-text-muted)", fontSize: 10 }}>
            {s.variant ?? "Cloudflare Turnstile"}
          </div>
          <Btns items={s.buttons ?? ["Submit Review"]} />
        </div>
      );

    case "locationcard": {
      const items = s.items ?? 2;
      return (
        <div>
          {s.heading && <div className="wf-h lg" style={{ marginBottom: 10 }}>{s.heading}</div>}
          <div className="wf-grid" style={{ gridTemplateColumns: `repeat(${s.cols ?? 1}, 1fr)` }}>
            {Array.from({ length: items }).map((_, i) => (
              <div key={i} className="wf-card" style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 70, flexShrink: 0 }}>
                  <Img h={70} label="MAP" />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="wf-h sm" style={{ color: "var(--color-primary)" }}>
                    {s.itemLabel ?? "Location"} {items > 1 ? i + 1 : ""}
                  </div>
                  <div className="wf-bar w-90" />
                  <div className="wf-bar w-60" />
                  <div className="wf-btnrow" style={{ marginTop: 8 }}>
                    <span className="wf-btn solid" style={{ fontSize: 9, padding: "5px 10px" }}>Directions</span>
                    <span className="wf-btn ghost" style={{ fontSize: 9, padding: "5px 10px" }}>Order</span>
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
        <div>
          <div className="wf-row" style={{ gap: 14 }}>
            <div style={{ flex: 1.4 }}>
              <span className="wf-logo">{s.heading ?? "BRAND"}</span>
              <Bars n={3} />
              <div className="wf-socials">
                {["IG", "FB", "G", "★"].map((x, i) => (
                  <i key={i} style={{ fontSize: 8, fontWeight: 700 }}>{x}</i>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="wf-bar w-60" style={{ marginTop: 0 }} />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="wf-bar w-90" style={{ marginTop: 8 }} />
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div className="wf-bar w-60" style={{ marginTop: 0 }} />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="wf-bar w-75" style={{ marginTop: 8 }} />
              ))}
            </div>
          </div>
          <Source text={s.source} />
        </div>
      );

    case "text":
    default:
      return (
        <div>
          {s.eyebrow && <span className="wf-eyebrow">{s.eyebrow}</span>}
          {s.heading && <div className="wf-h lg" style={{ marginBottom: 8 }}>{s.heading}</div>}
          <Bars n={s.body ?? 5} />
          <Btns items={s.buttons} />
          <Chips chips={s.chips} style={s.chipStyle} />
          <Source text={s.source} />
        </div>
      );
  }
}
