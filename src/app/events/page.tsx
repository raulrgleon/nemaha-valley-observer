import type { Metadata } from "next";
import Link from "next/link";
import { EventsList } from "@/components/community/EventsAndNewsletter";
import { events } from "@/lib/data";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Community Calendar"
        description="Upcoming events across Auburn, Tecumseh, Peru, and nearby towns. Submissions require editorial approval."
      />
      <Link href="/events/submit" className="mb-8 inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white no-underline">
        Submit an Event
      </Link>
      <EventsList events={events} />
    </div>
  );
}
