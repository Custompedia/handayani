"use client";

import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";

// Satu kurva untuk semua animasi: cepat di awal, mendarat pelan.
export const ease = [0.22, 1, 0.36, 1] as const;

// Menghormati setelan "kurangi animasi" di perangkat pengunjung.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Foto terbuka dari celah tipis di tengah ke kiri-kanan, seperti gorden
// dibuka. Tanpa panel berwarna: yang terlihat di samping hanya latar
// section itu sendiri, jadi di tengah animasi pun tetap rapi.
export function CurtainReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Deteksi "terlihat" di pembungkus luar yang tidak dipotong. Chrome ikut
  // menghitung clip-path di IntersectionObserver, jadi kalau dipasang di
  // elemen yang dipotong, animasinya tidak pernah mulai.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  // Sudut ikut membulat selama animasi (sama dengan rounded-3xl).
  const round = "round 1.5rem";
  const closed = { clipPath: `inset(0% 42% 0% 42% ${round})`, opacity: 0 };
  const open = { clipPath: `inset(0% 0% 0% 0% ${round})`, opacity: 1 };

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : closed}
        animate={inView || reduce ? open : closed}
        transition={{
          clipPath: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: 0.35 },
        }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: inView || reduce ? 1 : 1.12 }}
          transition={{ duration: 1.6, ease }}
        >
          {children}
        </motion.div>
      </motion.div>
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
