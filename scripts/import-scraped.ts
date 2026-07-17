import { readFileSync } from "fs";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Scraped = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  locality: string;
  featured: boolean;
  heroImage: string | null;
  heroCaption: string | null;
  heroCredit: string;
  body: string;
  tags: string[];
  wordCount: number;
  publishedAt: string | null;
  sourceUrl: string;
  isDemo: boolean;
};

async function main() {
  const file = resolve(process.cwd(), "scripts/scraped-articles.json");
  const articles = JSON.parse(readFileSync(file, "utf8")) as Scraped[];

  const admin = await prisma.user.findFirst({
    where: { email: "editor@nemahavalleyobserver.demo" },
  });
  if (!admin) throw new Error("Admin user missing — run seed first");

  // Keep demo stories but demote them so real scrapes lead the homepage.
  await prisma.article.updateMany({
    where: { isDemo: true },
    data: { featured: false },
  });

  for (const a of articles) {
    const data = {
      title: a.title,
      dek: a.dek,
      category: a.category,
      locality: a.locality,
      status: "PUBLISHED" as const,
      featured: a.featured,
      heroImage: a.heroImage,
      heroCaption: a.heroCaption,
      heroCredit: a.heroCredit,
      body: a.body,
      tags: a.tags,
      wordCount: a.wordCount,
      isDemo: false,
      publishedAt: a.publishedAt ? new Date(a.publishedAt) : new Date(),
      authorId: admin.id,
    };

    await prisma.article.upsert({
      where: { slug: a.slug },
      update: data,
      create: { slug: a.slug, ...data },
    });
    console.log("upserted", a.slug);
  }

  const counts = await prisma.article.groupBy({
    by: ["isDemo", "featured"],
    _count: true,
  });
  console.log("counts", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
