"use client";

import { useState } from "react";
import Link from "next/link";
import type { EventItem } from "@/types/content";
import { formatDate } from "@/lib/utils";
import { DemoBadge } from "@/components/shared/ui";

export function EventsList({
  events,
  compact = false,
}: {
  events: EventItem[];
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "space-y-3" : "divide-y divide-line"}>
      {events.map((event) => (
        <li key={event.id} className={compact ? "" : "py-4"}>
          <article className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <div className="text-sm font-semibold text-brand">
              {formatDate(event.date, {
                weekday: undefined,
                month: "short",
                day: "numeric",
                year: undefined,
              })}
            </div>
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="font-serif text-lg font-bold leading-snug">
                  <Link href={`/events/${event.slug}`} className="no-underline hover:underline">
                    {event.title}
                  </Link>
                </h3>
                
              </div>
              <p className="text-sm text-ink-muted">
                {event.time} · {event.venue} · {event.city} · {event.price}
              </p>
              {!compact ? (
                <p className="mt-1 text-sm text-ink-muted">{event.description}</p>
              ) : null}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lists = form.getAll("lists").map(String);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        lists,
        company: form.get("company"),
      }),
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="rounded-[var(--radius)] border border-line bg-accent-soft p-5"
    >
      <h2 id="newsletter-heading" className="font-serif text-2xl font-bold">
        Newsletters
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Choose the lists you want. Unsubscribe anytime.
      </p>
      {status === "success" ? (
        <p className="mt-4 rounded bg-white p-3 text-sm text-success" role="status">
          You are subscribed. Welcome to the Observer newsletters.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          {status === "error" ? <p className="text-sm text-brand">Please choose at least one list.</p> : null}
          <div className="absolute -left-[9999px]" aria-hidden>
            <label>
              Company
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label className="block text-sm font-medium">
            Email
            <input
              required
              type="email"
              name="email"
              className="mt-1 w-full rounded border border-line bg-white px-3 py-2"
              placeholder="you@example.com"
            />
          </label>
          <fieldset className="space-y-2 text-sm">
            <legend className="font-medium">Choose lists</legend>
            {[
              "Daily Headlines",
              "Weekly Community Roundup",
              "Local Sports",
              "Obituaries",
              "Breaking News",
              "Weekend Events",
            ].map((list) => (
              <label key={list} className="flex items-center gap-2">
                <input type="checkbox" name="lists" value={list} defaultChecked={list === "Daily Headlines"} />
                {list}
              </label>
            ))}
          </fieldset>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1" />
            I consent to receive selected newsletters and understand I can unsubscribe anytime.
          </label>
          <button
            type="submit"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
