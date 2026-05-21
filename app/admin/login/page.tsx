"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || data.error || "Login failed");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="liquid-glass rounded-2xl p-8 sm:p-10 text-center mb-6">
          <div className="size-16 rounded-full bg-gradient-to-br from-[#9d4edd] to-[#00f4fe] flex items-center justify-center mx-auto mb-5 shadow-lg">
            <span className="material-symbols-outlined text-3xl text-white">admin_panel_settings</span>
          </div>
          <h1 className="font-display text-display-sm font-black text-white mb-2">Admin Login</h1>
          <p className="text-on-surface-variant text-body-sm">Masuk ke panel administrator</p>
        </div>

        <form onSubmit={handleSubmit} className="liquid-glass rounded-2xl p-6 sm:p-8 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-2">
              <span className="material-symbols-outlined text-red-400 text-sm mt-0.5">error</span>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-white mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full px-4 py-3 text-sm text-white rounded-xl outline-none"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#9d4edd] to-[#00f4fe] text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-all active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
