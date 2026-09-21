import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Search,
  UserPlus,
  Users,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'

import { api } from '../../services/api'

const initialForm = {
  nome: '',
  matricula: '',
  senha: '',
  setor: '',
  cargo: '',
  email: '',
  telefone: '',
  data_admissao: '',
  status: 'ativo',
  role: 'colaborador',
}

const statusConfig = {
  ativo: {
    label: 'Ativo',
    className:
      'bg-green-100 text-green-700',
  },

  ferias: {
    label: 'Férias',
    className:
      'bg-amber-100 text-amber-700',
  },

  inativo: {
    label: 'Inativo',
    className:
      'bg-red-100 text-red-700',
  },
}

export default function AdminPage() {
  const [employees, setEmployees] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [search, setSearch] =
    useState('')

  const [statusFilter, setStatusFilter] =
    useState('todos')

  const [form, setForm] =
    useState(initialForm)

  const [saving, setSaving] =
    useState(false)

  const [formError, setFormError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  async function loadEmployees() {
    setLoading(true)
    setError('')

    try {
      const data =
        await api.getEmployees()

      setEmployees(data)
    } catch (err) {
      setError(
        err.message ||
          'Não foi possível carregar os colaboradores.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setFormError('')
    setSuccess('')
    setSaving(true)

    try {
      await api.createEmployee(form)

      setSuccess(
        'Colaborador cadastrado com sucesso.'
      )

      setForm(initialForm)

      await loadEmployees()
    } catch (err) {
      setFormError(
        err.message ||
          'Não foi possível cadastrar o colaborador.'
      )
    } finally {
      setSaving(false)
    }
  }

  const filteredEmployees =
    useMemo(() => {
      const term =
        search
          .trim()
          .toLowerCase()

      return employees.filter(
        (employee) => {
          const matchesStatus =
            statusFilter === 'todos' ||
            employee.status ===
              statusFilter

          const matchesSearch =
            !term ||
            employee.nome
              ?.toLowerCase()
              .includes(term) ||
            employee.matricula
              ?.toLowerCase()
              .includes(term) ||
            employee.setor
              ?.toLowerCase()
              .includes(term) ||
            employee.cargo
              ?.toLowerCase()
              .includes(term)

          return (
            matchesStatus &&
            matchesSearch
          )
        }
      )
    }, [
      employees,
      search,
      statusFilter,
    ])

  const totalAtivos =
    employees.filter(
      (employee) =>
        employee.status === 'ativo'
    ).length

  const totalAdmins =
    employees.filter(
      (employee) =>
        employee.role === 'admin'
    ).length

  const inputClass =
    'w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100'

  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* CABEÇALHO */}
        <div>
          <p className="text-sm font-semibold text-teal-600">
            RH / Administração
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
            Gestão de colaboradores
          </h1>

          <p className="mt-2 text-sm text-ink/55">
            Consulte os colaboradores e
            cadastre novos acessos ao
            Resolva Já.
          </p>
        </div>

        {/* RESUMO */}
        <div className="mt-7 grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-teal-100 bg-white p-5">
            <Users
              size={20}
              className="text-teal-600"
            />

            <p className="mt-3 text-2xl font-bold">
              {employees.length}
            </p>

            <p className="text-sm text-ink/45">
              Colaboradores
            </p>
          </div>

          <div className="rounded-xl border border-teal-100 bg-white p-5">
            <CheckCircle2
              size={20}
              className="text-teal-600"
            />

            <p className="mt-3 text-2xl font-bold">
              {totalAtivos}
            </p>

            <p className="text-sm text-ink/45">
              Ativos
            </p>
          </div>

          <div className="rounded-xl border border-teal-100 bg-white p-5">
            <ShieldCheck
              size={20}
              className="text-teal-600"
            />

            <p className="mt-3 text-2xl font-bold">
              {totalAdmins}
            </p>

            <p className="text-sm text-ink/45">
              Administradores
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">

          {/* LISTA */}
          <div className="rounded-2xl border border-teal-100 bg-white">

            <div className="border-b border-teal-100 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>
                  <h2 className="font-bold">
                    Colaboradores
                  </h2>

                  <p className="mt-1 text-sm text-ink/45">
                    {filteredEmployees.length}{' '}
                    resultado(s)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadEmployees}
                  className="text-sm font-medium text-teal-700 hover:underline"
                >
                  Atualizar
                </button>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <div className="relative flex-1">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Buscar nome, matrícula, setor..."
                    className="w-full rounded-lg border border-ink/15 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-teal-600"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-teal-600"
                >
                  <option value="todos">
                    Todos
                  </option>

                  <option value="ativo">
                    Ativos
                  </option>

                  <option value="ferias">
                    Férias
                  </option>

                  <option value="inativo">
                    Inativos
                  </option>
                </select>
              </div>
            </div>

            {loading && (
              <div className="p-10 text-center text-sm text-ink/50">
                Carregando colaboradores...
              </div>
            )}

            {!loading && error && (
              <div className="p-10 text-center">
                <p className="text-sm text-red-500">
                  {error}
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              filteredEmployees.length ===
                0 && (
                <div className="p-10 text-center text-sm text-ink/50">
                  Nenhum colaborador
                  encontrado.
                </div>
              )}

            {!loading &&
              !error &&
              filteredEmployees.length >
                0 && (
                <div className="divide-y divide-teal-50">

                  {filteredEmployees.map(
                    (employee) => {
                      const iniciais =
                        employee.nome
                          ?.split(' ')
                          .slice(0, 2)
                          .map(
                            (nome) =>
                              nome[0]
                          )
                          .join('')
                          .toUpperCase()

                      const status =
                        statusConfig[
                          employee.status
                        ] ||
                        statusConfig.ativo

                      return (
                        <div
                          key={
                            employee.id
                          }
                          className="flex flex-wrap items-center gap-4 px-5 py-4 transition hover:bg-teal-50/30"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                            {iniciais ||
                              '?'}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold">
                                {
                                  employee.nome
                                }
                              </p>

                              {employee.role ===
                                'admin' && (
                                <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                                  Admin/RH
                                </span>
                              )}
                            </div>

                            <p className="mt-0.5 text-sm text-ink/45">
                              Matrícula{' '}
                              {
                                employee.matricula
                              }
                            </p>

                            <p className="mt-0.5 text-sm text-ink/55">
                              {employee.cargo ||
                                'Cargo não informado'}

                              {' · '}

                              {employee.setor ||
                                'Setor não informado'}
                            </p>
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                          >
                            {
                              status.label
                            }
                          </span>
                        </div>
                      )
                    }
                  )}
                </div>
              )}
          </div>

          {/* CADASTRO */}
          <div className="h-fit rounded-2xl border border-teal-100 bg-white p-6 xl:sticky xl:top-6">

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <UserPlus size={20} />
              </span>

              <div>
                <h2 className="font-bold">
                  Novo colaborador
                </h2>

                <p className="text-xs text-ink/45">
                  O RH define o acesso
                  inicial.
                </p>
              </div>
            </div>

            {success && (
              <div className="mt-5 rounded-lg bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
                {success}
              </div>
            )}

            {formError && (
              <div className="mt-5 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                {formError}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-4"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Nome *
                </label>

                <input
                  name="nome"
                  value={form.nome}
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Nome completo"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Matrícula *
                  </label>

                  <input
                    name="matricula"
                    value={
                      form.matricula
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="0002"
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Senha inicial *
                  </label>

                  <input
                    name="senha"
                    type="password"
                    value={form.senha}
                    onChange={
                      handleChange
                    }
                    required
                    minLength={6}
                    placeholder="••••••"
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Setor
                  </label>

                  <input
                    name="setor"
                    value={form.setor}
                    onChange={
                      handleChange
                    }
                    placeholder="RH"
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Cargo
                  </label>

                  <input
                    name="cargo"
                    value={form.cargo}
                    onChange={
                      handleChange
                    }
                    placeholder="Analista"
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  E-mail
                </label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nome@empresa.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Telefone
                </label>

                <input
                  name="telefone"
                  type="tel"
                  value={
                    form.telefone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="(12) 99999-9999"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Data de admissão
                </label>

                <input
                  name="data_admissao"
                  type="date"
                  value={
                    form.data_admissao
                  }
                  onChange={
                    handleChange
                  }
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={
                      handleChange
                    }
                    className={
                      inputClass
                    }
                  >
                    <option value="ativo">
                      Ativo
                    </option>

                    <option value="ferias">
                      Férias
                    </option>

                    <option value="inativo">
                      Inativo
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Acesso
                  </label>

                  <select
                    name="role"
                    value={form.role}
                    onChange={
                      handleChange
                    }
                    className={
                      inputClass
                    }
                  >
                    <option value="colaborador">
                      Colaborador
                    </option>

                    <option value="admin">
                      Admin / RH
                    </option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-teal-600 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? 'Cadastrando...'
                  : 'Cadastrar colaborador'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}