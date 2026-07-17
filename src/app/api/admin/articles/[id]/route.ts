import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/permissions";
import { articleSchema } from "@/lib/validation";
import { canPublish } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { session, error } = await requireStaff();
  if (error) return error;
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  const parsed = articleSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = { ...parsed.data } as Record<string, unknown>;
  if (data.status === "PUBLISHED" && !canPublish(session!.user.role)) {
    data.status = "REVIEW";
  }
  if (data.body && typeof data.body === "string") {
    data.wordCount = data.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  }
  if (data.status === "PUBLISHED") {
    data.publishedAt = new Date();
  }

  const article = await prisma.article.update({ where: { id }, data });
  await prisma.auditLog.create({
    data: {
      action: "article.update",
      entity: "Article",
      entityId: id,
      userId: session!.user.id,
    },
  });
  return NextResponse.json({ article });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { session, error } = await requireStaff();
  if (error) return error;
  const { id } = await ctx.params;
  await prisma.article.delete({ where: { id } });
  await prisma.auditLog.create({
    data: {
      action: "article.delete",
      entity: "Article",
      entityId: id,
      userId: session!.user.id,
    },
  });
  return NextResponse.json({ ok: true });
}
