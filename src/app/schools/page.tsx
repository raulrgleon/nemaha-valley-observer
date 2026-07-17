import type { Metadata } from "next";
import { CategoryListing } from "@/components/news/CategoryListing";
import { getArticlesByCategory } from "@/lib/data";

export const metadata: Metadata = { title: "Schools" };

export default function SchoolsPage() {
  return (
    <CategoryListing
      title="Schools"
      description="Classrooms, activities, and education news from local districts and campus life."
      articles={getArticlesByCategory("schools")}
    />
  );
}
