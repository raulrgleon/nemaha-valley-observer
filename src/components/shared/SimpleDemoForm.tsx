"use client";

import { useState } from "react";

type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "date";
};

export function SimpleDemoForm({
  fields,
  success,
}: {
  fields: Field[];
  success: string;
}) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="max-w-xl rounded border border-line bg-bg-elevated p-4 text-sm" role="status">
        {success}
      </p>
    );
  }

  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Fax
          <input name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {fields.map((field) => (
        <label key={field.name} className="block text-sm font-medium">
          {field.label}
          {field.type === "textarea" ? (
            <textarea
              required
              name={field.name}
              rows={4}
              className="mt-1 w-full rounded border border-line bg-bg-elevated px-3 py-2"
            />
          ) : (
            <input
              required
              type={field.type}
              name={field.name}
              className="mt-1 w-full rounded border border-line bg-bg-elevated px-3 py-2"
            />
          )}
        </label>
      ))}
      <button type="submit" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
        Submit
      </button>
    </form>
  );
}
