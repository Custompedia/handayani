import Image from "next/image";
import { Reveal } from "./reveal";

const stats = [
  { value: "5+", label: "Tahun pengalaman" },
  { value: "2000+", label: "Keluarga terlayani" },
  { value: "24", label: "Pilihan koleksi & motif kain" },
];

export function About() {
  return (
    <section className="bg-ink text-cream">
      <div className="container-page grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative aspect-[5/4] overflow-hidden rounded-3xl lg:aspect-[4/5]">
          <Image
            src="/images/tentang-hd.webp"
            alt="Ibu dan anak-anak membaca buku di kamar dengan gorden blackout"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[60%_50%]"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase">
            Tentang Handayani
          </p>
          <blockquote className="mt-6 font-serif text-2xl leading-snug md:text-4xl">
            <span className="text-gold">“</span>Kami ada untuk membantu setiap
            keluarga menjadikan rumahnya tempat yang tidak sekadar indah, namun
            juga menghadirkan rasa tenang, bangga, dan penuh makna, sehingga
            rumah jadi tempat terbaik untuk pulang.
            <span className="text-gold">”</span>
          </blockquote>
          <dl className="border-cream/15 mt-12 grid grid-cols-3 gap-6 border-t pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-gold font-serif text-3xl md:text-5xl">
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
