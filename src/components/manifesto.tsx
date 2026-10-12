import { Eyebrow, Reveal } from "./reveal";

const points = [
  {
    title: "Lebih estetik dipandang",
    body: "Komposisi warna, tekstur, dan model yang menyatu dengan gaya interior rumah.",
  },
  {
    title: "Lebih nyaman dinikmati",
    body: "Pilihan gorden disesuaikan dengan kebutuhan pencahayaan dan privasi ruangan.",
  },
  {
    title: "Lebih praktis diwujudkan",
    body: "Tidak perlu berkeliling toko - mulai konsultasi dan lihat katalog dari rumah.",
  },
];

export function Manifesto() {
  return (
    <section className="bg-sand py-20 md:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Bukan sekadar penutup jendela</Eyebrow>
          <h2 className="text-ink mt-4 font-serif text-3xl leading-[1.15] md:text-[2.6rem]">
            Rumah sudah cantik. Saatnya setiap detail terasa{" "}
            <span className="text-gold-deep">lebih utuh.</span>
          </h2>
          <p className="text-muted mt-6 max-w-lg text-base leading-relaxed">
            Gorden yang tepat bukan hanya soal warna. Tekstur, jatuh kain, dan
            cara cahaya masuk bisa membuat satu ruang punya karakter yang
            berbeda.
          </p>
        </Reveal>

        <ol className="lg:pt-3">
          {points.map((p, i) => (
            <li
              key={p.title}
              className="border-linen flex gap-5 border-b py-5 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span className="text-gold-deep w-8 shrink-0 font-serif text-2xl leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Reveal delay={i * 0.06}>
                <h3 className="text-ink font-bold">{p.title}</h3>
                <p className="text-muted mt-1.5 text-sm leading-relaxed">
                  {p.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
