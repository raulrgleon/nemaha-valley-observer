import type { Metadata } from "next";
import Link from "next/link";
import { classifieds } from "@/lib/data";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Classifieds" };

export default function ClassifiedsPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Classifieds" description="Local marketplace listings. Demo ads only." />
      <Link href="/classifieds/submit" className="mb-6 inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white no-underline">Place a classified</Link>
      <ul className="divide-y divide-line">
        {classifieds.map((item) => (
          <li key={item.id} className="py-4">
            <div className="mb-1 flex items-center gap-2">
              <h2 className="font-serif text-xl font-semibold">
                <Link href={`/classifieds/${item.slug}`} className="no-underline hover:underline">{item.title}</Link>
              </h2>
              <DemoBadge />
            </div>
            <p className="text-sm text-ink-muted">{item.category} · {item.city} · {item.price}</p>
            <p className="mt-1 text-sm text-ink-muted">{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
