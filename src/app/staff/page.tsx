import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Staff" };

export default function Page() {
  return (
    <div className="container py-8">
      <PageHeader title="Staff" description="Newsroom contacts for the redesign prototype." />
      <div className="prose-article max-w-3xl space-y-4 text-ink-muted">
        <ul className="space-y-3">
          <li><strong className="text-ink">NVO Staff</strong> — Newsroom (demo)</li>
          <li><strong className="text-ink">Sports Desk</strong> — Athletics (demo)</li>
          <li><strong className="text-ink">Community Desk</strong> — Events & features (demo)</li>
        </ul>
      </div>
    </div>
  );
}
