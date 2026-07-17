import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { siteConfig } from "@/lib/site";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const result = await createCheckoutSession({
    priceId: body.priceId,
    customerEmail: body.email,
    successUrl: `${siteConfig.url}/account?subscribed=1`,
    cancelUrl: `${siteConfig.url}/subscribe?canceled=1`,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        reason: result.reason,
        message:
          "Stripe is not configured yet. Your interest can still be recorded via the demo form.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, url: result.url });
}
