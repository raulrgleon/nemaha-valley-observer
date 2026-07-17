import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function createCheckoutSession(opts: {
  priceId?: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}) {
  const stripe = getStripe();
  if (!stripe) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const price = opts.priceId || process.env.STRIPE_PRICE_DIGITAL;
  if (!price) {
    return { ok: false as const, reason: "missing_price" as const };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    customer_email: opts.customerEmail,
    line_items: [{ price, quantity: 1 }],
  });

  return { ok: true as const, url: session.url };
}
