"use client";

import { createClient } from "@/lib/supabase/client";

// ------------------------------------------------------------------
// Edit-lock store
//
// Owns the single-user lock state for the currently active client and the
// heartbeat / realtime lifecycle that keeps it accurate. UI components
// subscribe via useSyncExternalStore.
//
// The server-side rule (in `acquire_wireframe_lock`) is: a lock with no
// heartbeat in 90s is stale and may be reassigned. We send heartbeats every
// 30s and auto-release on tab close + 10 min idle.
// ------------------------------------------------------------------

export interface LockHolder {
  profileId: string;
  displayName: string | null;
  acquiredAt: string;
  lastHeartbeatAt: string;
}

export type LockStatus =
  | "idle"          // no client selected, or lock not yet queried
  | "checking"      // RPC in flight
  | "holding"       // current user owns the lock
  | "viewing"       // someone else holds the lock
  | "available"     // no one holds the lock
  | "error";        // last RPC errored — see errorMessage

export interface LockState {
  clientId: string | null;
  status: LockStatus;
  holder: LockHolder | null;
  errorMessage: string | null;
  // Bumped whenever an external takeover happens (used to nudge UI animations).
  generation: number;
}

const HEARTBEAT_INTERVAL_MS = 30_000;
const IDLE_TIMEOUT_MS = 10 * 60 * 1000;

const initialState: LockState = {
  clientId: null,
  status: "idle",
  holder: null,
  errorMessage: null,
  generation: 0,
};

let state: LockState = initialState;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function setState(patch: Partial<LockState>) {
  state = { ...state, ...patch };
  emit();
}

interface LockRowFromDb {
  client_id: string;
  profile_id: string;
  display_name: string | null;
  acquired_at: string;
  last_heartbeat_at: string;
}

function toHolder(row: LockRowFromDb | null | undefined): LockHolder | null {
  if (!row) return null;
  return {
    profileId: row.profile_id,
    displayName: row.display_name,
    acquiredAt: row.acquired_at,
    lastHeartbeatAt: row.last_heartbeat_at,
  };
}

let myProfileId: string | null = null;
let myDisplayName: string | null = null;
let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
let idleTimer: ReturnType<typeof setTimeout> | null = null;
let realtimeChannel: ReturnType<ReturnType<typeof createClient>["channel"]> | null = null;
let beforeUnloadBound = false;

