"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-20 text-center">
      <h1 className="font-serif text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-ink-muted">Please try again. If the problem continues, contact the newsroom.</p>
      <button type="button" onClick={reset} className="mt-6 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">Try again</button>
    </div>
  );
}
