'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { trackContact } from '@/lib/analytics';

const STORAGE_KEY = 'sitenoar-cookie-consent-v1';

/**
 * Meta Pixel — carrega só se NEXT_PUBLIC_META_PIXEL_ID estiver definido E
 * o usuário tiver aceitado os cookies. Conformidade LGPD.
 */
export default function MetaPixel() {
  const id = site.metaPixelId;
  const [consent, setConsent] = useState<boolean>(false);

  /* Sincroniza com o estado do cookie banner */
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

  /* Rastreamento global de cliques em WhatsApp */
  useEffect(() => {
    if (!id || !consent) return;
    function onWaClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a');
      if (anchor?.href?.includes('wa.me')) {
        trackContact();
      }
    }
    document.addEventListener('click', onWaClick);
    return () => document.removeEventListener('click', onWaClick);
  }, [id, consent]);

  if (!id || !consent) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">{`
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init','${id}');
      fbq('track','PageView');
    `}</Script>
  );
}
