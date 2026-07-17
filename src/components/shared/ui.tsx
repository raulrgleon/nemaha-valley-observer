import Link from "next/link";
import { cn } from "@/lib/utils";

/** Hidden on public pitch surfaces — sample notice lives once in the footer. */
export function DemoBadge({ className }: { className?: string }) {
  return null;
}

export function CategoryPill({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-xs font-semibold uppercase tracking-[0.08em] text-brand no-underline hover:underline"
    >
      {children}
    </Link>
  );
}

export function AdSlot({
  label = "Advertisement",
  size = "leaderboard",
  variant = "filled",
  className,
}: {
  label?: string;
  size?: "leaderboard" | "sidebar" | "inline" | "sponsored";
  variant?: "filled" | "rate";
  className?: string;
}) {
  const heights = {
    leaderboard: "min-h-16 md:min-h-20",
    sidebar: "min-h-40",
    inline: "min-h-24",
    sponsored: "min-h-28",
  };

  const examples = {
    leaderboard: {
      title: "Auburn Family Hardware",
      line: "Open weekdays · Farm & home supplies · Call (402) 555-0140",
    },
    sidebar: {
      title: "Valley Insurance Agency",
      line: "Home · Auto · Farm · Serving Nemaha & Johnson Counties",
    },
    inline: {
      title: "Tecumseh Auto Care",
      line: "Oil changes, tires, and inspections — book this week",
    },
    sponsored: {
      title: "Peru Campus Bookstore",
      line: "Textbooks, apparel, and community gifts",
    },
  } as const;

  const example = examples[size];

  return (
    <aside
      aria-label={label}
      className={cn(
        "hidden border border-line bg-bg-elevated text-center md:flex md:flex-col md:items-center md:justify-center",
        heights[size],
        "px-4 py-3",
        className,
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </p>
      {variant === "filled" ? (
        <>
          <p className="mt-1 font-serif text-lg font-semibold text-ink">{example.title}</p>
          <p className="mt-1 max-w-md text-sm text-ink-muted">{example.line}</p>
          <Link href="/advertise" className="mt-2 text-xs font-semibold text-brand no-underline hover:underline">
            Advertise with the Observer
          </Link>
        </>
      ) : (
        <p className="mt-1 text-sm text-ink-muted">
          Local display rates from $45/week · See advertising packages
        </p>
      )}
    </aside>
  );
}

export function SectionHeading({
  title,
  href,
  action,
}: {
  title: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 border-b-2 border-ink pb-2">
      <h2 className="font-serif text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-brand no-underline hover:underline"
        >
          {action ?? "View all"}
        </Link>
      ) : null}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <header className="mb-8 border-b border-line pb-6">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-serif text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-lg text-ink-muted">{description}</p>
      ) : null}
    </header>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-line bg-bg-elevated p-8 text-center">
      <h2 className="font-serif text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-ink-muted">{description}</p>
    </div>
  );
}
