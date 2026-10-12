import Image from "next/image";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { contact, instagramUrl, navLinks } from "@/lib/data";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { intents } from "@/lib/wa-intents";
import { WaButton } from "./wa-form";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
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
            Bantu wujudkan ruang yang lebih estetik lewat pilihan gorden custom,
            konsultasi, dan layanan ke rumah.
          </p>
        </div>

        <div>
          <h3 className="text-gold text-xs font-bold tracking-[0.25em] uppercase">
            Jelajahi
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
            Hubungi
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <WaButton
                intent={intents.konsultasi}
                className="text-cream/80 hover:text-gold flex gap-3"
              >
                <Phone className="size-4 shrink-0 translate-y-0.5" />
                {contact.phone} (WhatsApp)
              </WaButton>
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
        <div className="container-page text-cream/50 flex flex-col items-center gap-3 pt-6 pb-24 text-center text-xs min-[1400px]:pb-6 md:flex-row md:justify-between">
          <p>
            © <CopyrightYear /> {contact.brand}. Semua hak dilindungi.
          </p>
          <p className="inline-flex items-center gap-2 text-[13px]">
            <span>Powered by</span>
            <Image
              src="/images/custompedia.webp"
              alt="Custompedia"
              width={22}
              height={22}
              className="size-[22px] rounded-md object-contain"
            />
            <strong className="text-cream text-sm font-bold tracking-tight">
              Custompedia
            </strong>
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
    <WaButton
      intent={intents.konsultasi}
      aria-label="Chat WhatsApp"
      className="shadow-ink/20 fixed right-5 bottom-5 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:right-8 md:bottom-8"
    >
      <WhatsAppIcon className="size-7" />
    </WaButton>
  );
}
