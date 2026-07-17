import type { Metadata } from "next";
import Link from "next/link";
import { jobs } from "@/lib/data";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Jobs" };

export default function JobsPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Jobs" description="Local employment listings. Demo postings only." />
      <ul className="divide-y divide-line">
        {jobs.map((job) => (
          <li key={job.id} className="py-4">
            <div className="mb-1 flex items-center gap-2">
              <h2 className="font-serif text-xl font-semibold">
                <Link href={`/jobs/${job.slug}`} className="no-underline hover:underline">{job.title}</Link>
              </h2>
              <DemoBadge />
            </div>
            <p className="text-sm text-ink-muted">{job.employer} · {job.city} · {job.type}</p>
            <p className="mt-1 text-sm text-ink-muted">{job.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
