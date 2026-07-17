import Link from "next/link";
import { moreLinks, navCategories, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-2 border-ink bg-bg-elevated">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div>
          <p className="masthead-wordmark text-2xl text-ink">{siteConfig.name}</p>
          <p className="mt-2 text-sm italic text-ink-muted">{siteConfig.tagline}</p>
          <address className="mt-4 not-italic text-sm text-ink-muted">
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            <br />
            <a href={`tel:${siteConfig.phone}`} className="font-semibold text-ink no-underline hover:underline">
              {siteConfig.phone}
            </a>
            <br />
            <a href={`mailto:${siteConfig.email}`} className="no-underline hover:underline">
              {siteConfig.email}
            </a>
          </address>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Sections
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {navCategories.slice(0, 8).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="no-underline hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Reader services
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[...moreLinks, { label: "Migration plan", href: "/migration" }, { label: "Corrections", href: "/corrections" }].map(
              (item) => (
                <li key={item.href}>
                  <Link href={item.href} className="no-underline hover:underline">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Trust & legal
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="no-underline hover:underline">
                About the Observer
              </Link>
            </li>
            <li>
              <Link href="/corrections" className="no-underline hover:underline">
                Corrections policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="no-underline hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="no-underline hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="no-underline hover:underline">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line bg-bg-muted">
        <div className="container space-y-2 py-4 text-xs text-ink-muted">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Covering Auburn, Tecumseh, Peru,
            Nemaha County, and Johnson County.
          </p>
          <p>
            Redesign prototype for ownership review. Sample stories illustrate layout and
            workflow only; they are not published reports from the Observer newsroom.
          </p>
        </div>
      </div>
    </footer>
  );
}
