"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAdminData,
  saveAdminData,
  type AdminData,
  type Notification as LocalNotification,
} from "@/lib/admin-settings";

interface DBNotification {
  id: string;
  message: string;
  type: string;
  active: boolean;
  createdAt: string;
}

type Tab = "general" | "notifications" | "contact" | "metadata";

interface SiteSettingsFromDB {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "general", label: "General", icon: "settings" },
  { id: "metadata", label: "SEO Metadata", icon: "search" },
  { id: "notifications", label: "Notifications", icon: "notifications" },
  { id: "contact", label: "Contact Info", icon: "contact_mail" },
];

export default function AdminPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [notifications, setNotifications] = useState<DBNotification[]>([]);
  const [tab, setTab] = useState<Tab>("general");
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [auth, setAuth] = useState<{ username: string } | null>(null);
  const [authCheckDone, setAuthCheckDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    setData(getAdminData());
    fetchNotifications();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/me");
      if (res.ok) {
        const data = await res.json();
        setAuth(data.user);
      }
    } finally {
      setAuthCheckDone(true);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
      }
    } catch {
      // silently fail
    }
  };

  const handleLogout = async () => {
    document.cookie = "vortex_admin_token=; path=/; max-age=0";
    setAuth(null);
  };

  const persistLocal = useCallback((next: AdminData) => {
    setData(next);
    saveAdminData(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="liquid-glass rounded-2xl p-8 animate-pulse">
          <div className="h-8 w-48 bg-white/10 rounded mb-4" />
          <div className="h-4 w-72 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="liquid-glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00f4fe] text-2xl">admin_panel_settings</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#00f4fe]">Administrator</span>
          </div>
          {authCheckDone && (
            <div className="flex items-center gap-3">
              {auth ? (
                <>
                  <span className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {auth.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Logout
                  </button>
                </>
              ) : (
                <span className="text-xs text-yellow-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  Read-only — login for full access
                </span>
              )}
            </div>
          )}
        </div>
        <h1 className="font-display text-display-sm font-black text-white">Admin Panel</h1>
      </div>

      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              tab === t.id
                ? "bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white shadow-lg"
                : "bg-white/5 text-on-surface-variant hover:bg-white/10 border border-white/10"
            }`}
          >
            <span className="material-symbols-outlined text-sm sm:text-base">{t.icon}</span>
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
        {saved && (
          <span className="flex items-center gap-1 px-4 py-2.5 text-sm font-bold text-green-400 animate-pulse">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Saved
          </span>
        )}
      </div>

      {tab === "general" && data && (
        <GeneralTab data={data} onSave={persistLocal} />
      )}
      {tab === "notifications" && (
        <NotificationsTab
          notifications={notifications}
          isAuthenticated={!!auth}
          onRefresh={fetchNotifications}
        />
      )}
      {tab === "contact" && data && (
        <ContactTab data={data} onSave={persistLocal} />
      )}
      {tab === "metadata" && (
        <MetadataTab isAuthenticated={!!auth} />
      )}
    </div>
  );
}

function GeneralTab({
  data,
  onSave,
}: {
  data: AdminData;
  onSave: (d: AdminData) => void;
}) {
  const [form, setForm] = useState(data.siteSettings);
  const [dbForm, setDbForm] = useState<SiteSettingsFromDB>({
    siteName: data.siteSettings.siteName,
    siteDescription: data.siteSettings.siteDescription,
    logoUrl: data.siteSettings.logoUrl,
    faviconUrl: "",
  });
  const [dbLoading, setDbLoading] = useState(true);
  const [dbSaving, setDbSaving] = useState(false);
  const [localSaved, setLocalSaved] = useState(false);
  const [dbSaved, setDbSaved] = useState(false);

  useEffect(() => {
    setForm(data.siteSettings);
  }, [data.siteSettings]);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.settings) {
          setDbForm({
            siteName: res.settings.siteName || data.siteSettings.siteName,
            siteDescription: res.settings.siteDescription || data.siteSettings.siteDescription,
            logoUrl: res.settings.logoUrl || data.siteSettings.logoUrl,
            faviconUrl: res.settings.faviconUrl || "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setDbLoading(false));
  }, [data.siteSettings]);

  const handleLocalSave = () => {
    onSave({ ...data, siteSettings: form });
    setLocalSaved(true);
    setTimeout(() => setLocalSaved(false), 2000);
  };

  const handleDbSave = async () => {
    setDbSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dbForm),
      });
      if (res.ok) {
        setDbSaved(true);
        setTimeout(() => setDbSaved(false), 2000);
      }
    } finally {
      setDbSaving(false);
    }
  };

  if (dbLoading) {
    return (
      <div className="liquid-glass rounded-2xl p-6 sm:p-8 animate-pulse">
        <div className="h-6 w-48 bg-white/10 rounded mb-4" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-white/10 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Local Settings */}
      <div className="liquid-glass rounded-2xl p-6 sm:p-8 space-y-5">
        <h2 className="font-display text-title-lg font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00f4fe]">palette</span>
          General Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Site Name (local)</label>
            <input
              type="text"
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Site Description (local)</label>
            <textarea
              value={form.siteDescription}
              onChange={(e) => setForm({ ...form, siteDescription: e.target.value })}
              rows={3}
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Logo URL (local)</label>
            <input
              type="text"
              value={form.logoUrl}
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
              placeholder="https://example.com/logo.png"
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
            />
            {form.logoUrl && (
              <div className="mt-3 size-16 rounded-xl overflow-hidden border border-white/10">
                <img src={form.logoUrl} alt="Logo preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleLocalSave}
          className="bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all active:scale-95 text-sm"
        >
          {localSaved ? "Saved!" : "Save Local Settings"}
        </button>
      </div>

      {/* DB-backed Settings */}
      <div className="liquid-glass rounded-2xl p-6 sm:p-8 space-y-5">
        <h2 className="font-display text-title-lg font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00f4fe]">cloud</span>
          Server Settings (DB)
        </h2>
        <p className="text-on-surface-variant text-body-sm">
          These settings are applied globally and sync across all devices.
        </p>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Site Name</label>
            <input
              type="text"
              value={dbForm.siteName}
              onChange={(e) => setDbForm({ ...dbForm, siteName: e.target.value })}
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Site Description</label>
            <textarea
              value={dbForm.siteDescription}
              onChange={(e) => setDbForm({ ...dbForm, siteDescription: e.target.value })}
              rows={3}
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none resize-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Logo URL</label>
            <input
              type="text"
              value={dbForm.logoUrl}
              onChange={(e) => setDbForm({ ...dbForm, logoUrl: e.target.value })}
              placeholder="https://example.com/logo.png"
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
            />
            {dbForm.logoUrl && (
              <div className="mt-3 size-16 rounded-xl overflow-hidden border border-white/10">
                <img src={dbForm.logoUrl} alt="Logo preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Favicon URL</label>
            <input
              type="text"
              value={dbForm.faviconUrl}
              onChange={(e) => setDbForm({ ...dbForm, faviconUrl: e.target.value })}
              placeholder="https://example.com/favicon.ico"
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
            />
            {dbForm.faviconUrl && (
              <div className="mt-3 size-10 rounded-lg overflow-hidden border border-white/10">
                <img src={dbForm.faviconUrl} alt="Favicon preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleDbSave}
          disabled={dbSaving}
          className="bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all active:scale-95 text-sm disabled:opacity-50"
        >
          {dbSaving ? "Saving..." : dbSaved ? "Saved!" : "Save to Server"}
        </button>
      </div>
    </div>
  );
}

function NotificationsTab({
  notifications,
  isAuthenticated,
  onRefresh,
}: {
  notifications: DBNotification[];
  isAuthenticated: boolean;
  onRefresh: () => void;
}) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const addOrUpdate = async () => {
    if (!message.trim()) return;
    setError("");

    if (editingId) {
      const res = await fetch(`/api/admin/notifications/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), type }),
      });
      if (!res.ok) {
        setError("Failed to update");
        return;
      }
    } else {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), type }),
      });
      if (!res.ok) {
        setError("Failed to create");
        return;
      }
    }

    setMessage("");
    setType("info");
    setEditingId(null);
    onRefresh();
  };

  const remove = async (id: string) => {
    const res = await fetch(`/api/admin/notifications/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      onRefresh();
    }
  };

  const toggleActive = async (n: DBNotification) => {
    const res = await fetch(`/api/admin/notifications/${n.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !n.active }),
    });
    if (res.ok) {
      onRefresh();
    }
  };

  const startEdit = (n: DBNotification) => {
    setMessage(n.message);
    setType(n.type);
    setEditingId(n.id);
  };

  const cancelEdit = () => {
    setMessage("");
    setType("info");
    setEditingId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="liquid-glass rounded-2xl p-6 sm:p-8 text-center">
        <span className="material-symbols-outlined text-4xl text-yellow-400 mb-3">lock</span>
        <h2 className="font-display text-title-lg font-bold text-white mb-2">Login Required</h2>
        <p className="text-on-surface-variant text-body-sm mb-4">
          You need to be logged in to manage notifications.
        </p>
        <a
          href="/admin/login"
          className="inline-flex bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all text-sm"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="liquid-glass rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-display text-title-lg font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00f4fe]">
            {editingId ? "edit" : "add_circle"}
          </span>
          {editingId ? "Edit Notification" : "Add Notification"}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <textarea
            placeholder="Notification message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none resize-none"
          />
          <div className="flex flex-wrap gap-3">
            {(["info", "warning", "success", "error"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  type === t
                    ? "bg-[#9d4edd] text-white border-[#9d4edd]"
                    : "bg-white/5 text-on-surface-variant border-white/10 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={addOrUpdate}
              className="bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold py-2.5 px-6 rounded-full hover:opacity-90 transition-all active:scale-95 text-sm"
            >
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="bg-white/10 text-white font-bold py-2.5 px-6 rounded-full hover:bg-white/20 transition-all text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-6 sm:p-8 space-y-3">
        <h2 className="font-display text-title-lg font-bold text-white flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[#00f4fe]">list</span>
          All Notifications ({notifications.length})
        </h2>
        {notifications.length === 0 ? (
          <p className="text-on-surface-variant text-sm">No notifications yet.</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 sm:gap-4 p-4 rounded-xl border transition-all ${
                n.active ? "border-white/10 bg-white/5" : "border-white/5 opacity-50"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl mt-0.5 ${
                  n.type === "warning"
                    ? "text-yellow-400"
                    : n.type === "error"
                    ? "text-red-400"
                    : n.type === "success"
                    ? "text-green-400"
                    : "text-[#00f4fe]"
                }`}
              >
                {n.type === "warning"
                  ? "warning"
                  : n.type === "error"
                  ? "error"
                  : n.type === "success"
                  ? "check_circle"
                  : "info"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{n.message}</p>
                <p className="text-[10px] text-on-surface-variant mt-1">
                  {new Date(n.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleActive(n)}
                  className={`size-8 rounded-full flex items-center justify-center transition-all ${
                    n.active
                      ? "text-green-400 hover:bg-green-400/10"
                      : "text-on-surface-variant hover:bg-white/10"
                  }`}
                  title={n.active ? "Deactivate" : "Activate"}
                >
                  <span className="material-symbols-outlined text-sm">
                    {n.active ? "visibility" : "visibility_off"}
                  </span>
                </button>
                <button
                  onClick={() => startEdit(n)}
                  className="size-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-white/10 hover:text-white transition-all"
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
                <button
                  onClick={() => remove(n.id)}
                  className="size-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-400/10 transition-all"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ContactTab({
  data,
  onSave,
}: {
  data: AdminData;
  onSave: (d: AdminData) => void;
}) {
  const [form, setForm] = useState(data.contactInfo);

  useEffect(() => {
    setForm(data.contactInfo);
  }, [data.contactInfo]);

  const handleSave = () => {
    onSave({ ...data, contactInfo: form });
  };

  const fields: { key: keyof typeof form; label: string; icon: string; type?: string }[] = [
    { key: "email", label: "Email", icon: "mail", type: "email" },
    { key: "phone", label: "Phone", icon: "call", type: "tel" },
    { key: "address", label: "Address", icon: "location_on" },
    { key: "whatsapp", label: "WhatsApp URL", icon: "chat", type: "url" },
    { key: "telegram", label: "Telegram URL", icon: "send", type: "url" },
    { key: "instagram", label: "Instagram URL", icon: "photo_camera", type: "url" },
    { key: "twitter", label: "Twitter URL", icon: "alternate_email", type: "url" },
  ];

  return (
    <div className="liquid-glass rounded-2xl p-6 sm:p-8 space-y-5">
      <h2 className="font-display text-title-lg font-bold text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-[#00f4fe]">contact_mail</span>
        Contact Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#e0b6ff] text-base">{field.icon}</span>
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              value={form[field.key]}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all active:scale-95 text-sm"
      >
        Save Contact Info
      </button>
    </div>
  );
}

interface SiteMetadata {
  title: string;
  description: string;
  keywords: string;
  siteName: string;
  ogImage: string;
}

const metaDefaults: SiteMetadata = {
  title: "VortexStream - Premium Streaming",
  description: "Streaming anime terlengkap dengan kualitas terbaik. Nonton anime, film, dan series favorit kamu secara gratis.",
  keywords: "streaming anime, nonton anime, anime subtitle indonesia, film series",
  siteName: "VortexStream",
  ogImage: "/images/placeholder.webp",
};

function MetadataTab({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [form, setForm] = useState<SiteMetadata>(metaDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.metadata) setForm(data.metadata);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("SEO Metadata saved!");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="liquid-glass rounded-2xl p-6 sm:p-8 text-center">
        <span className="material-symbols-outlined text-4xl text-yellow-400 mb-3">lock</span>
        <h2 className="font-display text-title-lg font-bold text-white mb-2">Login Required</h2>
        <p className="text-on-surface-variant text-body-sm mb-4">Login untuk mengedit SEO metadata.</p>
        <a
          href="/admin/login"
          className="inline-flex bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all text-sm"
        >
          Go to Login
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="liquid-glass rounded-2xl p-8 animate-pulse">
        <div className="h-6 w-48 bg-white/10 rounded mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-white/10 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const fields: { key: keyof SiteMetadata; label: string; type?: string; rows?: number }[] = [
    { key: "siteName", label: "Site Name" },
    { key: "title", label: "Default Title", rows: 2 },
    { key: "description", label: "Meta Description", rows: 3 },
    { key: "keywords", label: "Meta Keywords", rows: 2 },
    { key: "ogImage", label: "OG Image URL", type: "url" },
  ];

  return (
    <div className="liquid-glass rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="material-symbols-outlined text-[#00f4fe] text-2xl">search</span>
        <span className="text-[9px] font-bold uppercase tracking-widest text-[#00f4fe]">SEO</span>
      </div>
      <h2 className="font-display text-title-lg font-bold text-white">SEO Metadata</h2>
      <p className="text-on-surface-variant text-body-sm">
        Edit metadata default untuk seluruh halaman. Beberapa halaman (anime, episode) menggunakan metadata dinamis terpisah.
      </p>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-sm font-semibold text-white mb-1.5 block">{field.label}</label>
            {field.rows ? (
              <textarea
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                rows={field.rows}
                className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none resize-none"
              />
            ) : (
              <input
                type={field.type || "text"}
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all active:scale-95 text-sm disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Metadata"}
      </button>
    </div>
  );
}
