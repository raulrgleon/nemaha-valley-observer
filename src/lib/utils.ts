import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    weekday: opts?.weekday,
    month: opts?.month ?? "long",
    day: opts?.day ?? "numeric",
    year: opts?.year ?? "numeric",
    ...opts,
  });
}

export function readingTime(words: number) {
  return Math.max(1, Math.round(words / 220));
}
