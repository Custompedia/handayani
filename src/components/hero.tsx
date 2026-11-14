"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, BadgeCheck, Ruler, SwatchBook, Timer } from "lucide-react";
import { waProps } from "@/lib/data";
import { WhatsAppIcon } from "./icons";
import { ease } from "./motion";
import { WordReveal } from "./reveal";

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

// Muncul berurutan saat halaman dibuka (bukan saat di-scroll).
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

const heroTitle = "Gorden yang bikin rumah terasa lebih tenang";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Foto bergerak lebih lambat dari halaman (parallax), teks sedikit memudar.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);

  return (
    <section className="relative">
      <div
        ref={ref}
        className="relative h-[min(88svh,820px)] min-h-[560px] overflow-hidden"
      >
        {/* Lebih tinggi 12% supaya parallax tidak membuka celah di atas. */}
        <motion.div
          className="absolute inset-x-0 -top-[12%] bottom-0"
          style={{ y: imageY }}
        >
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.6, ease }}
          >
            <Image
              src="/images/hero-hd.webp"
              alt="Ruang keluarga dengan gorden blackout cokelat dan vitrase putih"
              fill
              preload
              sizes="100vw"
              className="object-cover object-[50%_40%]"
            />
          </motion.div>
        </motion.div>
        <div className="from-ink/75 via-ink/35 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="from-ink/85 via-ink/40 md:from-ink/50 absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t to-transparent md:h-40 md:via-transparent" />

        <div className="container-page relative flex h-full flex-col justify-end pb-16 md:justify-center md:pb-0">
          <motion.div
            className="text-cream max-w-xl"
            style={{ opacity: textOpacity }}
          >
            <motion.p
              className="text-gold text-xs font-bold tracking-[0.3em] uppercase"
              {...enter(0.2)}
            >
              Gorden Custom · Semarang
            </motion.p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.08] md:text-6xl">
              <WordReveal
                text={heroTitle}
                delay={0.35}
                stagger={0.06}
                inView={false}
              />
            </h1>
            <motion.p
              className="text-cream/85 mt-5 text-base leading-relaxed md:text-lg"
              {...enter(0.85)}
            >
              Dibuat sesuai ukuran jendela Anda. Blackout mulai{" "}
              <strong className="text-cream">Rp170.000/mL</strong>, vitrase
              mulai <strong className="text-cream">Rp100.000/mL</strong>.
            </motion.p>
            <motion.div className="mt-8 flex flex-wrap gap-3" {...enter(1)}>
              <a
                {...waProps}
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
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container-page relative z-10 -mt-10 md:-mt-14">
        <motion.ul
          className="bg-linen grid grid-cols-2 gap-px overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(42,34,29,0.25)] lg:grid-cols-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
        >
          {highlights.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="group bg-white">
              {/* Isi kartu menyusul satu per satu setelah kartunya naik. */}
              <motion.div
                className="flex h-full flex-col gap-3 p-4 sm:flex-row sm:gap-4 sm:p-5 md:p-7"
                {...enter(1.1 + i * 0.08)}
              >
                <Icon
                  className="text-gold-deep size-6 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg]"
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
              </motion.div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
