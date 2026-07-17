import type { Metadata } from "next";
import { EventSubmitForm } from "@/components/community/EventSubmitForm";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Submit an Event" };

export default function EventSubmitPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Submit an Event"
        description="Community submissions stay pending until an editor approves them. This form is a Phase 1 demo."
      />
      <EventSubmitForm />
    </div>
  );
}
