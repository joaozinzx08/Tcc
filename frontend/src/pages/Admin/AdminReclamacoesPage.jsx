import { Search, FileText } from 'lucide-react'

export default function AdminReclamacoesPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm font-semibold text-teal-600">
          Administração
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-ink">
          Reclamações
        </h1>

        <p className="mt-2 text-sm text-ink/55">
          Consulte e acompanhe as reclamações enviadas pelos colaboradores.
        </p>

        <div className="mt-7 rounded-2xl border border-teal-100 bg-white">
          <div className="flex flex-wrap gap-3 border-b border-teal-100 p-5">
            <div className="relative min-w-[250px] flex-1">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
              />

              <input
                placeholder="Buscar protocolo ou título..."
                className="w-full rounded-lg border border-ink/15 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-teal-600"
              />
            </div>

            <select className="rounded-lg border border-ink/15 px-4 py-2.5 text-sm">
              <option>Todos os status</option>
              <option>Recebida</option>
              <option>Em análise</option>
              <option>Respondida</option>
              <option>Resolvida</option>
            </select>
          </div>

          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <FileText
              size={30}
              className="text-teal-600"
            />

            <p className="mt-4 font-semibold text-ink">
              Área de reclamações
            </p>

            <p className="mt-1 text-sm text-ink/45">
              Agora vamos conectar esta tela às reclamações reais do banco.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}