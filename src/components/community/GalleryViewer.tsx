"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function GalleryViewer({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)]"
            onClick={() => setActive(index)}
            aria-label={`Open photo ${index + 1} of ${title}`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
            onClick={() => setActive(null)}
            aria-label="Close gallery"
          >
            <X className="size-5" />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={images[active]}
              alt=""
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <p className="absolute bottom-4 text-sm text-white">
            {active + 1} / {images.length} · Use arrow keys
          </p>
        </div>
      ) : null}
    </>
  );
}
