export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/shared/ui";
import { EventModeration } from "@/components/admin/EventModeration";

export const metadata: Metadata = { title: "Events · Admin", robots: { index: false } };

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return (
    <div>
      <PageHeader title="Event moderation" description="Approve community submissions before they appear on the calendar." />
      <EventModeration events={events.map((e) => ({ id: e.id, title: e.title, status: e.status, city: e.city, date: e.date.toISOString() }))} />
    </div>
  );
}
