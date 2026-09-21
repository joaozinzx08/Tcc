import { Megaphone } from 'lucide-react'

export default function AdminComunicadosPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm font-semibold text-teal-600">
          Administração
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-ink">
          Comunicados
        </h1>

        <p className="mt-2 text-sm text-ink/55">
          Publique avisos e informações importantes para os colaboradores.
        </p>

        <div className="mt-7 rounded-2xl border border-teal-100 bg-white p-10 text-center">
          <Megaphone
            size={30}
            className="mx-auto text-teal-600"
          />

          <p className="mt-4 font-semibold text-ink">
            Gestão de comunicados
          </p>

          <p className="mt-1 text-sm text-ink/45">
            Vamos conectar esta área ao sistema de comunicados que já existe
            no backend.
          </p>
        </div>
      </section>
    </div>
  )
}