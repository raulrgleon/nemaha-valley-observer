import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { galleries } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Photo Galleries" };

export default function GalleriesPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Photo Galleries" description="Community moments from southeast Nebraska. Demo galleries use placeholder photography." />
      <div className="grid gap-6 sm:grid-cols-2">
        {galleries.map((gallery) => (
          <Link key={gallery.id} href={`/photo-galleries/${gallery.slug}`} className="overflow-hidden rounded-[var(--radius)] border border-line no-underline">
            <div className="relative aspect-[16/10]">
              <Image src={gallery.coverImage} alt={gallery.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <div className="p-4">
              <div className="mb-1 flex items-center gap-2">
                <h2 className="font-serif text-2xl font-bold">{gallery.title}</h2>
                <DemoBadge />
              </div>
              <p className="text-sm text-ink-muted">{gallery.photoCount} photos · {gallery.photographer} · {formatDate(gallery.date, { weekday: undefined })}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
