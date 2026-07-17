import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/ui";
import { SimpleDemoForm } from "@/components/shared/SimpleDemoForm";

export const metadata: Metadata = { title: "Place a Classified" };

export default function ClassifiedSubmitPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Place a Classified" description="Demo form — payments and moderation arrive in later phases." />
      <SimpleDemoForm
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "price", label: "Price", type: "text" },
          { name: "city", label: "City", type: "text" },
          { name: "summary", label: "Description", type: "textarea" },
        ]}
        success="Your classified was queued for review in this demo."
      />
    </div>
  );
}
