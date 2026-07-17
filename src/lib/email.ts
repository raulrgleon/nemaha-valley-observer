import { Resend } from "resend";

export async function sendNewsletterWelcome(email: string, lists: string[]) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[email] Resend not configured — welcome skipped for", email);
    return { sent: false, reason: "not_configured" as const };
  }

  const resend = new Resend(key);
  const from = process.env.EMAIL_FROM || "Nemaha Valley Observer <noreply@deto.llc>";
  await resend.emails.send({
    from,
    to: email,
    subject: "Welcome to Nemaha Valley Observer newsletters",
    text: `Thanks for subscribing to: ${lists.join(", ")}. You can unsubscribe anytime.`,
  });
  return { sent: true as const };
}
