import type { MetadataRoute } from "next";
import { articles, events, galleries, obituaries } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/news", "/sports", "/obituaries", "/community", "/events", "/schools",
    "/business", "/agriculture", "/public-notices", "/opinion", "/photo-galleries",
    "/classifieds", "/jobs", "/directory", "/archives", "/print-edition", "/search",
    "/subscribe", "/advertise", "/contact", "/about", "/staff",
  ];
  return [
    ...staticRoutes.map((path) => ({ url: `${siteConfig.url}${path}`, changeFrequency: "daily" as const, priority: path === "" ? 1 : 0.7 })),
    ...articles.map((a) => ({ url: `${siteConfig.url}/news/${a.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...obituaries.map((o) => ({ url: `${siteConfig.url}/obituaries/${o.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...events.map((e) => ({ url: `${siteConfig.url}/events/${e.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...galleries.map((g) => ({ url: `${siteConfig.url}/photo-galleries/${g.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
