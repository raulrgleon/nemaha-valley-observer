import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/ui";
import { SimpleDemoForm } from "@/components/shared/SimpleDemoForm";

export const metadata: Metadata = {
  title: "Advertise",
  description:
    "Local advertising packages for print, digital, directory, and newsletter sponsorships across southeast Nebraska.",
};

const packages = [
  {
    name: "Homepage leaderboard",
    rate: "$95 / week",
    detail: "Desktop display across the redesigned homepage · labeled Advertisement",
  },
  {
    name: "Section sponsor",
    rate: "$65 / week",
    detail: "Sports, community, or agriculture placement with category adjacency",
  },
  {
    name: "Directory + sponsored card",
    rate: "$45 / week",
    detail: "Business directory boost plus a sponsored listing card",
  },
  {
    name: "Newsletter sponsorship",
    rate: "$120 / send",
    detail: "Daily headlines or weekly roundup sponsorship (when email is live)",
  },
  {
    name: "Print + digital bundle",
    rate: "Custom",
    detail: "Combine weekly print lineage with matching digital flight",
  },
  {
    name: "Classified / jobs",
    rate: "From $18",
    detail: "Help-wanted, for sale, and community notices",
  },
];

export default function AdvertisePage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Advertise"
        eyebrow="Reach southeast Nebraska"
        description="Clear packages for Main Street businesses — every ad unit is labeled, never covers reading, and is built for local decision-makers."
      />

      <div className="mb-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-ink">
              <th className="py-3 pr-4 font-serif text-lg">Package</th>
              <th className="py-3 pr-4 font-serif text-lg">Proposed rate</th>
              <th className="py-3 font-serif text-lg">What you get</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.name} className="border-b border-line align-top">
                <td className="py-4 pr-4 font-semibold">{pkg.name}</td>
                <td className="py-4 pr-4 text-brand font-semibold">{pkg.rate}</td>
                <td className="py-4 text-ink-muted">{pkg.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-bold">Request a media kit</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Rates above are proposed for the redesign pitch and can be adjusted to your
            rate card. Stripe self-serve billing can connect after approval.
          </p>
          <div className="mt-4">
            <SimpleDemoForm
              fields={[
                { name: "business", label: "Business name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "goals", label: "Goals / preferred packages", type: "textarea" },
              ]}
              success="Thanks — advertising inquiry received. We’ll follow up with availability and artwork specs."
            />
          </div>
        </div>
        <aside className="border border-line bg-bg-muted p-5 text-sm">
          <h3 className="font-serif text-lg font-semibold">Advertising standards</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
            <li>All paid placements labeled “Advertisement” or “Sponsored”</li>
            <li>No pop-ups covering obituaries, notices, or article text</li>
            <li>Mobile units sized for thumb-friendly reading</li>
            <li>Local businesses prioritized over national remnant inventory</li>
          </ul>
          <p className="mt-4 text-ink-muted">
            Call{" "}
            <a href="tel:4022743185" className="font-semibold text-ink no-underline hover:underline">
              (402) 274-3185
            </a>{" "}
            or visit{" "}
            <Link href="/contact" className="font-semibold text-brand no-underline hover:underline">
              Contact
            </Link>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
