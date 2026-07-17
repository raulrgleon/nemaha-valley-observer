import Link from "next/link";
import type { Game } from "@/types/content";
import { cn } from "@/lib/utils";

export function Scoreboard({ games }: { games: Game[] }) {
  return (
    <section aria-labelledby="scoreboard-heading" className="rounded-[var(--radius)] border border-line bg-bg-elevated p-4">
      <h2 id="scoreboard-heading" className="mb-3 font-serif text-lg font-bold">
        Scoreboard
      </h2>
      <ul className="space-y-3">
        {games.map((game) => (
          <li key={game.id} className="rounded border border-line p-3 text-sm">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {game.sport}
              </span>
              <span
                className={cn(
                  "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                  game.status === "live" && "bg-red-100 text-red-800",
                  game.status === "final" && "bg-stone-200 text-stone-700",
                  game.status === "upcoming" && "bg-blue-50 text-blue-800",
                )}
              >
                {game.status}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 font-semibold">
              <span>{game.homeTeam}</span>
              <span>{game.homeScore ?? "—"}</span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-2 text-ink-muted">
              <span>{game.awayTeam}</span>
              <span>{game.awayScore ?? "—"}</span>
            </div>
            <p className="mt-2 text-xs text-ink-muted">{game.date}</p>
          </li>
        ))}
      </ul>
      <Link href="/sports" className="mt-3 inline-block text-sm font-semibold text-brand no-underline hover:underline">
        Full sports coverage
      </Link>
    </section>
  );
}
