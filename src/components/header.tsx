"use client";

import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contact, navLinks, waLink } from "@/lib/data";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <div className="bg-ink text-cream">
        <div className="container-page flex h-9 items-center justify-center gap-2 text-center text-xs tracking-wide md:justify-between">
          <p>
            <span className="text-gold">✦</span> Gratis survei untuk area Kota
            Semarang
          </p>
          <a
            href={`tel:+${contact.whatsapp}`}
            className="hover:text-gold hidden items-center gap-1.5 md:flex"
          >
            <Phone className="size-3.5" /> {contact.phone}
          </a>
        </div>
      </div>

      <header
        className={cn(
          "bg-cream/95 sticky top-0 z-40 border-b backdrop-blur transition-[border-color,box-shadow]",
          scrolled
            ? "border-linen shadow-[0_8px_30px_-12px_rgba(42,34,29,0.18)]"
            : "border-transparent",
        )}
      >
        <nav className="container-page flex h-18 items-center justify-between gap-6 md:h-20">
          <a href="#" aria-label="Handayani Gorden Semarang — beranda">
            <Image
              src="/images/logo.png"
              alt="Handayani Gorden Semarang"
              width={480}
              height={117}
              className="h-9 w-auto md:h-11"
              preload
            />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-ink/80 after:bg-gold hover:text-ink relative text-[15px] font-semibold transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink text-cream hover:bg-cocoa hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" />
              Konsultasi Gratis
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-ink hover:bg-sand grid size-11 place-items-center rounded-full lg:hidden"
              aria-label="Buka menu"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="bg-ink/40 absolute inset-0"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="bg-cream absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/images/logo.png"
                  alt="Handayani Gorden Semarang"
                  width={480}
                  height={117}
                  className="h-9 w-auto"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="hover:bg-sand grid size-11 place-items-center rounded-full"
                  aria-label="Tutup menu"
                >
                  <X className="size-6" />
                </button>
              </div>
              <ul className="mt-10 flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="border-linen block border-b py-4 font-serif text-2xl"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-cream mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 font-bold"
              >
                <WhatsAppIcon className="size-5" />
                Konsultasi via WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
