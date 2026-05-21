"use client";

import { useEffect, useState } from "react";
import { RESTAURANT } from "@/data/restaurant";

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
] as const;

function toMins(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${period}` : `${hour} ${period}`;
}

type Status =
  | { kind: "breakfast"; until: string }
  | { kind: "open"; closes: string }
  | { kind: "closed_opens_today"; opensAt: string; forBreakfast: boolean }
  | { kind: "closed_opens_next"; day: string; opensAt: string }
  | { kind: "closed_no_breakfast"; opensAt: string };

function getStatus(now: Date): Status {
  const dayName = DAY_NAMES[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();

  const todayHours = RESTAURANT.hours.find((h) => h.day === dayName)!;
  const openMins = toMins(todayHours.open);
  const closeMins = toMins(todayHours.close);

  const bf = RESTAURANT.breakfastHours;
  const bfClosedDays: string[] = [...(bf.closedDays ?? [])];
  const hasBreakfastToday = !bfClosedDays.includes(dayName);
  const bfOpenMins = toMins(bf.open);
  const bfCloseMins = toMins(bf.close);

  const isMainOpen = mins >= openMins && mins < closeMins;
  const isBfTime = hasBreakfastToday && mins >= bfOpenMins && mins < bfCloseMins;

  if (isBfTime) {
    return { kind: "breakfast", until: fmtTime(bf.close) };
  }

  if (isMainOpen) {
    return { kind: "open", closes: fmtTime(todayHours.close) };
  }

  // Closed — figure out what opens next
  if (mins < openMins) {
    // Before today's main open
    if (hasBreakfastToday && mins < bfOpenMins) {
      // Breakfast opens first today
      return { kind: "closed_opens_today", opensAt: fmtTime(bf.open), forBreakfast: true };
    }
    // Main opens first (or after breakfast window already passed)
    return { kind: "closed_opens_today", opensAt: fmtTime(todayHours.open), forBreakfast: false };
  }

  // After closing — find next opening day
  let offset = 1;
  while (offset <= 7) {
    const nextIdx = (now.getDay() + offset) % 7;
    const nextDay = DAY_NAMES[nextIdx];
    const nextHours = RESTAURANT.hours.find((h) => h.day === nextDay)!;
    const nextBfClosed = bfClosedDays.includes(nextDay);
    // Opening time is breakfast if available, else main
    const nextOpensAt = !nextBfClosed
      ? (toMins(bf.open) < toMins(nextHours.open) ? fmtTime(bf.open) : fmtTime(nextHours.open))
      : fmtTime(nextHours.open);
    const label = offset === 1 ? "Tomorrow" : nextDay;
    return { kind: "closed_opens_next", day: label, opensAt: nextOpensAt };
  }

  // Fallback (unreachable)
  return { kind: "open", closes: fmtTime(todayHours.close) };
}

export default function HeroStatusBadge() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    function tick() {
      setStatus(getStatus(new Date()));
    }
    tick();
    // Re-evaluate every minute
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    // Skeleton to avoid layout shift before hydration
    return (
      <div className="hidden md:block absolute -bottom-8 -left-8 bg-white border border-[var(--color-border)] rounded-2xl px-5 py-4 shadow-[var(--shadow-lift)] min-w-[9rem]">
        <div className="h-2.5 w-16 rounded bg-[var(--color-border)] mb-2 animate-pulse" />
        <div className="h-4 w-24 rounded bg-[var(--color-border)] animate-pulse" />
      </div>
    );
  }

  let label: string;
  let detail: string;
  let dotColor: string;

  switch (status.kind) {
    case "breakfast":
      label = "Breakfast Now";
      detail = `Until ${status.until}`;
      dotColor = "bg-amber-500";
      break;
    case "open":
      label = "Open Now";
      detail = `Closes at ${status.closes}`;
      dotColor = "bg-emerald-500";
      break;
    case "closed_opens_today":
      label = status.forBreakfast ? "Breakfast" : "Opens Today";
      detail = status.forBreakfast
        ? `${status.opensAt} – ${fmtTime(RESTAURANT.breakfastHours.close)}`
        : status.opensAt;
      dotColor = "bg-[var(--color-text-muted)]";
      break;
    case "closed_opens_next":
      label = `Opens ${status.day}`;
      detail = status.opensAt;
      dotColor = "bg-[var(--color-text-muted)]";
      break;
    default:
      label = "Open Today";
      detail = "";
      dotColor = "bg-emerald-500";
  }

  const isClosed = status.kind === "closed_opens_today" || status.kind === "closed_opens_next";

  return (
    <div className="hidden md:block absolute -bottom-8 -left-8 bg-white border border-[var(--color-border)] rounded-2xl px-5 py-4 shadow-[var(--shadow-lift)]">
      <div className="flex items-center gap-1.5 mb-1">
        <span className={`inline-block w-2 h-2 rounded-full ${dotColor}`} />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: isClosed ? "var(--color-text-muted)" : "inherit" }}
        >
          {label}
        </span>
      </div>
      <div
        className="font-semibold text-[1.05rem]"
        style={{ color: isClosed ? "var(--color-text-muted)" : "var(--color-text)" }}
      >
        {detail}
      </div>
    </div>
  );
}
