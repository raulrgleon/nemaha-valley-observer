import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Privacy" };

export default function Page() {
  return (
    <div className="container py-8">
      <PageHeader title="Privacy" description="How we handle reader information." />
      <div className="prose-article max-w-3xl space-y-4 text-ink-muted">
        <p>This prototype does not store personal data beyond browser session demos. A full privacy policy will replace this page before launch.</p>
      </div>
    </div>
  );
}
