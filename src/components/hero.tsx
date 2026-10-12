import Image from "next/image";
import { ArrowRight, Check, House, SwatchBook } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { Eyebrow, Reveal } from "./reveal";
import { intents } from "@/lib/wa-intents";
import { WaButton } from "./wa-form";

const checks = [
  "Gratis konsultasi",
  "Gratis survei Kota Semarang",
  "Katalog dibawa ke rumah",
];

const trust = [
  { value: "6+ tahun", label: "Pengalaman melayani kebutuhan gorden" },
  { value: "3.000+", label: "Pelanggan yang pernah dilayani" },
  {
    icon: SwatchBook,
    value: "Pilihan Kain Beragam",
    label: "Cek tekstur & warna langsung",
  },
  {
    icon: House,
    value: "Layanan sampai ke Rumah",
    label: "Dari konsultasi sampai pemasangan",
  },
];

export function Hero() {
  return (
    <section className="overflow-hidden pt-8 pb-4 md:pt-12">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.02fr] lg:gap-16 xl:gap-20">
          <Reveal>
            <Eyebrow>Custom Gorden Premium · Semarang</Eyebrow>
            <h1 className="mt-4 font-serif text-[2.2rem] leading-[1.12] md:text-5xl xl:text-[3.25rem]">
              Bikin rumah makin <span className="text-gold-deep">estetik</span>{" "}
              dengan sentuhan gorden premium.
            </h1>
            <p className="text-muted mt-5 max-w-lg text-base leading-relaxed">
              Rumah yang indah ada di detailnya. Kami bantu memilih gorden yang
              selaras dengan interior Anda - dengan pilihan kain beragam,
              konsultasi personal, dan survei langsung ke rumah.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WaButton
                intent={intents.survei}
                className="bg-ink text-cream hover:bg-cocoa inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition-colors"
              >
                <WhatsAppIcon className="size-5" />
                Jadwalkan Survei Gratis
              </WaButton>
              <a
                href="#portofolio"
                className="group border-ink/25 text-ink hover:border-ink inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 font-bold transition-colors"
              >
                Lihat Hasil Pemasangan
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <ul className="text-ink/80 mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {checks.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <Check className="text-gold-deep size-4" strokeWidth={2.5} />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="relative mr-3 md:mr-4">
            <div
              aria-hidden
              className="border-gold/50 absolute inset-0 translate-x-3 translate-y-3 rounded-[0.25rem_0.25rem_4.5rem_0.25rem] border md:translate-x-4 md:translate-y-4"
            />
            <div className="bg-linen relative aspect-[5/4] overflow-hidden rounded-[0.25rem_0.25rem_4.5rem_0.25rem] sm:aspect-[4/3] lg:aspect-[6/5]">
              <Image
                src="/images/hero-hd.webp"
                alt="Ruang keluarga dengan gorden blackout cokelat dan vitrase putih"
                fill
                preload
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[40%_50%]"
              />
              <div className="from-ink/80 absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t to-transparent" />
              <div className="text-cream absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4 md:right-10 md:bottom-9 md:left-8">
                <p className="max-w-60 font-serif text-lg leading-snug md:text-2xl">
                  Every beautiful room starts with the right details.
                </p>
                <span className="border-cream/70 hidden size-[4.5rem] shrink-0 rotate-12 place-items-center rounded-full border text-center text-[8px] leading-relaxed tracking-[0.12em] uppercase sm:grid">
                  Home
                  <br />
                  Made
                  <br />
                  Beautiful
                </span>
              </div>
            </div>
            <div className="bg-cream/95 absolute top-4 left-4 hidden items-center gap-3 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(42,34,29,0.4)] backdrop-blur sm:flex md:top-10 lg:-left-8">
              <span className="bg-sand text-gold-deep grid size-9 shrink-0 place-items-center rounded-full">
                <SwatchBook className="size-4" />
              </span>
              <span>
                <span className="text-ink block text-xs font-bold">
                  Lebih mudah pilih gorden
                </span>
                <span className="text-muted block text-[11px]">
                  Contoh kain datang ke rumah
                </span>
              </span>
            </div>
          </div>
        </div>

        <Reveal className="mt-12">
          <dl className="border-linen grid grid-cols-2 gap-y-6 border-y py-6 lg:grid-cols-4 lg:py-7">
            {trust.map(({ icon: Icon, value, label }, i) => (
              <div
                key={value}
                className={
                  i % 2 === 1
                    ? "border-linen flex items-center gap-3 border-l pl-5 lg:px-8"
                    : i === 0
                      ? "flex items-center gap-3 pr-5 lg:pr-8"
                      : "border-linen flex items-center gap-3 pr-5 lg:border-l lg:px-8"
                }
              >
                {Icon && (
                  <Icon
                    className="text-gold-deep hidden size-8 shrink-0 sm:block"
                    strokeWidth={1.4}
                  />
                )}
                <div>
                  <dt className="sr-only">{label}</dt>
                  <dd
                    className={
                      Icon
                        ? "text-ink text-sm font-bold md:text-base"
                        : "text-ink font-serif text-2xl leading-none md:text-3xl"
                    }
                  >
                    {value}
                  </dd>
                  <dd className="text-muted mt-1 text-xs md:text-sm">
                    {label}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
