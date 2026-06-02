'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { site } from '@/data/site';
import { trackContact } from '@/lib/analytics';

/**
 * Meta Pixel — carrega só se NEXT_PUBLIC_META_PIXEL_ID estiver definido.
 * Dispara PageView automaticamente e rastreia cliques em links wa.me como Contact.
 * Adicione ao root layout.
 */
export default function MetaPixel() {
  const id = site.metaPixelId;

  /* Rastreamento global de cliques em WhatsApp */
  useEffect(() => {
    if (!id) return;
    function onWaClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a');
      if (anchor?.href?.includes('wa.me')) {
        trackContact();
      }
    }
    document.addEventListener('click', onWaClick);
    return () => document.removeEventListener('click', onWaClick);
  }, [id]);

  if (!id) return null;

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
