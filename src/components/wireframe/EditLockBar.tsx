"use client";

import { useSyncExternalStore } from "react";
import { Lock, Unlock, Eye, AlertTriangle, Loader2 } from "lucide-react";
import { editLockStore } from "@/lib/wireframe/edit-lock-store";

// Toolbar pill that exposes the single-user edit lock for the active client.
// Read-only viewers see who's editing and can request takeover (which succeeds
// only once the holder's heartbeat goes stale — server-enforced).
export function EditLockBar() {
  const state = useSyncExternalStore(
    editLockStore.subscribe,
    editLockStore.getSnapshot,
    editLockStore.getSnapshot,
  );

  if (!state.clientId) return null;

  if (state.status === "idle" || state.status === "checking") {
    return (
      <div className="tt-lock-pill tt-ui tt-lock-checking">
        <Loader2 size={12} className="tt-spin" /> Checking lock…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div
        className="tt-lock-pill tt-ui tt-lock-error"
        title={state.errorMessage ?? undefined}
      >
        <AlertTriangle size={12} /> Lock unavailable
      </div>
    );
  }

  if (state.status === "holding") {
    return (
      <div className="tt-lock-pill tt-ui tt-lock-holding">
        <Lock size={12} />
        <span>Editing</span>
        <button
          type="button"
          className="tt-lock-action"
          onClick={() => void editLockStore.release()}
          title="Release the edit lock so a teammate can edit"
        >
          <Unlock size={12} /> Release
        </button>
      </div>
    );
  }

  if (state.status === "viewing") {
    const name = state.holder?.displayName ?? "another teammate";
    return (
      <div className="tt-lock-pill tt-ui tt-lock-viewing">
        <Eye size={12} />
        <span>
          Viewing only · <strong>{name}</strong> is editing
        </span>
        <button
          type="button"
          className="tt-lock-action"
          onClick={() => void editLockStore.request()}
          title="Try to take over. Succeeds once their heartbeat goes stale (~90s)."
        >
          Take over
        </button>
      </div>
    );
  }

  // status === "available"
  return (
    <div className="tt-lock-pill tt-ui tt-lock-available">
      <Unlock size={12} />
      <span>View only</span>
      <button
        type="button"
        className="tt-lock-action tt-lock-action-primary"
        onClick={() => void editLockStore.request()}
        title="Request edit access to this profile"
      >
        Request edit
      </button>
    </div>
  );
}
