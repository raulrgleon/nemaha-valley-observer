import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/news/ArticleCard";
import { NewsByLocality } from "@/components/news/NewsByLocality";
import { EventsList, NewsletterForm } from "@/components/community/EventsAndNewsletter";
import { Scoreboard } from "@/components/sports/Scoreboard";
import { WeatherWidget } from "@/components/sports/WeatherWidget";
import { AdSlot, SectionHeading } from "@/components/shared/ui";
import {
  getEvents,
  getFeaturedArticles,
  getGalleries,
  getGames,
  getLatestArticles,
  getObituaries,
  getPublicNotices,
} from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, latest, events, obituaries, galleries, games, publicNotices] =
    await Promise.all([
      getFeaturedArticles(),
      getLatestArticles(14),
      getEvents(),
      getObituaries(),
      getGalleries(),
      getGames(),
      getPublicNotices(),
    ]);

  const [hero, ...restFeatured] = featured;
  const secondary = restFeatured.slice(0, 2);
  const rail = latest.slice(0, 8);
  const newsArticles = latest.filter((a) =>
    ["news", "community", "schools", "business", "agriculture"].includes(a.category),
  );
  const sports = latest.filter((a) => a.category === "sports");

  return (
    <div className="container py-4 md:py-8">
      {/* Mobile-first stack: headlines → events → obits */}
      <section className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr_280px]">
        <div className="order-1 space-y-6">
          {hero ? <ArticleCard article={hero} variant="hero" /> : null}
          <div className="grid gap-5 sm:grid-cols-2">
            {secondary.map((article) => (
              <ArticleCard key={article.id} article={article} variant="secondary" />
            ))}
          </div>
        </div>

        <aside className="order-2 border-t border-line pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <h2 className="mb-2 font-serif text-xl font-bold">Latest</h2>
          {rail.map((article) => (
            <ArticleCard key={article.id} article={article} variant="compact" />
          ))}
        </aside>

        <aside className="order-5 hidden space-y-5 lg:order-3 lg:block">
          <WeatherWidget />
          <Scoreboard games={games} />
          <AdSlot size="sidebar" />
        </aside>
      </section>

      <section className="order-3 mt-8 grid gap-8 md:grid-cols-2 lg:mt-12">
        <div>
          <SectionHeading title="This Weekend" href="/events" action="Calendar" />
          <EventsList events={events.slice(0, 4)} compact />
          <Link
            href="/events/submit"
            className="mt-4 inline-flex border border-ink px-4 py-2 text-sm font-semibold no-underline hover:bg-ink hover:text-white"
          >
            Submit an event
          </Link>
        </div>
        <div>
          <SectionHeading title="Obituaries" href="/obituaries" />
          <ul className="space-y-4">
            {obituaries.map((obit) => (
              <li key={obit.id} className="border-b border-line pb-4">
                <h3 className="font-serif text-lg font-semibold">
                  <Link href={`/obituaries/${obit.slug}`} className="no-underline hover:underline">
                    {obit.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {obit.age ? `Age ${obit.age} · ` : ""}
                  {obit.city} · Died {formatDate(obit.diedOn, { weekday: undefined })}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Service: {obit.serviceAt} · {obit.serviceLocation}
                </p>
                <Link
                  href={`/obituaries/${obit.slug}`}
                  className="mt-2 inline-block text-sm font-semibold text-brand no-underline hover:underline"
                >
                  Read obituary
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="my-8 hidden md:block">
        <AdSlot size="inline" />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
        <NewsByLocality articles={newsArticles} />
        <div className="space-y-6 lg:hidden">
          <WeatherWidget />
          <Scoreboard games={games} />
        </div>
        <div className="hidden space-y-6 lg:block">
          <SectionHeading title="Sports" href="/sports" />
          {sports.slice(0, 4).map((article) => (
            <ArticleCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>

      <section className="mt-12 md:hidden">
        <SectionHeading title="Sports" href="/sports" />
        {sports.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} variant="compact" />
        ))}
      </section>

      <section className="mt-12 rounded-sm border border-ink bg-bg-muted p-5 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Continuity for readers & families
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold">
              Herald Archives · Chieftain Archives · Today’s Observer
            </h2>
            <p className="mt-3 max-w-2xl text-ink-muted">
              This redesign keeps the paper’s history in view: browse by year, open linked
              external archive editions, and keep a clear path from decades of print coverage
              into the modern site — without forcing a content scrape.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/archives" className="bg-brand px-4 py-2 text-sm font-semibold text-white no-underline">
                Explore archives
              </Link>
              <Link href="/migration" className="border border-ink px-4 py-2 text-sm font-semibold no-underline">
                Migration plan for owners
              </Link>
              <Link href="/print-edition" className="border border-ink px-4 py-2 text-sm font-semibold no-underline">
                This week’s edition
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["Herald · 1998", "Chieftain · 1985", "Observer · 2026"].map((label) => (
              <div
                key={label}
                className="flex aspect-[3/4] items-center justify-center border border-line bg-bg-elevated p-2 text-center text-[10px] font-semibold uppercase tracking-wide text-ink-muted"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading title="From the community" href="/photo-galleries" />
        <div className="grid gap-5 sm:grid-cols-2">
          {galleries.map((gallery) => (
            <Link
              key={gallery.id}
              href={`/photo-galleries/${gallery.slug}`}
              className="group overflow-hidden border border-line no-underline"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={gallery.coverImage}
                  alt={gallery.title}
                  fill
                  className="object-cover transition group-hover:scale-[1.01]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-xl font-bold">{gallery.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {gallery.photoCount} photos · {gallery.photographer} ·{" "}
                  {formatDate(gallery.date, { weekday: undefined })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading title="Public Notices" href="/public-notices" />
          <p className="mb-4 text-sm text-ink-muted">
            Official notices are published for public record. Contact the newsroom with
            questions about placement or corrections.
          </p>
          <ul className="divide-y divide-line border-y border-line">
            {publicNotices.map((notice) => (
              <li key={notice.id} className="py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {notice.type}
                </p>
                <h3 className="font-serif text-lg font-semibold">{notice.title}</h3>
                <p className="text-sm text-ink-muted">
                  {notice.agency} · {notice.city}, {notice.county} County ·{" "}
                  {formatDate(notice.date, { weekday: undefined })}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <NewsletterForm />
          <section className="border border-line bg-bg-elevated p-5">
            <SectionHeading title="Read this week’s edition" href="/print-edition" action="Archives" />
            <div className="mt-2 grid gap-4 sm:grid-cols-[120px_1fr]">
              <div className="flex aspect-[3/4] items-center justify-center border border-line bg-bg-muted p-3 text-center text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Week of July 10
              </div>
              <div>
                <p className="font-serif text-xl font-bold">Print & digital edition</p>
                <p className="mt-2 text-sm text-ink-muted">
                  Keep the weekly paper experience online — cover, inside pages, and a
                  subscribe path for snowbirds and local households.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/print-edition" className="bg-brand px-4 py-2 text-sm font-semibold text-white no-underline">
                    Open edition
                  </Link>
                  <Link href="/subscribe" className="border border-line px-4 py-2 text-sm font-semibold no-underline">
                    Subscribe
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="border border-line p-5">
            <h2 className="font-serif text-xl font-bold">Newsroom</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Tips, corrections, and public notice placement:
            </p>
            <p className="mt-2 text-sm">
              <a href="tel:4022743185" className="font-semibold no-underline hover:underline">
                (402) 274-3185
              </a>
              <br />
              <Link href="/corrections" className="text-brand no-underline hover:underline">
                Request a correction
              </Link>
              {" · "}
              <Link href="/contact" className="text-brand no-underline hover:underline">
                Contact
              </Link>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
