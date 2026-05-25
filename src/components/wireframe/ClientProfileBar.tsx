"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ChevronDown, Plus, Check, Loader2, AlertTriangle } from "lucide-react";
import { configStore } from "@/config/store";
import {
  createClientProfile,
  getWireframeContent,
  listClients,
  saveWireframeContent,
  type ClientRow,
} from "@/lib/wireframe/content-api";
import { editLockStore } from "@/lib/wireframe/edit-lock-store";

const LAST_CLIENT_KEY = "tt-wf-active-client";
const AUTOSAVE_DEBOUNCE_MS = 1500;

type SaveStatus =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved"; at: number }
  | { kind: "error"; message: string };

function formatAgo(ts: number, now: number): string {
  const s = Math.max(0, Math.round((now - ts) / 1000));
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

// Top-bar widget letting team members pick which client profile drives the
// canvas and creating new ones. Autosaves edits while a client is selected.
// (Phase E will gate autosave on holding the edit lock.)
export function ClientProfileBar() {
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [activeClientId, setActiveClientId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({ kind: "idle" });
  const [now, setNow] = useState<number>(() => Date.now());

  // We use the data snapshot identity as the change signal for autosave —
  // applyTheme writes to CSS variables only and doesn't bump it. The first
  // time it changes after a load, suppressSaveRef will be true so we don't
  // immediately push the just-loaded state back to the server.
  const data = useSyncExternalStore(
    configStore.subscribe,
    configStore.getDataSnapshot,
    configStore.getDataSnapshot,
  );
  const suppressSaveRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeClientRef = useRef<string | null>(null);
  activeClientRef.current = activeClientId;

  // Load the client list once on mount. The signed-in user's RLS scope
  // decides which rows come back. First-run seed: if the team has no
  // visible client profiles at all, auto-create "Al-Baghdady" from the
  // default config so the wireframe isn't blank on first open.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let rows = await listClients();
        if (cancelled) return;
        if (rows.length === 0) {
          try {
            const { client } = await createClientProfile("Al-Baghdady");
            rows = [client];
          } catch (err: unknown) {
            // A concurrent first-run on another tab may have already created
            // the row — re-list before surfacing the error so we still pick
            // something up.
            const refreshed = await listClients().catch(() => [] as ClientRow[]);
            if (refreshed.length > 0) {
              rows = refreshed;
            } else {
              throw err;
            }
          }
        }
        if (cancelled) return;
        setClients(rows);
        const remembered =
          typeof window !== "undefined"
            ? window.localStorage.getItem(LAST_CLIENT_KEY)
            : null;
        const initial = rows.find((c) => c.id === remembered)?.id ?? rows[0]?.id ?? null;
        if (initial) {
          void switchToClient(initial, rows);
        }
      } catch (err: unknown) {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : String(err));
      }
    })();
    return () => {
      cancelled = true;
    };
    // switchToClient is stable via useCallback below; intentionally exclude
    // it to keep this a one-shot mount effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the "Saved · 2s ago" indicator fresh without forcing extra renders
  // when nothing has changed.
  useEffect(() => {
    if (saveStatus.kind !== "saved") return;
    const id = window.setInterval(() => setNow(Date.now()), 5000);
    return () => window.clearInterval(id);
  }, [saveStatus.kind]);

  const switchToClient = useCallback(
    async (clientId: string, list?: ClientRow[]) => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
      suppressSaveRef.current = true;
      setActiveClientId(clientId);
      setSaveStatus({ kind: "idle" });
      try {
        const row = await getWireframeContent(clientId);
        if (row?.content) {
          configStore.loadFullState(row.content);
        } else {
          // No content row yet (e.g. older client predating wireframe schema):
          // reset to defaults so the canvas isn't showing the previous profile.
          configStore.reset();
        }
        if (typeof window !== "undefined") {
          window.localStorage.setItem(LAST_CLIENT_KEY, clientId);
        }
        if (list && !list.some((c) => c.id === clientId)) {
          setClients(list);
        }
        // Re-bind the edit lock to the newly active client. The lock store
        // handles releasing any previous client's lock internally.
        void editLockStore.setActiveClient(clientId);
      } catch (err: unknown) {
        setSaveStatus({
          kind: "error",
          message: err instanceof Error ? err.message : String(err),
        });
      } finally {
        // Let the loadFullState emit propagate, then re-enable autosave.
        setTimeout(() => {
          suppressSaveRef.current = false;
        }, 0);
      }
    },
    [],
  );

  // Autosave on data changes, debounced. Skipped while no client is selected,
  // right after a load, or when this user doesn't hold the edit lock — the
  // server would reject the write anyway and we'd flash a misleading error.
  const lockState = useSyncExternalStore(
    editLockStore.subscribe,
    editLockStore.getSnapshot,
    editLockStore.getSnapshot,
  );
  useEffect(() => {
    if (!activeClientId) return;
    if (suppressSaveRef.current) return;
    if (lockState.status !== "holding") return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaveStatus((prev) =>
      prev.kind === "error" ? prev : { kind: "saving" },
    );
    saveTimerRef.current = setTimeout(() => {
      const clientId = activeClientRef.current;
      if (!clientId) return;
      const snapshot = configStore.serialize();
      saveWireframeContent(clientId, snapshot)
        .then(() => {
          setSaveStatus({ kind: "saved", at: Date.now() });
          setNow(Date.now());
        })
        .catch((err: unknown) => {
          setSaveStatus({
            kind: "error",
            message: err instanceof Error ? err.message : String(err),
          });
        });
    }, AUTOSAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [data, activeClientId, lockState.status]);

  const handleNewProfile = useCallback(async () => {
    const name = window.prompt(
      "Profile name (e.g. restaurant name)",
      "",
    )?.trim();
    if (!name) return;
    setCreating(true);
    setOpen(false);
    try {
      const { client } = await createClientProfile(name);
      setClients((prev) => {
        const next = [...prev, client];
        next.sort((a, b) => a.name.localeCompare(b.name));
        return next;
      });
      await switchToClient(client.id);
    } catch (err: unknown) {
      window.alert(
        "Could not create profile: " +
          (err instanceof Error ? err.message : String(err)),
      );
    } finally {
      setCreating(false);
    }
  }, [switchToClient]);

  const activeClient = useMemo(
    () => clients.find((c) => c.id === activeClientId) ?? null,
    [clients, activeClientId],
  );

  if (loadError) {
    return (
      <div className="tt-profile-bar tt-ui tt-profile-bar-error" role="alert">
        <AlertTriangle size={14} />
        <span>Profiles unavailable: {loadError}</span>
      </div>
    );
  }

  return (
    <div className="tt-profile-bar tt-ui">
      <div className="tt-profile-bar-picker">
        <button
          type="button"
          className="tt-profile-bar-trigger"
          onClick={() => setOpen((v) => !v)}
          disabled={creating}
        >
          <span className="tt-profile-bar-label">Profile</span>
          <span className="tt-profile-bar-name">
            {activeClient?.name ?? (clients.length === 0 ? "No profiles" : "Select…")}
          </span>
          <ChevronDown size={14} />
        </button>
        {open && (
          <div className="tt-profile-bar-menu" role="menu">
            {clients.length === 0 && (
              <div className="tt-profile-bar-empty">
                No client profiles yet. Create one to get started.
              </div>
            )}
            {clients.map((c) => (
              <button
                key={c.id}
                type="button"
                role="menuitemradio"
                aria-checked={c.id === activeClientId}
                className={`tt-profile-bar-item${c.id === activeClientId ? " active" : ""}`}
                onClick={() => {
                  setOpen(false);
                  if (c.id !== activeClientId) void switchToClient(c.id);
                }}
              >
                <span>{c.name}</span>
                {c.id === activeClientId && <Check size={14} />}
              </button>
            ))}
            <button
              type="button"
              className="tt-profile-bar-item tt-profile-bar-new"
              onClick={handleNewProfile}
              disabled={creating}
            >
              <Plus size={14} />
              <span>{creating ? "Creating…" : "New profile"}</span>
            </button>
          </div>
        )}
      </div>

      <SaveIndicator status={saveStatus} now={now} />
    </div>
  );
}

function SaveIndicator({ status, now }: { status: SaveStatus; now: number }) {
  if (status.kind === "idle") return null;
  if (status.kind === "saving") {
    return (
      <span className="tt-profile-bar-status tt-profile-bar-status-saving">
        <Loader2 size={12} className="tt-spin" />
        Saving…
      </span>
    );
  }
  if (status.kind === "error") {
    return (
      <span
        className="tt-profile-bar-status tt-profile-bar-status-error"
        title={status.message}
      >
        <AlertTriangle size={12} /> Save failed
      </span>
    );
  }
  return (
    <span className="tt-profile-bar-status tt-profile-bar-status-saved">
      <Check size={12} /> Saved · {formatAgo(status.at, now)}
    </span>
  );
}
