'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';

const STORAGE_KEY = 'sitenoar-cookie-consent-v1';

/**
 * Google Analytics 4 — só carrega após consentimento (LGPD).
 * Requer NEXT_PUBLIC_GA4_ID e usuário ter aceitado cookies.
 */
export default function GA4() {
  const id = site.ga4Id;
  const [consent, setConsent] = useState<boolean>(false);

  useEffect(() => {
    function checkConsent() {
      try {
        setConsent(window.localStorage.getItem(STORAGE_KEY) === 'accepted');
      } catch {
        setConsent(false);
      }
    }
    checkConsent();
    function onChange(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setConsent(detail === 'accepted');
    }
    window.addEventListener('cookie-consent-change', onChange);
    return () => window.removeEventListener('cookie-consent-change', onChange);
  }, []);

  if (!id || !consent) return null;

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
