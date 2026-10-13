"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Share2 } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { CollectionCards } from "./collection-cards";
import { Reveal, SectionHeading } from "./reveal";
import {
  blackoutCollections,
  swatchSrc,
  swatchThumbSrc,
  vitraseFabrics,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { WaButton } from "./wa-form";

const tabs = [
  { id: "blackout", label: "Blackout", note: "mulai Rp170.000/mL" },
  { id: "vitrase", label: "Vitrase", note: "mulai Rp100.000/mL" },
] as const;

// Link langsung ke satu koleksi, mis. /#kain-lino - supaya admin bisa kirim
// koleksi yang ditanyakan lewat WA tanpa harus kirim seluruh katalog.
const HASH_PREFIX = "#kain-";

function collectionFromHash() {
  if (!window.location.hash.startsWith(HASH_PREFIX)) return -1;
  const slug = window.location.hash.slice(HASH_PREFIX.length);
  return blackoutCollections.findIndex((c) => c.slug === slug);
}

export function Fabrics() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("blackout");
  const [collection, setCollection] = useState(0);
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openFromHash = () => {
      const index = collectionFromHash();
      if (index < 0) return;
      setTab("blackout");
      setCollection(index);
      catalogRef.current?.scrollIntoView();
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="koleksi" className="bg-sand py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pilih suasana ruang Anda"
          title="Koleksi kain untuk setiap"
          accent="gaya & kebutuhan ruang."
          description="Beragam opsi kain, model, dan warna. Tim Handayani membantu menyaring pilihan agar Anda tidak harus memutuskan semuanya sendiri."
        />

        <CollectionCards />

        <div
          ref={catalogRef}
          id="katalog"
          className="border-linen mt-16 flex flex-col gap-5 border-t pt-12 md:mt-20 md:flex-row md:items-end md:justify-between md:pt-14"
        >
          <div>
            <h3 className="font-serif text-2xl md:text-3xl">
              Katalog warna kain
            </h3>
            <p className="text-muted mt-2 max-w-md text-sm leading-relaxed md:text-base">
              Contoh kainnya kami bawakan saat survei, jadi warna dan
              kualitasnya bisa dilihat langsung.
            </p>
          </div>
          <div
            role="tablist"
            className="bg-cream flex w-fit shrink-0 rounded-full p-1.5 shadow-sm"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm transition-colors md:px-7",
                  tab === t.id ? "bg-ink text-cream" : "text-ink hover:bg-sand",
                )}
              >
                <span className="font-bold">{t.label}</span>
                <span
                  className={cn(
                    "ml-2 hidden text-xs sm:inline",
                    tab === t.id ? "text-cream/70" : "text-muted",
                  )}
                >
                  {t.note}
                </span>
              </button>
            ))}
          </div>
        </div>

        {tab === "blackout" ? (
          <FabricStudio
            collectionIndex={collection}
            onCollectionChange={setCollection}
          />
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {vitraseFabrics.map((f) => (
              <Reveal key={f.name} className="h-full">
                <div className="bg-cream flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="relative aspect-square">
                    <Image
                      src={f.image}
                      alt={`Kain vitrase ${f.name}`}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-2 p-3 md:p-4">
                    {/* Tinggi 2 baris supaya semua kartu rata walau namanya panjang. */}
                    <p className="flex min-h-10 items-center font-serif text-base leading-tight md:text-lg">
                      {f.name}
                    </p>
                    <WaButton
                      intent={{
                        title: `Tanya ${f.name}`,
                        line: `Saya tertarik dengan kain vitrase ${f.name}.`,
                        need: "vitrase",
                      }}
                      aria-label={`Tanya kain vitrase ${f.name} via WhatsApp`}
                      className="bg-sand text-ink hover:bg-gold grid size-9 shrink-0 place-items-center rounded-full"
                    >
                      <WhatsAppIcon className="size-4" />
                    </WaButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// "Ruang pas": preview kain besar, lalu pilih koleksi dan warnanya.
// Satu panel untuk semua layar: jauh lebih ringkas daripada menampilkan
// puluhan kartu koleksi, dan hanya satu foto besar yang dimuat sekaligus.
function FabricStudio({
  collectionIndex,
  onCollectionChange,
}: {
  collectionIndex: number;
  onCollectionChange: (index: number) => void;
}) {
  const collection = blackoutCollections[collectionIndex];
  const [codes, setCodes] = useState<Record<string, string>>({});
  const code = codes[collection.slug] ?? collection.codes[0];
  const [copied, setCopied] = useState(false);
  const [chipsAtEnd, setChipsAtEnd] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);

  // Geser chip koleksi yang aktif ke tengah (scroller horizontal di HP;
  // di desktop chip-nya membungkus jadi tidak perlu digeser).
  useEffect(() => {
    const scroller = chipsRef.current;
    const chip = scroller?.children[collectionIndex] as HTMLElement | undefined;
    if (!scroller || !chip || scroller.scrollWidth <= scroller.clientWidth)
      return;
    scroller.scrollTo({
      left: chip.offsetLeft - (scroller.clientWidth - chip.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [collectionIndex]);

  async function share() {
    const url = `${window.location.origin}${window.location.pathname}${HASH_PREFIX}${collection.slug}`;
    const title = `Kain blackout ${collection.name} - Handayani Gorden`;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Reveal className="bg-cream mt-8 overflow-hidden rounded-3xl p-3 shadow-[0_20px_50px_-30px_rgba(42,34,29,0.35)] md:p-4 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:p-5">
      <div className="bg-linen relative aspect-[4/3] overflow-hidden rounded-2xl">
        <AnimatePresence initial={false}>
          <motion.div
            key={`${collection.slug}-${code}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={swatchSrc(collection.slug, code)}
              alt={`Kain blackout ${collection.name} warna ${code}`}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="from-ink/70 text-cream pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-4 pt-16 md:p-6 md:pt-24">
          <p className="text-cream/75 text-[11px] font-bold tracking-[0.25em] uppercase">
            Blackout
          </p>
          <p className="mt-1 font-serif text-2xl leading-tight md:text-3xl">
            {collection.name}{" "}
            <span className="text-gold font-sans text-base font-bold md:text-lg">
              · {code}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col px-2 pt-6 pb-2 md:px-3 lg:px-0 lg:pt-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-gold-deep text-xs font-bold tracking-[0.25em] uppercase">
            Pilih koleksi
          </p>
          <p className="text-muted text-xs">
            {blackoutCollections.length} koleksi
            <span className="lg:hidden"> · geser →</span>
          </p>
        </div>
        <div className="relative mt-3 -mr-5 md:-mr-7 lg:mr-0">
          <div
            ref={chipsRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              setChipsAtEnd(
                el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
              );
            }}
            className="no-scrollbar flex gap-2 overflow-x-auto pr-5 md:pr-7 lg:flex-wrap lg:overflow-visible lg:pr-0"
          >
            {blackoutCollections.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => onCollectionChange(i)}
                aria-pressed={i === collectionIndex}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-sm font-semibold transition-colors lg:pr-3.5 lg:text-[13px]",
                  i === collectionIndex
                    ? "border-ink bg-ink text-cream"
                    : "border-linen text-ink hover:border-ink bg-white",
                )}
              >
                <span className="relative size-7 shrink-0 overflow-hidden rounded-full lg:size-6">
                  <Image
                    src={swatchThumbSrc(c.slug, codes[c.slug] ?? c.codes[0])}
                    alt=""
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </span>
                <span className="whitespace-nowrap">{c.name}</span>
              </button>
            ))}
          </div>
          <div
            className={cn(
              "from-cream pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent transition-opacity lg:hidden",
              chipsAtEnd && "opacity-0",
            )}
          />
        </div>

        <div className="border-linen mt-6 flex items-baseline justify-between gap-3 border-t pt-5">
          <p className="text-gold-deep text-xs font-bold tracking-[0.25em] uppercase">
            Pilih warna
          </p>
          <p className="text-muted text-xs">
            {collection.codes.length} warna tersedia
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {collection.codes.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() =>
                setCodes((prev) => ({ ...prev, [collection.slug]: c }))
              }
              aria-label={`${collection.name} warna ${c}`}
              aria-pressed={c === code}
              className={cn(
                "ring-offset-cream relative size-11 overflow-hidden rounded-full ring-offset-2 transition",
                c === code
                  ? "ring-ink ring-2"
                  : "ring-linen hover:ring-muted ring-1",
              )}
            >
              <Image
                src={swatchThumbSrc(collection.slug, c)}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WaButton
            intent={{
              title: `Tanya ${collection.name} ${code}`,
              line: `Saya tertarik dengan kain blackout ${collection.name} warna ${code}.`,
              need: "blackout",
            }}
            className="bg-gold text-ink hover:bg-ink hover:text-cream inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition-colors"
          >
            <WhatsAppIcon className="size-5" />
            Tanya {collection.name} {code}
          </WaButton>
          <button
            type="button"
            onClick={share}
            className="border-linen text-ink hover:border-ink inline-flex items-center justify-center gap-2 rounded-full border bg-white px-5 py-3.5 text-sm font-bold transition-colors"
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Share2 className="size-4" />
            )}
            {copied ? "Link tersalin" : "Bagikan koleksi"}
          </button>
        </div>
      </div>
    </Reveal>
  );
}
