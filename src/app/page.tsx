import { Fabrics } from "@/components/fabrics";
import { Footer, WhatsAppFloat } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Portfolio } from "@/components/portfolio";
import { Projects } from "@/components/projects";
import { QuoteCta } from "@/components/quote-cta";
import { Steps } from "@/components/steps";
import { Testimonials } from "@/components/testimonials";
import { WaFormProvider } from "@/components/wa-form";
import { Why } from "@/components/why";

// Urutan cerita mengikuti dummy v3: hasil → alasan → proses → koleksi →
// bukti proyek → testimoni → konsultasi.
export default function Home() {
  return (
    <WaFormProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <Manifesto />
        <Portfolio />
        <Why />
        <Steps />
        <Fabrics />
        <Projects />
        <Testimonials />
        <QuoteCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </WaFormProvider>
  );
}
