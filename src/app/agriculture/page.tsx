import type { Metadata } from "next";
import { CategoryListing } from "@/components/news/CategoryListing";
import { getArticlesByCategory } from "@/lib/data";

export const metadata: Metadata = { title: "Agriculture" };

export default function AgriculturePage() {
  return (
    <CategoryListing
      title="Agriculture"
      description="Farm, market, and rural economy coverage for southeast Nebraska."
      articles={getArticlesByCategory("agriculture")}
    />
  );
}
