"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ease } from "./motion";

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
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// Kata per kata naik dari balik garis, dipakai di judul hero & section.
// Pembaca layar membaca teks utuh di sr-only, bukan potongan katanya.
export function WordReveal({
  text,
  delay = 0,
  stagger = 0.05,
  inView = true,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  /** false = langsung jalan saat halaman dibuka (untuk hero). */
  inView?: boolean;
}) {
  const trigger = inView
    ? {
        whileInView: { y: "0%" },
        viewport: { once: true, margin: "-80px" },
      }
    : { animate: { y: "0%" } };

  return (
    <>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden>
          {i > 0 && " "}
          {/* pb/-mb supaya ekor huruf (g, y) tidak terpotong. */}
          <span className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              {...trigger}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease }}
            >
              {word}
            </motion.span>
          </span>
        </span>
      ))}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const center = align === "center";
  const words = title.split(" ").length;
  const line = (origin: string) => (
    <motion.span
      aria-hidden
      className={cn("bg-gold-deep/50 h-px w-8", origin)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease }}
    />
  );

  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <motion.p
        className="text-gold-deep inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
      >
        {line("origin-right")}
        {eyebrow}
        {center && line("origin-left")}
      </motion.p>
      <h2 className="text-ink mt-3 font-serif text-3xl leading-tight md:text-5xl">
        <WordReveal text={title} delay={0.1} />
      </h2>
      {description && (
        <motion.p
          className="text-muted mt-4 text-base leading-relaxed md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 + words * 0.05, ease }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
