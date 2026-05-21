export function safeImage(url?: string | null) {
  if (!url || url === "null" || url.trim() === "") {
    return "/images/placeholder.webp";
  }

  return url;
}
