import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { classifieds } from "@/lib/data";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return classifieds.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = classifieds.find((c) => c.slug === slug);
  return { title: item?.title ?? "Classified" };
}

export default async function ClassifiedDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = classifieds.find((c) => c.slug === slug);
  if (!item) notFound();
  return (
    <div className="container py-8">
      <Link href="/classifieds" className="text-sm text-brand no-underline hover:underline">← Classifieds</Link>
      <div className="mt-4 mb-2"><DemoBadge /></div>
      <PageHeader title={item.title} description={`${item.category} · ${item.city} · ${item.price ?? ""}`} />
      <p className="max-w-2xl text-ink-muted">{item.summary}</p>
    </div>
  );
}
