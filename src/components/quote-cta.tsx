import Image from "next/image";
import { Check } from "lucide-react";
import { Eyebrow, Reveal } from "./reveal";

const promises = [
  "Gratis konsultasi",
  "Survei gratis Kota Semarang",
  "Katalog pilihan kain",
];

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
          <ul className="text-cream/85 mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="border-gold/60 text-gold grid size-5 shrink-0 place-items-center rounded-full border">
                  <Check className="size-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
