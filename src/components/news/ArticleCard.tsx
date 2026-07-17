import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/content";
import { getAuthor } from "@/lib/data";
import { formatDate, readingTime } from "@/lib/utils";
import { CategoryPill, DemoBadge } from "@/components/shared/ui";

const categoryHref: Record<Article["category"], string> = {
  news: "/news",
  sports: "/sports",
  community: "/community",
  schools: "/schools",
  business: "/business",
  agriculture: "/agriculture",
  opinion: "/opinion",
  obituaries: "/obituaries",
};

export function ArticleCard({
  article,
  variant = "standard",
}: {
  article: Article;
  variant?: "hero" | "secondary" | "standard" | "compact";
}) {
  const author = getAuthor(article.authorId);
  const href = `/news/${article.slug}`;
  const mins = readingTime(article.wordCount);

  if (variant === "compact") {
    return (
      <article className="border-b border-line py-3 last:border-0">
        <CategoryPill href={categoryHref[article.category]}>
          {article.category}
        </CategoryPill>
        <h3 className="mt-1 font-serif text-base font-semibold leading-snug">
          <Link href={href} className="no-underline hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-ink-muted">
          {formatDate(article.publishedAt, { weekday: undefined, month: "short" })} · {mins} min
        </p>
      </article>
    );
  }

  if (variant === "hero") {
    return (
      <article className="grid gap-4 md:grid-cols-2 md:gap-6">
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden rounded-[var(--radius)] no-underline">
          <Image
            src={article.heroImage}
            alt={article.heroCaption}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </Link>
        <div className="flex flex-col justify-center">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <CategoryPill href={categoryHref[article.category]}>
              {article.category}
            </CategoryPill>
            <DemoBadge />
          </div>
          <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            <Link href={href} className="no-underline hover:underline">
              {article.title}
            </Link>
          </h2>
          <p className="mt-3 text-lg text-ink-muted">{article.dek}</p>
          <p className="mt-4 text-sm text-ink-muted">
            {author.name} · {formatDate(article.publishedAt)} · {mins} min read
          </p>
        </div>
      </article>
    );
  }

  if (variant === "secondary") {
    return (
      <article>
        <Link href={href} className="relative mb-3 block aspect-[16/10] overflow-hidden rounded-[var(--radius)] no-underline">
          <Image
            src={article.heroImage}
            alt={article.heroCaption}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <CategoryPill href={categoryHref[article.category]}>
            {article.category}
          </CategoryPill>
          <DemoBadge />
        </div>
        <h3 className="font-serif text-xl font-bold leading-snug">
          <Link href={href} className="no-underline hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{article.dek}</p>
        <p className="mt-2 text-xs text-ink-muted">
          {formatDate(article.publishedAt, { weekday: undefined, month: "short" })} · {mins} min
        </p>
      </article>
    );
  }

  return (
    <article className="grid gap-4 border-b border-line py-5 sm:grid-cols-[180px_1fr] sm:gap-5">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden rounded-[var(--radius)] no-underline sm:aspect-[4/3]">
        <Image
          src={article.heroImage}
          alt={article.heroCaption}
          fill
          className="object-cover"
          sizes="180px"
        />
      </Link>
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <CategoryPill href={categoryHref[article.category]}>
            {article.category}
          </CategoryPill>
          <span className="text-xs text-ink-muted">{article.locality}</span>
          <DemoBadge />
        </div>
        <h3 className="font-serif text-xl font-bold leading-snug md:text-2xl">
          <Link href={href} className="no-underline hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-ink-muted">{article.dek}</p>
        <p className="mt-2 text-xs text-ink-muted">
          {author.name} · {formatDate(article.publishedAt)} · {mins} min read
        </p>
      </div>
    </article>
  );
}
