import Image from "next/image";
import { ArrowRight, BadgeCheck, Ruler, SwatchBook, Timer } from "lucide-react";
import { waLink } from "@/lib/data";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

const highlights = [
  {
    icon: BadgeCheck,
    title: "3.000+ keluarga",
    body: "6+ tahun bantu keluarga sejukkan rumahnya.",
  },
  {
    icon: Ruler,
    title: "Gratis survei",
    body: "Gratis survei untuk area Kota Semarang.",
  },
  {
    icon: SwatchBook,
    title: "Katalog dibawa ke rumah",
    body: "Lihat langsung warna dan kualitas kainnya.",
  },
  {
    icon: Timer,
    title: "Jadi ±7 hari",
    body: "Bayar lunas setelah gorden selesai terpasang.",
  },
];

export function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[min(88svh,820px)] min-h-[560px] overflow-hidden">
        <Image
          src="/images/hero-hd.webp"
          alt="Ruang keluarga dengan gorden blackout cokelat dan vitrase putih"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
        <div className="from-ink/75 via-ink/35 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="from-ink/85 via-ink/40 md:from-ink/50 absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t to-transparent md:h-40 md:via-transparent" />

        <div className="container-page relative flex h-full flex-col justify-end pb-16 md:justify-center md:pb-0">
          <Reveal className="text-cream max-w-xl">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
              Gorden Custom · Semarang
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.08] md:text-6xl">
              Gorden yang bikin rumah terasa lebih tenang
            </h1>
            <p className="text-cream/85 mt-5 text-base leading-relaxed md:text-lg">
              Dibuat sesuai ukuran jendela Anda. Blackout mulai{" "}
              <strong className="text-cream">Rp170.000/mL</strong>, vitrase
              mulai <strong className="text-cream">Rp100.000/mL</strong>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-ink hover:bg-cream inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold transition-colors"
              >
                <WhatsAppIcon className="size-5" />
                Konsultasi Gratis
              </a>
              <a
                href="#koleksi"
                className="group border-cream/60 text-cream hover:bg-cream hover:text-ink inline-flex items-center gap-2 rounded-full border px-6 py-3.5 font-bold transition-colors"
              >
                Lihat Koleksi Kain
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container-page relative z-10 -mt-10 md:-mt-14">
        <ul className="bg-linen grid grid-cols-2 gap-px overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(42,34,29,0.25)] lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex flex-col gap-3 bg-white p-4 sm:flex-row sm:gap-4 sm:p-5 md:p-7"
            >
              <Icon
                className="text-gold-deep size-6 shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <p className="text-ink font-serif text-lg leading-snug md:text-xl">
                  {title}
                </p>
                <p className="text-muted mt-1 text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
