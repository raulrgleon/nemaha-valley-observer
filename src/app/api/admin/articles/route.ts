import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/permissions";
import { articleSchema } from "@/lib/validation";
import { canPublish } from "@/lib/auth";

export async function GET() {
  const { session, error } = await requireStaff();
  if (error) return error;

  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: { author: true },
    take: 100,
  });
  return NextResponse.json({ articles, role: session!.user.role });
}

export async function POST(req: Request) {
  const { session, error } = await requireStaff();
  if (error) return error;

  const body = await req.json().catch(() => null);
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  let status = parsed.data.status;
  if (status === "PUBLISHED" && !canPublish(session!.user.role)) {
    status = "REVIEW";
  }

  const wordCount = parsed.data.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const article = await prisma.article.create({
    data: {
      ...parsed.data,
      heroImage: parsed.data.heroImage || null,
      status,
      wordCount,
      authorId: session!.user.id,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      isDemo: false,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "article.create",
      entity: "Article",
      entityId: article.id,
      userId: session!.user.id,
    },
  });

  return NextResponse.json({ article });
}
