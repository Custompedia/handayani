import type { Metadata } from "next";
import { Gilda_Display, Nunito_Sans } from "next/font/google";
import { MetaPixel } from "@/components/meta-pixel";
import { contact } from "@/lib/data";
import "./globals.css";

const gilda = Gilda_Display({
  variable: "--font-gilda",
  weight: "400",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gordensemarang.custompedia.id"),
  title: "Handayani Gorden Semarang — Gorden Blackout & Vitrase Custom",
  description:
    "6+ tahun bantu 3.000+ keluarga sejukkan rumahnya. Gorden blackout mulai Rp170.000/meter lari, vitrase mulai Rp100.000/meter lari. Gratis survei area Kota Semarang.",
  keywords: [
    "gorden semarang",
    "gorden blackout semarang",
    "vitrase semarang",
    "gorden custom",
    "handayani gorden",
  ],
  openGraph: {
    title: "Handayani Gorden Semarang",
    description:
      "Gorden blackout & vitrase custom. Gratis survei area Kota Semarang.",
    locale: "id_ID",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  name: contact.brand,
  telephone: "+62 858-7588-8109",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Supriadi No 78B",
    addressLocality: "Semarang",
    addressRegion: "Jawa Tengah",
    addressCountry: "ID",
  },
  areaServed: "Kota Semarang",
  priceRange: "Mulai Rp100.000 per meter lari",
  sameAs: [`https://instagram.com/${contact.instagram}`],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${gilda.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
