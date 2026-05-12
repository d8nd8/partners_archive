const DEFAULT_PRODUCTION_ORIGIN = "https://archive-it.ru";

/**
 * Returns the canonical site origin without a trailing slash, for metadata and routes.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return DEFAULT_PRODUCTION_ORIGIN;
}
