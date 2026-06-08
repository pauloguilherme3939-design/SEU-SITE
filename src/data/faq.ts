import type { FaqItem, Nicho } from '@/types';

export const faq: FaqItem[] = [
  {
    question: 'O domínio está incluso?',
    answer:
      'Sim. O domínio .com.br está incluso por 1 ano nos pacotes, desde que seja um domínio comum disponível para registro. Domínios premium, já registrados ou com valor elevado são cobrados à parte.',
  },
  {
    question: 'Depois de 1 ano, quem paga a renovação do domínio?',
    answer:
      'Após o primeiro ano, a renovação do domínio fica por conta do cliente. O custo gira em torno de R$ 40/ano para domínios .com.br. Te aviso antes do vencimento para você não perder o endereço.',
  },
  {
    question: 'O site fica no meu nome?',
    answer:
      'Sim. A entrega é feita de forma transparente. O domínio pode ser registrado com os dados do cliente, e o site fica como ativo do seu negócio.',
  },
  {
    question: 'Quando começa o prazo de entrega?',
    answer:
      'O prazo começa a contar após o pagamento da entrada e o envio de todas as informações necessárias: nome do negócio, serviços, fotos, logo e dados de contato. Quanto mais completo o material, mais rápida e melhor a entrega.',
  },
  {
    question: 'O SEO garante primeira posição no Google?',
    answer:
      'Não. O SEO inicial inclui estrutura básica, título, descrição, configuração no Google Search Console e solicitação de indexação. A posição no Google depende de concorrência, tempo, conteúdo e autoridade do domínio — fatores que evoluem com o uso do site.',
  },
  {
    question: 'Posso pedir alterações depois de pronto?',
    answer:
      'Sim. Cada pacote inclui uma quantidade de rodadas de ajustes simples — textos, cores, imagens e pequenos detalhes. Alterações grandes, novas páginas ou mudanças completas de layout podem ser cobradas à parte, sempre combinadas antes.',
  },
  {
    question: 'Tem mensalidade?',
    answer:
      'Não há mensalidade obrigatória de plataforma. Você paga pelo desenvolvimento do site uma única vez. Manutenção, alterações futuras ou melhorias mensais podem ser contratadas separadamente, conforme a necessidade.',
  },
  {
    question: 'O site vai funcionar bem no celular?',
    answer:
      'Sim. Todos os sites são desenvolvidos com design responsivo — isso significa que se adaptam perfeitamente a qualquer tamanho de tela: celular, tablet e computador. A maioria dos visitantes acessa pelo celular, então isso é prioridade, não opcional.',
  },
  {
    question: 'E se eu não tiver logo ou fotos profissionais?',
    answer:
      'Sem problema. Para a logo, posso trabalhar com o nome do negócio em tipografia limpa — funciona muito bem. Para fotos, posso usar imagens do banco de imagens gratuito que combinam com o seu segmento. Se tiver fotos do seu próprio trabalho, mesmo tiradas pelo celular, melhor ainda — preferimos o real ao genérico.',
  },
  {
    question: 'Por que mais barato que uma agência?',
    answer:
      'Porque sou um profissional só, sem escritório, sem comissão de vendedor, sem custo de estrutura. O preço da agência paga 5 pessoas e o aluguel — o meu paga só o meu trabalho. O resultado entregue é o mesmo (ou melhor, porque você fala direto comigo). Cobro pelo que vale, não pelo que a estrutura custa.',
  },
  {
    question: 'E se eu não gostar do resultado?',
    answer:
      'Antes de começar, alinhamos a referência visual juntos — paleta, estilo e exemplos do que você gosta. Mesmo assim, se o primeiro layout não bater com a sua expectativa, refaço a direção sem custo adicional. Se ainda assim não rolar, devolvo a entrada. Não tem letra miúda: ou você fica satisfeito, ou não pago.',
  },
  {
    question: 'Posso atualizar o site sozinho depois?',
    answer:
      'Atualizações pequenas (trocar texto, foto, número) eu faço de graça no primeiro mês. Depois disso, ou você contrata a manutenção mensal (a partir de R$ 60/mês), ou paga por ajuste avulso. Não entrego um painel de edição porque isso costuma quebrar o site quando o cliente mexe — prefiro fazer eu mesmo, rápido e sem erro.',
  },
  {
    question: 'O site fica rápido? Carrega no 4G?',
    answer:
      'Sim. Trabalho com Next.js (mesma stack do Nubank, TikTok, Hashicorp) e hospedagem na Vercel, com CDN global e otimização automática de imagens. Resultado: site carrega em menos de 2 segundos no 4G médio brasileiro. Nada de WordPress travado com 50 plugins.',
  },
  {
    question: 'Vocês usam WordPress?',
    answer:
      'Não. Uso tecnologias modernas (Next.js + React) que entregam sites mais rápidos, mais seguros e melhor ranqueados no Google. WordPress tem o problema de precisar de manutenção constante de plugins, ser alvo de ataques e ficar pesado com o tempo. Meus sites não.',
  },
];

