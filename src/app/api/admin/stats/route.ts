import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/permissions";
import { prisma } from "@/lib/db";

export async function GET() {
  const { error } = await requireStaff();
  if (error) return error;

  const [articles, pendingEvents, subscribers, notices] = await Promise.all([
    prisma.article.count(),
    prisma.event.count({ where: { status: "PENDING" } }),
    prisma.newsletterSubscriber.count({ where: { active: true } }),
    prisma.publicNotice.count(),
  ]);

  const recent = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    take: 8,
    select: { id: true, title: true, status: true, updatedAt: true, slug: true },
  });

  return NextResponse.json({
    stats: { articles, pendingEvents, subscribers, notices },
    recent,
  });
}
