import type { Metadata, Viewport } from 'next';
import { Sora, Outfit } from 'next/font/google';
import { site } from '@/data/site';
import { jsonLdOrganization, serializeJsonLd } from '@/lib/seo';
import MetaPixel from '@/components/analytics/MetaPixel';
import GA4 from '@/components/analytics/GA4';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: `${site.url}/api/og`,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [`${site.url}/api/og`],
  },
  alternates: {
    canonical: site.url,
    languages: { 'pt-BR': site.url },
  },
  formatDetection: { email: false, address: false, telephone: false },
  // verification: { google: 'SEU_CODIGO_GOOGLE_SEARCH_CONSOLE' },
};

export const viewport: Viewport = {
  themeColor: '#0a0e0d',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${outfit.variable}`}>
      <body className="bg-bg text-ink font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdOrganization()) }}
        />
        {children}
        <MetaPixel />
        <GA4 />
      </body>
    </html>
  );
}
