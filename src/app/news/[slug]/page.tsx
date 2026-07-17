import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, getLatestArticles, getPublishedArticles } from "@/lib/content";
import { getAuthor } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/utils";
import { AdSlot } from "@/components/shared/ui";
import { ArticleCard } from "@/components/news/ArticleCard";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      publishedTime: article.publishedAt,
      images: [article.heroImage],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const author = getAuthor(article.authorId);
  const related = (await getLatestArticles(20))
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);
  const mins = readingTime(article.wordCount);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.dek,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: author.name },
    image: [article.heroImage],
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "Nemaha Valley Observer",
    },
  };

  return (
    <div className="container py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-muted">
        <Link href="/" className="no-underline hover:underline">
          Home
        </Link>
        {" / "}
        <Link
          href={`/${article.category === "news" ? "news" : article.category}`}
          className="no-underline hover:underline capitalize"
        >
          {article.category}
        </Link>
        {" / "}
        <span aria-current="page">Article</span>
      </nav>

      <article>
        <header className="mx-auto max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">
              {article.category} · {article.locality}
            </span>
            
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-xl text-ink-muted">{article.dek}</p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-line py-4 text-sm text-ink-muted">
            <p>
              By <span className="font-semibold text-ink">{author.name}</span> ·{" "}
              {formatDate(article.publishedAt)} · {mins} min read
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${siteConfig.url}/news/${article.slug}`)}`}
                className="rounded border border-line px-3 py-1 no-underline"
              >
                Share
              </a>
            </div>
          </div>
        </header>

        <figure className="mx-auto mt-6 max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius)]">
            <Image
              src={article.heroImage}
              alt={article.heroCaption}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
          <figcaption className="mt-2 text-sm text-ink-muted">
            {article.heroCaption} · {article.heroCredit}
          </figcaption>
        </figure>

        <div className="mx-auto mt-8 grid max-w-5xl gap-8 lg:grid-cols-[1fr_240px]">
          <div className="prose-article">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <aside className="space-y-4">
            <AdSlot size="sidebar" />
          </aside>
        </div>
      </article>

      <section className="mx-auto mt-12 max-w-5xl">
        <h2 className="mb-4 font-serif text-2xl font-bold">Related</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {related.map((item) => (
            <ArticleCard key={item.id} article={item} variant="secondary" />
          ))}
        </div>
      </section>
    </div>
  );
}
