import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { Reveal, SectionHeading } from "./reveal";

export function Products() {
  return (
    <section id="produk" className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Produk Kami"
        title="Temukan gorden yang tepat untuk rumah kakak"
        description="Dua pilihan utama yang bisa dipasang sendiri-sendiri atau dipadukan dalam satu jendela."
      />

      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
        {products.map((product, i) => (
          <Reveal key={product.name} delay={i * 0.1}>
            <a
              href={product.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl md:aspect-[5/6]"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="from-ink/90 via-ink/40 to-ink/5 absolute inset-0 bg-gradient-to-t" />
              <div className="text-cream absolute inset-x-0 bottom-0 p-6 md:p-10">
                <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase">
                  {product.collections}
                </p>
                <h3 className="mt-2 font-serif text-3xl md:text-4xl">
                  {product.name}
                </h3>
                <p className="text-cream/80 mt-3 max-w-md text-sm leading-relaxed md:text-base">
                  {product.description}
                </p>
                <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                  <p>
                    <span className="text-cream/70 block text-xs">
                      Harga mulai dari
                    </span>
                    <span className="text-cream font-serif text-2xl md:text-3xl">
                      {product.price}
                    </span>
                    <span className="text-cream/70 text-sm"> /meter lari</span>
                  </p>
                  <span className="bg-cream text-ink group-hover:bg-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors">
                    Lihat kain
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
