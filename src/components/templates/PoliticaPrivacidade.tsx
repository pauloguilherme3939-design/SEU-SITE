/**
 * PoliticaPrivacidade — Template reutilizável de Política de Privacidade (LGPD)
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * ⚠️  AVISO IMPORTANTE — LEIA ANTES DE USAR
 * ──────────────────────────────────────────
 * Este é um modelo base elaborado para fins informativos e de facilitação.
 * ELE NÃO SUBSTITUI ORIENTAÇÃO JURÍDICA ESPECIALIZADA.
 * Cada negócio tem realidades distintas de tratamento de dados — revise e
 * adapte este documento à situação específica do cliente com o apoio de um
 * advogado especializado em proteção de dados ou em conformidade com a LGPD
 * (Lei nº 13.709/2018) antes de publicar em ambiente de produção.
 * O desenvolvedor que gerou este template não se responsabiliza por
 * interpretações legais decorrentes de seu uso sem revisão profissional.
 *
 * COMO REUTILIZAR EM UM PROJETO DE CLIENTE
 * ──────────────────────────────────────────
 * 1. Copie este arquivo para src/components/templates/ do projeto do cliente.
 * 2. Copie src/data/politica-privacidade.ts e preencha com os dados do cliente.
 * 3. Crie a rota: src/app/(marketing)/politica-de-privacidade/page.tsx
 *    e renderize <PoliticaPrivacidade config={politicaConfig} />.
 * 4. Adicione o link no footer do cliente.
 */

import type { PoliticaConfig } from '@/data/politica-privacidade';

/* ── Seção genérica ──────────────────────────────────────── */
function Secao({
  numero,
  titulo,
  children,
}: {
  numero: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2
        className="font-display font-bold text-ink"
        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', letterSpacing: '-0.015em' }}
      >
        <span className="mr-2 text-accent">{numero}.</span>
        {titulo}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
        {children}
      </div>
    </section>
  );
}

/* ── Lista com bullet verde ──────────────────────────────── */
function Lista({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span
            className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: 'var(--accent)' }}
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Card de destaque ────────────────────────────────────── */
function CardDestaque({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius)] border border-line bg-card p-5 sm:p-6">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-accent">
        {titulo}
      </p>
      {children}
    </div>
  );
}

