"use client";

import type { ConfigData } from "@/config/types";

// ------------------------------------------------------------------
// Inline-edit infrastructure
//
// Two-tier write-back model: edits that uniquely match a data field land in
// the global data tier (and therefore propagate to every frame referencing
// that variable). Edits that don't — hardcoded UI strings, ambiguous matches,
// or edits with new inline markup — land in the per-frame overrides tier.
//
// Node paths are CSS selectors built from tagName + :nth-of-type relative to
// the frame's content root. They're stable as long as the JSX structure of
// the page doesn't change.
// ------------------------------------------------------------------

// Override-bucket key for a shared chrome region (header/footer). Stored on
// the same `overrides` map as per-frame buckets but namespaced so they don't
// collide with any real frame id and are easy to look up from EditableFrame.
export function sharedOverrideKey(kind: string): string {
  return `__shared:${kind}`;
}

// CSS selector for the editable element relative to its frame root.
export function nodePathOf(el: Element, root: Element): string | null {
  if (el === root) return "";
  const parts: string[] = [];
  let cur: Element | null = el;
  while (cur && cur !== root) {
    const parent: Element | null = cur.parentElement;
    if (!parent) return null;
    const tag = cur.tagName.toLowerCase();
    let idx = 1;
    for (const sibling of Array.from(parent.children)) {
      if (sibling === cur) break;
      if (sibling.tagName === cur.tagName) idx++;
    }
    parts.unshift(`${tag}:nth-of-type(${idx})`);
    cur = parent;
  }
  return parts.join(" > ");
}

// Resolve the element a node path refers to, or null if the structure changed.
export function resolveNodePath(
  root: Element,
  path: string,
): Element | null {
  if (!path) return root;
  try {
    return root.querySelector(path);
  } catch {
    return null;
  }
}

// True if `el` is a "pure text leaf" — exactly one text-node child, no
// element descendants. Those are the only candidates for the global-data
// tier; anything with mixed content goes to overrides.
export function isPureTextLeaf(el: Element): boolean {
  if (el.childNodes.length !== 1) return false;
  const only = el.childNodes[0];
  return only.nodeType === Node.TEXT_NODE;
}

// Normalize for matching against data values: collapse runs of whitespace
// and trim. Two strings that differ only in whitespace shouldn't miss a match.
export function normText(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

// ------------------------------------------------------------------
// Data index: builds a Map from normalized text → list of dot-paths in the
// ConfigData tree. Used to decide whether an edit matches a unique data field.
// Excludes the overrides subtree from the scan.
// ------------------------------------------------------------------
export interface DataIndex {
  byText: Map<string, string[]>;
}

export function buildDataIndex(data: ConfigData): DataIndex {
  const byText = new Map<string, string[]>();
  const skip = new Set(["overrides"]);

  function walk(node: unknown, path: string) {
    if (node == null) return;
    if (typeof node === "string") {
      const key = normText(node);
      if (!key) return;
      const list = byText.get(key);
      if (list) list.push(path);
      else byText.set(key, [path]);
      return;
    }
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        walk(node[i], path ? `${path}.${i}` : String(i));
      }
      return;
    }
    if (typeof node === "object") {
      for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
        if (path === "" && skip.has(k)) continue;
        walk(v, path ? `${path}.${k}` : k);
      }
    }
  }

  walk(data as unknown, "");
  return { byText };
}

// Resolve a dot-path against the data tree and write a new string value.
// Returns false if the path doesn't resolve to a string slot.
export function setDataPath(
  data: ConfigData,
  path: string,
  value: string,
): boolean {
  const parts = path.split(".");
  let cur: unknown = data;
  for (let i = 0; i < parts.length - 1; i++) {
    if (cur == null || typeof cur !== "object") return false;
    cur = (cur as Record<string, unknown>)[parts[i]];
  }
  if (cur == null || typeof cur !== "object") return false;
  const tail = parts[parts.length - 1];
  const slot = (cur as Record<string, unknown>)[tail];
  if (typeof slot !== "string") return false;
  (cur as Record<string, unknown>)[tail] = value;
  return true;
}

