import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { obituaries } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return obituaries.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const obit = obituaries.find((o) => o.slug === slug);
  if (!obit) return { title: "Obituary" };
  return { title: `${obit.name} — Obituary`, description: obit.summary };
}

export default async function ObituaryPage({ params }: Props) {
  const { slug } = await params;
  const obit = obituaries.find((o) => o.slug === slug);
  if (!obit) notFound();

  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-muted">
        <Link href="/obituaries" className="no-underline hover:underline">Obituaries</Link>
        {" / "}
        <span aria-current="page">{obit.name}</span>
      </nav>
      <div className="mx-auto max-w-3xl">
        <div className="mb-3"><DemoBadge /></div>
        <PageHeader title={obit.name} description={`${obit.age} · ${obit.city}`} />
        {obit.photo ? (
          <div className="relative mb-6 aspect-[4/5] max-w-xs overflow-hidden rounded bg-bg-muted">
            <Image src={obit.photo} alt="" fill className="object-cover" sizes="320px" />
          </div>
        ) : null}
        <p className="text-ink-muted">Died {formatDate(obit.diedOn)}</p>
        <p className="mt-2">Service: {obit.serviceAt} at {obit.serviceLocation}</p>
        <p className="prose-article mt-6">{obit.summary}</p>
      </div>
    </div>
  );
}
