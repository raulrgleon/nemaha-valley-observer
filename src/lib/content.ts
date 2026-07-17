import type { Article as DbArticle, BreakingNews as DbBreaking, Event as DbEvent, Gallery as DbGallery, Game as DbGame, Obituary as DbObituary, PublicNotice as DbNotice } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { Article, BreakingNews, EventItem, Gallery, Game, Obituary, PublicNotice } from "@/types/content";
import * as fallback from "@/lib/data";

function mapArticle(a: DbArticle & { author?: { name: string | null; id: string } | null }): Article {
  const paragraphs = a.body
    .split(/\n{2,}/)
    .map((p) => p.replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);

  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    dek: a.dek,
    category: a.category as Article["category"],
    locality: a.locality as Article["locality"],
    authorId: a.authorId ?? "staff",
    publishedAt: (a.publishedAt ?? a.createdAt).toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    featured: a.featured,
    heroImage: a.heroImage || "https://picsum.photos/seed/nvo/1200/800",
    heroCaption: a.heroCaption || "Photo",
    heroCredit: a.heroCredit || "NVO",
    tags: a.tags,
    body: paragraphs.length ? paragraphs : [a.body],
    wordCount: a.wordCount || Math.round(a.body.split(/\s+/).length),
    demo: a.isDemo as true,
  };
}

function mapObituary(o: DbObituary): Obituary {
  return {
    id: o.id,
    slug: o.slug,
    name: o.name,
    age: o.age ?? 0,
    city: o.city,
    diedOn: o.diedOn.toISOString().slice(0, 10),
    serviceAt: o.serviceAt ?? "",
    serviceLocation: o.serviceLocation ?? "",
    summary: o.summary,
    photo: o.photo ?? undefined,
    demo: true,
  };
}

function mapEvent(e: DbEvent): EventItem {
  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    date: e.date.toISOString().slice(0, 10),
    time: e.time,
    city: e.city,
    venue: e.venue,
    category: e.category,
    price: e.price,
    description: e.description,
    demo: true,
  };
}

function mapGallery(g: DbGallery): Gallery {
  return {
    id: g.id,
    slug: g.slug,
    title: g.title,
    eventName: g.eventName,
    date: g.date.toISOString().slice(0, 10),
    photographer: g.photographer,
    coverImage: g.coverImage,
    photoCount: g.images.length,
    images: g.images,
    demo: true,
  };
}

function mapGame(g: DbGame): Game {
  return {
    id: g.id,
    homeTeam: g.homeTeam,
    awayTeam: g.awayTeam,
    homeScore: g.homeScore ?? undefined,
    awayScore: g.awayScore ?? undefined,
    date: g.date.toISOString().slice(0, 10),
    sport: g.sport,
    status: g.status.toLowerCase() as Game["status"],
    demo: true,
  };
}

function mapNotice(n: DbNotice): PublicNotice {
  return {
    id: n.id,
    title: n.title,
    type: n.type,
    agency: n.agency,
    city: n.city,
    county: n.county,
    date: n.date.toISOString().slice(0, 10),
    summary: n.summary,
    demo: true,
  };
}

async function dbAvailable() {
  if (!prisma) return false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export async function getPublishedArticles() {
  if (!(await dbAvailable())) return fallback.articles;
  const rows = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    include: { author: true },
    orderBy: { publishedAt: "desc" },
  });
  return rows.length ? rows.map(mapArticle) : fallback.articles;
}

export async function getArticleBySlug(slug: string) {
  if (!(await dbAvailable())) return fallback.getArticle(slug);
  const row = await prisma.article.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { author: true },
  });
  return row ? mapArticle(row) : fallback.getArticle(slug);
}

export async function getFeaturedArticles() {
  const all = await getPublishedArticles();
  const featured = all.filter((a) => a.featured);
  return featured.length ? featured : all.slice(0, 4);
}

export async function getLatestArticles(limit = 8) {
  const all = await getPublishedArticles();
  return all.slice(0, limit);
}

export async function getArticlesByCategory(category: string) {
  const all = await getPublishedArticles();
  return all.filter((a) => a.category === category);
}

export async function getObituaries() {
  if (!(await dbAvailable())) return fallback.obituaries;
  const rows = await prisma.obituary.findMany({
    where: { published: true },
    orderBy: { diedOn: "desc" },
  });
  return rows.length ? rows.map(mapObituary) : fallback.obituaries;
}

export async function getObituaryBySlug(slug: string) {
  const all = await getObituaries();
  return all.find((o) => o.slug === slug);
}

export async function getEvents() {
  if (!(await dbAvailable())) return fallback.events;
  const rows = await prisma.event.findMany({
    where: { status: "APPROVED" },
    orderBy: { date: "asc" },
  });
  return rows.length ? rows.map(mapEvent) : fallback.events;
}

export async function getEventBySlug(slug: string) {
  const all = await getEvents();
  return all.find((e) => e.slug === slug);
}

export async function getGalleries() {
  if (!(await dbAvailable())) return fallback.galleries;
  const rows = await prisma.gallery.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
  return rows.length ? rows.map(mapGallery) : fallback.galleries;
}

export async function getGalleryBySlug(slug: string) {
  const all = await getGalleries();
  return all.find((g) => g.slug === slug);
}

export async function getGames() {
  if (!(await dbAvailable())) return fallback.games;
  const rows = await prisma.game.findMany({ orderBy: { date: "desc" }, take: 10 });
  return rows.length ? rows.map(mapGame) : fallback.games;
}

export async function getPublicNotices() {
  if (!(await dbAvailable())) return fallback.publicNotices;
  const rows = await prisma.publicNotice.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
  return rows.length ? rows.map(mapNotice) : fallback.publicNotices;
}

export async function getBreaking(): Promise<BreakingNews> {
  if (!(await dbAvailable())) return fallback.breakingNews;
  const row = await prisma.breakingNews.findFirst({
    where: { enabled: true },
    orderBy: { updatedAt: "desc" },
  });
  if (!row) return { ...fallback.breakingNews, enabled: false };
  if (row.expiresAt && row.expiresAt < new Date()) {
    return { ...fallback.breakingNews, enabled: false };
  }
  return {
    enabled: row.enabled,
    text: row.text,
    href: row.href,
    level: row.level.toLowerCase() as BreakingNews["level"],
    sticky: row.sticky,
  };
}

export async function searchAll(query: string) {
  const q = query.trim();
  if (!q) return { articles: [], obituaries: [], events: [], notices: [] };

  if (!(await dbAvailable())) return fallback.searchContent(q);

  const [articles, obituaries, events, notices] = await Promise.all([
    prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { dek: { contains: q, mode: "insensitive" } },
          { body: { contains: q, mode: "insensitive" } },
          { locality: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 20,
      include: { author: true },
    }),
    prisma.obituary.findMany({
      where: {
        published: true,
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { city: { contains: q, mode: "insensitive" } },
          { summary: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 10,
    }),
    prisma.event.findMany({
      where: {
        status: "APPROVED",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { city: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 10,
    }),
    prisma.publicNotice.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { agency: { contains: q, mode: "insensitive" } },
          { type: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 10,
    }),
  ]);

  return {
    articles: articles.map(mapArticle),
    obituaries: obituaries.map(mapObituary),
    events: events.map(mapEvent),
    notices: notices.map(mapNotice),
  };
}

export { mapArticle };
export type { DbBreaking };
