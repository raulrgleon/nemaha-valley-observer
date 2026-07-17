import type { Metadata } from "next";
import Link from "next/link";
import { archives } from "@/lib/data";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Archives" };

export default function ArchivesPage() {
  const years = Array.from(new Set(archives.map((a) => a.year))).sort((a, b) => b - a);
  return (
    <div className="container py-8">
      <PageHeader
        title="Historical Archives"
        description="Browse Herald Archives, Chieftain Archives, and Observer editions. Keep Herald and Chieftain deep-links while new Observer editions publish here."
      />
      <div className="mb-8 flex flex-wrap gap-2">
        {years.map((year) => (
          <Link key={year} href={`/archives/${year}`} className="rounded-full border border-line px-4 py-2 text-sm font-semibold no-underline hover:border-ink">
            {year}
          </Link>
        ))}
      </div>
      <ol className="relative space-y-6 border-l border-line pl-6">
        {archives.map((edition) => (
          <li key={edition.id} className="relative">
            <span className="absolute -left-[1.91rem] top-1 size-3 rounded-full bg-brand" aria-hidden />
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-xl font-semibold">{edition.title}</h2>
              
            </div>
            <p className="text-sm text-ink-muted">{edition.source} · {edition.month} {edition.year}</p>
            <div className="mt-2 inline-flex aspect-[3/4] w-28 items-center justify-center rounded border border-line bg-bg-muted p-2 text-center text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
              {edition.coverLabel}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
