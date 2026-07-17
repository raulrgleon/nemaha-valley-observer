import type { Metadata } from "next";
import { CategoryListing } from "@/components/news/CategoryListing";
import { getLatestArticles } from "@/lib/data";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  const articles = getLatestArticles(50).filter((a) =>
    ["news", "community", "schools", "business", "agriculture"].includes(a.category),
  );
  return (
    <CategoryListing
      title="News"
      eyebrow="Southeast Nebraska"
      description="Local reporting from Auburn, Tecumseh, Peru, and surrounding communities. Sample stories are marked Demo content."
      articles={articles}
    />
  );
}
