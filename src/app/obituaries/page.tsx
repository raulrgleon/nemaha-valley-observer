import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getObituaries } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Obituaries",
  description: "Obituaries and service information for southeast Nebraska communities.",
};

export const dynamic = "force-dynamic";

export default async function ObituariesPage() {
  const obituaries = await getObituaries();

  return (
    <div className="container py-8">
      <PageHeader
        title="Obituaries"
        description="A respectful record of lives in our communities. Families may contact the newsroom to submit or update notices."
      />
      <p className="mb-8 max-w-2xl border-l-2 border-ink pl-4 text-sm text-ink-muted">
        To submit an obituary, call{" "}
        <a href="tel:4022743185" className="font-semibold text-ink no-underline hover:underline">
          (402) 274-3185
        </a>{" "}
        or use{" "}
        <Link href="/contact" className="text-brand no-underline hover:underline">
          Contact
        </Link>
        . Sample entries below show layout only.
      </p>
      <ul className="divide-y divide-line">
        {obituaries.map((obit) => (
          <li key={obit.id} className="flex gap-4 py-6">
            {obit.photo ? (
              <div className="relative size-24 shrink-0 overflow-hidden bg-bg-muted grayscale">
                <Image src={obit.photo} alt="" fill className="object-cover" sizes="96px" />
              </div>
            ) : (
              <div className="size-24 shrink-0 bg-bg-muted" aria-hidden />
            )}
            <div>
              <h2 className="font-serif text-2xl font-semibold">
                <Link href={`/obituaries/${obit.slug}`} className="no-underline hover:underline">
                  {obit.name}
                </Link>
              </h2>
              <p className="mt-1 text-ink-muted">
                {obit.age ? `Age ${obit.age} · ` : ""}
                {obit.city} · Died {formatDate(obit.diedOn, { weekday: undefined })}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {obit.summary.replace(/^DEMO CONTENT — /i, "").replace(/^Fictional obituary\.?\s*/i, "")}
              </p>
              <p className="mt-2 text-sm">
                Service: {obit.serviceAt} · {obit.serviceLocation}
              </p>
              <Link
                href={`/obituaries/${obit.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-brand no-underline hover:underline"
              >
                Read obituary
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
