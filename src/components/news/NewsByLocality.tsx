"use client";

import { useState } from "react";
import type { Article, Locality } from "@/types/content";
import { ArticleCard } from "@/components/news/ArticleCard";
import { cn } from "@/lib/utils";

const localities: Array<Locality | "All"> = [
  "All",
  "Auburn",
  "Nemaha County",
  "Johnson County",
  "Tecumseh",
  "Peru",
  "Southeast Nebraska",
];

export function NewsByLocality({ articles }: { articles: Article[] }) {
  const [locality, setLocality] = useState<Locality | "All">("All");
  const filtered =
    locality === "All"
      ? articles
      : articles.filter((a) => a.locality === locality);

  return (
    <section aria-labelledby="news-locality-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-2">
        <h2 id="news-locality-heading" className="font-serif text-2xl font-bold md:text-3xl">
          News
        </h2>
        <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter by locality">
          {localities.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={locality === item}
              onClick={() => setLocality(item)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                locality === item
                  ? "bg-brand text-white"
                  : "bg-bg-muted text-ink-muted hover:bg-line",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div>
        {filtered.length ? (
          filtered.slice(0, 5).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <p className="py-6 text-ink-muted">No sample stories for this locality yet.</p>
        )}
      </div>
    </section>
  );
}
