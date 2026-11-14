"use client";

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Satu kurva untuk semua animasi: cepat di awal, mendarat pelan.
export const ease = [0.22, 1, 0.36, 1] as const;

// Menghormati setelan "kurangi animasi" di perangkat pengunjung.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Foto terbuka seperti gorden: dua panel bergeser ke kiri & kanan.
// Hanya transform (dikerjakan GPU), jadi tetap mulus di HP.
export function CurtainReveal({
  children,
  className,
  panelClassName = "bg-cocoa",
}: {
  children: ReactNode;
  className?: string;
  /** Warna panel gorden, sebaiknya senada dengan latar section. */
  panelClassName?: string;
}) {
  const reduce = useReducedMotion();
  const viewport = { once: true, margin: "-120px" } as const;
  const panel = (side: "left" | "right") => (
    <motion.div
      aria-hidden
      className={cn(
        "absolute inset-y-0 z-10 w-1/2",
        side === "left" ? "left-0" : "right-0",
        panelClassName,
      )}
      initial={{ x: "0%" }}
      whileInView={{ x: side === "left" ? "-101%" : "101%" }}
      viewport={viewport}
      transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
    />
  );

  return (
    <div className={className}>
      <motion.div
        className="relative h-full w-full"
        initial={reduce ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 1.8, ease }}
      >
        {children}
      </motion.div>
      {!reduce && (
        <>
          {panel("left")}
          {panel("right")}
        </>
      )}
    </div>
  );
}

// Latar foto yang pelan-pelan "mendarat" saat terlihat.
export function SettleOnView({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1.12 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 2.2, ease }}
    >
      {children}
    </motion.div>
  );
}

// Angka seperti "3.000+" menghitung naik saat terlihat. HTML awal tetap
// berisi angka akhir, jadi tanpa JavaScript angkanya tetap benar.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? Number(match[1].replace(/\./g, "")) : NaN;
  const suffix = match?.[2] ?? "";
  const format = (n: number) =>
    `${Math.round(n).toLocaleString("id-ID")}${suffix}`;

  useEffect(() => {
    if (reduce || Number.isNaN(target) || !ref.current) return;
    // Section ini jauh di bawah, jadi reset ke 0 tidak terlihat.
    if (!inView) {
      ref.current.textContent = format(0);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.8,
      ease,
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = format(n);
      },
    });
    return () => controls.stop();
    // format hanya bergantung pada suffix.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

// Garis emas tipis di bawah header yang mengikuti posisi scroll.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="bg-gold absolute inset-x-0 -bottom-px h-0.5 origin-left"
      style={{ scaleX }}
    />
  );
}
