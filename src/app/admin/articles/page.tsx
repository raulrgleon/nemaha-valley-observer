export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Articles · Admin", robots: { index: false } };

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <PageHeader title="Articles" description="Draft → Review → Published workflow." />
        <Link href="/admin/articles/new" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white no-underline">New article</Link>
      </div>
      <ul className="divide-y divide-line rounded border border-line bg-bg-elevated">
        {articles.map((a) => (
          <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
            <div>
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-ink-muted">{a.status} · /{a.category} · {a.slug}</p>
            </div>
            <Link href={`/admin/articles/${a.id}`} className="text-sm font-semibold text-brand no-underline hover:underline">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
