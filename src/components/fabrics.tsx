"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "./icons";
import { CollectionCards } from "./collection-cards";
import { FabricStudio } from "./fabric-studio";
import { Reveal, SectionHeading } from "./reveal";
import { blackoutCollections, vitraseFabrics } from "@/lib/data";
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
            shareHash={(slug) => `${HASH_PREFIX}${slug}`}
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
                        need: /vitrase/i.test(f.name)
                          ? f.name
                          : `Vitrase ${f.name}`,
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
