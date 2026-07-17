"use client";

import { useState } from "react";

type EventRow = {
  id: string;
  title: string;
  status: string;
  city: string;
  date: string;
};

export function EventModeration({ events }: { events: EventRow[] }) {
  const [rows, setRows] = useState(events);

  async function setStatus(id: string, status: "APPROVED" | "REJECTED" | "PENDING") {
    const res = await fetch(`/api/admin/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return;
    setRows((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  return (
    <ul className="divide-y divide-line rounded border border-line bg-bg-elevated">
      {rows.map((event) => (
        <li key={event.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-semibold">{event.title}</p>
            <p className="text-sm text-ink-muted">
              {event.status} · {event.city} · {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="rounded border border-line px-3 py-1 text-xs font-semibold" onClick={() => setStatus(event.id, "APPROVED")}>
              Approve
            </button>
            <button type="button" className="rounded border border-line px-3 py-1 text-xs font-semibold" onClick={() => setStatus(event.id, "REJECTED")}>
              Reject
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
