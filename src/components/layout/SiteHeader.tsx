"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloudSun, Menu, Search, X } from "lucide-react";
import { moreLinks, navCategories, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dateLabel, setDateLabel] = useState("");
  const [weather, setWeather] = useState("Auburn · Loading…");

  useEffect(() => {
    setDateLabel(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
    fetch("/api/weather?city=Auburn")
      .then((r) => r.json())
      .then((d) => {
        setWeather(`Auburn ${d.temp}° · ${d.condition} · H ${d.high}° / L ${d.low}°`);
      })
      .catch(() => setWeather("Auburn weather unavailable"));
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const primary = navCategories.slice(0, 9);
  const overflow = navCategories.slice(9);

  return (
    <header className="border-b border-ink bg-bg-elevated">
      <div className="border-b border-line bg-ink text-stone-200">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-1.5 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <time suppressHydrationWarning className="font-medium">
              {dateLabel || "\u00A0"}
            </time>
            <span className="inline-flex items-center gap-1" aria-label="Weather Auburn Nebraska">
              <CloudSun className="size-3.5 opacity-80" aria-hidden />
              <span suppressHydrationWarning>{weather}</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/subscribe" className="font-semibold text-white no-underline hover:underline">
              Subscribe
            </Link>
            <span aria-hidden>·</span>
            <Link href="/advertise" className="font-semibold text-white no-underline hover:underline">
              Advertise
            </Link>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <Link href="/login" className="hidden font-semibold text-white no-underline hover:underline sm:inline">
              Sign In
            </Link>
            <button
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-sm border border-stone-600"
              aria-label="Open search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-b border-line">
          <form action="/search" className="container flex gap-2 py-3">
            <label htmlFor="site-search" className="sr-only">
              Search the Observer
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="Search news, obituaries, events, notices…"
              className="w-full border border-line bg-bg px-3 py-2 text-sm"
              autoFocus
            />
            <button type="submit" className="bg-brand px-4 py-2 text-sm font-semibold text-white">
              Search
            </button>
          </form>
        </div>
      ) : null}

      <div className="container py-5 text-center md:py-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          Auburn · Tecumseh · Peru · Nemaha & Johnson Counties
        </p>
        <Link
          href="/"
          className="masthead-wordmark mt-2 block text-[2rem] leading-none text-ink no-underline sm:text-5xl md:text-6xl"
        >
          {siteConfig.name}
        </Link>
        <p className="mt-2 text-sm italic text-ink-muted">{siteConfig.tagline}</p>
        <p className="mt-3 text-xs text-ink-muted">
          {siteConfig.phone} · {siteConfig.address.line1}, {siteConfig.address.city},{" "}
          {siteConfig.address.state} {siteConfig.address.zip}
        </p>
        <div className="mt-4 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            className="inline-flex items-center gap-2 border border-ink px-3 py-2 text-sm font-semibold"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
            Sections
          </button>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="sticky top-0 z-50 hidden border-y border-ink bg-bg-elevated lg:block"
      >
        <ul className="container flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-sm font-semibold uppercase tracking-wide">
          {primary.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="py-1 no-underline hover:text-brand">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="group relative">
            <button type="button" className="py-1 font-semibold uppercase hover:text-brand">
              More
            </button>
            <ul className="invisible absolute left-0 top-full z-20 min-w-52 border border-line bg-bg-elevated p-2 opacity-0 shadow-[var(--shadow)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {[...overflow, ...moreLinks].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium normal-case tracking-normal no-underline hover:bg-bg-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line lg:hidden">
          <ul className="container max-h-[70vh] space-y-1 overflow-y-auto py-4 text-base font-semibold">
            {[...navCategories, ...moreLinks].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn("block px-2 py-2 no-underline hover:bg-bg-muted")}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
