import Image from "next/image";
import { Eyebrow, Reveal } from "./reveal";

const stats = [
  { value: "6+", label: "Tahun pengalaman" },
  { value: "3.000+", label: "Keluarga terlayani" },
  { value: "24", label: "Pilihan koleksi & motif kain" },
];

export function About() {
  return (
    <section className="bg-ink text-cream overflow-hidden">
      <div className="container-page grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal className="relative mr-3 md:mr-4">
          <div
            aria-hidden
            className="border-gold/40 absolute inset-0 translate-x-3 translate-y-3 rounded-[0.25rem_5rem_0.25rem_0.25rem] border md:translate-x-4 md:translate-y-4"
          />
          <div className="relative aspect-[5/4] overflow-hidden rounded-[0.25rem_5rem_0.25rem_0.25rem] md:aspect-[16/10] lg:aspect-[4/5]">
            <Image
              src="/images/tentang-hd.webp"
              alt="Ibu dan anak-anak membaca buku di kamar dengan gorden blackout"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[60%_50%]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow tone="dark">Tentang Handayani</Eyebrow>
          <blockquote className="mt-6 font-serif text-2xl leading-snug md:text-4xl">
            <span className="text-gold">“</span>Kami ada untuk membantu setiap
            keluarga menjadikan rumahnya tempat yang tidak sekadar indah, namun
            juga menghadirkan rasa tenang, bangga, dan penuh makna, sehingga
            rumah jadi tempat terbaik untuk pulang.
            <span className="text-gold">”</span>
          </blockquote>
          <dl className="border-cream/15 mt-12 grid grid-cols-3 border-y py-6 md:py-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={
                  i === 0
                    ? "pr-3 sm:pr-4 md:pr-8"
                    : "border-cream/15 border-l px-3 sm:px-4 md:px-8"
                }
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-gold font-serif text-2xl sm:text-3xl md:text-5xl">
                  {s.value}
                </dd>
                <dd className="text-cream/70 mt-1 text-xs md:text-sm">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
