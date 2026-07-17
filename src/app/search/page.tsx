import type { Metadata } from "next";
import Link from "next/link";
import { searchAll } from "@/lib/content";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = { title: "Search" };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string }> };

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-amber-100 text-ink">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const results = await searchAll(q);
  const total =
    results.articles.length +
    results.obituaries.length +
    results.events.length +
    results.notices.length;

  return (
    <div className="container py-8">
      <PageHeader
        title="Search"
        description="PostgreSQL full-text style contains search across articles, obituaries, events, and notices."
      />
      <form className="mb-8 flex max-w-xl gap-2">
        <label htmlFor="q" className="sr-only">
          Search query
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          className="w-full rounded border border-line bg-bg-elevated px-3 py-2"
          placeholder="Try Auburn, baseball, council…"
        />
        <button type="submit" className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white">
          Search
        </button>
      </form>
      {q ? (
        <p className="mb-6 text-sm text-ink-muted">
          {total} result{total === 1 ? "" : "s"} for “{q}”
        </p>
      ) : null}

      <section className="space-y-8">
        <div>
          <h2 className="mb-3 font-serif text-2xl font-bold">Articles</h2>
          <ul className="space-y-3">
            {results.articles.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/news/${a.slug}`}
                  className="font-serif text-lg font-semibold no-underline hover:underline"
                >
                  {highlight(a.title, q)}
                </Link>
                <p className="text-sm text-ink-muted">{highlight(a.dek, q)}</p>
              </li>
            ))}
            {!results.articles.length && q ? <li className="text-ink-muted">No articles.</li> : null}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-2xl font-bold">Obituaries</h2>
          <ul className="space-y-2">
            {results.obituaries.map((o) => (
              <li key={o.id}>
                <Link
                  href={`/obituaries/${o.slug}`}
                  className="font-semibold no-underline hover:underline"
                >
                  {highlight(o.name, q)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-2xl font-bold">Events</h2>
          <ul className="space-y-2">
            {results.events.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/events/${e.slug}`}
                  className="font-semibold no-underline hover:underline"
                >
                  {highlight(e.title, q)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-serif text-2xl font-bold">Public notices</h2>
          <ul className="space-y-2">
            {results.notices.map((n) => (
              <li key={n.id} className="font-semibold">
                {highlight(n.title, q)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
