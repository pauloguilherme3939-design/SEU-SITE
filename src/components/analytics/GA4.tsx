'use client';

import Script from 'next/script';
import { site } from '@/data/site';

/**
 * Google Analytics 4 — carrega só se NEXT_PUBLIC_GA4_ID estiver definido.
 * Adicione ao root layout junto com MetaPixel.
 *
 * Para rastrear eventos customizados, use trackLead / trackContact de @/lib/analytics.
 */
export default function GA4() {
  const id = site.ga4Id;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">{`
        window.dataLayer=window.dataLayer||[];
        function gtag(){dataLayer.push(arguments);}
        gtag('js',new Date());
        gtag('config','${id}',{send_page_view:true});
      `}</Script>
    </>
  );
}
