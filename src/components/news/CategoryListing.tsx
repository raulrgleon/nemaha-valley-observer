import type { Article } from "@/types/content";
import { ArticleCard } from "@/components/news/ArticleCard";
import { AdSlot, PageHeader } from "@/components/shared/ui";

export function CategoryListing({
  title,
  description,
  articles,
  eyebrow,
}: {
  title: string;
  description: string;
  articles: Article[];
  eyebrow?: string;
}) {
  return (
    <div className="container py-8">
      <PageHeader title={title} description={description} eyebrow={eyebrow} />
      <div className="mb-8">
        <AdSlot size="leaderboard" />
      </div>
      {articles.length ? (
        <div>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-ink-muted">No sample articles in this section yet.</p>
      )}
    </div>
  );
}
