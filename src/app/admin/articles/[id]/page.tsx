export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { PageHeader } from "@/components/shared/ui";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Edit article · Admin", robots: { index: false } };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div>
      <PageHeader title="Edit article" description={article.title} />
      <ArticleForm
        articleId={article.id}
        initial={{
          title: article.title,
          dek: article.dek,
          slug: article.slug,
          category: article.category,
          locality: article.locality,
          body: article.body,
          tags: article.tags,
          featured: article.featured,
          heroImage: article.heroImage,
          status: article.status,
        }}
      />
    </div>
  );
}
