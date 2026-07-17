"use client";

import { useState } from "react";

export function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "success" | "stripe" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const plan = String(form.get("plan") || "Print + Digital");

    const checkout = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, plan }),
    });
    const json = await checkout.json().catch(() => ({}));
    if (checkout.ok && json.url) {
      window.location.href = json.url;
      return;
    }

    // Fallback: record interest via newsletter list
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        lists: [`Subscription interest: ${plan}`],
      }),
    });
    if (res.ok) {
      setStatus(json.reason ? "stripe" : "success");
      setMessage(
        json.message ||
          "Thanks — we recorded your subscription interest. The newsroom will follow up.",
      );
    } else {
      setStatus("error");
      setMessage("Could not submit. Please call (402) 274-3185.");
    }
  }

  if (status === "success" || status === "stripe") {
    return (
      <p className="border border-line bg-bg-elevated p-4 text-sm" role="status">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">
      {status === "error" ? <p className="text-sm text-brand">{message}</p> : null}
      <label className="block text-sm font-medium">
        Name
        <input required name="name" className="mt-1 w-full border border-line px-3 py-2" />
      </label>
      <label className="block text-sm font-medium">
        Email
        <input required type="email" name="email" className="mt-1 w-full border border-line px-3 py-2" />
      </label>
      <label className="block text-sm font-medium">
        Preferred plan
        <select name="plan" className="mt-1 w-full border border-line px-3 py-2" defaultValue="Print + Digital">
          <option>Digital</option>
          <option>Print + Digital</option>
          <option>Snowbird / Seasonal</option>
        </select>
      </label>
      <button type="submit" className="bg-brand px-4 py-2 text-sm font-semibold text-white">
        Continue
      </button>
    </form>
  );
}
