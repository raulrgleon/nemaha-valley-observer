import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Migration Plan",
  description:
    "How Nemaha Valley Observer can move from the current site to this redesign without losing archives or reader trust.",
};

export default function MigrationPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Migration plan for owners"
        eyebrow="Continuity first"
        description="A practical path from anewspaper.net to this platform — preserving Herald Archives, Chieftain Archives, and weekly publishing habits."
      />

      <ol className="max-w-3xl space-y-6">
        {[
          [
            "Inventory what matters",
            "Articles, obituaries, public notices, classifieds, print PDFs, and archive deep-links. No mass scraping without authorization.",
          ],
          [
            "Map categories 1:1",
            "News, sports, schools, agriculture, opinion, and community land in the same reader mental model they already know.",
          ],
          [
            "Connect archives without copying everything",
            "Keep external Herald/Chieftain hosts linked by year/month while new editions publish natively here.",
          ],
          [
            "Train the newsroom",
            "Editors use Draft → Review → Published. Reporters write in TipTap. Events from the public stay pending until approved.",
          ],
          [
            "Soft launch",
            "Staff QA on mobile, obituaries tone, notices accuracy, subscribe/advertise flows — then cut DNS when ready.",
          ],
          [
            "Keep the phone number & PO Box front and center",
            "Readers still reach Auburn the same way. Digital is an upgrade, not a replacement of community access.",
          ],
        ].map(([title, body], i) => (
          <li key={title} className="grid gap-2 border-b border-line pb-6 sm:grid-cols-[3rem_1fr]">
            <span className="font-serif text-3xl font-bold text-brand">{i + 1}</span>
            <div>
              <h2 className="font-serif text-2xl font-bold">{title}</h2>
              <p className="mt-2 text-ink-muted">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/archives" className="bg-brand px-4 py-2 text-sm font-semibold text-white no-underline">
          View archives UI
        </Link>
        <Link href="/admin" className="border border-ink px-4 py-2 text-sm font-semibold no-underline">
          Open admin (staff login)
        </Link>
        <Link href="/contact" className="border border-ink px-4 py-2 text-sm font-semibold no-underline">
          Talk with us
        </Link>
      </div>
    </div>
  );
}
