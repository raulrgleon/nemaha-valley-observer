import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">404</p>
      <h1 className="mt-2 font-serif text-4xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink-muted">That story may have moved or the link is outdated.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white no-underline">Back home</Link>
    </div>
  );
}
