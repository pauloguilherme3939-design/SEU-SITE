import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFab from '@/components/layout/WhatsAppFab';
import ScrollReveal from '@/components/layout/ScrollReveal';
import CookieBanner from '@/components/layout/CookieBanner';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
      <CookieBanner />
    </>
  );
}
