"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "./reveal";

const AUTO_SCROLL_DELAY = 7000;

export function Testimonials() {
  const track = useRef<HTMLUListElement>(null);
  const interaction = useRef({ hovered: false, focused: false, resumeAt: 0 });

  const scroll = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
    interaction.current.resumeAt = Date.now() + AUTO_SCROLL_DELAY;
    el.scrollBy({
      left: dir * ((card?.getBoundingClientRect().width ?? 320) + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    let visible = false;
    let direction: 1 | -1 = 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        interaction.current.resumeAt = Date.now() + AUTO_SCROLL_DELAY;
      },
      { threshold: 0.25 },
    );
    observer.observe(el);

    const timer = window.setInterval(() => {
      const { hovered, focused, resumeAt } = interaction.current;
      if (
        !visible ||
        document.hidden ||
        reducedMotion.matches ||
        hovered ||
        focused ||
        Date.now() < resumeAt
      ) {
        return;
      }

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 1) return;
      if (el.scrollLeft >= maxScroll - 1) direction = -1;
      else if (el.scrollLeft <= 1) direction = 1;
      scroll(direction);
    }, 1000);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [scroll]);

  return (
    <section
      id="testimoni"
      className="bg-sand overflow-hidden py-20 md:py-28"
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") interaction.current.hovered = true;
      }}
      onPointerLeave={() => {
        interaction.current.hovered = false;
        interaction.current.resumeAt = Date.now() + AUTO_SCROLL_DELAY;
      }}
      onFocusCapture={() => {
        interaction.current.focused = true;
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          interaction.current.focused = false;
          interaction.current.resumeAt = Date.now() + AUTO_SCROLL_DELAY;
        }
      }}
      onPointerDownCapture={() => {
        interaction.current.resumeAt = Date.now() + AUTO_SCROLL_DELAY;
      }}
      onWheelCapture={() => {
        interaction.current.resumeAt = Date.now() + AUTO_SCROLL_DELAY;
      }}
    >
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Testimoni"
            title="Kata mereka tentang Handayani"
          />
          <div className="flex gap-2">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scroll(dir)}
                className="border-ink/20 bg-cream text-ink hover:bg-ink hover:text-cream grid size-12 place-items-center rounded-full border transition-colors"
                aria-label={
                  dir === -1 ? "Testimoni sebelumnya" : "Testimoni berikutnya"
                }
              >
                {dir === -1 ? (
                  <ChevronLeft className="size-5" />
                ) : (
                  <ChevronRight className="size-5" />
                )}
              </button>
            ))}
          </div>
        </div>

        <ul
          ref={track}
          className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:scroll-px-0 md:px-0"
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="bg-cream flex w-[85%] shrink-0 snap-start flex-col rounded-3xl p-7 sm:w-[60%] md:w-[calc((100%-2.5rem)/3)] md:p-8"
            >
              {t.rating ? (
                <div
                  className="text-gold mb-5 flex gap-0.5"
                  aria-label={`Rating ${t.rating} dari 5`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
              ) : null}
              <p className="text-ink flex-1 text-[17px] leading-relaxed">
                “{t.text}”
              </p>
              <div className="border-linen mt-6 flex items-center gap-3 border-t pt-5">
                <span className="bg-linen text-cocoa grid size-10 place-items-center rounded-full font-serif text-lg uppercase">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-muted text-xs">{t.source}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
