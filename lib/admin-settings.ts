export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
}

export interface Notification {
  id: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  active: boolean;
  createdAt: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  twitter: string;
}

export interface AdminData {
  siteSettings: SiteSettings;
  notifications: Notification[];
  contactInfo: ContactInfo;
}

const STORAGE_KEY = "vortex_admin";

export const defaultAdminData: AdminData = {
  siteSettings: {
    siteName: "VortexStream",
    siteDescription: "Premium Streaming Platform - Nonton Anime, Film, dan Series Favoritmu",
    logoUrl: "",
  },
  notifications: [],
  contactInfo: {
    email: "support@vortexstream.id",
    phone: "+62 812-3456-7890",
    address: "Jl. Mangga Dua Raya No. 8, Jakarta Pusat 10730, Indonesia",
    whatsapp: "https://wa.me/6281234567890",
    telegram: "https://t.me/vortexstream",
    instagram: "https://instagram.com/vortexstream",
    twitter: "https://twitter.com/vortexstream",
  },
};

export function getAdminData(): AdminData {
  if (typeof window === "undefined") return defaultAdminData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultAdminData;
    return JSON.parse(raw) as AdminData;
  } catch {
    return defaultAdminData;
  }
}

export function saveAdminData(data: AdminData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("admin-update"));
}

export function getContactInfo(): ContactInfo {
  return getAdminData().contactInfo;
}

export function getActiveNotifications(): Notification[] {
  return getAdminData().notifications.filter((n) => n.active);
}