/* ── Componente principal ────────────────────────────────── */
export default function PoliticaPrivacidade({
  config,
}: {
  config: PoliticaConfig;
}) {
  const {
    nomeNegocio,
    nomeResponsavel,
    cnpjOuCpf,
    emailContato,
    whatsappContato,
    siteUrl,
    finalidadeColeta,
    usaGoogleAnalytics,
    usaMetaPixel,
    temFormulario,
    dataAtualizacao,
  } = config;

  /* Monta a frase de bases legais conforme as finalidades do site */
  const basesLegais = [
    'Consentimento do titular (art. 7º, I da LGPD) — ao preencher o formulário ou iniciar contato pelo WhatsApp, você consente com o tratamento dos dados fornecidos.',
    'Legítimo interesse do controlador (art. 7º, IX da LGPD) — para análise de audiência e melhoria do site, sempre de forma proporcional e com respeito à privacidade.',
    'Execução de contrato ou procedimentos preliminares (art. 7º, V da LGPD) — quando os dados são necessários para a prestação do serviço solicitado.',
  ];

  const dadosColetados: string[] = [];
  if (temFormulario) {
    dadosColetados.push(
      'Nome e sobrenome',
      'Número de WhatsApp ou telefone',
      'E-mail (quando fornecido)',
      'Informações sobre o negócio e necessidades descritas pelo titular no formulário ou mensagem',
    );
  } else {
    dadosColetados.push(
      'Número de WhatsApp ou telefone (quando o titular inicia contato)',
      'Informações fornecidas voluntariamente pelo titular via WhatsApp',
    );
  }
  if (usaGoogleAnalytics || usaMetaPixel) {
    dadosColetados.push(
      'Dados de navegação coletados automaticamente por ferramentas de análise: endereço IP anonimizado, tipo de dispositivo, páginas visitadas, duração da visita',
    );
  }

  const compartilhamento: string[] = [];
  if (usaGoogleAnalytics) {
    compartilhamento.push(
      'Google Analytics (Alphabet Inc.) — para análise de audiência e comportamento de navegação. A Google pode processar dados nos Estados Unidos conforme os Termos de Serviço e a Política de Privacidade da Google.',
    );
  }
  if (usaMetaPixel) {
    compartilhamento.push(
      'Meta Platforms (Facebook Pixel) — para mensuração de resultados de campanhas de marketing digital. A Meta pode processar dados conforme sua Política de Dados.',
    );
  }
  compartilhamento.push(
    'Não vendemos, alugamos nem cedemos seus dados pessoais a terceiros para fins comerciais não relacionados à prestação do serviço.',
  );

  const direitos = [
    'Confirmação da existência de tratamento dos seus dados',
    'Acesso aos dados pessoais tratados',
    'Correção de dados incompletos, inexatos ou desatualizados',
    'Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos',
    'Portabilidade dos dados a outro fornecedor de serviço',
    'Eliminação dos dados tratados com base no seu consentimento',
    'Informação sobre as entidades com quem os dados foram compartilhados',
    'Revogação do consentimento a qualquer momento',
    'Oposição ao tratamento realizado em descumprimento à LGPD',
  ];

  const waMensagem = encodeURIComponent(
    `Olá! Gostaria de exercer meus direitos sob a LGPD em relação aos dados tratados pelo site ${nomeNegocio}.`,
  );
  const waLink = whatsappContato
    ? `https://wa.me/${whatsappContato.replace(/\D/g, '')}?text=${waMensagem}`
    : null;

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-24">

      {/* ── Aviso de template ─────────────────────────── */}
      <div
        className="mb-10 rounded-[var(--radius)] border border-gold/25 bg-gold/8 p-5"
        role="note"
        aria-label="Aviso sobre este documento"
      >
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gold">
          Aviso
        </p>
        <p className="text-sm leading-relaxed text-muted">
          Este documento é um modelo base. Ele não substitui orientação jurídica especializada.
          Cada negócio tem realidades distintas — consulte um advogado especializado em LGPD
          antes de publicar. O desenvolvedor não se responsabiliza por interpretações legais
          decorrentes do uso sem revisão profissional.
        </p>
      </div>

      {/* ── Cabeçalho ─────────────────────────────────── */}
      <header className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          Privacidade
        </p>
        <h1
          className="font-display font-bold text-ink text-balance"
          style={{
            fontSize:      'clamp(1.8rem, 4vw, 2.6rem)',
            letterSpacing: '-0.025em',
            lineHeight:    '1.15',
          }}
        >
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-muted">
          {nomeNegocio} · Última atualização: {dataAtualizacao}
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          Esta Política de Privacidade descreve como{' '}
          <strong className="font-semibold text-ink">{nomeNegocio}</strong> coleta,
          usa, armazena e protege os dados pessoais dos visitantes e clientes do
          site{' '}
          <a
            href={siteUrl}
            className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
          >
            {siteUrl}
          </a>
          , em conformidade com a Lei Geral de Proteção de Dados (LGPD —
          Lei nº 13.709/2018).
        </p>
      </header>

      {/* ── Seções ────────────────────────────────────── */}
      <div className="space-y-10 divide-y divide-line">

        {/* 1. Quem somos */}
        <Secao numero="1" titulo="Quem trata seus dados">
          <p>
            O controlador dos dados pessoais coletados por este site é:
          </p>
          <CardDestaque titulo="Controlador">
            <div className="space-y-1.5 text-sm text-muted">
              <p><strong className="font-semibold text-ink">Nome:</strong> {nomeNegocio}</p>
              <p><strong className="font-semibold text-ink">Responsável:</strong> {nomeResponsavel}</p>
              {cnpjOuCpf && (
                <p><strong className="font-semibold text-ink">CPF/CNPJ:</strong> {cnpjOuCpf}</p>
              )}
              <p><strong className="font-semibold text-ink">E-mail:</strong>{' '}
                <a href={`mailto:${emailContato}`} className="text-accent underline-offset-2 hover:underline">
                  {emailContato}
                </a>
              </p>
              {whatsappContato && waLink && (
                <p><strong className="font-semibold text-ink">WhatsApp:</strong>{' '}
                  <a href={waLink} target="_blank" rel="noopener noreferrer"
                    className="text-accent underline-offset-2 hover:underline">
                    {whatsappContato}
                  </a>
                </p>
              )}
            </div>
          </CardDestaque>
        </Secao>

        {/* 2. Dados coletados */}
        <Secao numero="2" titulo="Quais dados coletamos">
          <p>
            Coletamos apenas os dados necessários para atender às solicitações feitas
            pelos visitantes. Os dados tratados podem incluir:
          </p>
          <Lista items={dadosColetados} />
          <p>
            Não coletamos dados sensíveis (origem racial, convicção religiosa, dados de
            saúde, dados financeiros, etc.) por meio deste site.
          </p>
        </Secao>

        {/* 3. Finalidade */}
        <Secao numero="3" titulo="Para que usamos seus dados">
          <p>
            Os dados coletados são utilizados exclusivamente para:
          </p>
          <Lista items={finalidadeColeta} />
          <p>
            Seus dados não serão utilizados para outras finalidades sem nova comunicação
            e, quando aplicável, sem seu consentimento.
          </p>
        </Secao>

        {/* 4. Base legal */}
        <Secao numero="4" titulo="Base legal para o tratamento (LGPD, art. 7º)">
          <p>
            Todo tratamento de dados pessoais realizado por{' '}
            <strong className="font-semibold text-ink">{nomeNegocio}</strong>{' '}
            se fundamenta em ao menos uma das seguintes bases legais:
          </p>
          <Lista items={basesLegais} />
        </Secao>

        {/* 5. Compartilhamento */}
        <Secao numero="5" titulo="Compartilhamento de dados">
          {compartilhamento.length > 0 && (
            <>
              <p>
                Seus dados podem ser compartilhados nas seguintes situações:
              </p>
              <Lista items={compartilhamento} />
            </>
          )}
          <p>
            Podemos compartilhar dados quando exigido por lei, ordem judicial ou
            autoridade competente, sempre nos limites do que for legalmente necessário.
          </p>
        </Secao>

        {/* 6. Cookies e analytics */}
        {(usaGoogleAnalytics || usaMetaPixel) && (
          <Secao numero="6" titulo="Cookies e ferramentas de análise">
            <p>
              Este site utiliza cookies e tecnologias similares para melhorar a experiência
              de navegação e mensurar o desempenho das páginas.
            </p>
            {usaGoogleAnalytics && (
              <p>
                <strong className="font-semibold text-ink">Google Analytics:</strong>{' '}
                Utilizamos o Google Analytics para compreender como os visitantes
                interagem com o site (páginas mais acessadas, tempo de visita, origem do
                tráfego). Os dados são coletados de forma anonimizada. Você pode optar
                por não participar instalando o{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  complemento de recusa do Google Analytics
                </a>
                .
              </p>
            )}
            {usaMetaPixel && (
              <p>
                <strong className="font-semibold text-ink">Meta Pixel:</strong>{' '}
                Utilizamos o Pixel da Meta para mensurar resultados de campanhas de
                marketing no Facebook e Instagram. Os dados são processados conforme a{' '}
                <a
                  href="https://www.facebook.com/privacy/policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Política de Dados da Meta
                </a>
                .
              </p>
            )}
            <p>
              Você pode gerenciar ou desativar cookies nas configurações do seu navegador.
              A desativação de cookies pode afetar a experiência de uso do site.
            </p>
          </Secao>
        )}

        {/* 7. Seus direitos */}
        <Secao
          numero={usaGoogleAnalytics || usaMetaPixel ? '7' : '6'}
          titulo="Seus direitos como titular dos dados (LGPD, art. 18)"
        >
          <p>
            Em conformidade com a LGPD, você tem os seguintes direitos em relação aos
            seus dados pessoais:
          </p>
          <CardDestaque titulo="Seus direitos">
            <Lista items={direitos} />
          </CardDestaque>
          <p>
            Para exercer qualquer desses direitos, entre em contato pelos canais abaixo.
            Responderemos em até{' '}
            <strong className="font-semibold text-ink">15 dias úteis</strong>.
          </p>
        </Secao>

        {/* 8. Prazo de armazenamento */}
        <Secao
          numero={usaGoogleAnalytics || usaMetaPixel ? '8' : '7'}
          titulo="Prazo de armazenamento"
        >
          <p>
            Os dados pessoais são mantidos pelo tempo necessário para cumprir as
            finalidades descritas nesta política ou para atender obrigações legais
            e regulatórias.
          </p>
          <p>
            Dados fornecidos via formulário ou WhatsApp para fins de orçamento são
            mantidos pelo período de relacionamento comercial e por até{' '}
            <strong className="font-semibold text-ink">5 anos</strong> após o último
            contato, para fins de histórico de atendimento e cumprimento de
            eventuais obrigações legais.
          </p>
          <p>
            Após o prazo necessário, os dados são excluídos ou anonimizados de forma segura.
          </p>
        </Secao>

        {/* 9. Segurança */}
        <Secao
          numero={usaGoogleAnalytics || usaMetaPixel ? '9' : '8'}
          titulo="Segurança dos dados"
        >
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger seus
            dados pessoais contra acesso não autorizado, perda, destruição ou
            divulgação indevida.
          </p>
          <p>
            Apesar dos esforços empregados, nenhum sistema de segurança é absolutamente
            inviolável. Em caso de incidente que possa gerar risco relevante, notificaremos
            a Autoridade Nacional de Proteção de Dados (ANPD) e os titulares afetados,
            conforme previsto na LGPD.
          </p>
        </Secao>

        {/* 10. Alterações */}
        <Secao
          numero={usaGoogleAnalytics || usaMetaPixel ? '10' : '9'}
          titulo="Alterações nesta política"
        >
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente para
            refletir mudanças nos serviços, na legislação ou nas práticas de tratamento
            de dados. A data de última atualização será sempre indicada no topo do
            documento.
          </p>
          <p>
            Recomendamos consultar esta página periodicamente. O uso continuado do site
            após alterações implica aceite das condições atualizadas.
          </p>
        </Secao>

        {/* 11. Contato */}
        <Secao
          numero={usaGoogleAnalytics || usaMetaPixel ? '11' : '10'}
          titulo="Como entrar em contato"
        >
          <p>
            Para dúvidas, exercício de direitos, solicitação de exclusão de dados ou
            qualquer questão relacionada a esta política, entre em contato:
          </p>
          <CardDestaque titulo="Contato de privacidade">
            <div className="space-y-2 text-sm text-muted">
              <p>
                <strong className="font-semibold text-ink">Responsável:</strong>{' '}
                {nomeResponsavel} — {nomeNegocio}
              </p>
              <p>
                <strong className="font-semibold text-ink">E-mail:</strong>{' '}
                <a
                  href={`mailto:${emailContato}`}
                  className="text-accent underline-offset-2 transition-colors hover:underline"
                >
                  {emailContato}
                </a>
              </p>
              {whatsappContato && waLink && (
                <p>
                  <strong className="font-semibold text-ink">WhatsApp:</strong>{' '}
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline-offset-2 transition-colors hover:underline"
                  >
                    Enviar mensagem
                  </a>
                </p>
              )}
              <p className="pt-1 text-xs text-muted-2">
                Prazo de resposta: até 15 dias úteis após o recebimento da solicitação.
              </p>
            </div>
          </CardDestaque>
          <p>
            Caso entenda que seus direitos não foram atendidos, você também pode
            registrar uma reclamação junto à{' '}
            <a
              href="https://www.gov.br/anpd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-2 hover:underline"
            >
              Autoridade Nacional de Proteção de Dados (ANPD)
            </a>
            .
          </p>
        </Secao>

      </div>

      {/* ── Rodapé do documento ───────────────────────── */}
      <footer className="mt-12 border-t border-line pt-6 text-xs text-muted-2">
        <p>
          {nomeNegocio} · {siteUrl}
        </p>
        <p className="mt-1">
          Última atualização: {dataAtualizacao} · Em conformidade com a Lei nº 13.709/2018
          (LGPD).
        </p>
      </footer>

    </article>
  );
}
