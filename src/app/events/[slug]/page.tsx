import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { events } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { DemoBadge, PageHeader } from "@/components/shared/ui";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event" };
  return { title: event.title, description: event.description };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-muted">
        <Link href="/events" className="no-underline hover:underline">Events</Link>
        {" / "}
        <span aria-current="page">{event.title}</span>
      </nav>
      <div className="mb-2"><DemoBadge /></div>
      <PageHeader title={event.title} description={event.description} />
      <dl className="grid max-w-xl gap-3 text-sm sm:grid-cols-2">
        <div><dt className="font-semibold">Date</dt><dd>{formatDate(event.date)}</dd></div>
        <div><dt className="font-semibold">Time</dt><dd>{event.time}</dd></div>
        <div><dt className="font-semibold">Venue</dt><dd>{event.venue}</dd></div>
        <div><dt className="font-semibold">City</dt><dd>{event.city}</dd></div>
        <div><dt className="font-semibold">Category</dt><dd>{event.category}</dd></div>
        <div><dt className="font-semibold">Price</dt><dd>{event.price}</dd></div>
      </dl>
    </div>
  );
}
