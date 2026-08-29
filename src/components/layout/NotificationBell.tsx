"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  listMyNotifications,
  unreadNotificationCount,
  markNotificationReadAction,
  markAllNotificationsReadAction,
} from "@/server/actions/notifications";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  createdAt: Date;
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<Notification[] | null>(null);
  const [, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    unreadNotificationCount().then(setCount);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next && items === null) {
      listMyNotifications().then(setItems);
    }
  }

  function handleMarkAll() {
    startTransition(async () => {
      await markAllNotificationsReadAction();
      setCount(0);
      setItems((prev) => (prev ? prev.map((n) => ({ ...n, read: true })) : prev));
    });
  }

  function handleClickItem(n: Notification) {
    if (!n.read) {
      startTransition(async () => {
        await markNotificationReadAction(n.id);
        setCount((c) => Math.max(0, c - 1));
        setItems((prev) => (prev ? prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)) : prev));
      });
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={toggle}
        className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-bg cursor-pointer"
        aria-label="Notifications"
      >
        <span className="text-lg">🔔</span>
        {count > 0 && (
          <span className="absolute top-0.5 right-0.5 bg-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-80 bg-card border border-border rounded-[var(--radius-card)] shadow-[var(--shadow-float)] z-50 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-soft">
            <span className="text-sm font-bold text-ink-900">Notifications</span>
            {count > 0 && (
              <button onClick={handleMarkAll} className="text-xs text-teal font-semibold cursor-pointer">
                Tout marquer comme lu
              </button>
            )}
          </div>
          {items === null ? (
            <div className="p-4 text-sm text-ink-300">Chargement...</div>
          ) : items.length === 0 ? (
            <div className="p-4 text-sm text-ink-500">Aucune notification.</div>
          ) : (
            items.map((n) => {
              const content = (
                <div
                  className={`px-4 py-3 border-b border-border-soft last:border-b-0 ${!n.read ? "bg-teal-tint" : ""}`}
                >
                  <div className="text-sm font-semibold text-ink-900">{n.title}</div>
                  {n.body && <div className="text-xs text-ink-500 mt-0.5">{n.body}</div>}
                  <div className="text-[11px] text-ink-300 mt-1">
                    {n.createdAt.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                  </div>
                </div>
              );
              return n.link ? (
                <Link key={n.id} href={n.link} onClick={() => handleClickItem(n)}>
                  {content}
                </Link>
              ) : (
                <div key={n.id} onClick={() => handleClickItem(n)} className="cursor-pointer">
                  {content}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
