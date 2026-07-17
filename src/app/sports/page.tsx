import type { Metadata } from "next";
import { ArticleCard } from "@/components/news/ArticleCard";
import { Scoreboard } from "@/components/sports/Scoreboard";
import { PageHeader, AdSlot } from "@/components/shared/ui";
import { games, getArticlesByCategory } from "@/lib/data";

export const metadata: Metadata = { title: "Sports" };

export default function SportsPage() {
  const articles = getArticlesByCategory("sports");
  return (
    <div className="container py-8">
      <PageHeader
        title="Sports"
        eyebrow="School & community athletics"
        description="Auburn Bulldogs, Johnson County Central, youth leagues, and regional results. Demo scoreboard included."
      />
      <AdSlot size="leaderboard" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <Scoreboard games={games} />
      </div>
    </div>
  );
}
