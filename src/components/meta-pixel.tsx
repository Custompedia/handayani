"use client";

import Script from "next/script";
import { useEffect } from "react";

const PIXEL_ID = "1073670731624326";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Meta Pixel untuk iklan: PageView + ViewContent saat landing page dibuka,
// AddToCart setiap kali pengunjung klik tombol yang menuju WhatsApp.
export function MetaPixel() {
  useEffect(() => {
    // Satu listener untuk semua link wa.me, jadi tombol WA baru otomatis
    // ikut ter-tracking tanpa perlu dipasang satu per satu.
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>(
        'a[href^="https://wa.me/"]',
      );
      if (!link) return;
      const label =
        link.getAttribute("aria-label") ?? link.textContent?.trim() ?? "";
      window.fbq?.("track", "AddToCart", {
        content_name: label || "WhatsApp",
        content_category: "WhatsApp CTA",
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      <Script id="meta-pixel">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');
fbq('track','ViewContent',{content_name:'Landing Page Handayani Gorden',content_category:'Gorden'});`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
