import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Account" description="Subscriber portal placeholder. Newsletter prefs, saved stories, and billing arrive with Auth.js + Stripe." />
      <div className="rounded border border-line bg-bg-elevated p-5 text-sm text-ink-muted">
        You are viewing the demo account shell. No personal data is stored.
      </div>
    </div>
  );
}
