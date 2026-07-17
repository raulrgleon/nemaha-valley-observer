"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Stats = {
  stats: {
    articles: number;
    pendingEvents: number;
    subscribers: number;
    notices: number;
  };
  recent: Array<{ id: string; title: string; status: string; updatedAt: string; slug: string }>;
};

export function AdminDashboard() {
  const [data, setData] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(async (r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then(setData)
      .catch(() => setError("Could not load admin stats."));
  }, []);

  if (error) return <p className="text-brand">{error}</p>;
  if (!data) return <p className="text-ink-muted">Loading dashboard…</p>;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Articles", data.stats.articles],
          ["Pending events", data.stats.pendingEvents],
          ["Newsletter subs", data.stats.subscribers],
          ["Public notices", data.stats.notices],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded border border-line bg-bg-elevated p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
            <p className="mt-2 font-serif text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/articles/new" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white no-underline">
          New article
        </Link>
        <Link href="/admin/articles" className="rounded-full border border-line px-4 py-2 text-sm font-semibold no-underline">
          All articles
        </Link>
        <Link href="/admin/events" className="rounded-full border border-line px-4 py-2 text-sm font-semibold no-underline">
          Moderate events
        </Link>
      </div>

      <section>
        <h2 className="mb-3 font-serif text-2xl font-bold">Recent articles</h2>
        <ul className="divide-y divide-line rounded border border-line bg-bg-elevated">
          {data.recent.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-ink-muted">{item.status} · {new Date(item.updatedAt).toLocaleString()}</p>
              </div>
              <Link href={`/admin/articles/${item.id}`} className="text-brand no-underline hover:underline">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
