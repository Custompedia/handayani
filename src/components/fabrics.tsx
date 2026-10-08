"use client";

import Image from "next/image";
import { useState } from "react";
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

export function Fabrics() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("blackout");

  return (
    <section id="koleksi" className="bg-sand py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Koleksi Kain"
          title="Pilih warna & tekstur favorit"
          description="Katalog contoh kain kami bawakan ke rumah saat survei, jadi kakak bisa lihat langsung warna dan kualitas kainnya."
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
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blackoutCollections.map((c) => (
              <CollectionCard key={c.slug} collection={c} />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {vitraseFabrics.map((f) => (
              <Reveal key={f.name}>
                <div className="bg-cream overflow-hidden rounded-2xl">
                  <div className="relative aspect-square">
                    <Image
                      src={f.image}
                      alt={`Kain vitrase ${f.name}`}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <p className="font-serif text-lg">{f.name}</p>
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

function CollectionCard({ collection }: { collection: FabricCollection }) {
  const [active, setActive] = useState(collection.codes[0]);

  return (
    <div className="bg-cream flex flex-col overflow-hidden rounded-2xl">
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
