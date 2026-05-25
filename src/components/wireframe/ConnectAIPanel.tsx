"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  X,
  Copy,
  Check,
  Loader2,
  AlertTriangle,
  Plus,
  Trash2,
  KeyRound,
} from "lucide-react";
import {
  listMcpKeys,
  mintMcpKey,
  revokeMcpKey,
  type McpKeyRow,
  type MintedMcpKey,
} from "@/lib/wireframe/mcp-keys";
import { listClients, type ClientRow } from "@/lib/wireframe/content-api";

const ACTIVE_CLIENT_KEY = "tt-wf-active-client";

function timeAgo(iso: string | null): string {
  if (!iso) return "never";
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function buildPrompt(opts: {
  mcpUrl: string;
  token: string;
  canvasName: string;
  canvasSlug: string;
}): string {
  const { mcpUrl, token, canvasName, canvasSlug } = opts;
  return `I want you to help me edit my TableTurnerr wireframe canvas through MCP (Model Context Protocol).

Canvas to edit: "${canvasName}" (slug: ${canvasSlug})

MCP server URL: ${mcpUrl}
Authorization header: Bearer ${token}

────────────────────────────────────────────────────────────────────
HOW TO CONNECT
────────────────────────────────────────────────────────────────────

Claude Code (CLI):
  claude mcp add --transport http tt-wireframe "${mcpUrl}" --header "Authorization: Bearer ${token}"

Claude Desktop / Cursor / Windsurf / generic MCP client (JSON config):
{
  "mcpServers": {
    "tt-wireframe": {
      "type": "http",
      "url": "${mcpUrl}",
      "headers": {
        "Authorization": "Bearer ${token}"
      }
    }
  }
}

────────────────────────────────────────────────────────────────────
AVAILABLE TOOLS
────────────────────────────────────────────────────────────────────

Read:
  • list_canvases        — every canvas the team owns
  • get_canvas           — full content of a canvas (theme + data + overrides)
  • list_pages           — every wireframe page (home, menu, bakery, ...)
  • describe_schema      — the editable shape: keys, brand presets, override format

Edit content (data tier):
  • update_restaurant    — patch brand, NAP, hours, socials, geo
  • update_copy          — patch homepage marketing strings
  • set_menu / set_faqs / set_reviews / set_specialties / set_neighborhoods / set_dishes
                         — replace those arrays in full

Edit theme:
  • apply_theme          — patch colors, fonts, and/or canvasBg
  • apply_brand_preset   — one-shot apply of a brand kit (palette + fonts)

Edit per-frame overrides (advanced):
  • set_override         — pin HTML at a specific frame + nodePath
  • clear_overrides      — wipe overrides for one frame or the whole canvas

Escape hatch:
  • replace_canvas       — overwrite the entire SerializedState atomically

────────────────────────────────────────────────────────────────────
HOW TO START
────────────────────────────────────────────────────────────────────

1. Call describe_schema to see what fields exist.
2. Call get_canvas with idOrSlug="${canvasSlug}" to see the current state.
3. Ask me what I want changed, then call the matching tool.

Edits land in the live wireframe immediately — any teammate with the canvas open will see them in real time.`;
}

export function ConnectAIPanel() {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState<McpKeyRow[]>([]);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [activeClientId, setActiveClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newLabel, setNewLabel] = useState("");
  const [minting, setMinting] = useState(false);
  const [freshKey, setFreshKey] = useState<MintedMcpKey | null>(null);

  const [copyState, setCopyState] = useState<"idle" | "url" | "token" | "prompt">("idle");

  // Read the active canvas from the same localStorage key ClientProfileBar
  // writes. Re-read whenever the modal is opened so we pick up profile swaps
  // that happened in the background.
  const refreshActiveClient = useCallback(() => {
    if (typeof window === "undefined") return;
    setActiveClientId(window.localStorage.getItem(ACTIVE_CLIENT_KEY));
  }, []);

  // Load keys + clients when the modal opens.
  useEffect(() => {
    if (!open) return;
    refreshActiveClient();
    setLoading(true);
    setError(null);
    Promise.all([listMcpKeys(), listClients()])
      .then(([k, c]) => {
        setKeys(k);
        setClients(c);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => setLoading(false));
  }, [open, refreshActiveClient]);

  // Clear the just-minted token when the modal closes — it's still in the user's
  // clipboard if they copied it; we don't want it sitting in memory longer than
  // necessary.
  useEffect(() => {
    if (!open) setFreshKey(null);
  }, [open]);

  const mcpUrl = useMemo(() => {
    if (typeof window === "undefined") return "/api/mcp";
    return `${window.location.origin}/api/mcp`;
  }, []);

  const activeClient = useMemo(
    () => clients.find((c) => c.id === activeClientId) ?? clients[0] ?? null,
    [clients, activeClientId],
  );

  const handleMint = useCallback(async () => {
    const label = newLabel.trim();
    if (!label) return;
    setMinting(true);
    setError(null);
    try {
      const minted = await mintMcpKey(label);
      setFreshKey(minted);
      setNewLabel("");
      const rows = await listMcpKeys();
      setKeys(rows);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setMinting(false);
    }
  }, [newLabel]);

  const handleRevoke = useCallback(async (id: string) => {
    if (!window.confirm("Revoke this key? Any AI agent using it will lose access immediately.")) return;
    try {
      await revokeMcpKey(id);
      setKeys((prev) =>
        prev.map((k) => (k.id === id ? { ...k, revoked_at: new Date().toISOString() } : k)),
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  const copy = useCallback(async (text: string, kind: "url" | "token" | "prompt") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState(kind);
      window.setTimeout(() => setCopyState("idle"), 1500);
    } catch {
      setError("Clipboard write failed. Copy manually.");
    }
  }, []);

  const promptText = useMemo(() => {
    return buildPrompt({
      mcpUrl,
      token: freshKey?.token ?? "<paste-your-api-key-here>",
      canvasName: activeClient?.name ?? "Al-Baghdady",
      canvasSlug: activeClient?.slug ?? "al-baghdady",
    });
  }, [mcpUrl, freshKey, activeClient]);

  return (
    <>
      <button
        type="button"
        className="tt-connect-ai-trigger tt-ui"
        onClick={() => setOpen(true)}
        title="Connect an AI to this wireframe via MCP"
      >
        <Sparkles size={14} />
        <span>Connect AI</span>
      </button>

      {open && (
        <div
          className="tt-connect-ai-overlay tt-ui"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tt-connect-ai-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="tt-connect-ai-modal">
            <header className="tt-connect-ai-header">
              <div className="tt-connect-ai-titles">
                <h2 id="tt-connect-ai-title">
                  <Sparkles size={16} /> Connect an AI
                </h2>
                <p>
                  Let Claude, Cursor, or any MCP client read and edit{" "}
                  <strong>{activeClient?.name ?? "this canvas"}</strong> live.
                </p>
              </div>
              <button
                type="button"
                className="tt-connect-ai-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </header>

            {error && (
              <div className="tt-connect-ai-error" role="alert">
                <AlertTriangle size={14} /> {error}
              </div>
            )}

            <section className="tt-connect-ai-section">
              <h3>MCP server URL</h3>
              <div className="tt-connect-ai-row">
                <code className="tt-connect-ai-mono">{mcpUrl}</code>
                <button
                  type="button"
                  className="tt-connect-ai-btn"
                  onClick={() => copy(mcpUrl, "url")}
                >
                  {copyState === "url" ? <Check size={14} /> : <Copy size={14} />}
                  {copyState === "url" ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="tt-connect-ai-hint">
                For teammates to connect, this URL must be reachable from their
                machine. On localhost only you can reach it; deploy the
                wireframe (Vercel / Cloudflare Pages) or tunnel it
                (cloudflared / ngrok) before sharing.
              </p>
            </section>

            {freshKey && (
              <section className="tt-connect-ai-section tt-connect-ai-fresh">
                <h3>
                  <KeyRound size={14} /> New key — save it now
                </h3>
                <p className="tt-connect-ai-warn">
                  This token is shown <strong>once</strong>. Copy it now; it
                  can't be recovered later. Anyone with this token can edit any
                  canvas your team owns.
                </p>
                <div className="tt-connect-ai-row">
                  <code className="tt-connect-ai-mono tt-connect-ai-token">
                    {freshKey.token}
                  </code>
                  <button
                    type="button"
                    className="tt-connect-ai-btn tt-connect-ai-btn-primary"
                    onClick={() => copy(freshKey.token, "token")}
                  >
                    {copyState === "token" ? <Check size={14} /> : <Copy size={14} />}
                    {copyState === "token" ? "Copied" : "Copy token"}
                  </button>
                </div>
              </section>
            )}

            <section className="tt-connect-ai-section">
              <h3>API keys</h3>
              {loading ? (
                <div className="tt-connect-ai-loading">
                  <Loader2 size={14} className="tt-spin" /> Loading…
                </div>
              ) : keys.length === 0 ? (
                <p className="tt-connect-ai-empty">No keys yet. Mint one below to get started.</p>
              ) : (
                <ul className="tt-connect-ai-keylist">
                  {keys.map((k) => (
                    <li
                      key={k.id}
                      className={k.revoked_at ? "revoked" : undefined}
                    >
                      <div className="tt-connect-ai-keyhead">
                        <span className="tt-connect-ai-keylabel">{k.label}</span>
                        <code className="tt-connect-ai-keyprefix">{k.key_prefix}…</code>
                      </div>
                      <div className="tt-connect-ai-keymeta">
                        <span>Last used {timeAgo(k.last_used_at)}</span>
                        {k.revoked_at ? (
                          <span className="tt-connect-ai-revoked">
                            Revoked {timeAgo(k.revoked_at)}
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="tt-connect-ai-revokebtn"
                            onClick={() => handleRevoke(k.id)}
                          >
                            <Trash2 size={12} /> Revoke
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <form
                className="tt-connect-ai-mint"
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleMint();
                }}
              >
                <input
                  type="text"
                  placeholder="Label (e.g. 'Sarah – Claude Desktop')"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  disabled={minting}
                  maxLength={120}
                />
                <button
                  type="submit"
                  className="tt-connect-ai-btn tt-connect-ai-btn-primary"
                  disabled={minting || !newLabel.trim()}
                >
                  {minting ? <Loader2 size={14} className="tt-spin" /> : <Plus size={14} />}
                  Mint key
                </button>
              </form>
            </section>

            <section className="tt-connect-ai-section">
              <h3>Connection prompt</h3>
              <p className="tt-connect-ai-hint">
                Copies a ready-to-paste prompt with the URL, token, and a tool
                tour. Paste it into Claude / Cursor / any AI to start editing.
                {!freshKey && (
                  <>
                    {" "}
                    The token in the prompt will be a placeholder until you
                    mint one above.
                  </>
                )}
              </p>
              <div className="tt-connect-ai-row">
                <button
                  type="button"
                  className="tt-connect-ai-btn tt-connect-ai-btn-copy-prompt"
                  onClick={() => copy(promptText, "prompt")}
                >
                  {copyState === "prompt" ? <Check size={16} /> : <Copy size={16} />}
                  {copyState === "prompt" ? "Prompt copied" : "Copy Prompt"}
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
