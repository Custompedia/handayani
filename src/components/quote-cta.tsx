import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { Eyebrow, Reveal } from "./reveal";
import { intents } from "@/lib/wa-intents";
import { WaButton } from "./wa-form";

export function QuoteCta() {
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
      <div className="container-page text-cream py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="dark">Langkah terakhir menuju ruang impian</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-[2.6rem]">
            Rumah lebih estetik,{" "}
            <span className="text-gold">mulai dari gorden yang tepat.</span>
          </h2>
          <p className="text-cream/75 mx-auto mt-5 max-w-lg text-base leading-relaxed">
            Sudah melihat inspirasi yang cocok? Ceritakan kebutuhan ruang Anda.
            Kami bantu memilih kain dan model gorden, lalu memberikan estimasi
            biaya yang disesuaikan dengan kebutuhan.
          </p>
          <WaButton
            intent={intents.estimasi}
            className="group bg-gold text-ink hover:bg-cream mt-8 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-bold transition-colors"
          >
            <WhatsAppIcon className="size-5" />
            Minta Estimasi via WhatsApp
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </WaButton>
        </Reveal>
      </div>
    </section>
  );
}
