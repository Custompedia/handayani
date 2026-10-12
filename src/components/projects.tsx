import Image from "next/image";
import { MapPin } from "lucide-react";
import { featuredProjects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./reveal";

export function Projects() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Portofolio Area"
        title="Proyek di"
        accent="Semarang"
        titleEnd=" & sekitarnya."
        description="Selain rumah tinggal, kami juga mengerjakan gorden untuk perumahan, townhouse, villa, dan klinik."
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {[
          "Kedaton Homes · BSB City",
          "De Villa Townhouse",
          "Villa Susan · Bandungan",
        ].map((area) => (
          <span
            key={area}
            className="border-linen text-ink/80 rounded-full border bg-white px-4 py-2 text-xs font-semibold md:text-sm"
          >
            {area}
          </span>
        ))}
      </div>

      {/* Proyek pertama tampil besar di kiri, dua lainnya bertumpuk di kanan. */}
      <div className="mt-6 grid gap-4 md:gap-5 lg:grid-cols-[1.35fr_1fr] lg:grid-rows-2">
        {featuredProjects.map((p, i) => {
          const featured = i === 0;
          return (
            <Reveal
              key={p.name}
              delay={i * 0.08}
              className={cn(
                "group bg-sand relative aspect-[5/4] overflow-hidden rounded-md sm:aspect-[16/9]",
                featured
                  ? "lg:row-span-2 lg:aspect-auto lg:min-h-[34rem] lg:rounded-[0.25rem_0.25rem_0.25rem_4.5rem]"
                  : "lg:aspect-auto",
              )}
            >
              <Image
                src={p.image}
                alt={`${p.name} - ${p.detail}`}
                fill
                sizes={
                  featured
                    ? "(min-width: 1024px) 55vw, 100vw"
                    : "(min-width: 1024px) 40vw, 100vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className={cn(
                  "bg-cream/95 absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] px-4 py-3 shadow-[0_20px_50px_-20px_rgba(42,34,29,0.45)] backdrop-blur sm:bottom-4 sm:left-4 sm:px-5 sm:py-4",
                  featured &&
                    "md:right-8 md:bottom-8 md:left-auto md:px-6 md:py-5",
                )}
              >
                <p className="text-gold-deep text-[10px] font-bold tracking-[0.2em] uppercase sm:text-[11px]">
                  Proyek {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className={cn(
                    "text-ink mt-1 font-serif leading-tight",
                    featured ? "text-xl md:text-3xl" : "text-xl md:text-2xl",
                  )}
                >
                  {p.name}
                </h3>
                <p className="text-muted mt-1 flex items-start gap-1.5 text-xs md:mt-1.5 md:text-sm">
                  <MapPin className="mt-0.5 size-3.5 shrink-0" />
                  {p.detail}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
