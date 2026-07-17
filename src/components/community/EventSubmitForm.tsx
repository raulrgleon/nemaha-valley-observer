"use client";

import { useState } from "react";

export function EventSubmitForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/events/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        category: "Community",
      }),
    });
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <p className="max-w-xl rounded-[var(--radius)] border border-line bg-bg-elevated p-4 text-sm" role="status">
        Thanks — your event was saved as <strong>pending</strong>. An editor will approve it before it appears on the calendar.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      {status === "error" ? <p className="text-sm text-brand">Could not submit. Please try again.</p> : null}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {(
        [
          ["title", "Event name", "text"],
          ["date", "Date", "date"],
          ["time", "Time", "text"],
          ["city", "City", "text"],
          ["venue", "Venue", "text"],
          ["price", "Price or Free", "text"],
          ["email", "Your email", "email"],
        ] as const
      ).map(([name, label, type]) => (
        <label key={name} className="block text-sm font-medium">
          {label}
          <input
            required={name !== "email"}
            name={name}
            type={type}
            className="mt-1 w-full rounded border border-line bg-bg-elevated px-3 py-2"
          />
        </label>
      ))}
      <label className="block text-sm font-medium">
        Description
        <textarea
          required
          name="description"
          rows={4}
          className="mt-1 w-full rounded border border-line bg-bg-elevated px-3 py-2"
        />
      </label>
      <button type="submit" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
        Submit for review
      </button>
    </form>
  );
}
