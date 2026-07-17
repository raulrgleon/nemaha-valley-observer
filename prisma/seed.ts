import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import {
  archives,
  articles,
  authors,
  breakingNews,
  classifieds,
  directory,
  events,
  galleries,
  games,
  jobs,
  obituaries,
  publicNotices,
} from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD || "ChangeMeNvo2026!";
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email: "editor@nemahavalleyobserver.demo" },
    update: { passwordHash, role: "ADMIN", name: "NVO Editor" },
    create: {
      email: "editor@nemahavalleyobserver.demo",
      name: "NVO Editor",
      role: "ADMIN",
      passwordHash,
    },
  });

  for (const author of authors) {
    await prisma.user.upsert({
      where: { email: `${author.id}@nemahavalleyobserver.demo` },
      update: { name: author.name, role: "REPORTER" },
      create: {
        email: `${author.id}@nemahavalleyobserver.demo`,
        name: author.name,
        role: "REPORTER",
        passwordHash: await bcrypt.hash("reporter-demo", 10),
      },
    });
  }

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        dek: a.dek,
        category: a.category,
        locality: a.locality,
        status: "PUBLISHED",
        featured: a.featured,
        heroImage: a.heroImage,
        heroCaption: a.heroCaption,
        heroCredit: a.heroCredit,
        body: a.body.join("\n\n"),
        tags: a.tags,
        wordCount: a.wordCount,
        isDemo: true,
        publishedAt: new Date(a.publishedAt),
        authorId: admin.id,
      },
      create: {
        slug: a.slug,
        title: a.title,
        dek: a.dek,
        category: a.category,
        locality: a.locality,
        status: "PUBLISHED",
        featured: a.featured,
        heroImage: a.heroImage,
        heroCaption: a.heroCaption,
        heroCredit: a.heroCredit,
        body: a.body.join("\n\n"),
        tags: a.tags,
        wordCount: a.wordCount,
        isDemo: true,
        publishedAt: new Date(a.publishedAt),
        authorId: admin.id,
      },
    });
  }

  for (const o of obituaries) {
    await prisma.obituary.upsert({
      where: { slug: o.slug },
      update: {},
      create: {
        slug: o.slug,
        name: o.name,
        age: o.age,
        city: o.city,
        diedOn: new Date(o.diedOn),
        serviceAt: o.serviceAt,
        serviceLocation: o.serviceLocation,
        summary: o.summary,
        photo: o.photo,
        isDemo: true,
        published: true,
      },
    });
  }

  for (const e of events) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: { status: "APPROVED" },
      create: {
        slug: e.slug,
        title: e.title,
        date: new Date(e.date),
        time: e.time,
        city: e.city,
        venue: e.venue,
        category: e.category,
        price: e.price,
        description: e.description,
        status: "APPROVED",
        isDemo: true,
      },
    });
  }

  for (const g of galleries) {
    await prisma.gallery.upsert({
      where: { slug: g.slug },
      update: {},
      create: {
        slug: g.slug,
        title: g.title,
        eventName: g.eventName,
        date: new Date(g.date),
        photographer: g.photographer,
        coverImage: g.coverImage,
        images: g.images,
        isDemo: true,
        published: true,
      },
    });
  }

  await prisma.game.deleteMany();
  for (const g of games) {
    await prisma.game.create({
      data: {
        homeTeam: g.homeTeam,
        awayTeam: g.awayTeam,
        homeScore: g.homeScore,
        awayScore: g.awayScore,
        date: new Date(g.date),
        sport: g.sport,
        status: g.status.toUpperCase() as "UPCOMING" | "LIVE" | "FINAL",
        isDemo: true,
      },
    });
  }

  await prisma.publicNotice.deleteMany();
  for (const n of publicNotices) {
    await prisma.publicNotice.create({
      data: {
        title: n.title,
        type: n.type,
        agency: n.agency,
        city: n.city,
        county: n.county,
        date: new Date(n.date),
        summary: n.summary,
        isDemo: true,
        published: true,
      },
    });
  }

  for (const c of classifieds) {
    await prisma.classified.upsert({
      where: { slug: c.slug },
      update: { status: "APPROVED" },
      create: {
        slug: c.slug,
        title: c.title,
        category: c.category,
        price: c.price,
        city: c.city,
        summary: c.summary,
        status: "APPROVED",
        isDemo: true,
        postedAt: new Date(c.postedAt),
      },
    });
  }

  for (const d of directory) {
    await prisma.directoryListing.upsert({
      where: { slug: d.slug },
      update: {},
      create: {
        slug: d.slug,
        name: d.name,
        category: d.category,
        city: d.city,
        phone: d.phone,
        address: d.address,
        summary: d.summary,
        sponsored: !!d.sponsored,
        isDemo: true,
        published: true,
      },
    });
  }

  for (const j of jobs) {
    await prisma.jobPosting.upsert({
      where: { slug: j.slug },
      update: {},
      create: {
        slug: j.slug,
        title: j.title,
        employer: j.employer,
        city: j.city,
        type: j.type,
        summary: j.summary,
        postedAt: new Date(j.postedAt),
        isDemo: true,
        published: true,
      },
    });
  }

  await prisma.archiveEdition.deleteMany();
  for (const a of archives) {
    await prisma.archiveEdition.create({
      data: {
        year: a.year,
        month: a.month,
        title: a.title,
        source:
          a.source === "Herald Archives"
            ? "HERALD"
            : a.source === "Chieftain Archives"
              ? "CHIEFTAIN"
              : "OBSERVER",
        coverLabel: a.coverLabel,
        externalUrl: a.externalUrl,
        isDemo: true,
      },
    });
  }

  await prisma.breakingNews.deleteMany();
  await prisma.breakingNews.create({
    data: {
      enabled: breakingNews.enabled,
      text: breakingNews.text,
      href: breakingNews.href,
      level: breakingNews.level.toUpperCase() as "ALERT" | "WEATHER" | "URGENT",
      sticky: breakingNews.sticky,
    },
  });

  console.log("Seed complete");
  console.log("Admin login: editor@nemahavalleyobserver.demo");
  console.log(`Admin password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
