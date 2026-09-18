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
    setor: 'Financeiro',
    createdAt: '2026-08-14',
    description:
      'Fui cobrado duas vezes pelo mesmo pedido (nº 88213) na fatura de agosto. Já entrei em contato mas não obtive retorno.',
  },
  {
    id: 'RJ-2026-000398',
    title: 'Equipamento entregue com avaria',
    category: 'Logística',
    status: 'respondida',
    setor: 'Logística',
    createdAt: '2026-08-09',
    description:
      'A caixa chegou amassada e dois itens estavam quebrados. Solicito troca ou reembolso.',
  },
  {
    id: 'RJ-2026-000355',
    title: 'Prazo de entrega não cumprido',
    category: 'Logística',
    status: 'resolvida',
    setor: 'Logística',
    createdAt: '2026-07-22',
    description:
      'Pedido deveria chegar em 5 dias úteis e chegou com 14 dias de atraso, sem aviso prévio.',
  },
  {
    id: 'RJ-2026-000301',
    title: 'Atendimento não solucionou o problema',
    category: 'Atendimento',
    status: 'nao_resolvida',
    setor: 'RH',
    createdAt: '2026-07-02',
    description:
      'Abri chamado três vezes sobre o mesmo assunto e nenhuma das tentativas resolveu.',
  },
  {
    id: 'RJ-2026-000287',
    title: 'Dúvida sobre política interna não respondida',
    category: 'Atendimento',
    status: 'pendente',
    setor: 'RH',
    createdAt: '2026-08-30',
    description:
      'Enviei uma pergunta sobre a política de home office e ainda não obtive resposta.',
  },
]

export const mockStats = {
  totalResolvidas: 284,
  tempoMedioDias: 3.4,
  indiceSatisfacao: 4.6,
}

export const mockStatsBar = [
  { value: '284', label: 'reclamações resolvidas', icon: 'check' },
  { value: '22h', label: 'tempo médio de resposta', icon: 'clock' },
  { value: '5', label: 'setores atendidos', icon: 'users' },
  { value: '4,6/5', label: 'satisfação dos colaboradores', icon: 'star' },
]

export const howItWorks = [
  {
    n: '01',
    icon: 'file',
    title: 'Registre a reclamação',
    text: 'Descreva o problema, escolha o setor responsável e anexe comprovantes em poucos minutos.',
  },
  {
    n: '02',
    icon: 'bell',
    title: 'O setor é notificado',
    text: 'Encaminhamos o caso ao setor responsável com prazo de resposta definido.',
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
    text: 'Confirme se o problema foi resolvido e ajude a melhorar o atendimento interno.',
  },
]

export const testimonials = [
  {
    quote:
      'Abri a reclamação numa segunda e na quarta já tinha retorno do RH. Muito mais simples que ficar mandando e-mail.',
    name: 'Mariana Alves',
    location: 'Setor Financeiro',
  },
  {
    quote:
      'O histórico de mensagens organizado foi o que fez diferença: tinha tudo documentado quando precisei escalar.',
    name: 'Rafael Muniz',
    location: 'Setor de TI',
  },
  {
    quote:
      'Como gestora, o painel me ajuda a responder no prazo e acompanhar o que está pendente no meu setor.',
    name: 'Débora Lima',
    location: 'Setor de Logística',
  },
]