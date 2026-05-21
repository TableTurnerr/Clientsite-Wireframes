import type { WfNote, WfSystem } from "@/canvas/types";

const ACCENT: Record<WfSystem, string> = {
  color: "var(--sys-color)",
  brand: "var(--sys-brand)",
  product: "var(--sys-product)",
  seo: "var(--sys-seo)",
  layout: "var(--sys-layout)",
};

/** Render text, turning `backtick spans` into <code>. */
function renderText(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((p, i) =>
    p.startsWith("`") && p.endsWith("`") ? (
      <code key={i}>{p.slice(1, -1)}</code>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export function Note({ note }: { note: WfNote }) {
  // border accent = the dominant system in the note (first line)
  const dominant = note.lines[0]?.sys ?? "layout";
  return (
    <div
      className="note"
      data-note={note.id}
      data-anchor={note.anchor}
      data-side={note.side}
      style={{ ["--note-accent" as string]: ACCENT[dominant] }}
    >
      <div className="note-title">{note.title}</div>
      {note.lines.map((ln, i) => (
        <div className="note-line" key={i}>
          <span className={`dot ${ln.sys}`} />
          <span className="txt">{renderText(ln.text)}</span>
        </div>
      ))}
    </div>
  );
}
