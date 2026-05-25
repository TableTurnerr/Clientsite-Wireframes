"use client";

import {
  memo,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  Settings2,
  X,
  ChevronDown,
  RotateCcw,
  Copy as CopyIcon,
  Check,
  AlertTriangle,
  Wand2,
  Upload,
} from "lucide-react";
import { configStore, type SerializedState } from "./store";
import { BRAND_PRESETS, COLOR_FIELDS, FONT_OPTIONS } from "./defaults";
import { WIRE_PAGES } from "@/canvas/pages";
import type { ThemeColors } from "./types";

function useTheme() {
  return useSyncExternalStore(
    configStore.subscribe,
    configStore.getThemeSnapshot,
    configStore.getThemeSnapshot
  );
}

function useDataSnapshot() {
  return useSyncExternalStore(
    configStore.subscribe,
    configStore.getDataSnapshot,
    configStore.getDataSnapshot
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

// ------------------------------------------------------------------
// JSON content tab: read + write the full store as serialized JSON,
// optionally scoped to a single frame's slice (still merges back).
// ------------------------------------------------------------------
type JsonScope = "all" | string; // "all" or a WIRE_PAGES id

type JsonStatus =
  | { kind: "idle" }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

function stringifySnapshot(snap: SerializedState): string {
  return JSON.stringify(snap, null, 2);
}

function JsonContentEditor() {
  // Subscribe to the data snapshot so external mutations (brand kit clicks,
  // inline edits in later phases, profile switches) re-seed the textarea —
  // but only when the user hasn't started editing it.
  const liveSnapshot = useDataSnapshot();

  const [scope, setScope] = useState<JsonScope>("all");
  const [text, setText] = useState<string>(() =>
    stringifySnapshot(configStore.serialize()),
  );
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<JsonStatus>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  // Re-seed text on scope change and on external store mutations.
  useEffect(() => {
    if (dirty) return;
    const snap = scope === "all"
      ? configStore.serialize()
      : configStore.serializeFrame(scope);
    setText(stringifySnapshot(snap));
  }, [scope, dirty, liveSnapshot]);

  const onChange = (v: string) => {
    setText(v);
    setDirty(true);
    setStatus({ kind: "idle" });
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setStatus({
        kind: "error",
        message: "Copy failed: " + (err instanceof Error ? err.message : String(err)),
      });
    }
  };

  const format = () => {
    try {
      const parsed = JSON.parse(text);
      setText(JSON.stringify(parsed, null, 2));
      setStatus({ kind: "ok", message: "Valid JSON" });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  };

  const apply = () => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      setStatus({
        kind: "error",
        message: "Invalid JSON: " + (err instanceof Error ? err.message : String(err)),
      });
      return;
    }
    try {
      // Per-frame paste merges so we don't wipe sibling frames' overrides.
      if (scope !== "all") {
        const p = parsed as Partial<SerializedState>;
        if (p && p.data) {
          configStore.mergeData(p.data);
          setStatus({ kind: "ok", message: "Applied frame slice" });
        } else {
          throw new Error("Expected an object with a `data` field");
        }
      } else {
        configStore.loadFullState(parsed);
        setStatus({ kind: "ok", message: "Applied to canvas" });
      }
      setDirty(false);
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  };

  const discard = () => {
    const snap = scope === "all"
      ? configStore.serialize()
      : configStore.serializeFrame(scope);
    setText(stringifySnapshot(snap));
    setDirty(false);
    setStatus({ kind: "idle" });
  };

  const sortedPages = useMemo(
    () => [...WIRE_PAGES].sort((a, b) => a.title.localeCompare(b.title)),
    [],
  );

  return (
    <div className="cfg-json">
      <p className="cfg-hint">
        Copy the current content as JSON or paste new JSON to update the canvas.
        Duplicating a list item (a menu item, FAQ, review) duplicates it on the
        wireframe.
      </p>

      <div className="cfg-json-scope">
        <label className="cfg-json-scope-label">Scope</label>
        <select
          className="cfg-select"
          value={scope}
          onChange={(e) => {
            if (dirty) {
              const ok = window.confirm(
                "Discard unsaved JSON edits and switch scope?",
              );
              if (!ok) return;
              setDirty(false);
            }
            setScope(e.target.value as JsonScope);
            setStatus({ kind: "idle" });
          }}
        >
          <option value="all">Whole canvas (all frames)</option>
          {sortedPages.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>

      <textarea
        className="cfg-json-textarea"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={18}
      />

      <div className="cfg-json-actions">
        <button type="button" className="cfg-btn" onClick={copyText} title="Copy JSON to clipboard">
          {copied ? <Check size={13} /> : <CopyIcon size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" className="cfg-btn" onClick={format} title="Re-indent / validate">
          <Wand2 size={13} /> Format
        </button>
        <button
          type="button"
          className="cfg-btn cfg-btn-primary"
          onClick={apply}
          disabled={!dirty}
          title="Apply pasted JSON to the canvas"
        >
          <Upload size={13} /> Apply
        </button>
        {dirty && (
          <button type="button" className="cfg-btn cfg-btn-ghost" onClick={discard}>
            Discard
          </button>
        )}
      </div>

      {status.kind === "ok" && (
        <div className="cfg-json-status ok"><Check size={13} /> {status.message}</div>
      )}
      {status.kind === "error" && (
        <div className="cfg-json-status err"><AlertTriangle size={13} /> {status.message}</div>
      )}
    </div>
  );
}

function ConfigPanelImpl() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [resetNonce, setResetNonce] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    colors: true,
    type: false,
    json: true,
  });

  const toggle = (id: string) =>
    setExpanded((e) => ({ ...e, [id]: !e[id] }));

  const setColor = (key: keyof ThemeColors, val: string) =>
    configStore.updateTheme((t) => {
      t.colors[key] = val;
    });

  const setFont = (
    which: "fontDisplay" | "fontBody" | "fontAccent",
    val: string,
  ) =>
    configStore.updateTheme((t) => {
      t[which] = val;
    });

  const reset = () => {
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
            <p className="cfg-sub">Brand kit, colors, and JSON content</p>
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

          {/* ---------------- JSON CONTENT ---------------- */}
          <Section id="json" title="Content (JSON)" open={expanded.json} onToggle={toggle}>
            <JsonContentEditor />
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
