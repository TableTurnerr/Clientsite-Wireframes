"use client";

import {
  memo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Settings2, X, ChevronDown, RotateCcw } from "lucide-react";
import { configStore } from "./store";
import { BRAND_PRESETS, CANVAS_SWATCHES, COLOR_FIELDS, FONT_OPTIONS } from "./defaults";
import { COPY_FIELDS } from "@/data/copy";
import type { ConfigData, ThemeColors } from "./types";

function useTheme() {
  return useSyncExternalStore(
    configStore.subscribe,
    configStore.getThemeSnapshot,
    configStore.getThemeSnapshot
  );
}

function Section({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="cfg-section">
      <button
        type="button"
        className={`cfg-sec-head ${open ? "open" : ""}`}
        onClick={() => onToggle(id)}
      >
        <span>{title}</span>
        <ChevronDown size={16} />
      </button>
      {open && <div className="cfg-sec-body">{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="cfg-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ConfigPanelImpl() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [resetNonce, setResetNonce] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    colors: true,
    canvas: false,
    type: false,
    brand: false,
    links: false,
    pagecopy: false,
    products: false,
  });
  const [openCat, setOpenCat] = useState<number | null>(0);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Uncontrolled data inputs read their initial value from here; the panel is
  // memoized so committing data never re-renders it (preserving focus + value).
  const data = configStore.getState().data;

  const toggle = (id: string) =>
    setExpanded((e) => ({ ...e, [id]: !e[id] }));

  const setColor = (key: keyof ThemeColors, val: string) =>
    configStore.updateTheme((t) => {
      t.colors[key] = val;
    });

  const setFont = (
    which: "fontDisplay" | "fontBody" | "fontAccent",
    val: string
  ) =>
    configStore.updateTheme((t) => {
      t[which] = val;
    });

  const setCanvas = (val: string) =>
    configStore.updateTheme((t) => {
      t.canvasBg = val;
    });

  // Debounced content commit, keyed per field so parallel edits never drop.
  const commit = (key: string, producer: (d: ConfigData) => void) => {
    clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(
      () => configStore.updateData(producer),
      220
    );
  };

  const onText =
    (key: string, assign: (d: ConfigData, v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = e.target.value;
      commit(key, (d) => assign(d, v));
    };

  const onAddr =
    (field: "street" | "city" | "state" | "zip") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      commit("addr." + field, (d) => {
        const a = d.restaurant.address;
        a[field] = v;
        a.full = `${a.street}, ${a.city}, ${a.state} ${a.zip}`;
      });
    };

  const reset = () => {
    Object.values(timers.current).forEach(clearTimeout);
    timers.current = {};
    configStore.reset();
    setResetNonce((n) => n + 1);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          className="cfg-fab tt-ui"
          onClick={() => setOpen(true)}
          title="Configure site variables"
          aria-label="Open configuration"
        >
          <Settings2 size={20} />
        </button>
      )}

      <aside
        className={`cfg-panel tt-ui ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <div className="cfg-head">
          <div>
            <h3>Site variables</h3>
            <p className="cfg-sub">Edit once · applies to every frame</p>
          </div>
          <div className="cfg-actions">
            <button
              type="button"
              className="cfg-iconbtn"
              onClick={reset}
              title="Reset to defaults"
            >
              <RotateCcw size={15} />
            </button>
            <button
              type="button"
              className="cfg-iconbtn"
              onClick={() => setOpen(false)}
              title="Close"
              aria-label="Close configuration"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="cfg-body" key={resetNonce}>
          {/* ---------------- BRAND KIT PRESETS ---------------- */}
          <div className="cfg-presets-wrap">
            <div className="cfg-presets-label">Brand kit · apply palette + fonts</div>
            <div className="cfg-presets">
              {BRAND_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="cfg-preset"
                  onClick={() => configStore.applyPreset(p)}
                  title={p.note ?? p.label}
                >
                  <span className="cfg-preset-sw">
                    <i style={{ background: p.colors.primary }} />
                    <i style={{ background: p.colors.gold }} />
                    <i style={{ background: p.colors.sand }} />
                  </span>
                  <span className="cfg-preset-name">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ---------------- COLORS ---------------- */}
          <Section id="colors" title="Colors" open={expanded.colors} onToggle={toggle}>
            {COLOR_FIELDS.map((f) => (
              <div className="cfg-color" key={f.key}>
                <input
                  type="color"
                  className="sw"
                  value={theme.colors[f.key]}
                  onChange={(e) => setColor(f.key, e.target.value)}
                  aria-label={f.label}
                />
                <span className="nm">{f.label}</span>
                <input
                  type="text"
                  className="hex"
                  value={theme.colors[f.key]}
                  onChange={(e) => setColor(f.key, e.target.value)}
                  spellCheck={false}
                />
              </div>
            ))}
          </Section>

          {/* ---------------- CANVAS ---------------- */}
          <Section id="canvas" title="Canvas (board)" open={expanded.canvas} onToggle={toggle}>
            <div className="cfg-color">
              <input
                type="color"
                className="sw"
                value={theme.canvasBg}
                onChange={(e) => setCanvas(e.target.value)}
                aria-label="Canvas background"
              />
              <span className="nm">Canvas background</span>
              <input
                type="text"
                className="hex"
                value={theme.canvasBg}
                onChange={(e) => setCanvas(e.target.value)}
                spellCheck={false}
              />
            </div>
            <div className="cfg-canvas-swatches">
              {CANVAS_SWATCHES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  style={{ background: s.value }}
                  title={s.label}
                  onClick={() => setCanvas(s.value)}
                />
              ))}
            </div>
            <p className="cfg-hint">
              Text sitting directly on the canvas (cluster titles &amp; the brand
              caption) auto-lightens when the background is dark.
            </p>
          </Section>

          {/* ---------------- TYPOGRAPHY ---------------- */}
          <Section id="type" title="Typography" open={expanded.type} onToggle={toggle}>
            <Field label="Headings / display font">
              <select
                className="cfg-select"
                value={theme.fontDisplay}
                onChange={(e) => setFont("fontDisplay", e.target.value)}
              >
                {FONT_OPTIONS.map((o) => (
                  <option key={o.label} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Body font">
              <select
                className="cfg-select"
                value={theme.fontBody}
                onChange={(e) => setFont("fontBody", e.target.value)}
              >
                {FONT_OPTIONS.map((o) => (
                  <option key={o.label} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Accent font (italic serif)">
              <select
                className="cfg-select"
                value={theme.fontAccent}
                onChange={(e) => setFont("fontAccent", e.target.value)}
              >
                {FONT_OPTIONS.map((o) => (
                  <option key={o.label} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
          </Section>

          {/* ---------------- BRAND & CONTACT ---------------- */}
          <Section id="brand" title="Brand & contact" open={expanded.brand} onToggle={toggle}>
            <Field label="Restaurant name (SEO / schema)">
              <input className="cfg-input" defaultValue={data.restaurant.name}
                onChange={onText("name", (d, v) => { d.restaurant.name = v; })} />
            </Field>
            <Field label="Legal name (© line)">
              <input className="cfg-input" defaultValue={data.restaurant.legalName}
                onChange={onText("legalName", (d, v) => { d.restaurant.legalName = v; })} />
            </Field>
            <Field label="Brand (header/footer)">
              <input className="cfg-input" defaultValue={data.restaurant.brandShort}
                onChange={onText("brandShort", (d, v) => { d.restaurant.brandShort = v; })} />
            </Field>
            <Field label="Tagline">
              <input className="cfg-input" defaultValue={data.restaurant.tagline}
                onChange={onText("tagline", (d, v) => { d.restaurant.tagline = v; })} />
            </Field>
            <Field label="Short description">
              <textarea className="cfg-textarea" rows={3} defaultValue={data.restaurant.shortDescription}
                onChange={onText("shortDescription", (d, v) => { d.restaurant.shortDescription = v; })} />
            </Field>
            <div className="cfg-grid2">
              <Field label="Phone">
                <input className="cfg-input" defaultValue={data.restaurant.phone}
                  onChange={onText("phone", (d, v) => { d.restaurant.phone = v; })} />
              </Field>
              <Field label="Email">
                <input className="cfg-input" defaultValue={data.restaurant.email}
                  onChange={onText("email", (d, v) => { d.restaurant.email = v; })} />
              </Field>
            </div>
            <Field label="Website URL">
              <input className="cfg-input" defaultValue={data.restaurant.url}
                onChange={onText("url", (d, v) => { d.restaurant.url = v; })} />
            </Field>
            <Field label="Street">
              <input className="cfg-input" defaultValue={data.restaurant.address.street}
                onChange={onAddr("street")} />
            </Field>
            <div className="cfg-grid2">
              <Field label="City">
                <input className="cfg-input" defaultValue={data.restaurant.address.city} onChange={onAddr("city")} />
              </Field>
              <Field label="State">
                <input className="cfg-input" defaultValue={data.restaurant.address.state} onChange={onAddr("state")} />
              </Field>
            </div>
            <div className="cfg-grid2">
              <Field label="ZIP">
                <input className="cfg-input" defaultValue={data.restaurant.address.zip} onChange={onAddr("zip")} />
              </Field>
              <Field label="Price range">
                <input className="cfg-input" defaultValue={data.restaurant.priceRange}
                  onChange={onText("priceRange", (d, v) => { d.restaurant.priceRange = v; })} />
              </Field>
            </div>
            <div className="cfg-grid2">
              <Field label="Founded">
                <input className="cfg-input" defaultValue={data.restaurant.founded}
                  onChange={onText("founded", (d, v) => { d.restaurant.founded = v; })} />
              </Field>
              <Field label="Recipes since">
                <input className="cfg-input" defaultValue={data.restaurant.familyRecipeSince}
                  onChange={onText("familyRecipeSince", (d, v) => { d.restaurant.familyRecipeSince = v; })} />
              </Field>
            </div>
            <div className="cfg-grid2">
              <Field label="Rating value">
                <input className="cfg-input" type="number" step="0.1" min="0" max="5" defaultValue={data.restaurant.ratingValue}
                  onChange={onText("ratingValue", (d, v) => { d.restaurant.ratingValue = parseFloat(v) || 0; })} />
              </Field>
              <Field label="Review count">
                <input className="cfg-input" type="number" min="0" defaultValue={data.restaurant.reviewCount}
                  onChange={onText("reviewCount", (d, v) => { d.restaurant.reviewCount = parseInt(v, 10) || 0; })} />
              </Field>
            </div>
            <div className="cfg-grid2">
              <Field label="Cuisine">
                <input className="cfg-input" defaultValue={data.restaurant.servesCuisine}
                  onChange={onText("servesCuisine", (d, v) => { d.restaurant.servesCuisine = v; })} />
              </Field>
              <Field label="Dietary">
                <input className="cfg-input" defaultValue={data.restaurant.dietary}
                  onChange={onText("dietary", (d, v) => { d.restaurant.dietary = v; })} />
              </Field>
            </div>
            <Field label="State (full name)">
              <input className="cfg-input" defaultValue={data.restaurant.stateFull}
                onChange={onText("stateFull", (d, v) => { d.restaurant.stateFull = v; })} />
            </Field>
            <div className="cfg-grid2">
              <Field label="Region / metro">
                <input className="cfg-input" defaultValue={data.restaurant.region}
                  onChange={onText("region", (d, v) => { d.restaurant.region = v; })} />
              </Field>
              <Field label="Region (short)">
                <input className="cfg-input" defaultValue={data.restaurant.regionShort}
                  onChange={onText("regionShort", (d, v) => { d.restaurant.regionShort = v; })} />
              </Field>
            </div>
            <Field label="Heritage / origin city">
              <input className="cfg-input" defaultValue={data.restaurant.originCity}
                onChange={onText("originCity", (d, v) => { d.restaurant.originCity = v; })} />
            </Field>
          </Section>

          {/* ---------------- LINKS & SOCIAL ---------------- */}
          <Section id="links" title="Links & social" open={expanded.links} onToggle={toggle}>
            <Field label="Order online URL">
              <input className="cfg-input" defaultValue={data.restaurant.orderOnline}
                onChange={onText("orderOnline", (d, v) => { d.restaurant.orderOnline = v; })} />
            </Field>
            <Field label="Instagram URL">
              <input className="cfg-input" defaultValue={data.restaurant.socials.instagram}
                onChange={onText("instagram", (d, v) => { d.restaurant.socials.instagram = v; })} />
            </Field>
            <Field label="Instagram handle">
              <input className="cfg-input" defaultValue={data.restaurant.instagramHandle}
                onChange={onText("instagramHandle", (d, v) => { d.restaurant.instagramHandle = v; })} />
            </Field>
            <Field label="Facebook URL">
              <input className="cfg-input" defaultValue={data.restaurant.socials.facebook}
                onChange={onText("facebook", (d, v) => { d.restaurant.socials.facebook = v; })} />
            </Field>
            <Field label="Google Business URL">
              <input className="cfg-input" defaultValue={data.restaurant.socials.googleBusinessProfile}
                onChange={onText("gbp", (d, v) => { d.restaurant.socials.googleBusinessProfile = v; })} />
            </Field>
            <Field label="Google Review URL">
              <input className="cfg-input" defaultValue={data.restaurant.socials.googleReview}
                onChange={onText("greview", (d, v) => { d.restaurant.socials.googleReview = v; })} />
            </Field>
          </Section>

          {/* ---------------- PAGE COPY ---------------- */}
          <Section id="pagecopy" title="Page copy" open={expanded.pagecopy} onToggle={toggle}>
            <p className="cfg-hint">
              Marketing wording for the homepage. Place &amp; cuisine words come from
              Brand &amp; contact and update across every page automatically.
            </p>
            {COPY_FIELDS.map((f) => (
              <Field key={f.key} label={f.label}>
                {f.multiline ? (
                  <textarea
                    className="cfg-textarea"
                    rows={2}
                    defaultValue={data.copy[f.key]}
                    onChange={onText(`copy.${f.key}`, (d, v) => { d.copy[f.key] = v; })}
                  />
                ) : (
                  <input
                    className="cfg-input"
                    defaultValue={data.copy[f.key]}
                    onChange={onText(`copy.${f.key}`, (d, v) => { d.copy[f.key] = v; })}
                  />
                )}
              </Field>
            ))}
          </Section>

          {/* ---------------- PRODUCTS ---------------- */}
          <Section id="products" title="Products (menu)" open={expanded.products} onToggle={toggle}>
            <p className="cfg-hint">
              One source file → every product reference. Edit a name or price and
              it updates on the menu, featured row, and dish pages.
            </p>
            {data.menu.map((cat, ci) => (
              <div className="cfg-cat" key={ci}>
                <button
                  type="button"
                  className={`cfg-cat-head ${openCat === ci ? "open" : ""}`}
                  onClick={() => setOpenCat(openCat === ci ? null : ci)}
                >
                  <span>{cat.name}</span>
                  <span className="cfg-cat-count">{cat.items.length}</span>
                  <ChevronDown size={15} />
                </button>
                {openCat === ci && (
                  <div className="cfg-cat-body">
                    <Field label="Category name">
                      <input className="cfg-input" defaultValue={cat.name}
                        onChange={onText(`cat.${ci}.name`, (d, v) => { d.menu[ci].name = v; })} />
                    </Field>
                    <Field label="Category description">
                      <textarea className="cfg-textarea" rows={2} defaultValue={cat.description}
                        onChange={onText(`cat.${ci}.desc`, (d, v) => { d.menu[ci].description = v; })} />
                    </Field>
                    {cat.items.map((it, ii) => (
                      <div className="cfg-item" key={ii}>
                        <div className="cfg-grid2">
                          <input className="cfg-input" defaultValue={it.name} placeholder="Name"
                            onChange={onText(`it.${ci}.${ii}.name`, (d, v) => { d.menu[ci].items[ii].name = v; })} />
                          <input className="cfg-input" defaultValue={it.price} placeholder="Price"
                            onChange={onText(`it.${ci}.${ii}.price`, (d, v) => { d.menu[ci].items[ii].price = v; })} />
                        </div>
                        <textarea className="cfg-textarea" rows={2} defaultValue={it.description} placeholder="Description"
                          onChange={onText(`it.${ci}.${ii}.desc`, (d, v) => { d.menu[ci].items[ii].description = v; })} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Section>

          <div className="cfg-foot">
            <button type="button" className="cfg-reset" onClick={reset}>
              <RotateCcw size={14} /> Reset all to defaults
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export const ConfigPanel = memo(ConfigPanelImpl);
export default ConfigPanel;
