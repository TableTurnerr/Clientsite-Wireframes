"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { configStore } from "@/config/store";
import { editLockStore } from "@/lib/wireframe/edit-lock-store";
import {
  applyOverridesToDom,
  buildDataIndex,
  decideTier,
  diffFrames,
  nodePathOf,
  resolveNodePath,
  setDataPath,
  sharedOverrideKey,
} from "@/lib/wireframe/inline-edit";

// Wraps a page's rendered content in an editable host. When the local user
// holds the edit lock, the host becomes contentEditable; the rendered JSX
// remains driven by React, and inline edits are captured via focusin/focusout
// snapshots and written back at commit time.
//
// Two-tier write-back:
//   - If the edited text was a "pure text leaf" whose original value uniquely
//     matches a data field, the data tier is updated (propagates globally).
//   - Otherwise the new innerHTML is stored in overrides[frameId][nodePath].
//
// After each re-render we re-apply this frame's overrides to the DOM via
// useLayoutEffect so override text survives data-tier updates and re-renders.
export function EditableFrame({
  frameId,
  children,
}: {
  frameId: string;
  children: ReactNode;
}) {
  const lockState = useSyncExternalStore(
    editLockStore.subscribe,
    editLockStore.getSnapshot,
    editLockStore.getSnapshot,
  );
  const isHolder = lockState.status === "holding";

  // Subscribe so overrides re-apply whenever data changes.
  const dataSnapshot = useSyncExternalStore(
    configStore.subscribe,
    configStore.getDataSnapshot,
    configStore.getDataSnapshot,
  );

  const hostRef = useRef<HTMLDivElement>(null);
  const beforeSnapshotRef = useRef<HTMLDivElement | null>(null);

  // Re-apply overrides after every render. Runs before paint, so the user
  // never sees the un-overridden JSX text flash through.
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const overridesForFrame = dataSnapshot.overrides[frameId];
    if (overridesForFrame && Object.keys(overridesForFrame).length > 0) {
      applyOverridesToDom(host, overridesForFrame);
    }
    // Apply shared-chrome overrides (header/footer) — these live in their own
    // bucket so a single edit propagates to every frame that renders the same
    // chrome. Paths are stored relative to the chrome root, so we scope the
    // application to each chrome element found in this frame.
    host.querySelectorAll<HTMLElement>("[data-shared-chrome]").forEach((chromeEl) => {
      const kind = chromeEl.dataset.sharedChrome;
      if (!kind) return;
      const sharedOverrides = dataSnapshot.overrides[sharedOverrideKey(kind)];
      if (sharedOverrides && Object.keys(sharedOverrides).length > 0) {
        applyOverridesToDom(chromeEl, sharedOverrides);
      }
    });
  });

  // Capture a snapshot when focus enters; diff + commit when focus leaves.
  useEffect(() => {
    if (!isHolder) return;
    const host = hostRef.current;
    if (!host) return;

    const captureSnapshot = () => {
      if (beforeSnapshotRef.current) return;
      const clone = document.createElement("div");
      clone.innerHTML = host.innerHTML;
      beforeSnapshotRef.current = clone;
    };

    const commit = () => {
      const before = beforeSnapshotRef.current;
      beforeSnapshotRef.current = null;
      if (!before) return;
      const diffs = diffFrames(before, host);
      if (diffs.length === 0) return;
      const index = buildDataIndex(configStore.getDataSnapshot());
      configStore.updateData((d) => {
        for (const diff of diffs) {
          const decision = decideTier(diff, index);
          if (decision.kind === "data") {
            const ok = setDataPath(d, decision.path, decision.value);
            if (!ok) {
              const overrides = (d.overrides[frameId] ??= {});
              overrides[diff.path] = diff.afterHtml;
            } else {
              // A successful global write should clear any stale override at
              // the same node path so the data value isn't masked.
              const overrides = d.overrides[frameId];
              if (overrides && overrides[diff.path]) {
                delete overrides[diff.path];
                if (Object.keys(overrides).length === 0) {
                  delete d.overrides[frameId];
                }
              }
            }
          } else if (decision.kind === "override") {
            // If the edited node lives inside a shared chrome element (header
            // or footer), store the override in the shared bucket so every
            // frame that renders the same chrome reflects the change.
            const el = resolveNodePath(host, diff.path);
            const chromeEl =
              el instanceof Element
                ? (el.closest("[data-shared-chrome]") as HTMLElement | null)
                : null;
            if (chromeEl && el) {
              const kind = chromeEl.dataset.sharedChrome;
              const relPath = nodePathOf(el, chromeEl);
              if (kind && relPath !== null) {
                const key = sharedOverrideKey(kind);
                const bucket = (d.overrides[key] ??= {});
                bucket[relPath] = decision.html;
                continue;
              }
            }
            const overrides = (d.overrides[frameId] ??= {});
            overrides[diff.path] = decision.html;
          }
        }
      });
    };

    const onFocusIn = () => captureSnapshot();
    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as Node | null;
      if (next && host.contains(next)) return;
      commit();
    };

    host.addEventListener("focusin", onFocusIn);
    host.addEventListener("focusout", onFocusOut);
    return () => {
      // If we're unmounting / losing the lock while a snapshot is open,
      // commit any pending changes so they're not silently dropped.
      if (beforeSnapshotRef.current) commit();
      host.removeEventListener("focusin", onFocusIn);
      host.removeEventListener("focusout", onFocusOut);
    };
  }, [isHolder, frameId]);

  return (
    <div
      ref={hostRef}
      className={`wf-editable${isHolder ? " wf-editable-host" : ""}`}
      data-frame-edit={frameId}
      contentEditable={isHolder}
      suppressContentEditableWarning
    >
      {children}
    </div>
  );
}
