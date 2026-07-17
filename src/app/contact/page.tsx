import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/ui";
import { SimpleDemoForm } from "@/components/shared/SimpleDemoForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Contact" description="Reach the newsroom, advertising, or circulation desk." />
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="text-sm text-ink-muted">
          <p className="font-semibold text-ink">Newsroom</p>
          <p>{siteConfig.address.line1}</p>
          <p>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</p>
          <p className="mt-2">{siteConfig.phone}</p>
          <p>{siteConfig.email}</p>
        </div>
        <SimpleDemoForm
          fields={[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "message", label: "Message", type: "textarea" },
          ]}
          success="Message captured for this demo. Email delivery connects later via Resend."
        />
      </div>
    </div>
  );
}
