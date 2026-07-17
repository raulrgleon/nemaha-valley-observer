import type { Metadata } from "next";
import Link from "next/link";
import { getPublicNotices } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Public Notices",
  description: "Government meetings, bids, budgets, and official announcements for southeast Nebraska.",
};

export const dynamic = "force-dynamic";

export default async function PublicNoticesPage() {
  const publicNotices = await getPublicNotices();

  return (
    <div className="container py-8">
      <PageHeader
        title="Public Notices"
        description="Official notices published for the public record — meetings, bids, budgets, zoning, and elections."
      />
      <div className="mb-8 grid gap-4 border border-line bg-bg-muted p-4 text-sm text-ink-muted md:grid-cols-2">
        <p>
          Agencies may place notices by contacting the newsroom at{" "}
          <a href="tel:4022743185" className="font-semibold text-ink no-underline hover:underline">
            (402) 274-3185
          </a>
          .
        </p>
        <p>
          Readers who believe a notice contains an error should use our{" "}
          <Link href="/corrections" className="font-semibold text-brand no-underline hover:underline">
            corrections form
          </Link>
          .
        </p>
      </div>
      <ul className="divide-y divide-line">
        {publicNotices.map((notice) => (
          <li key={notice.id} className="py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">{notice.type}</p>
            <h2 className="mt-1 font-serif text-2xl font-semibold">{notice.title}</h2>
            <p className="mt-1 text-sm text-ink-muted">
              {notice.agency} · {notice.city}, {notice.county} County ·{" "}
              {formatDate(notice.date, { weekday: undefined })}
            </p>
            <p className="mt-2 max-w-3xl text-ink-muted">{notice.summary.replace(/^DEMO — /i, "")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
