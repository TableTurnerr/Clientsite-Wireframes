"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Check, Copy, Sparkles, X } from "lucide-react";
import { frameSelectionStore } from "@/lib/wireframe/frame-selection";
import { configStore } from "@/config/store";
import { WIRE_PAGES } from "@/canvas/pages";

const BY_ID = new Map(WIRE_PAGES.map((p) => [p.id, p] as const));

function buildAskAiPrompt(opts: {
  pageId: string;
  pageTitle: string;
  pageRoute: string;
  frameJson: string;
}): string {
  const { pageId, pageTitle, pageRoute, frameJson } = opts;
  return `I'm editing the "${pageTitle}" page (route: ${pageRoute}, frame id: ${pageId}) of my TableTurnerr wireframe.

Below is the current SerializedState for this frame (theme + shared data + overrides scoped to this frame). Help me edit it.

When I describe what I want changed, return the updated JSON in the same shape so I can paste it back.

\`\`\`json
${frameJson}
\`\`\`

What I want to change:
- `;
}

export function FrameActionsBar() {
  const selectedId = useSyncExternalStore(
    frameSelectionStore.subscribe,
    frameSelectionStore.getSnapshot,
    frameSelectionStore.getSnapshot,
  );
  const [copied, setCopied] = useState<"json" | "prompt" | null>(null);

  // Drop any "copied" pulse when the selection changes so the next action
  // starts in a clean state.
  useEffect(() => {
    setCopied(null);
  }, [selectedId]);

  // Esc clears the current selection.
  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") frameSelectionStore.clear();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  const page = useMemo(() => (selectedId ? BY_ID.get(selectedId) ?? null : null), [selectedId]);

  const copyJson = useCallback(async () => {
    if (!selectedId) return;
    const payload = configStore.serializeFrame(selectedId);
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied("json");
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      // Clipboard write may fail in restricted contexts; nothing to surface here.
    }
  }, [selectedId]);

  const askAi = useCallback(async () => {
    if (!selectedId || !page) return;
    const payload = configStore.serializeFrame(selectedId);
    const prompt = buildAskAiPrompt({
      pageId: page.id,
      pageTitle: page.title,
      pageRoute: page.route,
      frameJson: JSON.stringify(payload, null, 2),
    });
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied("prompt");
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      // Same as above.
    }
  }, [selectedId, page]);

  if (!selectedId || !page) return null;

  return (
    <div className="tt-frame-actions tt-ui" role="toolbar" aria-label="Frame actions">
      <div className="tt-frame-actions-label">
        <span className="tt-frame-actions-kicker">Frame</span>
        <span className="tt-frame-actions-name">{page.title}</span>
      </div>
      <span className="tt-frame-actions-divider" />
      <button
        type="button"
        className="tt-frame-actions-btn"
        onClick={copyJson}
        title="Copy this frame's JSON to clipboard"
      >
        {copied === "json" ? <Check size={14} /> : <Copy size={14} />}
        {copied === "json" ? "Copied" : "Copy JSON"}
      </button>
      <button
        type="button"
        className="tt-frame-actions-btn tt-frame-actions-btn-primary"
        onClick={askAi}
        title="Copy an AI-ready prompt with this frame's JSON"
      >
        {copied === "prompt" ? <Check size={14} /> : <Sparkles size={14} />}
        {copied === "prompt" ? "Prompt copied" : "Ask AI"}
      </button>
      <span className="tt-frame-actions-divider" />
      <button
        type="button"
        className="tt-frame-actions-close"
        onClick={() => frameSelectionStore.clear()}
        title="Deselect (Esc)"
        aria-label="Deselect frame"
      >
        <X size={14} />
      </button>
    </div>
  );
}
