import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="About the Observer"
        description="Community journalism for southeast Nebraska — printed weekly, published daily online."
      />
      <div className="prose-article max-w-3xl space-y-4 text-ink-muted">
        <p>
          The Nemaha Valley Observer serves Auburn, Tecumseh, Peru, Nemaha County, Johnson
          County, and neighboring communities with local news, sports, obituaries, public
          notices, and civic information.
        </p>
        <p>
          <strong className="text-ink">Newsroom</strong>
          <br />
          {siteConfig.address.line1}
          <br />
          {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
          <br />
          Phone:{" "}
          <a href={`tel:${siteConfig.phone}`} className="text-ink no-underline hover:underline">
            {siteConfig.phone}
          </a>
        </p>
        <p>
          We correct errors promptly. See our{" "}
          <Link href="/corrections" className="text-brand">
            corrections policy
          </Link>
          . For advertising, visit{" "}
          <Link href="/advertise" className="text-brand">
            Advertise
          </Link>
          . Owners reviewing this redesign can read the{" "}
          <Link href="/migration" className="text-brand">
            migration plan
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
