import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <div className="container py-8">
      <PageHeader title="Terms" description="Terms of use for the website." />
      <div className="prose-article max-w-3xl space-y-4 text-ink-muted">
        <p>Demo content is fictional and labeled. Do not treat sample obituaries, scores, or notices as factual reporting.</p>
      </div>
    </div>
  );
}
