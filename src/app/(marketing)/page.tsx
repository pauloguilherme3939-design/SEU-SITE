import type { Metadata } from 'next';
import {
  buildMetadata,
  jsonLdOrganization,
  jsonLdServiceCatalog,
  jsonLdFaqPage,
  jsonLdBreadcrumbs,
  serializeJsonLd,
} from '@/lib/seo';
import { site } from '@/data/site';
import { plans } from '@/data/plans';
import { faq } from '@/data/faq';
import Hero from '@/components/sections/Hero';
import ProblemaSolucao from '@/components/sections/ProblemaSolucao';
import Pricing from '@/components/sections/Pricing';
import ComparativoTiers from '@/components/sections/ComparativoTiers';
import Garantias from '@/components/sections/Garantias';
import PlanFinder from '@/components/sections/PlanFinder';
import Saas from '@/components/sections/Saas';
import Portfolio from '@/components/sections/Portfolio';
import ComoFunciona from '@/components/sections/ComoFunciona';
import Depoimentos from '@/components/sections/Depoimentos';
import Faq from '@/components/sections/Faq';
import FormularioOrcamento from '@/components/sections/FormularioOrcamento';
import CtaFinal from '@/components/sections/CtaFinal';

export const metadata: Metadata = buildMetadata({
  title: 'Site no Ar Express | Site profissional pronto em até 3 dias',
  description: 'Criação de sites profissionais para pequenos negócios com domínio incluso por 1 ano, botão para WhatsApp, SEO inicial e publicação no ar em até 3 dias.',
  path: '/',
});

const jsonLd = [
  jsonLdOrganization(),
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${site.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  jsonLdServiceCatalog(plans),
  jsonLdFaqPage(faq),
  jsonLdBreadcrumbs([{ name: 'Início', url: '/' }]),
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Hero />
      <ProblemaSolucao />
      <Pricing />
      <ComparativoTiers />
      <Garantias />
      <PlanFinder />
      <Saas />
      <Portfolio />
      <ComoFunciona />
      <Depoimentos />
      <Faq />
      <FormularioOrcamento />
      <CtaFinal />
    </>
  );
}
