"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Share2 } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { Reveal, SectionHeading } from "./reveal";
import {
  blackoutCollections,
  swatchSrc,
  vitraseFabrics,
  waLink,
  type FabricCollection,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "blackout", label: "Blackout", note: "mulai Rp170.000/mL" },
  { id: "vitrase", label: "Vitrase", note: "mulai Rp100.000/mL" },
] as const;

// Link langsung ke satu koleksi, mis. /#kain-lino — supaya admin bisa kirim
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const openFromHash = () => {
      const index = collectionFromHash();
      if (index < 0) return;
      setTab("blackout");
      setCollection(index);
      // Desktop: langsung ke kartu koleksinya. HP: ke katalog "ruang pas".
      const card = document.getElementById(
        `kain-${blackoutCollections[index].slug}`,
      );
      (card?.offsetParent ? card : sectionRef.current)?.scrollIntoView();
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section ref={sectionRef} id="koleksi" className="bg-sand py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Koleksi Kain"
          title="Pilih warna & tekstur favorit"
          description="Katalog contoh kain kami bawakan ke rumah saat survei, jadi Anda bisa lihat langsung warna dan kualitas kainnya."
        />

        <div
          role="tablist"
          className="bg-cream mx-auto mt-10 flex w-fit rounded-full p-1.5 shadow-sm"
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

        {tab === "blackout" ? (
          <>
            {/* HP & tablet: satu "ruang pas" supaya katalog tidak panjang. */}
            <div className="lg:hidden">
              <FabricStudio
                collectionIndex={collection}
                onCollectionChange={setCollection}
              />
            </div>
            {/* Desktop: semua koleksi tampil sebagai grid kartu. */}
            <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-3 xl:grid-cols-4">
              {blackoutCollections.map((c) => (
                <CollectionCard key={c.slug} collection={c} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
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
                    <a
                      href={waLink(
                        `Halo Handayani Gorden, saya tertarik dengan kain vitrase ${f.name}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Tanya kain vitrase ${f.name} via WhatsApp`}
                      className="bg-sand text-ink hover:bg-gold grid size-9 shrink-0 place-items-center rounded-full"
                    >
                      <WhatsAppIcon className="size-4" />
                    </a>
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

// Satu"ruang pas": preview kain besar, lalu pilih koleksi dan warnanya.
// Dipakai di HP & tablet; jauh lebih pendek daripada menampilkan 16 kartu koleksi berurutan.
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

  // Geser chip koleksi yang aktif ke tengah (scroller horizontal di HP).
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
    const title = `Kain blackout ${collection.name} — Handayani Gorden`;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Reveal className="bg-cream mt-10 overflow-hidden rounded-3xl p-3 shadow-[0_20px_50px_-30px_rgba(42,34,29,0.35)] md:p-4">
      <div className="bg-linen relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[16/9]">
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
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="from-ink/70 text-cream pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-4 pt-16 md:p-6 md:pt-24">
          <p className="text-cream/75 text-[11px] font-bold tracking-[0.25em] uppercase">
            Blackout
          </p>
          <p className="mt-1 font-serif text-2xl leading-tight md:text-3xl">
            {collection.name}
            {""}
            <span className="text-gold font-sans text-base font-bold md:text-lg">
              · {code}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col px-2 pt-6 pb-2 md:px-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-gold-deep text-xs font-bold tracking-[0.25em] uppercase">
            Pilih koleksi
          </p>
          <p className="text-muted text-xs">
            {blackoutCollections.length} koleksi · geser →
          </p>
        </div>
        <div className="relative mt-3 -mr-5 md:-mr-7">
          <div
            ref={chipsRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              setChipsAtEnd(
                el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
              );
            }}
            className="no-scrollbar flex gap-2 overflow-x-auto pr-5 md:pr-7"
          >
            {blackoutCollections.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => onCollectionChange(i)}
                aria-pressed={i === collectionIndex}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-sm font-semibold transition-colors",
                  i === collectionIndex
                    ? "border-ink bg-ink text-cream"
                    : "border-linen text-ink hover:border-ink bg-white",
                )}
              >
                <span className="relative size-7 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={swatchSrc(c.slug, codes[c.slug] ?? c.codes[0])}
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
              "from-cream pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent transition-opacity",
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
                src={swatchSrc(collection.slug, c)}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink(
              `Halo Handayani Gorden, saya tertarik dengan kain blackout ${collection.name} warna ${code}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-ink hover:bg-ink hover:text-cream inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition-colors"
          >
            <WhatsAppIcon className="size-5" />
            Tanya {collection.name} {code}
          </a>
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

function CollectionCard({ collection }: { collection: FabricCollection }) {
  const [active, setActive] = useState(collection.codes[0]);

  return (
    <div
      id={`kain-${collection.slug}`}
      className="bg-cream flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={swatchSrc(collection.slug, active)}
          alt={`Kain blackout ${collection.name} warna ${active}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="bg-cream/90 absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold backdrop-blur">
          {active}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl">{collection.name}</h3>
          <span className="text-muted text-xs">
            {collection.codes.length} warna
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {collection.codes.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setActive(code)}
              aria-label={`${collection.name} warna ${code}`}
              aria-pressed={active === code}
              className={cn(
                "ring-offset-cream relative size-7 overflow-hidden rounded-full ring-offset-2 transition",
                active === code
                  ? "ring-ink ring-2"
                  : "ring-linen hover:ring-muted ring-1",
              )}
            >
              <Image
                src={swatchSrc(collection.slug, code)}
                alt=""
                fill
                sizes="28px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
        <a
          href={waLink(
            `Halo Handayani Gorden, saya tertarik dengan kain blackout ${collection.name} warna ${active}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-deep hover:text-ink mt-4 inline-flex items-center gap-1.5 self-start pt-1 text-sm font-bold"
        >
          <WhatsAppIcon className="size-4" />
          Tanya warna {active}
        </a>
      </div>
    </div>
  );
}
