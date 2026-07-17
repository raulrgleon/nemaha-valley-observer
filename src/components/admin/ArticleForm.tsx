"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArticleEditor } from "@/components/admin/ArticleEditor";

const categories = [
  "news",
  "sports",
  "community",
  "schools",
  "business",
  "agriculture",
  "opinion",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 100);
}

export function ArticleForm({
  initial,
  articleId,
}: {
  initial?: {
    title: string;
    dek: string;
    slug: string;
    category: string;
    locality: string;
    body: string;
    tags: string[];
    featured: boolean;
    heroImage?: string | null;
    status: string;
  };
  articleId?: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [dek, setDek] = useState(initial?.dek ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "news");
  const [locality, setLocality] = useState(initial?.locality ?? "Auburn");
  const [body, setBody] = useState(initial?.body ?? "<p></p>");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [heroImage, setHeroImage] = useState(initial?.heroImage ?? "");
  const [status, setStatus] = useState(initial?.status ?? "DRAFT");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      title,
      dek,
      slug: slug || slugify(title),
      category,
      locality,
      body,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured,
      heroImage,
      status,
      subscriberOnly: false,
    };

    const res = await fetch(articleId ? `/api/admin/articles/${articleId}` : "/api/admin/articles", {
      method: articleId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError("Could not save article. Check required fields.");
      console.error(json);
      return;
    }
    router.push("/admin/articles");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-4">
      {error ? <p className="text-sm text-brand">{error}</p> : null}
      <label className="block text-sm font-medium">
        Title
        <input
          className="mt-1 w-full rounded border border-line px-3 py-2"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!articleId) setSlug(slugify(e.target.value));
          }}
          required
        />
      </label>
      <label className="block text-sm font-medium">
        Slug
        <input className="mt-1 w-full rounded border border-line px-3 py-2" value={slug} onChange={(e) => setSlug(e.target.value)} required />
      </label>
      <label className="block text-sm font-medium">
        Dek / summary
        <textarea className="mt-1 w-full rounded border border-line px-3 py-2" rows={3} value={dek} onChange={(e) => setDek(e.target.value)} required />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Category
          <select className="mt-1 w-full rounded border border-line px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Locality
          <input className="mt-1 w-full rounded border border-line px-3 py-2" value={locality} onChange={(e) => setLocality(e.target.value)} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Hero image URL
        <input className="mt-1 w-full rounded border border-line px-3 py-2" value={heroImage} onChange={(e) => setHeroImage(e.target.value)} />
      </label>
      <label className="block text-sm font-medium">
        Tags (comma separated)
        <input className="mt-1 w-full rounded border border-line px-3 py-2" value={tags} onChange={(e) => setTags(e.target.value)} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Status
          <select className="mt-1 w-full rounded border border-line px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            {["DRAFT", "REVIEW", "SCHEDULED", "PUBLISHED", "ARCHIVED"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 pt-6 text-sm font-medium">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured on homepage
        </label>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Body</p>
        <ArticleEditor value={body} onChange={setBody} />
      </div>
      <button disabled={saving} type="submit" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
        {saving ? "Saving…" : "Save article"}
      </button>
    </form>
  );
}
