import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, X } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const categories = [
  'Financeiro',
  'Logística',
  'Atendimento',
  'Produto com defeito',
  'Cobrança indevida',
  'Outro',
]

const companies = [
  'Distribuidora Vale Verde',
  'Conecta Telecom',
  'Loja Vivaz',
  'Banco Órion',
]

export default function NovaReclamacaoPage() {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])

  function handleFileChange(event) {
    const selected = Array.from(event.target.files)
    setFiles((prev) => [...prev, ...selected])
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/minhas-reclamacoes')
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <section className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">
          Nova reclamação
        </h1>
        <p className="mt-1.5 text-ink/60">
          Preencha os detalhes abaixo. Sua reclamação recebe um número de
          protocolo assim que for enviada.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-teal-100 bg-white p-7"
        >
          <div>
            <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">
              Empresa ou serviço reclamado
            </label>
            <select
              id="company"
              required
              defaultValue=""
              className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-teal-600"
            >
              <option value="" disabled>
                Selecione a empresa
              </option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-ink">
              Categoria
            </label>
            <select
              id="category"
              required
              defaultValue=""
              className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-teal-600"
            >
              <option value="" disabled>
                Selecione a categoria
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">
              Título da reclamação
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="Ex: Cobrança em duplicidade na fatura de agosto"
              className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
              Descrição detalhada
            </label>
            <textarea
              id="description"
              required
              rows={5}
              placeholder="Descreva o que aconteceu, com datas e números de pedido/protocolo, se tiver."
              className="w-full resize-none rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
            />
          </div>

          <div>
            <label htmlFor="amount" className="mb-1.5 block text-sm font-medium text-ink">
              Valor envolvido{' '}
              <span className="font-normal text-ink/40">(opcional)</span>
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="R$ 0,00"
              className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
              Anexos{' '}
              <span className="font-normal text-ink/40">(opcional)</span>
            </label>
            <label
              htmlFor="attachments"
              className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-ink/20 bg-teal-50/40 px-4 py-8 text-center transition-colors hover:border-teal-400"
            >
              <Upload size={22} className="text-teal-600" />
              <span className="text-sm font-medium text-ink">
                Clique para anexar imagens ou documentos
              </span>
              <span className="text-xs text-ink/45">PNG, JPG ou PDF — até 10MB cada</span>
              <input
                id="attachments"
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between rounded-lg bg-teal-50 px-3.5 py-2 text-sm text-ink"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-ink/40 hover:text-coral-400"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-teal-600 py-3 font-semibold text-paper transition-colors hover:bg-teal-800"
          >
            Enviar reclamação
          </button>
        </form>
      </section>

      <Footer />
    </div>
  )
}