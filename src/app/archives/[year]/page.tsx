import type { Metadata } from "next";
import Link from "next/link";
import { archives } from "@/lib/data";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

type Props = { params: Promise<{ year: string }> };

export async function generateStaticParams() {
  return Array.from(new Set(archives.map((a) => a.year))).map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return { title: `Archives ${year}` };
}

export default async function ArchivesYearPage({ params }: Props) {
  const { year } = await params;
  const yearNum = Number(year);
  const editions = archives.filter((a) => a.year === yearNum);
  return (
    <div className="container py-8">
      <Link href="/archives" className="text-sm text-brand no-underline hover:underline">← All archives</Link>
      <PageHeader title={`${year} Archives`} description="Editions and historical collections for this year." />
      {editions.length ? (
        <ul className="space-y-4">
          {editions.map((edition) => (
            <li key={edition.id} className="rounded border border-line p-4">
              <div className="mb-1 flex items-center gap-2">
                <h2 className="font-serif text-xl font-semibold">{edition.title}</h2>
                <DemoBadge />
              </div>
              <p className="text-sm text-ink-muted">{edition.source}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-ink-muted">No demo editions for this year.</p>
      )}
    </div>
  );
}
