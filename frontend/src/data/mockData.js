export const STATUS = {
  pendente: { label: 'Pendente', color: 'amber' },
  em_analise: { label: 'Em análise', color: 'teal' },
  respondida: { label: 'Respondida', color: 'teal' },
  resolvida: { label: 'Resolvida', color: 'moss' },
  nao_resolvida: { label: 'Não resolvida', color: 'coral' },
}

export const mockComplaints = [
  {
    id: 'RJ-2026-000412',
    title: 'Cobrança em duplicidade na fatura de agosto',
    category: 'Financeiro',
    status: 'em_analise',
    company: 'Distribuidora Vale Verde',
    createdAt: '2026-08-14',
    description:
      'Fui cobrado duas vezes pelo mesmo pedido (nº 88213) na fatura de agosto. Já entrei em contato pelo telefone mas não obtive retorno.',
  },
  {
    id: 'RJ-2026-000398',
    title: 'Produto entregue com avaria',
    category: 'Logística',
    status: 'respondida',
    company: 'Distribuidora Vale Verde',
    createdAt: '2026-08-09',
    description:
      'A caixa chegou amassada e dois itens estavam quebrados. Solicito troca ou reembolso.',
  },
  {
    id: 'RJ-2026-000355',
    title: 'Prazo de entrega não cumprido',
    category: 'Logística',
    status: 'resolvida',
    company: 'Distribuidora Vale Verde',
    createdAt: '2026-07-22',
    description:
      'Pedido deveria chegar em 5 dias úteis e chegou com 14 dias de atraso, sem aviso prévio.',
  },
  {
    id: 'RJ-2026-000301',
    title: 'Atendimento não solucionou o problema',
    category: 'Atendimento',
    status: 'nao_resolvida',
    company: 'Distribuidora Vale Verde',
    createdAt: '2026-07-02',
    description:
      'Abri chamado três vezes sobre o mesmo defeito e nenhuma das tentativas resolveu.',
  },
  {
    id: 'RJ-2026-000287',
    title: 'Dúvida sobre política de trocas não respondida',
    category: 'Atendimento',
    status: 'pendente',
    company: 'Distribuidora Vale Verde',
    createdAt: '2026-08-30',
    description:
      'Enviei uma pergunta sobre o prazo de troca de um item e ainda não obtive resposta.',
  },
]

export const mockStats = {
  totalResolvidas: 1284,
  tempoMedioDias: 3.4,
  indiceSatisfacao: 4.6,
}

export const mockStatsBar = [
  { value: '38.412', label: 'reclamações resolvidas', icon: 'check' },
  { value: '22h', label: 'tempo médio de resposta', icon: 'clock' },
  { value: '1.276', label: 'empresas cadastradas', icon: 'users' },
  { value: '4,6/5', label: 'satisfação dos usuários', icon: 'star' },
]

export const howItWorks = [
  {
    n: '01',
    icon: 'file',
    title: 'Registre a reclamação',
    text: 'Descreva o problema, escolha a empresa e anexe comprovantes em poucos minutos.',
  },
  {
    n: '02',
    icon: 'bell',
    title: 'A empresa é notificada',
    text: 'Encaminhamos o caso ao canal oficial da empresa com prazo de resposta definido.',
  },
  {
    n: '03',
    icon: 'reply',
    title: 'Acompanhe o diálogo',
    text: 'Todo o histórico fica registrado numa timeline, com notificações a cada atualização.',
  },
  {
    n: '04',
    icon: 'check',
    title: 'Avalie a solução',
    text: 'Confirme se o problema foi resolvido e ajude outras pessoas com sua avaliação.',
  },
]

export const featuredCompanies = [
  {
    name: 'Conecta Telecom',
    category: 'Telefonia e internet',
    score: '7.4',
    complaints: '1.284',
    resolvedPct: '81%',
  },
  {
    name: 'Loja Vivaz',
    category: 'E-commerce',
    score: '8.6',
    complaints: '642',
    resolvedPct: '92%',
  },
  {
    name: 'Banco Órion',
    category: 'Serviços financeiros',
    score: '5.9',
    complaints: '2.310',
    resolvedPct: '63%',
  },
]

export const testimonials = [
  {
    quote:
      'Abri a reclamação num domingo e na terça a empresa já tinha estornado a cobrança. Muito mais simples que ligar na central.',
    name: 'Mariana Alves',
    location: 'Fortaleza, CE',
  },
  {
    quote:
      'O histórico de mensagens organizado foi o que fez diferença: tinha tudo documentado quando precisei do Procon.',
    name: 'Rafael Muniz',
    location: 'Porto Alegre, RS',
  },
  {
    quote:
      'Como pequena empresa, o painel me ajuda a responder no prazo e mostrar publicamente que a gente resolve.',
    name: 'Débora Lima',
    location: 'Salvador, BA',
  },
]

export const mockCompany = {
  name: 'Distribuidora Vale Verde',
  category: 'Distribuição e logística',
  reputation: 4.3,
  totalComplaints: 156,
  responseRate: 0.94,
  avgResponseDays: 2.1,
}