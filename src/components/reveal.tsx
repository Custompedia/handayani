"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-bold tracking-[0.25em] uppercase",
        tone === "light" ? "text-gold-deep" : "text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}

// Judul section ala editorial: eyebrow, judul di kiri, deskripsi
// (atau aksi seperti tab/tombol) di kanan. `accent` diwarnai emas.
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  aside,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  aside?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div className="max-w-2xl">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "mt-4 font-serif text-3xl leading-[1.15] md:text-5xl",
            tone === "light" ? "text-ink" : "text-cream",
          )}
        >
          {title}
          {accent && (
            <>
              {" "}
              <span
                className={tone === "light" ? "text-gold-deep" : "text-gold"}
              >
                {accent}
              </span>
            </>
          )}
        </h2>
      </div>
      {(description || aside) && (
        <div className="max-w-xl shrink-0 lg:max-w-sm lg:pb-1.5">
          {description && (
            <p
              className={cn(
                "text-base leading-relaxed",
                tone === "light" ? "text-muted" : "text-cream/70",
              )}
            >
              {description}
            </p>
          )}
          {aside}
        </div>
      )}
    </Reveal>
  );
}