export const nichos: Nicho[] = [
  {
    slug: 'dentistas',
    profissao: 'Dentistas e clínicas odontológicas',
    h1: 'Site profissional para dentistas, pronto em até 3 dias',
    intro:
      'Pacientes pesquisam o dentista no celular antes de marcar consulta. Um site profissional passa confiança e facilita o contato direto pelo WhatsApp.',
    dores: [
      'Depender só do Instagram para conseguir pacientes',
      'Não aparecer quando alguém pesquisa dentista na sua cidade',
      'Passar imagem amadora sem um endereço profissional',
    ],
    beneficios: [
      'Contato direto pelo WhatsApp em 1 toque',
      'Seu negócio sai configurado para o Google reconhecer sua clínica',
      'Visual profissional que transmite confiança antes da consulta',
    ],
    recommendedPlan: 'express',
  },
  {
    slug: 'advogados',
    profissao: 'Advogados e escritórios de advocacia',
    h1: 'Site profissional para advogados, com autoridade e credibilidade',
    intro:
      'No Direito, percepção de autoridade é tudo. Um site sóbrio e bem estruturado converte visitante em cliente e respeita as normas da OAB.',
    dores: [
      'Cliente avalia credibilidade antes de fechar',
      'Concorrentes com presença digital saem na frente',
      'Falta de um canal profissional para contato',
    ],
    beneficios: [
      'Apresentação das áreas de atuação com clareza',
      'Captação de contato sem ferir as regras de publicidade da OAB',
      'Autoridade que justifica seus honorários',
    ],
    recommendedPlan: 'empresarial',
  },
  {
    slug: 'barbeiros',
    profissao: 'Barbeiros e barbearias',
    h1: 'Site profissional para barbearia, pronto em até 3 dias',
    intro:
      'Clientes fiéis vêm pela qualidade, mas novos clientes chegam pelo Google. Um site com galeria, serviços e botão de agendamento direto pelo WhatsApp faz toda a diferença.',
    dores: [
      'Depender só do Instagram para atrair clientes novos',
      'Não aparecer quando alguém pesquisa barbearia na sua cidade',
      'Perder clientes para concorrentes com presença digital mais forte',
    ],
    beneficios: [
      'Galeria de cortes que vende antes mesmo de o cliente entrar',
      'Agendamento direto pelo WhatsApp com um toque',
      'Aparecer nas buscas de quem procura barbearia perto de mim',
    ],
    recommendedPlan: 'presenca',
  },
  {
    slug: 'manicures',
    profissao: 'Manicures e salões de beleza',
    h1: 'Site profissional para manicure e salão de beleza',
    intro:
      'Suas clientes procuram no Instagram, mas comparam no Google. Um site com portfólio, preços e contato direto transforma curiosidade em agendamento.',
    dores: [
      'Dificuldade de mostrar o portfólio de forma organizada',
      'Clientes novos não te encontram fora do Instagram',
      'Imagem amadora que não reflete a qualidade do seu trabalho',
    ],
    beneficios: [
      'Portfólio de trabalhos que encanta antes do primeiro contato',
      'Agendamento pelo WhatsApp sem complicação',
      'Presença profissional que justifica seus preços',
    ],
    recommendedPlan: 'presenca',
  },
  {
    slug: 'personal-trainers',
    profissao: 'Personal trainers e profissionais de educação física',
    h1: 'Site profissional para personal trainer',
    intro:
      'Alunos procuram personal trainer no Google antes de fechar. Um site com sua metodologia, resultados e contato direto converte visita em consulta.',
    dores: [
      'Não aparecer quando alguém pesquisa personal trainer na sua cidade',
      'Dificuldade de transmitir sua metodologia e diferenciais online',
      'Depender de indicação para conseguir novos alunos',
    ],
    beneficios: [
      'Apresentação da sua metodologia e resultados com credibilidade',
      'Captação de novos alunos direto pelo WhatsApp',
      'Aparecer no Google para quem busca personal na sua região',
    ],
    recommendedPlan: 'express',
  },
  {
    slug: 'psicologos',
    profissao: 'Psicólogos e terapeutas',
    h1: 'Site profissional para psicólogo, seguro e acolhedor',
    intro:
      'Pacientes pesquisam psicólogo com cuidado. Um site que transmite acolhimento, segurança e clareza sobre sua abordagem é o primeiro passo para o vínculo terapêutico.',
    dores: [
      'Pacientes não conseguem te encontrar fora de plataformas de terceiros',
      'Dificuldade de comunicar sua abordagem antes da primeira sessão',
      'Falta de um espaço próprio e profissional na internet',
    ],
    beneficios: [
      'Apresentação da sua abordagem que já começa a construir confiança',
      'Agendamento de sessão pelo WhatsApp com discrição',
      'Independência de plataformas que cobram comissão por atendimento',
    ],
    recommendedPlan: 'express',
  },
  {
    slug: 'nutricionistas',
    profissao: 'Nutricionistas e consultórios de nutrição',
    h1: 'Site profissional para nutricionista',
    intro:
      'Quem busca nutricionista quer ver credibilidade antes de marcar consulta. Um site claro, com sua especialidade e formas de atendimento, acelera a decisão.',
    dores: [
      'Pacientes comparam nutricionistas online antes de escolher',
      'Dificuldade de mostrar suas especializações e diferenciais',
      'Não aparecer nas buscas locais por nutricionista',
    ],
    beneficios: [
      'Apresentação das especialidades que atrai o perfil certo de paciente',
      'Contato e agendamento direto pelo WhatsApp',
      'Posicionamento no Google para consultas presenciais e online',
    ],
    recommendedPlan: 'express',
  },
  {
    slug: 'fotografos',
    profissao: 'Fotógrafos e estúdios fotográficos',
    h1: 'Site profissional para fotógrafo com portfólio que vende',
    intro:
      'Fotógrafo sem site perde para fotógrafo com site. Um portfólio profissional online transmite o seu estilo, seu nível e facilita o contato de quem já quer contratar.',
    dores: [
      'Instagram não é suficiente para mostrar o portfólio com qualidade',
      'Dificuldade de aparecer para noivos, empresas ou famílias que buscam fotógrafo',
      'Sem espaço para apresentar pacotes e preços de forma profissional',
    ],
    beneficios: [
      'Portfólio que mostra seu estilo e nível antes do primeiro contato',
      'Apresentação de pacotes e diferenciais sem depender de stories',
      'Aparecer no Google para quem busca fotógrafo na sua cidade',
    ],
    recommendedPlan: 'presenca',
  },
];
