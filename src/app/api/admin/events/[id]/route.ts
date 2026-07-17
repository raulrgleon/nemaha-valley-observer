import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/permissions";
import { z } from "zod";

type Ctx = { params: Promise<{ id: string }> };

const schema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export async function PATCH(req: Request, ctx: Ctx) {
  const { session, error } = await requireStaff();
  if (error) return error;
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const event = await prisma.event.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  await prisma.auditLog.create({
    data: {
      action: `event.${parsed.data.status.toLowerCase()}`,
      entity: "Event",
      entityId: id,
      userId: session!.user.id,
    },
  });

  return NextResponse.json({ event });
}
