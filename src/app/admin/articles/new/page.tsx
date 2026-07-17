export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "New article · Admin", robots: { index: false } };

export default function NewArticlePage() {
  return (
    <div>
      <PageHeader title="New article" description="Write and move through the editorial workflow." />
      <ArticleForm />
    </div>
  );
}
