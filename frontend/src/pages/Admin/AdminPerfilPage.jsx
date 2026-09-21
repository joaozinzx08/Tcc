import { useAuth } from '../../context/AuthContext'

export default function AdminPerfilPage() {
  const { colaborador } = useAuth()

  return (
    <div className="min-h-screen bg-paper">
      <section className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-sm font-semibold text-teal-600">
          Administração
        </p>

        <h1 className="mt-1 text-3xl font-extrabold text-ink">
          Meu perfil
        </h1>

        <div className="mt-7 rounded-2xl border border-teal-100 bg-white p-6">
          <p className="text-lg font-bold text-ink">
            {colaborador?.nome}
          </p>

          <p className="mt-1 text-sm text-ink/50">
            Matrícula {colaborador?.matricula}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Campo
              titulo="Cargo"
              valor={colaborador?.cargo}
            />

            <Campo
              titulo="Setor"
              valor={colaborador?.setor}
            />

            <Campo
              titulo="E-mail"
              valor={colaborador?.email}
            />

            <Campo
              titulo="Telefone"
              valor={colaborador?.telefone}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function Campo({ titulo, valor }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase text-ink/40">
        {titulo}
      </p>

      <p className="mt-1 text-sm font-medium text-ink">
        {valor || 'Não informado'}
      </p>
    </div>
  )
}