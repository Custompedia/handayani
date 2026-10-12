import { steps } from "@/lib/data";
import { Reveal, SectionHeading } from "./reveal";

export function Steps() {
  return (
    <section id="cara-pesan" className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Cara Pesan"
        title="Pesan gorden"
        accent="semudah ini"
        description="Anda cukup pilih, sisanya kami yang urus dari ukur sampai pasang."
      />

      {/* Desktop: satu baris timeline 6 langkah. Tablet: grid 3 kolom.
          HP: daftar satu kolom dengan nomor di samping. */}
      <ol className="relative mt-10 grid gap-y-6 md:mt-16 md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-6 lg:gap-x-6">
        <span
          aria-hidden
          className="bg-linen absolute top-[1.375rem] right-[calc((100%-7.5rem)/6-2.75rem)] left-[2rem] hidden h-px lg:block"
        />
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <Reveal delay={i * 0.06} className="flex gap-4 md:block">
              <span className="border-gold/60 text-gold-deep bg-cream grid size-11 shrink-0 place-items-center rounded-full border text-sm font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-2 md:pt-0">
                <h3 className="font-serif text-lg leading-snug md:mt-4 md:text-xl">
                  {s.title}
                </h3>
                <p className="text-muted mt-1.5 text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
