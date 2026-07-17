import type { Metadata } from "next";
import { CategoryListing } from "@/components/news/CategoryListing";
import { getArticlesByCategory } from "@/lib/data";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <CategoryListing
      title="Community"
      description="Everyday life across southeast Nebraska — programs, gatherings, and neighbor stories."
      articles={getArticlesByCategory("community")}
    />
  );
}
