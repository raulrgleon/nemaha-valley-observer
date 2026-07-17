import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { directory } from "@/lib/data";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return directory.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const biz = directory.find((d) => d.slug === slug);
  return { title: biz?.name ?? "Directory" };
}

export default async function DirectoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const biz = directory.find((d) => d.slug === slug);
  if (!biz) notFound();
  return (
    <div className="container py-8">
      <Link href="/directory" className="text-sm text-brand no-underline hover:underline">← Directory</Link>
      <div className="mt-4 mb-2"><DemoBadge /></div>
      <PageHeader title={biz.name} description={`${biz.category} · ${biz.city}`} />
      <p className="max-w-2xl text-ink-muted">{biz.summary}</p>
      <p className="mt-4 text-sm">{biz.address}</p>
      <p className="text-sm">{biz.phone}</p>
    </div>
  );
}
