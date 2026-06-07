import type { MetadataRoute } from "next";
import { getAllCaseSlugs } from "@/lib/cases";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const casePages = getAllCaseSlugs().map((slug) => ({
    url: `${base}/cases/${slug}`,
    lastModified: now,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: now,
    },
    ...casePages,
  ];
}
