"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Loader2, Plus, Sparkles, X } from "lucide-react";
import {
  createClientProfile,
  listProspects,
  promoteProspectToClient,
  type ClientRow,
} from "@/lib/wireframe/content-api";

// Modal launched from ClientProfileBar's "New profile" entry. Lets the user
// either promote one of the existing prospects to a client (which then shows
// up in the wireframe picker) or create a brand-new client from scratch.
// Both paths return the newly available ClientRow via onCreated, which the
// caller uses to refresh its list and switch to the new profile.

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (client: ClientRow) => void;
}

export function NewProfileDialog({ open, onClose, onCreated }: Props) {
  const [prospects, setProspects] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  // Refetch the prospects list every time the dialog opens so newly added
  // entries from the parent admin site show up without a hard refresh.
  useEffect(() => {
    if (!open) return;
    setError(null);
    setLoading(true);
    listProspects()
      .then((rows) => setProspects(rows))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => setLoading(false));
  }, [open]);

  // Reset transient state on close so the next open starts fresh.
  useEffect(() => {
    if (open) return;
    setNewName("");
    setCreating(false);
    setWorkingId(null);
  }, [open]);

  // Close on Escape for accessibility.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handlePromote = useCallback(
    async (id: string) => {
      setWorkingId(id);
      setError(null);
      try {
        const updated = await promoteProspectToClient(id);
        setProspects((prev) => prev.filter((p) => p.id !== id));
        onCreated(updated);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setWorkingId(null);
      }
    },
    [onCreated],
  );

  const handleCreateDirect = useCallback(async () => {
    const name = newName.trim();
    if (!name) return;
    setCreating(true);
    setError(null);
    try {
      const { client } = await createClientProfile(name, { status: "client" });
      setNewName("");
      onCreated(client);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setCreating(false);
    }
  }, [newName, onCreated]);

  if (!open) return null;

  return (
    <div
      className="tt-new-profile-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="tt-new-profile-dialog" role="dialog" aria-modal="true" aria-label="Add a profile">
        <header className="tt-new-profile-header">
          <div>
            <h2>Add a profile</h2>
            <p>Promote one of your prospects to client, or add a brand-new client directly.</p>
          </div>
          <button
            type="button"
            className="tt-new-profile-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </header>

        {error && (
          <div className="tt-new-profile-error" role="alert">
            <AlertTriangle size={14} />
            <span>{error}</span>
          </div>
        )}

        <section className="tt-new-profile-section">
          <h3>Prospects</h3>
          {loading && (
            <div className="tt-new-profile-loading">
              <Loader2 size={14} className="tt-spin" />
              Loading prospects…
            </div>
          )}
          {!loading && prospects.length === 0 && (
            <p className="tt-new-profile-empty">
              No prospects waiting. Add prospects from the parent admin site, or create a client directly below.
            </p>
          )}
          {!loading && prospects.length > 0 && (
            <ul className="tt-new-profile-list">
              {prospects.map((p) => (
                <li key={p.id}>
                  <div className="tt-new-profile-list-text">
                    <span className="tt-new-profile-list-name">{p.name}</span>
                    {p.url && (
                      <span className="tt-new-profile-list-url" title={p.url}>
                        {p.url}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="tt-new-profile-promote"
                    onClick={() => handlePromote(p.id)}
                    disabled={workingId === p.id}
                  >
                    {workingId === p.id ? (
                      <Loader2 size={12} className="tt-spin" />
                    ) : (
                      <Sparkles size={12} />
                    )}
                    Promote to client
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="tt-new-profile-section">
          <h3>Add new client directly</h3>
          <p className="tt-new-profile-hint">
            Skip the prospect stage entirely — useful when you already know the new restaurant is signed on.
          </p>
          <form
            className="tt-new-profile-form"
            onSubmit={(e) => {
              e.preventDefault();
              void handleCreateDirect();
            }}
          >
            <input
              type="text"
              placeholder="Restaurant name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={creating}
              autoFocus
            />
            <button type="submit" disabled={creating || !newName.trim()}>
              {creating ? (
                <>
                  <Loader2 size={12} className="tt-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Plus size={12} />
                  Create client
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
