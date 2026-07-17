import type { Metadata } from "next";
import { CategoryListing } from "@/components/news/CategoryListing";
import { getArticlesByCategory } from "@/lib/data";

export const metadata: Metadata = { title: "Opinion" };

export default function OpinionPage() {
  return (
    <CategoryListing
      title="Opinion"
      description="Editorials and commentary clearly labeled. Sample pieces are Demo content."
      articles={getArticlesByCategory("opinion")}
    />
  );
}
