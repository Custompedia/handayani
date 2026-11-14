import Image from "next/image";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { contact, waProps, instagramUrl, navLinks, waLink } from "@/lib/data";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { SettleOnView } from "./motion";
import { Reveal } from "./reveal";

export function QuoteCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <SettleOnView className="absolute inset-0 -z-10">
        <Image
          src="/images/cta.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </SettleOnView>
      <div className="bg-ink/65 absolute inset-0 -z-10" />
      <div className="container-page text-cream py-24 text-center md:py-32">
        <Reveal className="mx-auto max-w-2xl">
          <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase">
            Estimasi Harga
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Kirim foto atau ukuran jendela, kami hitungkan penawarannya
          </h2>
          <a
            {...waProps}
            className="bg-gold text-ink hover:bg-cream mt-9 inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold transition-colors"
          >
            <WhatsAppIcon className="size-5" />
            Minta Penawaran via WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="kontak" className="bg-ink text-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo-white.png"
            alt="Handayani Gorden Semarang"
            width={320}
            height={202}
            className="h-24 w-auto"
          />
          <p className="text-cream/70 mt-6 max-w-xs text-sm leading-relaxed">
            Gorden blackout &amp; vitrase custom untuk rumah, klinik, hingga
            villa di Semarang dan sekitarnya.
          </p>
        </div>

        <div>
          <h3 className="text-gold text-xs font-bold tracking-[0.25em] uppercase">
            Menu
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream/80 hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-gold text-xs font-bold tracking-[0.25em] uppercase">
            Kontak
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-gold flex gap-3"
              >
                <Phone className="size-4 shrink-0 translate-y-0.5" />
                {contact.phone} (WhatsApp)
              </a>
            </li>
            <li>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-gold flex gap-3"
              >
                <MapPin className="size-4 shrink-0 translate-y-0.5" />
                {contact.address}
              </a>
            </li>
            <li>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-gold flex gap-3"
              >
                <InstagramIcon className="size-4 shrink-0 translate-y-0.5" />@
                {contact.instagram}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-gold text-xs font-bold tracking-[0.25em] uppercase">
            Layanan
          </h3>
          <ul className="text-cream/80 mt-5 space-y-3 text-sm">
            <li className="flex gap-3">
              <Clock className="size-4 shrink-0 translate-y-0.5" />
              Pengerjaan ±7 hari
            </li>
            <li className="flex gap-3">
              <ArrowRight className="size-4 shrink-0 translate-y-0.5" />
              Gratis survei area Kota Semarang
            </li>
            <li className="flex gap-3">
              <ArrowRight className="size-4 shrink-0 translate-y-0.5" />
              DP 30%, lunas setelah terpasang
            </li>
          </ul>
        </div>
      </div>
      <div className="border-cream/10 border-t">
        <div className="container-page text-cream/50 pt-6 pb-24 text-center text-xs min-[1400px]:pb-6">
          <p>
            © <CopyrightYear /> {contact.brand}. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}

function CopyrightYear() {
  return new Date().getFullYear();
}

export function WhatsAppFloat() {
  return (
    <a
      {...waProps}
      aria-label="Chat WhatsApp"
      className="shadow-ink/20 fixed right-5 bottom-5 z-30 grid size-14 animate-[wa-pop_0.6s_cubic-bezier(0.22,1,0.36,1)_1.4s_both] place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 motion-reduce:animate-none md:right-8 md:bottom-8"
    >
      {/* Cincin lembut tiap beberapa detik, mengingatkan tanpa mengganggu. */}
      <span
        aria-hidden
        className="absolute inset-0 animate-[wa-ring_3.2s_ease-out_2.2s_infinite] rounded-full bg-[#25D366] motion-reduce:hidden"
      />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
