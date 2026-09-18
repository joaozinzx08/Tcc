import { useEffect, useState } from "react";
import { Star, MessageSquareText, Lightbulb, MonitorCheck } from "lucide-react";
import { api } from "../services/api";

export default function FeedbackPage() {
  const [reclamacoes, setReclamacoes] = useState([]);
  const [reclamacaoSelecionada, setReclamacaoSelecionada] = useState("");
  const [notaReclamacao, setNotaReclamacao] = useState(0);
  const [comentarioReclamacao, setComentarioReclamacao] = useState("");

  const [sugestao, setSugestao] = useState("");

  const [notaSistema, setNotaSistema] = useState(0);
  const [comentarioSistema, setComentarioSistema] = useState("");

  useEffect(() => {
    async function carregarReclamacoes() {
      try {
        const dados = await api.getMyComplaints();

        const resolvidas = dados.filter(
          (reclamacao) =>
            reclamacao.status === "resolvida" ||
            reclamacao.status === "Resolvida",
        );

        setReclamacoes(resolvidas);
      } catch (err) {
        console.error("Erro ao carregar reclamações:", err);
      }
    }

    carregarReclamacoes();
  }, []);

  function enviarAvaliacaoReclamacao(e) {
    e.preventDefault();

    if (!reclamacaoSelecionada) {
      alert("Selecione uma reclamação.");
      return;
    }

    if (!notaReclamacao) {
      alert("Escolha uma nota.");
      return;
    }

    console.log({
      tipo: "avaliacao_reclamacao",
      reclamacao_id: reclamacaoSelecionada,
      nota: notaReclamacao,
      comentario: comentarioReclamacao,
    });

    alert("Avaliação registrada!");

    setReclamacaoSelecionada("");
    setNotaReclamacao(0);
    setComentarioReclamacao("");
  }

  function enviarSugestao(e) {
    e.preventDefault();

    if (!sugestao.trim()) {
      alert("Digite uma sugestão.");
      return;
    }

    console.log({
      tipo: "sugestao",
      mensagem: sugestao,
    });

    alert("Sugestão enviada!");

    setSugestao("");
  }

  function enviarAvaliacaoSistema(e) {
    e.preventDefault();

    if (!notaSistema) {
      alert("Escolha uma nota para o sistema.");
      return;
    }

    console.log({
      tipo: "avaliacao_sistema",
      nota: notaSistema,
      comentario: comentarioSistema,
    });

    alert("Avaliação enviada!");

    setNotaSistema(0);
    setComentarioSistema("");
  }

  return (
    <div className="min-h-full bg-slate-50">
      <main className="mx-auto max-w-6xl px-8 py-10">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink">Feedback</h1>

          <p className="mt-2 text-ink/60">
            Sua opinião ajuda a melhorar o Resolva Já e o atendimento das
            reclamações.
          </p>
        </div>

        <div className="space-y-6">
          {/* AVALIAR RECLAMAÇÃO */}
          <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <MessageSquareText size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-ink">
                  Avaliar reclamação resolvida
                </h2>

                <p className="mt-1 text-sm text-ink/55">
                  Conte como foi sua experiência com a resolução de uma
                  reclamação.
                </p>
              </div>
            </div>

            <form onSubmit={enviarAvaliacaoReclamacao} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink">
                  Reclamação
                </label>

                <select
                  value={reclamacaoSelecionada}
                  onChange={(e) => setReclamacaoSelecionada(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">Selecione uma reclamação resolvida</option>

                  {reclamacoes.map((reclamacao) => (
                    <option key={reclamacao.id} value={reclamacao.id}>
                      {reclamacao.protocolo ? `${reclamacao.protocolo} - ` : ""}
                      {reclamacao.titulo}
                    </option>
                  ))}
                </select>

                {reclamacoes.length === 0 && (
                  <p className="mt-2 text-xs text-ink/45">
                    Você ainda não possui reclamações resolvidas para avaliar.
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2">
                  <p className="text-sm font-semibold text-ink">
                    Como você avalia a resolução?
                  </p>

                  <p className="mt-1 text-xs text-ink/45">
                    Sua avaliação vai de 1 a 5 estrelas.
                  </p>
                </div>
                <Estrelas valor={notaReclamacao} onChange={setNotaReclamacao} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ink">
                  Comentário
                </label>

                <textarea
                  value={comentarioReclamacao}
                  onChange={(e) => setComentarioReclamacao(e.target.value)}
                  rows="4"
                  placeholder="Conte como foi sua experiência..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Enviar avaliação
              </button>
            </form>
          </section>

          {/* SUGESTÃO */}
          <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Lightbulb size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-ink">
                  Sugestão geral
                </h2>

                <p className="mt-1 text-sm text-ink/55">
                  Tem alguma ideia para melhorar o atendimento ou a plataforma?
                </p>
              </div>
            </div>

            <form onSubmit={enviarSugestao} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink">
                  Sua sugestão
                </label>

                <textarea
                  value={sugestao}
                  onChange={(e) => setSugestao(e.target.value)}
                  rows="5"
                  placeholder="Escreva sua sugestão..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Enviar sugestão
              </button>
            </form>
          </section>

          {/* AVALIAR SISTEMA */}
          <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MonitorCheck size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-ink">
                  Avaliação do sistema
                </h2>

                <p className="mt-1 text-sm text-ink/55">
                  Avalie sua experiência utilizando o Resolva Já.
                </p>
              </div>
            </div>

            <form onSubmit={enviarAvaliacaoSistema} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink">
                  Sua avaliação
                </label>

                <Estrelas valor={notaSistema} onChange={setNotaSistema} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ink">
                  Comentário
                </label>

                <textarea
                  value={comentarioSistema}
                  onChange={(e) => setComentarioSistema(e.target.value)}
                  rows="4"
                  placeholder="O que você achou do sistema?"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Enviar avaliação
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

function Estrelas({ valor, onChange }) {
  const [hover, setHover] = useState(0);

  const textos = {
    1: "Ruim",
    2: "Regular",
    3: "Bom",
    4: "Muito bom",
    5: "Excelente",
  };

  const notaVisual = hover || valor;

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((nota) => {
            const ativa = nota <= notaVisual;

            return (
              <button
                key={nota}
                type="button"
                onClick={() => onChange(nota)}
                onMouseEnter={() => setHover(nota)}
                onMouseLeave={() => setHover(0)}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 ${
                  ativa
                    ? "border-amber-300 bg-amber-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50"
                }`}
                aria-label={`${nota} estrelas`}
              >
                <Star
                  size={24}
                  strokeWidth={2}
                  className={`transition-all duration-200 ${
                    ativa ? "fill-amber-400 text-amber-400" : "text-slate-300"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {notaVisual > 0 && (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
              {notaVisual}/5
            </span>

            <span className="text-sm font-medium text-ink/60">
              {textos[notaVisual]}
            </span>
          </div>
        )}
      </div>

      {valor === 0 && (
        <p className="mt-2 text-xs text-ink/40">
          Clique em uma estrela para avaliar.
        </p>
      )}
    </div>
  );
}
