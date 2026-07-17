import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { newsletterSchema } from "@/lib/validation";
import { sendNewsletterWelcome } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  if (parsed.data.company) {
    return NextResponse.json({ ok: true }); // honeypot
  }

  await prisma.newsletterSubscriber.upsert({
    where: { email: parsed.data.email.toLowerCase() },
    update: { lists: parsed.data.lists, active: true },
    create: {
      email: parsed.data.email.toLowerCase(),
      lists: parsed.data.lists,
      active: true,
    },
  });

  await sendNewsletterWelcome(parsed.data.email, parsed.data.lists);

  return NextResponse.json({ ok: true });
}
