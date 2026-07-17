import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Print Edition" };

export default function PrintEditionPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Read This Week’s Edition" description="Digital flipbook placeholder for the current print edition." />
      <div className="grid max-w-3xl gap-6 sm:grid-cols-[180px_1fr]">
        <div className="flex aspect-[3/4] items-center justify-center rounded border border-line bg-bg-muted p-4 text-center text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Cover · July 10, 2026
        </div>
        <div>
          <p className="text-ink-muted">Press PDF / e-edition viewer connects when production files are available. For now this page demonstrates the reader pathway.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-bg-muted px-4 py-2 text-sm font-semibold text-ink-muted">Read digital edition (soon)</span>
            <Link href="/subscribe" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white no-underline">Subscribe</Link>
            <Link href="/archives" className="rounded-full border border-line px-4 py-2 text-sm font-semibold no-underline">Previous editions</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
