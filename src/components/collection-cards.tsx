import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data";
import { Reveal } from "./reveal";
import { WaButton } from "./wa-form";

export function CollectionCards() {
  return (
    <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3">
      {collections.map((c, i) => (
        <Reveal
          key={c.name}
          delay={i * 0.08}
          className="bg-cream flex flex-col overflow-hidden rounded-md"
        >
          <div className="bg-linen relative aspect-[16/10]">
            <Image
              src={c.image}
              alt={`Gorden ${c.name}`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-7">
            <p className="text-gold-deep text-[11px] font-bold tracking-[0.2em] uppercase">
              {c.type}
            </p>
            <h3 className="mt-2 font-serif text-2xl md:text-[1.7rem]">
              {c.name}
            </h3>
            <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">
              {c.description}
            </p>
            <WaButton
              intent={{
                title: `Tanya ${c.name}`,
                line: `Saya mau tanya pilihan kain ${c.name}.`,
                need: c.need,
              }}
              className="group text-ink decoration-gold hover:text-gold-deep mt-6 inline-flex items-center gap-2 self-start text-sm font-bold underline underline-offset-[6px]"
            >
              Tanya Pilihan Kain
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </WaButton>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
