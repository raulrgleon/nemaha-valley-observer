import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/ui";
import { SimpleDemoForm } from "@/components/shared/SimpleDemoForm";

export const metadata: Metadata = { title: "Corrections" };

export default function CorrectionsPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Corrections"
        description="Accuracy matters. If we got something wrong, tell us — editors review every request."
      />
      <div className="mb-8 max-w-2xl space-y-3 text-sm text-ink-muted">
        <p>
          The Observer corrects significant errors of fact in a clear, timely way. Clarifications
          may also be published when wording could mislead readers.
        </p>
        <p>
          For obituaries and public notices, please include the notice name, publication date, and
          the specific change requested.
        </p>
      </div>
      <SimpleDemoForm
        fields={[
          { name: "url", label: "Article URL or headline", type: "text" },
          { name: "email", label: "Your email", type: "email" },
          { name: "details", label: "What needs correcting", type: "textarea" },
        ]}
        success="Correction request received. An editor will review it."
      />
    </div>
  );
}
