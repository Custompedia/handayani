"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { SectionHeading } from "./reveal";
import {
  portfolio,
  portfolioCategories,
  type PortfolioCategory,
} from "@/lib/data";
import { cn } from "@/lib/utils";

// Satu "blok" = 1 foto besar (2×2) + 8 foto kecil: pas 3 baris di grid 4 kolom
// (desktop), 4 baris di grid 3 kolom (tablet), dan 5 baris di HP (foto besar
// selebar layar + 4 baris × 2).
const PAGE_SIZE = 9;

const categoryLabel = Object.fromEntries(
  portfolioCategories.map((c) => [c.id, c.label]),
);

// "Semua" diselang-seling per kategori supaya halaman pertama langsung bervariasi.
const mixed = (() => {
  const groups = portfolioCategories
    .slice(1)
    .map((c) => portfolio.filter((item) => item.category === c.id));
  const longest = Math.max(...groups.map((g) => g.length));
  return Array.from({ length: longest }).flatMap((_, i) =>
    groups.flatMap((g) => (g[i] ? [g[i]] : [])),
  );
})();

export function Portfolio() {
  const [category, setCategory] = useState<PortfolioCategory>("semua");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items =
    category === "semua"
      ? mixed
      : portfolio.filter((item) => item.category === category);
  const visible = items.slice(0, limit);

  const count = items.length;
  const isOpen = lightbox !== null;
  const step = (dir: 1 | -1) =>
    setLightbox((i) => (i === null ? i : (i + dir + count) % count));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (dir) setLightbox((i) => (i === null ? i : (i + dir + count) % count));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, count]);

  const current = lightbox === null ? null : items[lightbox];

  return (
    <section id="portofolio" className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Portofolio"
        title="Hasil pemasangan"
        accent="kami"
        description="Dari rumah tinggal, townhouse, sampai villa & klinik di Semarang dan sekitarnya."
      />

      <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
        {portfolioCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setCategory(c.id);
              setLimit(PAGE_SIZE);
            }}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              category === c.id
                ? "border-ink bg-ink text-cream"
                : "border-linen text-ink hover:border-ink bg-white",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <motion.ul
        layout
        className="mt-8 grid grid-cols-2 gap-3 md:grid-flow-dense md:grid-cols-3 md:gap-4 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => {
            const featured = i % PAGE_SIZE === 0;
            // Foto besar bergantian kiri–kanan tiap blok.
            const flipped = featured && Math.floor(i / PAGE_SIZE) % 2 === 1;
            return (
              <motion.li
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  featured && "col-span-2 md:row-span-2",
                  flipped && "md:col-start-2 lg:col-start-3",
                )}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={cn(
                    "group bg-sand relative block aspect-[4/5] w-full overflow-hidden rounded-md text-left md:aspect-square",
                    featured &&
                      "aspect-square sm:aspect-[4/3] md:aspect-auto md:h-full",
                  )}
                >
                  <Image
                    src={item.src}
                    alt={`${item.title}${item.location ? ` — ${item.location}` : ""}`}
                    fill
                    sizes={
                      featured
                        ? "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
                        : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="from-ink/85 via-ink/30 text-cream absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t to-transparent p-3 pt-12 sm:p-4 sm:pt-16">
                    <div className="min-w-0">
                      <p className="text-cream/80 hidden text-[10px] font-bold tracking-[0.2em] uppercase sm:block">
                        {categoryLabel[item.category]}
                      </p>
                      <p
                        className={cn(
                          "font-serif leading-tight sm:mt-1.5",
                          featured
                            ? "text-xl sm:text-2xl"
                            : "text-sm sm:text-lg md:text-base lg:text-lg",
                        )}
                      >
                        {item.title}
                      </p>
                      {item.location && (
                        <p className="text-cream/75 mt-0.5 text-[11px] sm:text-sm">
                          {item.location}
                        </p>
                      )}
                    </div>
                    <span className="border-cream/80 group-hover:bg-cream group-hover:text-ink hidden size-9 shrink-0 place-items-center rounded-full border transition-colors sm:grid">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <div className="border-linen mt-10 flex flex-col items-center gap-4 border-t pt-6 sm:flex-row sm:justify-between">
        <p className="text-muted text-sm">
          Menampilkan {visible.length} dari {items.length} foto
        </p>
        {limit < items.length && (
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="border-ink text-ink hover:bg-ink hover:text-cream inline-flex items-center gap-2 rounded-full border px-6 py-3 font-bold transition-colors"
          >
            <Plus className="size-4" />
            Tampilkan lebih banyak ({items.length - limit})
          </button>
        )}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="bg-ink/90 fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <figure
              className="relative flex h-full max-h-[90svh] w-full max-w-3xl flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1">
                <Image
                  src={current.src}
                  alt={current.title}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="text-cream pt-4 text-center">
                <span className="font-serif text-xl">{current.title}</span>
                {current.location && (
                  <span className="text-cream/70"> · {current.location}</span>
                )}
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="bg-cream/10 text-cream hover:bg-cream/20 absolute top-4 right-4 grid size-11 place-items-center rounded-full"
              aria-label="Tutup"
            >
              <X className="size-6" />
            </button>
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(dir as 1 | -1);
                }}
                className={cn(
                  "bg-cream/10 text-cream hover:bg-cream/20 absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full",
                  dir === -1 ? "left-3 md:left-8" : "right-3 md:right-8",
                )}
                aria-label={dir === -1 ? "Sebelumnya" : "Berikutnya"}
              >
                {dir === -1 ? (
                  <ChevronLeft className="size-6" />
                ) : (
                  <ChevronRight className="size-6" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