// Apply a frame's overrides into the rendered DOM. Idempotent — only touches
// nodes where the current innerHTML differs from the stored override.
export function applyOverridesToDom(
  root: Element,
  overridesForFrame: Record<string, string>,
): void {
  for (const [path, html] of Object.entries(overridesForFrame)) {
    const el = resolveNodePath(root, path);
    if (!el) continue;
    if (el.innerHTML !== html) {
      el.innerHTML = html;
    }
  }
}

// ------------------------------------------------------------------
// Diffing
//
// Walk two parallel DOM trees (the frozen pre-edit snapshot and the live
// post-edit DOM). Yield each element whose content changed, together with
// its before/after innerHTML + innerText. The caller decides which write
// tier each one belongs in.
// ------------------------------------------------------------------
export interface InlineDiff {
  path: string;
  beforeHtml: string;
  afterHtml: string;
  beforeText: string;
  afterText: string;
  /** True if both before + after are a single text-node child (data tier eligible). */
  pureTextLeaf: boolean;
}

export function diffFrames(
  before: Element,
  after: Element,
): InlineDiff[] {
  const diffs: InlineDiff[] = [];

  function walk(beforeEl: Element | null, afterEl: Element) {
    // If structure diverges (different tag), treat the parent as the diff
    // and stop descending into this branch.
    if (!beforeEl || beforeEl.tagName !== afterEl.tagName) {
      const path = nodePathOf(afterEl, after);
      if (path !== null) {
        diffs.push({
          path,
          beforeHtml: beforeEl?.innerHTML ?? "",
          afterHtml: afterEl.innerHTML,
          beforeText: beforeEl ? (beforeEl as HTMLElement).innerText : "",
          afterText: (afterEl as HTMLElement).innerText,
          pureTextLeaf: isPureTextLeaf(afterEl),
        });
      }
      return;
    }

    const beforeHtml = beforeEl.innerHTML;
    const afterHtml = afterEl.innerHTML;
    if (beforeHtml === afterHtml) return;

    // Walk children in parallel when structure matches; otherwise emit at
    // this level and stop.
    const beforeKids = Array.from(beforeEl.children);
    const afterKids = Array.from(afterEl.children);
    const sameShape =
      beforeKids.length === afterKids.length &&
      beforeKids.every((k, i) => k.tagName === afterKids[i].tagName);

    if (!sameShape || beforeKids.length === 0) {
      const path = nodePathOf(afterEl, after);
      if (path !== null) {
        diffs.push({
          path,
          beforeHtml,
          afterHtml,
          beforeText: (beforeEl as HTMLElement).innerText,
          afterText: (afterEl as HTMLElement).innerText,
          pureTextLeaf: isPureTextLeaf(afterEl) && isPureTextLeaf(beforeEl),
        });
      }
      return;
    }

    for (let i = 0; i < beforeKids.length; i++) {
      walk(beforeKids[i], afterKids[i]);
    }
  }

  walk(before, after);
  return diffs;
}

// Decide which tier an inline diff belongs in, given the data index.
export type WriteTier =
  | { kind: "data"; path: string; value: string }
  | { kind: "override"; path: string; html: string }
  | { kind: "skip" };

export function decideTier(
  diff: InlineDiff,
  index: DataIndex,
): WriteTier {
  if (diff.afterHtml === diff.beforeHtml) return { kind: "skip" };
  // Data tier requires: leaf-only structure on both sides AND the new HTML
  // is plain text (no new markup) AND the old text uniquely matches a field.
  if (diff.pureTextLeaf && diff.afterHtml === escapePlainTextRoundtrip(diff.afterText)) {
    const matches = index.byText.get(normText(diff.beforeText)) ?? [];
    if (matches.length === 1) {
      return { kind: "data", path: matches[0], value: diff.afterText };
    }
  }
  return { kind: "override", path: diff.path, html: diff.afterHtml };
}

// Compare the browser's serialized form of a text-only innerHTML against
// the plain text. The browser escapes < > & in innerHTML, so we normalize
// the plain text the same way before comparing.
function escapePlainTextRoundtrip(text: string): string {
  const div = typeof document !== "undefined" ? document.createElement("div") : null;
  if (!div) return text;
  div.textContent = text;
  return div.innerHTML;
}
