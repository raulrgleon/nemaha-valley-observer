import Link from "next/link";
import type { BreakingNews } from "@/types/content";
import { cn } from "@/lib/utils";

const levelStyles = {
  urgent: "bg-brand text-white",
  alert: "bg-secondary text-white",
  weather: "bg-sky-900 text-white",
} as const;

export function BreakingNewsBar({ breaking }: { breaking: BreakingNews }) {
  if (!breaking.enabled) return null;

  return (
    <div
      className={cn("border-b border-black/10", levelStyles[breaking.level])}
      role="status"
    >
      <div className="container flex flex-wrap items-center gap-3 py-2 text-sm">
        <span className="rounded bg-black/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]">
          Breaking
        </span>
        <Link href={breaking.href} className="font-medium no-underline hover:underline">
          {breaking.text}
        </Link>
      </div>
    </div>
  );
}
