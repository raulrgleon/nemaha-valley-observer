import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { eventSubmitSchema } from "@/lib/validation";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = eventSubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, pending: true });
  }

  const base = slugify(parsed.data.title) || "event";
  let slug = base;
  let i = 1;
  while (await prisma.event.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }

  const event = await prisma.event.create({
    data: {
      slug,
      title: parsed.data.title,
      date: new Date(parsed.data.date),
      time: parsed.data.time,
      city: parsed.data.city,
      venue: parsed.data.venue,
      category: parsed.data.category || "Community",
      price: parsed.data.price || "Free",
      description: parsed.data.description,
      status: "PENDING",
      submitterEmail: parsed.data.email,
      isDemo: false,
    },
  });

  return NextResponse.json({ ok: true, pending: true, id: event.id });
}
