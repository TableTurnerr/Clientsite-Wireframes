"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { editLockStore } from "@/lib/wireframe/edit-lock-store";

// Floating B/I/U toolbar shown when:
//   - the local user holds the edit lock
//   - a non-empty text selection sits inside a contentEditable frame
//
// Buttons + CTRL/CMD+B/I/U shortcuts call document.execCommand for round-trip
// compatibility with the inline-edit diff path (the inserted <b>/<i>/<u> tags
// land in innerHTML and get stored in overrides at commit time).
export function FormatToolbar() {
  const lockState = useSyncExternalStore(
    editLockStore.subscribe,
    editLockStore.getSnapshot,
    editLockStore.getSnapshot,
  );
  const isHolder = lockState.status === "holding";

  // `visible` tracks whether a usable selection exists inside an editable
  // frame. `active` tracks which marks the current selection already has so
  // we can highlight the buttons.
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState({ bold: false, italic: false, underline: false });

  const refreshState = useCallback(() => {
    if (!isHolder || typeof document === "undefined") {
      setVisible(false);
      return;
    }
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setVisible(false);
      return;
    }
    const range = sel.getRangeAt(0);
    const container =
      range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
        ? (range.commonAncestorContainer as Element)
        : range.commonAncestorContainer.parentElement;
    if (!container || !container.closest(".wf-editable-host")) {
      setVisible(false);
      return;
    }
    setVisible(true);
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  }, [isHolder]);

  useEffect(() => {
    if (!isHolder) {
      setVisible(false);
      return;
    }
    const handler = () => refreshState();
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, [isHolder, refreshState]);

  const apply = useCallback(
    (cmd: "bold" | "italic" | "underline") => {
      // execCommand needs focus inside the editable; selectionchange has
      // already confirmed that's where the selection lives.
      document.execCommand(cmd, false);
      refreshState();
    },
    [refreshState],
  );

  // CTRL/CMD+B/I/U shortcuts — only intercepted while editing. Browsers
  // already fire execCommand for these inside contentEditable, so this
  // mainly exists to refresh our active-state UI in sync.
  useEffect(() => {
    if (!isHolder) return;
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const sel = window.getSelection();
      const node = sel?.anchorNode;
      const inEditable =
        !!(node instanceof Element ? node : node?.parentElement)?.closest(
          ".wf-editable-host",
        );
      if (!inEditable) return;
      const key = e.key.toLowerCase();
      if (key !== "b" && key !== "i" && key !== "u") return;
      // Let the browser handle the actual command (it does so reliably for
      // contentEditable inputs) — we just refresh our active state next tick.
      setTimeout(refreshState, 0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isHolder, refreshState]);

  if (!visible) return null;

  return (
    <div className="tt-format-toolbar tt-ui" role="toolbar" aria-label="Text formatting">
      <button
        type="button"
        className={`tt-format-btn${active.bold ? " active" : ""}`}
        onMouseDown={(e) => {
          // Prevent the editable from losing focus (which would collapse the
          // selection before execCommand runs).
          e.preventDefault();
          apply("bold");
        }}
        title="Bold (Ctrl+B)"
      >
        <Bold size={14} />
      </button>
      <button
        type="button"
        className={`tt-format-btn${active.italic ? " active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          apply("italic");
        }}
        title="Italic (Ctrl+I)"
      >
        <Italic size={14} />
      </button>
      <button
        type="button"
        className={`tt-format-btn${active.underline ? " active" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          apply("underline");
        }}
        title="Underline (Ctrl+U)"
      >
        <Underline size={14} />
      </button>
    </div>
  );
}
