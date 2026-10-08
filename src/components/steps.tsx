import { steps, waLink } from "@/lib/data";
import { WhatsAppIcon } from "./icons";
import { Reveal, SectionHeading } from "./reveal";

export function Steps() {
  return (
    <section id="cara-pesan" className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Cara Pesan"
        title="Pesan gorden semudah ini"
        description="Kakak cukup pilih, sisanya kami yang urus dari ukur sampai pasang."
      />

      <ol className="bg-linen mt-12 grid gap-px overflow-hidden rounded-3xl md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="bg-white">
            <Reveal delay={(i % 3) * 0.08} className="h-full p-7 md:p-9">
              <span className="text-gold font-serif text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
              <p className="text-muted mt-2 leading-relaxed">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="mt-10 text-center">
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ink text-cream hover:bg-cocoa inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold transition-colors"
        >
          <WhatsAppIcon className="size-5" />
          Mulai konsultasi sekarang
        </a>
      </Reveal>
    </section>
  );
}
