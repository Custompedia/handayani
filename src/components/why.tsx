import { Sparkles, SwatchBook, Truck } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const reasons = [
  {
    icon: Sparkles,
    title: "Estetiknya terasa",
    body: "Prioritaskan hasil visual yang menyatu dengan gaya ruang - dari permainan warna hingga tekstur dan jatuh kain.",
    tag: "Aesthetic result",
  },
  {
    icon: SwatchBook,
    title: "Pilihannya beragam",
    body: "Jelajahi beragam tipe kain dan warna; lihat contoh langsung agar lebih yakin sebelum menentukan pilihan.",
    tag: "Curated choices",
  },
  {
    icon: Truck,
    title: "Nggak perlu repot",
    body: "Konsultasi, survei, pengukuran, hingga pemasangan dibantu tim. Anda cukup ceritakan kebutuhan ruang.",
    tag: "Easy service",
  },
];

export function Why() {
  return (
    <section id="keunggulan" className="bg-sand py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Kenapa Handayani"
          title="Pilihan yang indah."
          accent="Proses yang mudah."
          description="Gorden premium bukan hanya soal harganya. Yang penting adalah hasil akhir, kecocokan dengan ruang, dan pengalaman memilih yang tidak menyulitkan."
        />

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {reasons.map(({ icon: Icon, title, body, tag }, i) => (
            <Reveal
              key={title}
              delay={i * 0.08}
              className="bg-cream border-linen flex flex-col rounded-md border p-6 transition-shadow hover:shadow-[0_14px_40px_-20px_rgba(42,34,29,0.25)] md:p-8"
            >
              <span className="bg-sand text-gold-deep grid size-12 place-items-center rounded-full md:size-14">
                <Icon className="size-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-serif text-2xl">{title}</h3>
              <p className="text-muted mt-2 flex-1 leading-relaxed">{body}</p>
              <p className="text-gold-deep mt-6 text-[11px] font-bold tracking-[0.2em] uppercase">
                {String(i + 1).padStart(2, "0")} · {tag}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
