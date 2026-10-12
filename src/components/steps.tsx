import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { steps } from "@/lib/data";
import { WhatsAppIcon } from "./icons";
import { Eyebrow, Reveal } from "./reveal";
import { intents } from "@/lib/wa-intents";
import { WaButton } from "./wa-form";

export function Steps() {
  return (
    <section id="cara-pesan" className="container-page py-20 md:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mr-3 md:mr-4">
          <div className="bg-linen relative aspect-[4/3] overflow-hidden rounded-[0.25rem_4.5rem_0.25rem_0.25rem] lg:aspect-[5/6]">
            <Image
              src="/images/portfolio/p13_1.webp"
              alt="Ruang makan dengan gorden blackout cokelat dan vitrase putih"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="bg-ink text-cream relative -mt-10 ml-4 w-52 p-4 shadow-[0_20px_50px_-20px_rgba(42,34,29,0.5)] md:absolute md:-right-4 md:bottom-10 md:mt-0 md:ml-0 md:w-56 md:p-5">
            <p className="text-gold font-serif text-xl leading-tight md:text-2xl">
              Kami yang datang ke rumah.
            </p>
            <p className="text-cream/75 mt-2 text-xs leading-relaxed">
              Lihat kain, cek warna, dan diskusikan kebutuhan ruang.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Semudah itu memilih gorden</Eyebrow>
            <h2 className="text-ink mt-4 font-serif text-3xl leading-[1.15] md:text-[2.6rem]">
              Gorden cantik tanpa harus{" "}
              <span className="text-gold-deep">keliling toko.</span>
            </h2>
            <p className="text-muted mt-4 max-w-md text-base leading-relaxed">
              Dari diskusi pertama sampai pemasangan, prosesnya dibantu. Cocok
              untuk Anda yang ingin hasil estetik tanpa menambah keribetan.
            </p>
          </Reveal>

          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.06} className="flex gap-4">
                  <span className="border-gold/60 text-gold-deep grid size-10 shrink-0 place-items-center rounded-full border text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-ink font-bold">{s.title}</h3>
                    <p className="text-muted mt-1 text-sm leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-9">
            <WaButton
              intent={intents.survei}
              className="group bg-ink text-cream hover:bg-cocoa inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold transition-colors"
            >
              <WhatsAppIcon className="size-5" />
              Saya Mau Survei Gratis
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </WaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
