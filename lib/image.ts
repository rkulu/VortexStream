import type { AnimeItem } from "./types";

const BASE_IMAGE_URL =
  "https://www.sankavollerei.com";

export function safeImage(
  url: AnimeItem["image"] | undefined
): string {
  // null / undefined / empty
  if (
    !url ||
    url === "null" ||
    url.trim() === ""
  ) {
    return "/image/placeholder.webp";
  }

  // full url
  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  // relative path
  return `${BASE_IMAGE_URL}${url}`;
}