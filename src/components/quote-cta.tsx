"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { waLink } from "@/lib/data";
import { Eyebrow, Reveal } from "./reveal";

const needs = [
  "Gorden Blackout",
  "Gorden Vitrase",
  "Blackout + Vitrase",
  "Belum tahu, minta saran",
];

const rooms = [
  "Ruang tamu",
  "Kamar tidur",
  "Ruang keluarga",
  "Ruang makan",
  "Kantor / komersial",
  "Lainnya",
];

const promises = [
  "Gratis survei area Kota Semarang",
  "Katalog kain dibawa ke rumah",
  "DP 30%, lunas setelah terpasang",
];

const fieldClass =
  "border-linen text-ink placeholder:text-muted/70 focus:border-gold-deep w-full rounded-md border bg-white px-4 py-3 text-base outline-none transition-colors";

export function QuoteCta() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    need: needs[0],
    room: rooms[0],
  });
  const linkRef = useRef<HTMLAnchorElement>(null);
  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Tombol kirim berupa link wa.me biasa (bukan window.open) supaya
  // tetap ter-tracking oleh listener Meta Pixel seperti tombol WA lainnya.
  const message = [
    "Halo Handayani Gorden, saya mau minta penawaran harga.",
    form.name.trim() && `Nama: ${form.name.trim()}`,
    form.location.trim() && `Lokasi: ${form.location.trim()}`,
    `Kebutuhan: ${form.need}`,
    `Ruangan: ${form.room}`,
    "Berikut foto/ukuran jendela saya:",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section id="penawaran" className="relative isolate overflow-hidden">
      <Image
        src="/images/cta.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="bg-ink/80 absolute inset-0 -z-10" />
      <div className="container-page text-cream grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal>
          <Eyebrow tone="dark">Estimasi Harga</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Kirim foto atau ukuran jendela,{" "}
            <span className="text-gold">kami hitungkan penawarannya</span>
          </h2>
          <ul className="text-cream/85 mt-8 flex flex-col gap-3 text-sm md:text-base">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="border-gold/60 text-gold grid size-6 shrink-0 place-items-center rounded-full border">
                  <Check className="size-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              linkRef.current?.click();
            }}
            className="bg-cream text-ink rounded-md p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] md:p-8"
          >
            <h3 className="font-serif text-2xl md:text-3xl">Minta Penawaran</h3>

            <div className="mt-6 grid gap-4">
              <Field label="Nama">
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Nama lengkap"
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  className={fieldClass}
                />
              </Field>
              <Field label="Lokasi">
                <input
                  type="text"
                  placeholder="Kecamatan / perumahan"
                  value={form.location}
                  onChange={(e) => set("location")(e.target.value)}
                  className={fieldClass}
                />
              </Field>
              <Field label="Kebutuhan">
                <Select
                  value={form.need}
                  options={needs}
                  onChange={set("need")}
                />
              </Field>
              <Field label="Ruangan">
                <Select
                  value={form.room}
                  options={rooms}
                  onChange={set("room")}
                />
              </Field>
            </div>

            <a
              ref={linkRef}
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kirim form penawaran ke WhatsApp"
              className="bg-gold text-ink hover:bg-ink hover:text-cream mt-6 flex w-full items-center justify-center rounded-md px-6 py-3.5 font-bold transition-colors"
            >
              Kirim
            </a>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold tracking-wide">
        {label}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} appearance-none pr-10`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="text-muted pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2" />
    </div>
  );
}
