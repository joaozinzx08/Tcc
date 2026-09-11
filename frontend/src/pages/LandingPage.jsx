import { Link } from 'react-router-dom'
import {
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Star,
  FileText,
  Bell,
  Reply,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import StatusBadge from '../components/StatusBadge'
import {
  mockStatsBar,
  howItWorks,
  featuredCompanies,
  testimonials,
} from '../data/mockData'

const iconMap = {
  check: CheckCircle2,
  clock: Clock,
  users: Users,
  star: Star,
  file: FileText,
  bell: Bell,
  reply: Reply,
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 via-teal-50 to-amber-100/50 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800">
              <TrendingUp size={16} />
              8 de cada 10 casos resolvidos em até 5 dias
            </div>
            <h1 className="text-[2.6rem] font-extrabold leading-[1.12] tracking-tight text-ink md:text-5xl">
              Sua reclamação sai do papel e vira{' '}
              <span className="text-teal-600">solução registrada</span>.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/60">
              O Resolva Já organiza sua reclamação, notifica a empresa responsável e
              mantém todo o histórico documentado — do primeiro contato até a
              avaliação final.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/cadastro"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-teal-800"
              >
                Abrir reclamação grátis
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/empresas"
                className="rounded-lg border border-ink/15 bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:border-ink/30"
              >
                Consultar reputação
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink/45">
              Sem custo para consumidores · Dados demonstrativos de projeto
              acadêmico
            </p>
          </div>

          {/* Card de protocolo */}
          <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-lg shadow-teal-900/5">
            <div className="mb-1 flex items-start justify-between">
              <p className="font-semibold text-ink">Protocolo RJ-2026-00841</p>
              <StatusBadge status="EM_ANALISE" />
            </div>
            <p className="mb-5 text-sm text-ink/55">
              Cobrança de serviço que nunca foi contratado — Conecta Telecom
            </p>

            <ol className="space-y-4 border-l border-teal-100 pl-4">
              {[
                { time: '28 ago · 10:12', text: 'Reclamação registrada com anexos.' },
                { time: '28 ago · 10:13', text: 'Empresa notificada. Prazo: 10 dias úteis.' },
                { time: '02 set · 14:40', text: 'Empresa respondeu: análise interna aberta.' },
              ].map((item) => (
                <li key={item.time} className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-teal-600" />
                  <p className="text-xs font-medium text-ink/45">{item.time}</p>
                  <p className="text-sm text-ink">{item.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-teal-50 p-4 text-center">
              <div>
                <p className="text-lg font-bold text-teal-600">96%</p>
                <p className="text-xs text-ink/50">taxa de resposta</p>
              </div>
              <div>
                <p className="text-lg font-bold text-teal-600">19h</p>
                <p className="text-xs text-ink/50">1ª resposta</p>
              </div>
              <div>
                <p className="text-lg font-bold text-teal-600">7,4</p>
                <p className="text-xs text-ink/50">nota da empresa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de estatísticas */}
      <section className="border-b border-teal-100 bg-white px-6 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
          {mockStatsBar.map((stat) => {
            const Icon = iconMap[stat.icon]
            return (
              <div key={stat.label} className="text-center sm:text-left">
                <Icon className="mx-auto mb-2 text-amber-400 sm:mx-0" size={22} />
                <p className="text-2xl font-extrabold text-ink">{stat.value}</p>
                <p className="text-sm text-ink/55">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-teal-50/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            Como funciona
          </h2>
          <p className="mt-2 max-w-xl text-ink/60">
            Quatro etapas simples, com prazos claros e histórico auditável para
            você usar como prova em qualquer instância.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => {
              const Icon = iconMap[step.icon]
              return (
                <div
                  key={step.n}
                  className="rounded-xl border border-teal-100 bg-white p-6"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                      <Icon size={20} />
                    </span>
                    <span className="text-sm font-medium text-ink/25">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="font-bold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                    {step.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Empresas mais acompanhadas */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink">
                Empresas mais acompanhadas
              </h2>
              <p className="mt-2 text-ink/60">
                Veja a nota e o histórico público antes de fechar negócio.
              </p>
            </div>
            <Link
              to="/empresas"
              className="hidden rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink hover:border-ink/30 sm:block"
            >
              Ver todas
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {featuredCompanies.map((company) => (
              <div
                key={company.name}
                className="rounded-xl border border-teal-100 bg-teal-50/30 p-6"
              >
                <div className="flex items-start justify-between">
                  <p className="font-bold text-ink">{company.name}</p>
                  <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-sm font-bold text-teal-600">
                    {company.score}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/55">{company.category}</p>
                <p className="mt-4 text-sm text-ink/50">
                  {company.complaints} reclamações · {company.resolvedPct} resolvidas
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-teal-50/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            Quem já resolveu
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-teal-100 bg-white p-6"
              >
                <div className="mb-3 flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed text-ink/75">
                  “{t.quote}”
                </p>
                <p className="mt-4 text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-ink/45">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-2xl bg-teal-600 px-8 py-16 text-center text-paper md:px-16">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Pronto para resolver seu problema?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-paper/80">
            Crie sua conta gratuita como consumidor ou cadastre sua empresa para
            responder reclamações e melhorar sua reputação.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/cadastro"
              className="rounded-lg bg-amber-400 px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-amber-600"
            >
              Criar conta gratuita
            </Link>
            <Link
              to="/cadastro-empresa"
              className="rounded-lg border border-paper/30 px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-white/10"
            >
              Sou empresa
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
