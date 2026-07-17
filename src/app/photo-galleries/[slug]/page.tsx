import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { galleries } from "@/lib/data";
import { DemoBadge, PageHeader } from "@/components/shared/ui";
import { GalleryViewer } from "@/components/community/GalleryViewer";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return galleries.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = galleries.find((g) => g.slug === slug);
  if (!gallery) return { title: "Gallery" };
  return { title: gallery.title, description: gallery.eventName };
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const gallery = galleries.find((g) => g.slug === slug);
  if (!gallery) notFound();

  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-muted">
        <Link href="/photo-galleries" className="no-underline hover:underline">Photo Galleries</Link>
        {" / "}
        <span aria-current="page">{gallery.title}</span>
      </nav>
      <div className="mb-2"><DemoBadge /></div>
      <PageHeader title={gallery.title} description={`${gallery.eventName} · ${gallery.photographer}`} />
      <GalleryViewer images={gallery.images} title={gallery.title} />
    </div>
  );
}
