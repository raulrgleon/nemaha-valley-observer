import type { Metadata } from "next";
import { CategoryListing } from "@/components/news/CategoryListing";
import { articles } from "@/lib/data";

export const metadata: Metadata = { title: "Business" };

export default function BusinessPage() {
  return (
    <CategoryListing
      title="Business"
      description="Main Street, employers, and economic life in Nemaha and Johnson counties."
      articles={articles.filter((a) => a.category === "business" || a.tags.includes("Business"))}
    />
  );
}
