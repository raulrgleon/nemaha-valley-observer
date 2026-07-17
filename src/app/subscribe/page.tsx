import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/ui";
import { SubscribeForm } from "@/components/subscriptions/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Print and digital subscription options for Nemaha Valley Observer readers across southeast Nebraska.",
};

const plans = [
  {
    name: "Digital",
    price: "$8/mo",
    annual: "or $84/year",
    blurb: "Unlimited website access, newsletters, and e-edition when available.",
    best: false,
  },
  {
    name: "Print + Digital",
    price: "$14/mo",
    annual: "or $148/year",
    blurb: "Weekly home delivery plus full digital access for one household.",
    best: true,
  },
  {
    name: "Snowbird / Seasonal",
    price: "$10/mo",
    annual: "seasonal routing",
    blurb: "Pause or redirect print while keeping digital access year-round.",
    best: false,
  },
];

export default function SubscribePage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Subscribe"
        eyebrow="Support local journalism"
        description="Proposed rates for the redesigned Observer — ready to connect to Stripe checkout when you approve pricing."
      />

      <div className="mb-10 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border bg-bg-elevated p-6 ${plan.best ? "border-brand border-2" : "border-line"}`}
          >
            {plan.best ? (
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                Most popular
              </p>
            ) : null}
            <h2 className="font-serif text-2xl font-bold">{plan.name}</h2>
            <p className="mt-3 font-serif text-4xl font-bold text-ink">{plan.price}</p>
            <p className="text-sm text-ink-muted">{plan.annual}</p>
            <p className="mt-4 text-sm text-ink-muted">{plan.blurb}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <h2 className="font-serif text-2xl font-bold">Start a subscription inquiry</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Tell us your preferred plan. When Stripe is connected, this becomes a one-click
            checkout. Until then, the newsroom receives your request.
          </p>
          <div className="mt-4">
            <SubscribeForm />
          </div>
        </div>
        <aside className="border border-line bg-bg-muted p-5 text-sm text-ink-muted">
          <h3 className="font-serif text-lg font-semibold text-ink">Why subscribe?</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Keep weekly coverage of Auburn, Tecumseh, Peru, and surrounding towns</li>
            <li>Fund sports, obituaries, public notices, and investigative local reporting</li>
            <li>Give advertisers a stable, trusted audience</li>
          </ul>
          <p className="mt-4">
            Questions? Call{" "}
            <a href="tel:4022743185" className="font-semibold text-ink no-underline hover:underline">
              (402) 274-3185
            </a>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-brand no-underline hover:underline">
              contact the newsroom
            </Link>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
