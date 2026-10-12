import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./reveal";

// Sudut foto dibuat asimetris (satu sudut melengkung besar) dan diberi
// bingkai garis emas yang sedikit bergeser, supaya tidak terasa flat.
const shapes = [
  {
    photo: "rounded-[0.25rem_0.25rem_4rem_0.25rem]",
    frame:
      "rounded-[0.25rem_0.25rem_4rem_0.25rem] translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4",
  },
  {
    photo: "rounded-[0.25rem_4rem_0.25rem_0.25rem]",
    frame:
      "rounded-[0.25rem_4rem_0.25rem_0.25rem] -translate-x-3 translate-y-3 md:-translate-x-4 md:translate-y-4",
  },
];

export function Products() {
  return (
    <section id="produk" className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Produk Kami"
        title="Temukan gorden yang tepat"
        accent="untuk rumah Anda"
        description="Dua pilihan utama yang bisa dipasang sendiri-sendiri atau dipadukan dalam satu jendela."
      />

      <div className="mt-12 grid gap-x-12 gap-y-16 md:mt-16 md:grid-cols-2 lg:gap-x-16">
        {products.map((product, i) => (
          <Reveal
            key={product.name}
            delay={i * 0.1}
            className={cn(i === 1 && "md:mt-12")}
          >
            <a href={product.href} className="group block">
              <div className="relative aspect-[4/3]">
                <div
                  aria-hidden
                  className={cn(
                    "border-gold/50 absolute inset-0 border",
                    shapes[i % 2].frame,
                  )}
                />
                <div
                  className={cn(
                    "bg-linen relative h-full overflow-hidden",
                    shapes[i % 2].photo,
                  )}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div
                  className={cn(
                    "bg-cream/95 absolute top-4 px-3.5 py-2.5 shadow-[0_20px_50px_-20px_rgba(42,34,29,0.35)] backdrop-blur md:top-8 md:px-5 md:py-4",
                    i % 2 ? "right-0 md:-right-6" : "left-0 md:-left-6",
                  )}
                >
                  <span className="text-muted block text-[11px] tracking-wide">
                    Harga mulai dari
                  </span>
                  <span className="text-ink font-serif text-lg md:text-2xl">
                    {product.price}
                  </span>
                  <span className="text-muted text-xs"> /meter lari</span>
                </div>
              </div>

              <div className="mt-7">
                <p className="text-gold-deep text-xs font-bold tracking-[0.25em] uppercase">
                  {product.collections}
                </p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl">
                  {product.name}
                </h3>
                <p className="text-muted mt-3 max-w-md leading-relaxed">
                  {product.description}
                </p>
                <span className="text-ink decoration-gold mt-5 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-[6px]">
                  Lihat kain
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
