import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Accessibility" };

export default function Page() {
  return (
    <div className="container py-8">
      <PageHeader title="Accessibility" description="Our accessibility commitment." />
      <div className="prose-article max-w-3xl space-y-4 text-ink-muted">
        <p>We aim for WCAG 2.2 AA. Use text-size controls in the header, skip links, and keyboard navigation. Report barriers via the contact form.</p>
      </div>
    </div>
  );
}
