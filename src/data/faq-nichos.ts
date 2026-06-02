/**
 * faq-nichos.ts — Kit de FAQ pronto por nicho (bônus Ouro+)
 *
 * ═══════════════════════════════════════════════════════════
 * COMO REUTILIZAR EM UM PROJETO DE CLIENTE
 * ─────────────────────────────────────────
 * 1. Importe o nicho desejado:
 *      import { faqNichos } from '@/data/faq-nichos';
 *      const faq = faqNichos.barbearia;
 *
 * 2. Passe para o componente Accordion/FAQ do cliente:
 *      <FaqSection items={faq} />
 *
 * 3. Antes de entregar, substitua todos os [PLACEHOLDER]
 *    pelos dados reais do cliente (preço, horário, endereço, etc.)
 *
 * 4. Adicione ou remova perguntas conforme o negócio específico.
 *
 * NICHOS DISPONÍVEIS:
 *   geral | barbearia | salao | dentista | advogado | restaurante | oficina
 * ═══════════════════════════════════════════════════════════
 */

export interface FaqNichoItem {
  pergunta: string;
  resposta: string;
}

export const faqNichos: Record<string, FaqNichoItem[]> = {

  /* ────────────────────────────────────────────────────────
     GERAL — prestadores de serviço em geral
     Use quando o nicho específico não estiver na lista.
  ──────────────────────────────────────────────────────── */
  geral: [
    {
      pergunta: 'Quais são os preços?',
      resposta:
        'Nossos preços variam conforme o serviço. Para um orçamento personalizado, fale comigo direto pelo WhatsApp — respondo rapidinho e sem compromisso.',
    },
    {
      pergunta: 'Como faço para solicitar o serviço?',
      resposta:
        'É simples: clique no botão do WhatsApp, me mande uma mensagem com o que você precisa e eu te retorno com as opções disponíveis. Não precisa ligar nem ir até mim.',
    },
    {
      pergunta: 'Em qual região você atende?',
      resposta:
        'Atendo em [PLACEHOLDER: cidade/bairro/região]. Fora dessa área, consulte disponibilidade — em alguns casos consigo atender mesmo assim.',
    },
    {
      pergunta: 'Qual é o prazo de execução?',
      resposta:
        'Depende do serviço. Em média, [PLACEHOLDER: prazo médio]. Ao solicitar o orçamento, já informo o prazo exato para o seu caso.',
    },
    {
      pergunta: 'Quais formas de pagamento vocês aceitam?',
      resposta:
        'Aceito [PLACEHOLDER: Pix / cartão de débito / crédito / dinheiro]. O pagamento é combinado na hora do fechamento.',
    },
    {
      pergunta: 'Tem garantia no serviço?',
      resposta:
        'Sim. Garanto [PLACEHOLDER: descreva a garantia — ex: "30 dias para qualquer problema relacionado ao serviço realizado"]. Qualquer dúvida, é só me chamar no WhatsApp.',
    },
    {
      pergunta: 'Posso ver exemplos do seu trabalho?',
      resposta:
        'Claro! [PLACEHOLDER: "Veja meu portfólio aqui no site" / "Me chame no WhatsApp que mando fotos de trabalhos anteriores"]. Fico à disposição para tirar dúvidas.',
    },
  ],

  /* ────────────────────────────────────────────────────────
     BARBEARIA
  ──────────────────────────────────────────────────────── */
  barbearia: [
    {
      pergunta: 'Qual o preço do corte?',
      resposta:
        'O corte simples custa R$ [PLACEHOLDER]. Serviços com barba, degradê ou tratamentos têm valores diferentes — me chame no WhatsApp para ver a tabela completa.',
    },
    {
      pergunta: 'Como faço para agendar?',
      resposta:
        'Pelo WhatsApp mesmo — clique no botão aqui do site, me mande o serviço que você quer e o dia/horário preferido. Confirmo em minutos.',
    },
    {
      pergunta: 'Qual o horário de funcionamento?',
      resposta:
        'Atendemos de [PLACEHOLDER: ex: "segunda a sábado, das 9h às 20h"]. Domingo e feriado, [PLACEHOLDER: "fechado" / "sob agendamento"].',
    },
    {
      pergunta: 'Vocês fazem barba também?',
      resposta:
        'Sim! Fazemos barba completa, aparagem e [PLACEHOLDER: outros serviços oferecidos]. Me chame no WhatsApp para ver todas as opções e preços.',
    },
    {
      pergunta: 'Posso chegar sem agendar?',
      resposta:
        'Pode tentar, mas recomendamos agendar para garantir seu horário sem espera. Em datas movimentadas, a demanda costuma ser alta.',
    },
    {
      pergunta: 'Aceitam cartão?',
      resposta:
        'Aceitamos [PLACEHOLDER: Pix / dinheiro / débito / crédito]. Para valores acima de R$ [PLACEHOLDER], aceitamos parcelamento.',
    },
    {
      pergunta: 'Onde fica a barbearia?',
      resposta:
        'Estamos em [PLACEHOLDER: endereço completo]. Tem estacionamento [PLACEHOLDER: "na rua" / "no local" / "no shopping ao lado"]. Me mande mensagem se precisar de ajuda para chegar.',
    },
  ],

  /* ────────────────────────────────────────────────────────
     SALÃO / ESTÉTICA
  ──────────────────────────────────────────────────────── */
  salao: [
    {
      pergunta: 'Qual o preço de [serviço]?',
      resposta:
        'Os valores variam conforme o serviço e o tempo necessário. Me chame no WhatsApp e te passo a tabela completa com todos os preços.',
    },
    {
      pergunta: 'Como faço para agendar?',
      resposta:
        'Clique no botão do WhatsApp aqui do site, me diga o serviço e o dia que prefere, e eu confirmo a disponibilidade na hora.',
    },
    {
      pergunta: 'Qual o horário de funcionamento?',
      resposta:
        'Atendemos de [PLACEHOLDER: ex: "terça a sábado, das 9h às 19h"]. Para horários fora desse padrão, verifique disponibilidade pelo WhatsApp.',
    },
    {
      pergunta: 'Os produtos utilizados são de qualidade?',
      resposta:
        'Sim. Trabalhamos com [PLACEHOLDER: marcas/linha de produtos — ex: "produtos profissionais da linha LOréal e Wella"]. Qualidade é prioridade aqui.',
    },
    {
      pergunta: 'Quanto tempo dura o procedimento?',
      resposta:
        'Depende do serviço. Em média: [PLACEHOLDER: ex: "escova — 1h, coloração — 2h a 3h, manicure — 40 min"]. Me informe o que você quer fazer e te dou o tempo certinho.',
    },
    {
      pergunta: 'Tem estacionamento perto?',
      resposta:
        'Estamos em [PLACEHOLDER: endereço]. [PLACEHOLDER: "Tem vaga na rua" / "Tem estacionamento a 50m" / "Acesso fácil de transporte público"].',
    },
    {
      pergunta: 'Aceitam cartão?',
      resposta:
        'Aceitamos [PLACEHOLDER: Pix / dinheiro / débito / crédito]. Parcelamos em até [PLACEHOLDER: X] vezes no cartão.',
    },
  ],

  /* ────────────────────────────────────────────────────────
     DENTISTA
  ──────────────────────────────────────────────────────── */
  dentista: [
    {
      pergunta: 'Vocês aceitam plano odontológico?',
      resposta:
        '[PLACEHOLDER: "Sim, aceitamos os planos [listar planos]" / "No momento atendemos somente particular. Me chame no WhatsApp para saber mais sobre as condições de pagamento."]',
    },
    {
      pergunta: 'Qual o valor da consulta?',
      resposta:
        'A consulta de avaliação custa R$ [PLACEHOLDER]. Durante a avaliação, apresento o plano de tratamento completo com os valores envolvidos. Não há surpresas.',
    },
    {
      pergunta: 'Como faço para agendar uma consulta?',
      resposta:
        'Pelo botão do WhatsApp aqui do site. Me informe o motivo da consulta e o período preferido — retorno com as opções de horário disponíveis.',
    },
    {
      pergunta: 'Qual o horário de atendimento?',
      resposta:
        'Atendo de [PLACEHOLDER: ex: "segunda a sexta, das 8h às 18h, e sábado das 8h às 12h"]. Em caso de urgência fora desse horário, me chame no WhatsApp.',
    },
    {
      pergunta: 'Fazem clareamento dental?',
      resposta:
        'Sim! Trabalhamos com [PLACEHOLDER: tipo de clareamento — ex: "clareamento a laser e com moldeira caseira"]. Me chame no WhatsApp para saber qual é o mais indicado para o seu caso.',
    },
    {
      pergunta: 'Atendem emergências?',
      resposta:
        '[PLACEHOLDER: "Sim, temos horários reservados para urgências. Entre em contato pelo WhatsApp e te atendemos o mais rápido possível." / "Atendemos urgências nos horários disponíveis — me chame no WhatsApp."]',
    },
    {
      pergunta: 'Onde fica a clínica?',
      resposta:
        'Estamos em [PLACEHOLDER: endereço completo]. [PLACEHOLDER: informação de estacionamento / transporte]. Me mande mensagem se precisar de orientação.',
    },
  ],

  /* ────────────────────────────────────────────────────────
     ADVOGADO
  ──────────────────────────────────────────────────────── */
  advogado: [
    {
      pergunta: 'Qual o valor da consulta?',
      resposta:
        'A consulta inicial custa R$ [PLACEHOLDER]. Nela, analiso o seu caso e apresento as opções disponíveis. Os honorários do processo são combinados à parte, com contrato claro antes de qualquer ação.',
    },
    {
      pergunta: 'Em quais áreas do Direito vocês atuam?',
      resposta:
        'Atuamos em [PLACEHOLDER: ex: "Direito do Consumidor, Trabalhista e de Família"]. Se tiver dúvida se seu caso se encaixa, me chame no WhatsApp — analiso sem compromisso.',
    },
    {
      pergunta: 'Como agendar uma consulta?',
      resposta:
        'Pelo WhatsApp aqui do site. Me informe brevemente o assunto e o período de preferência — retorno com os horários disponíveis em até 1 dia útil.',
    },
    {
      pergunta: 'O atendimento é presencial ou online?',
      resposta:
        '[PLACEHOLDER: "Atendo presencialmente em [cidade] e online para todo o Brasil via videochamada." / "Atendo presencialmente em [endereço]."]',
    },
    {
      pergunta: 'Os honorários são cobrados por hora ou por caso?',
      resposta:
        'Depende do tipo de serviço. Consultas têm valor fixo. Para casos com acompanhamento, os honorários são combinados antes — por êxito, por fase ou por valor fixo. Tudo fica em contrato.',
    },
    {
      pergunta: 'Posso parcelar os honorários?',
      resposta:
        '[PLACEHOLDER: "Sim, negociamos o parcelamento conforme o caso." / "Verificamos conforme o serviço — me chame no WhatsApp para conversar."]',
    },
    {
      pergunta: 'Em quanto tempo meu caso pode ser resolvido?',
      resposta:
        'Depende do tipo de ação e da complexidade. Após analisar o seu caso, apresento uma estimativa realista. Não prometo prazo que não posso cumprir — clareza é parte do meu trabalho.',
    },
  ],

  /* ────────────────────────────────────────────────────────
     RESTAURANTE / DELIVERY
  ──────────────────────────────────────────────────────── */
  restaurante: [
    {
      pergunta: 'Qual o horário de funcionamento?',
      resposta:
        'Funcionamos de [PLACEHOLDER: ex: "terça a domingo, das 11h30 às 15h e das 18h às 22h"]. Feriados podem ter horário diferenciado — fique de olho no nosso WhatsApp.',
    },
    {
      pergunta: 'Fazem delivery? Qual é a área de entrega?',
      resposta:
        '[PLACEHOLDER: "Sim! Entregamos em [bairros/raio de entrega]." / "Trabalhamos com retirada no local e entrega via [app/próprio]."] Me chame no WhatsApp para confirmar se atendemos seu endereço.',
    },
    {
      pergunta: 'Qual o pedido mínimo para delivery?',
      resposta:
        'O pedido mínimo é R$ [PLACEHOLDER]. A taxa de entrega varia conforme a distância. Me mande o endereço no WhatsApp para eu passar o valor exato.',
    },
    {
      pergunta: 'Tem cardápio online? Como faço o pedido?',
      resposta:
        '[PLACEHOLDER: "Sim, nosso cardápio está aqui no site. Para pedir, clique no WhatsApp e me mande o que deseja." / "Mande mensagem no WhatsApp e te envio o cardápio do dia."]',
    },
    {
      pergunta: 'Aceitam reserva para grupos?',
      resposta:
        '[PLACEHOLDER: "Sim! Para grupos a partir de [X] pessoas, entre em contato pelo WhatsApp com pelo menos [X] dias de antecedência." / "No momento não trabalhamos com reserva — atendemos por ordem de chegada."]',
    },
    {
      pergunta: 'Quais formas de pagamento são aceitas?',
      resposta:
        'Aceitamos [PLACEHOLDER: Pix / dinheiro / débito / crédito / VR / VA]. Para delivery, o pagamento é [PLACEHOLDER: "na entrega" / "antecipado via Pix"].',
    },
    {
      pergunta: 'Tem opção vegetariana, vegana ou sem glúten?',
      resposta:
        '[PLACEHOLDER: "Sim! Temos opções [listar]. Me chame no WhatsApp para indicar o que combina com a sua dieta." / "Alguns pratos podem ser adaptados — me consulte antes de pedir."]',
    },
  ],

  /* ────────────────────────────────────────────────────────
     OFICINA MECÂNICA
  ──────────────────────────────────────────────────────── */
  oficina: [
    {
      pergunta: 'Vocês fazem orçamento grátis?',
      resposta:
        'Sim. Traga o carro ou me descreva o problema pelo WhatsApp. [PLACEHOLDER: "O diagnóstico inicial é gratuito" / "Cobramos R$ [X] pelo diagnóstico, que é descontado do serviço caso você feche conosco."]',
    },
    {
      pergunta: 'Quais marcas e modelos vocês atendem?',
      resposta:
        'Trabalhamos com [PLACEHOLDER: ex: "veículos nacionais e importados de passeio" / "motos e carros até [ano]"]. Em caso de dúvida, me mande o modelo pelo WhatsApp e confirmo.',
    },
    {
      pergunta: 'Preciso agendar ou posso chegar sem hora marcada?',
      resposta:
        '[PLACEHOLDER: "Recomendamos agendar para garantir atendimento rápido. Clique no WhatsApp e reservamos seu horário." / "Pode chegar sem agendar, mas o tempo de espera pode variar."]',
    },
    {
      pergunta: 'Qual o prazo para o conserto ficar pronto?',
      resposta:
        'Depende do serviço. Trocas simples ficam prontas no mesmo dia. Serviços maiores podem levar [PLACEHOLDER: X dias]. Assim que diagnosticamos o problema, informamos o prazo exato antes de começar.',
    },
    {
      pergunta: 'Os serviços têm garantia?',
      resposta:
        'Sim. Todos os serviços têm garantia de [PLACEHOLDER: ex: "90 dias para mão de obra" e "garantia do fabricante para as peças"]. Se algo não estiver certo, é só trazer de volta.',
    },
    {
      pergunta: 'As peças usadas são originais?',
      resposta:
        'Trabalhamos com [PLACEHOLDER: "peças originais e de reposição de qualidade equivalente — você escolhe conforme o orçamento"]. Sempre apresentamos as opções antes de qualquer troca.',
    },
    {
      pergunta: 'Aceitam cartão?',
      resposta:
        'Aceitamos [PLACEHOLDER: Pix / dinheiro / débito / crédito]. Parcelamos no cartão em até [PLACEHOLDER: X] vezes sem juros para serviços acima de R$ [PLACEHOLDER].',
    },
  ],

};

/**
 * Retorna o FAQ do nicho informado.
 * Se o nicho não existir, retorna o FAQ geral.
 */
export function getFaqByNicho(nicho: string): FaqNichoItem[] {
  return faqNichos[nicho] ?? faqNichos.geral;
}
