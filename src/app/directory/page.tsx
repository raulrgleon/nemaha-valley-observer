import type { Metadata } from "next";
import Link from "next/link";
import { directory } from "@/lib/data";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Business Directory" };

export default function DirectoryPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Business Directory" description="Local businesses serving southeast Nebraska. Sponsored listings are labeled." />
      <ul className="grid gap-4 sm:grid-cols-2">
        {directory.map((biz) => (
          <li key={biz.id} className="rounded-[var(--radius)] border border-line bg-bg-elevated p-4">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-xl font-semibold">
                <Link href={`/directory/${biz.slug}`} className="no-underline hover:underline">{biz.name}</Link>
              </h2>
              <DemoBadge />
              {biz.sponsored ? <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-amber-900">Sponsored</span> : null}
            </div>
            <p className="text-sm text-ink-muted">{biz.category} · {biz.city}</p>
            <p className="mt-2 text-sm">{biz.summary}</p>
            <p className="mt-2 text-sm text-ink-muted">{biz.address} · {biz.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