function bindBeforeUnload() {
  if (beforeUnloadBound || typeof window === "undefined") return;
  beforeUnloadBound = true;
  // Auto-release on tab close so the next teammate doesn't wait 90s. We can't
  // await here — `keepalive: true` lets the request survive the unload.
  window.addEventListener("beforeunload", () => {
    if (state.status !== "holding" || !state.clientId) return;
    const supabase = createClient();
    // Fire-and-forget; the postgrest REST endpoint accepts the RPC POST with
    // keepalive, which beats trying to await the supabase-js client during unload.
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/release_wireframe_lock`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    };
    // Best-effort grab of the session token.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.access_token) {
        headers.Authorization = `Bearer ${data.session.access_token}`;
      }
    }).catch(() => undefined);
    try {
      void fetch(url, {
        method: "POST",
        keepalive: true,
        headers,
        body: JSON.stringify({ p_client_id: state.clientId }),
      });
    } catch {
      // best effort only
    }
  });
}

function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    void editLockStore.release({ reason: "idle" });
  }, IDLE_TIMEOUT_MS);
}

function startHeartbeat(clientId: string) {
  stopHeartbeat();
  heartbeatTimer = setInterval(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc(
        "heartbeat_wireframe_lock",
        { p_client_id: clientId },
      );
      if (error) throw error;
      // If the row no longer matches our profile (someone took over), surface
      // it. The RPC returns null in that case.
      if (!data) {
        await refreshHolder(clientId);
        return;
      }
      const row = data as LockRowFromDb;
      setState({
        holder: toHolder(row),
        status: row.profile_id === myProfileId ? "holding" : "viewing",
        errorMessage: null,
      });
    } catch (err) {
      setState({
        errorMessage:
          err instanceof Error ? err.message : "heartbeat failed",
      });
    }
  }, HEARTBEAT_INTERVAL_MS);
}

function stopHeartbeat() {
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  heartbeatTimer = null;
}

function bindActivityListeners() {
  if (typeof window === "undefined") return;
  const handler = () => {
    if (state.status === "holding") resetIdleTimer();
  };
  // Passive listeners — fire often but cheap. We only reset the timer.
  window.addEventListener("pointermove", handler, { passive: true });
  window.addEventListener("keydown", handler);
}
let activityBound = false;

async function refreshHolder(clientId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("wireframe_edit_locks")
    .select("client_id, profile_id, display_name, acquired_at, last_heartbeat_at")
    .eq("client_id", clientId)
    .maybeSingle();
  if (error) {
    setState({ status: "error", errorMessage: error.message });
    return;
  }
  if (!data) {
    setState({ status: "available", holder: null, errorMessage: null });
    return;
  }
  const row = data as LockRowFromDb;
  // Treat a heartbeat older than 90s as stale → effectively available.
  const stale =
    Date.now() - new Date(row.last_heartbeat_at).getTime() > 90_000;
  if (stale) {
    setState({ status: "available", holder: toHolder(row), errorMessage: null });
    return;
  }
  setState({
    holder: toHolder(row),
    status: row.profile_id === myProfileId ? "holding" : "viewing",
    errorMessage: null,
  });
}

function subscribeRealtime(clientId: string) {
  unsubscribeRealtime();
  const supabase = createClient();
  realtimeChannel = supabase
    .channel(`wireframe_lock:${clientId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "wireframe_edit_locks",
        filter: `client_id=eq.${clientId}`,
      },
      () => {
        void refreshHolder(clientId);
      },
    )
    .subscribe();
}

function unsubscribeRealtime() {
  if (realtimeChannel) {
    const supabase = createClient();
    void supabase.removeChannel(realtimeChannel);
    realtimeChannel = null;
  }
}

async function ensureIdentity(): Promise<void> {
  if (myProfileId) return;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  myProfileId = data.user?.id ?? null;
  if (!myProfileId) return;
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", myProfileId)
    .maybeSingle();
  myDisplayName =
    (profile?.full_name as string | null | undefined) ??
    (profile?.email as string | null | undefined) ??
    data.user?.email ??
    null;
}

export const editLockStore = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  getSnapshot: (): LockState => state,
  // True when the local user currently owns the lock.
  isHolder: (): boolean => state.status === "holding",

  // Tell the store which client we're viewing. Tears down timers / realtime
  // for the previous client and queries the new one's current holder.
  async setActiveClient(clientId: string | null): Promise<void> {
    if (state.clientId === clientId) return;
    // Release any held lock on the previous client before switching.
    if (state.status === "holding" && state.clientId) {
      try {
        await this.release({ reason: "client-switch" });
      } catch {
        // ignore; we're leaving anyway
      }
    }
    stopHeartbeat();
    unsubscribeRealtime();
    if (!clientId) {
      setState({
        clientId: null,
        status: "idle",
        holder: null,
        errorMessage: null,
      });
      return;
    }
    setState({
      clientId,
      status: "checking",
      holder: null,
      errorMessage: null,
    });
    await ensureIdentity();
    await refreshHolder(clientId);
    subscribeRealtime(clientId);
    bindBeforeUnload();
    if (!activityBound) {
      activityBound = true;
      bindActivityListeners();
    }
  },

  // Try to acquire the lock for the active client. Returns true on success.
  async request(): Promise<boolean> {
    const clientId = state.clientId;
    if (!clientId) return false;
    setState({ status: "checking", errorMessage: null });
    try {
      await ensureIdentity();
      const supabase = createClient();
      const { data, error } = await supabase.rpc(
        "acquire_wireframe_lock",
        { p_client_id: clientId, p_display_name: myDisplayName },
      );
      if (error) throw error;
      const row = data as LockRowFromDb | null;
      if (!row) throw new Error("lock RPC returned no row");
      const holder = toHolder(row);
      const youHaveIt = row.profile_id === myProfileId;
      setState({
        holder,
        status: youHaveIt ? "holding" : "viewing",
        errorMessage: null,
        generation: state.generation + 1,
      });
      if (youHaveIt) {
        startHeartbeat(clientId);
        resetIdleTimer();
      }
      return youHaveIt;
    } catch (err) {
      setState({
        status: "error",
        errorMessage: err instanceof Error ? err.message : String(err),
      });
      return false;
    }
  },

  // Release the lock if we hold it. Idempotent — safe to call when we don't.
  async release(opts: { reason?: string } = {}): Promise<void> {
    void opts;
    const clientId = state.clientId;
    if (!clientId) return;
    stopHeartbeat();
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc(
        "release_wireframe_lock",
        { p_client_id: clientId },
      );
      if (error) throw error;
    } catch (err) {
      setState({
        errorMessage: err instanceof Error ? err.message : String(err),
      });
      // fall through; we still want to update local state
    }
    setState({
      status: "available",
      holder: null,
      errorMessage: null,
    });
    await refreshHolder(clientId);
  },
};
