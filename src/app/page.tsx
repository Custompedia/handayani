import { About } from "@/components/about";
import { Fabrics } from "@/components/fabrics";
import { Footer, QuoteCta, WhatsAppFloat } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { Products } from "@/components/products";
import { Steps } from "@/components/steps";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Products />
        <Fabrics />
        <Portfolio />
        <About />
        <Steps />
        <Testimonials />
        <QuoteCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
