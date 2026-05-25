"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserInfo {
  email: string;
  avatarUrl: string | null;
}

export function UserChip() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (cancelled || !data.user) return;
      setUser({
        email: data.user.email ?? "Signed in",
        avatarUrl: (data.user.user_metadata?.avatar_url as string) ?? null,
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!user) return null;

  const adminUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")}/admin`
    : null;

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    if (authUrl) {
      window.location.href = `${authUrl.replace(/\/$/, "")}/login`;
    } else {
      window.location.reload();
    }
  };

  const initial = user.email[0]?.toUpperCase() ?? "?";

  return (
    <div className="tt-user-chip tt-ui">
      <button
        type="button"
        className="tt-user-chip-trigger"
        aria-label={user.email}
      >
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatarUrl} alt="" className="tt-user-chip-avatar" />
        ) : (
          <span className="tt-user-chip-avatar tt-user-chip-avatar-fallback">
            {initial}
          </span>
        )}
      </button>

      <div className="tt-user-chip-menu" role="menu">
        <div className="tt-user-chip-menu-email">{user.email}</div>
        {adminUrl && (
          <a href={adminUrl} className="tt-user-chip-menu-item">
            ← Admin panel
          </a>
        )}
        <button
          type="button"
          className="tt-user-chip-menu-item"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
