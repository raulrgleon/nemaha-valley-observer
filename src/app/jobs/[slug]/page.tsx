import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { jobs } from "@/lib/data";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  return { title: job?.title ?? "Job" };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();
  return (
    <div className="container py-8">
      <Link href="/jobs" className="text-sm text-brand no-underline hover:underline">← Jobs</Link>
      <div className="mt-4 mb-2"><DemoBadge /></div>
      <PageHeader title={job.title} description={`${job.employer} · ${job.city} · ${job.type}`} />
      <p className="max-w-2xl text-ink-muted">{job.summary}</p>
    </div>
  );
}
