"use client";

import { useState, useEffect } from "react";

interface Notification {
  id: string;
  message: string;
  type: string;
}

const DISMISSED_KEY = "vortex_dismissed_notifications";

function getDismissed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addDismissed(id: string) {
  const current = getDismissed();
  if (!current.includes(id)) {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...current, id]));
  }
}

const typeStyles: Record<string, { bg: string; icon: string; border: string }> = {
  info: {
    bg: "bg-[#00f4fe]/10",
    icon: "info",
    border: "border-[#00f4fe]/30",
  },
  warning: {
    bg: "bg-yellow-500/10",
    icon: "warning",
    border: "border-yellow-500/30",
  },
  success: {
    bg: "bg-green-500/10",
    icon: "check_circle",
    border: "border-green-500/30",
  },
  error: {
    bg: "bg-red-500/10",
    icon: "error",
    border: "border-red-500/30",
  },
};

export default function NotificationBanner() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDismissed(getDismissed());

    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications || []);
        }
      } catch {
        // silently fail
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = (id: string) => {
    addDismissed(id);
    setDismissed((prev) => [...prev, id]);
  };

  if (!mounted) return null;

  const visible = notifications.filter((n) => !dismissed.includes(n.id));
  if (visible.length === 0) return null;

  return (
    <div className="space-y-2 mb-4 sm:mb-6">
      {visible.map((n) => {
        const style = typeStyles[n.type] || typeStyles.info;
        return (
          <div
            key={n.id}
            className={`${style.bg} ${style.border} border rounded-xl px-4 sm:px-5 py-3 flex items-start gap-3 backdrop-blur-md`}
          >
            <span className={`material-symbols-outlined text-base mt-0.5 flex-shrink-0 ${
              n.type === "warning"
                ? "text-yellow-400"
                : n.type === "error"
                ? "text-red-400"
                : n.type === "success"
                ? "text-green-400"
                : "text-[#00f4fe]"
            }`}>
              {style.icon}
            </span>
            <p className="text-sm text-white flex-1">{n.message}</p>
            <button
              onClick={() => handleDismiss(n.id)}
              className="text-on-surface-variant hover:text-white transition-colors flex-shrink-0 mt-0.5"
              title="Dismiss"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
