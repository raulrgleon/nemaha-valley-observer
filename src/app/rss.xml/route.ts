import { getLatestArticles } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export async function GET() {
  const items = getLatestArticles(20)
    .map((a) => `\n<item><title><![CDATA[${a.title}]]></title><link>${siteConfig.url}/news/${a.slug}</link><guid>${siteConfig.url}/news/${a.slug}</guid><description><![CDATA[${a.dek}]]></description><pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${siteConfig.name}</title><link>${siteConfig.url}</link><description>${siteConfig.description}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
