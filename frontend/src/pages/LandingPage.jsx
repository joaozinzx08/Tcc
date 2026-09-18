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
  LogIn,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { mockStatsBar, howItWorks, testimonials } from '../data/mockData'

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
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800">
            <TrendingUp size={16} />
            8 de cada 10 casos resolvidos em até 5 dias
          </div>

          <h1 className="text-[2.6rem] font-extrabold leading-[1.12] tracking-tight text-ink md:text-5xl">
            Sua reclamação sai do papel e vira{' '}
            <span className="text-teal-600">solução registrada</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-ink/60">
            O Resolva Já organiza sua reclamação, notifica o setor responsável e
            mantém todo o histórico documentado — do primeiro contato até a
            avaliação final.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-teal-800"
            >
              Fazer login
              <ArrowRight size={18} />
            </Link>

            <a
              href="#como-funciona"
              className="rounded-lg border border-ink/15 bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:border-ink/30"
            >
              Como funciona
            </a>
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
                <Icon
                  className="mx-auto mb-2 text-amber-400 sm:mx-0"
                  size={22}
                />

                <p className="text-2xl font-extrabold text-ink">
                  {stat.value}
                </p>

                <p className="text-sm text-ink/55">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Como funciona */}
      <section
        id="como-funciona"
        className="scroll-mt-20 bg-teal-50/40 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            Como funciona
          </h2>

          <p className="mt-2 max-w-xl text-ink/60">
            Quatro etapas simples, com prazos claros e histórico auditável.
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

                  <h3 className="font-bold text-ink">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                    {step.text}
                  </p>
                </div>
              )
            })}
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
                    <Star
                      key={i}
                      size={16}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                <p className="text-[15px] leading-relaxed text-ink/75">
                  “{t.quote}”
                </p>

                <p className="mt-4 text-sm font-semibold text-ink">
                  {t.name}
                </p>

                <p className="text-sm text-ink/45">
                  {t.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-2xl bg-teal-600 px-8 py-16 text-center text-paper md:px-16">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            <LogIn size={24} />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Já faz parte da empresa?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-paper/80">
            Acesse sua conta com sua matrícula e senha para registrar
            reclamações, acompanhar solicitações e visualizar respostas.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-amber-500"
            >
              Fazer login
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}