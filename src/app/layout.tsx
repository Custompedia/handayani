import type { Metadata, Viewport } from "next";
import { Gilda_Display, Nunito_Sans } from "next/font/google";
import { MetaPixel } from "@/components/meta-pixel";
import { MotionProvider } from "@/components/motion";
import { contact } from "@/lib/data";
import "./globals.css";

// Domain utama situs ini (branch main). Dipakai untuk canonical, OG & JSON-LD.
const siteUrl = "https://handayanigorden.com";

// Cloudflare Pages selalu mengisi CF_PAGES=1 saat build. Semua build di Pages
// adalah domain review (gordensemarang.custompedia.id, handayanigorden.custompedia.id,
// preview *.pages.dev), jadi jangan sampai diindeks Google. Situs utama
// dibangun oleh Worker (bukan Pages), jadi tetap terindeks.
const isReviewBuild = process.env.CF_PAGES === "1";

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
  metadataBase: new URL(siteUrl),
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
  alternates: { canonical: "/" },
  robots: isReviewBuild
    ? { index: false, follow: false }
    : { index: true, follow: true },
  openGraph: {
    url: "/",
    siteName: "Handayani Gorden Semarang",
    title: "Handayani Gorden Semarang",
    description:
      "Gorden blackout & vitrase custom. Gratis survei area Kota Semarang.",
    locale: "id_ID",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#faf7f2",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  "@id": `${siteUrl}/#toko`,
  name: contact.brand,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.jpg`,
  logo: `${siteUrl}/images/logo.png`,
  hasMap: contact.mapsUrl,
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
        <MotionProvider>{children}</MotionProvider>
        <MetaPixel />
      </body>
    </html>
  );
}
