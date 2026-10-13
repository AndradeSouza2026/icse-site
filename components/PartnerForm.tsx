"use client";

import { useState } from "react";
import { submitPartnerForm } from "@/app/actions/partner";
import { Handshake, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function PartnerForm() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await submitPartnerForm(formData);
      setFeedback(res);
      if (res.success) {
        form.reset();
      }
    } catch {
      setFeedback({
        success: false,
        message: "Ocorreu um erro de comunicação. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Handshake className="w-5 h-5 text-icse-blue-600" />
          Proposta de Parceria e Cooperação Institucional
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Canal exclusivo para empresas, universidades, institutos e organizações interessadas em propor convênios, bolsas de estudo ou ações sociais conjuntas com o ICSE.
        </p>
      </div>

      {feedback && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-start gap-3 border ${
            feedback.success
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-sm">
            <p className="font-semibold">{feedback.success ? "Proposta Enviada" : "Atenção"}</p>
            <p className="mt-0.5">{feedback.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Instituição / Razão Social *
            </label>
            <input
              type="text"
              name="organizationName"
              required
              placeholder="Nome da sua empresa ou entidade"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
            {feedback?.errors?.organizationName && (
              <p className="text-xs text-red-600 mt-1">{feedback.errors.organizationName[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Nome do Representante *
            </label>
            <input
              type="text"
              name="contactPerson"
              required
              placeholder="Responsável pelo contato"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
            {feedback?.errors?.contactPerson && (
              <p className="text-xs text-red-600 mt-1">{feedback.errors.contactPerson[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              E-mail Institucional *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="contato@empresa.com.br"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
            {feedback?.errors?.email && (
              <p className="text-xs text-red-600 mt-1">{feedback.errors.email[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Telefone / Ramal *
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="(22) 3333-0000"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
            {feedback?.errors?.phone && (
              <p className="text-xs text-red-600 mt-1">{feedback.errors.phone[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              CNPJ (Opcional)
            </label>
            <input
              type="text"
              name="cnpj"
              placeholder="00.000.000/0001-00"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Área Temática de Cooperação *
            </label>
            <select
              name="areaOfInterest"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            >
              <option value="">Selecione o eixo temático...</option>
              <option value="Educação e Qualificação Técnica">Educação e Qualificação Técnica</option>
              <option value="Apoio Estudantil e Convênios de Estágio">Apoio Estudantil e Convênios de Estágio</option>
              <option value="Saúde Preventiva e Telemedicina">Saúde Preventiva e Telemedicina</option>
              <option value="Meio Ambiente e Sustentabilidade">Meio Ambiente e Sustentabilidade</option>
              <option value="Esporte e Inclusão Social">Esporte e Inclusão Social</option>
              <option value="Assistência Comunitária e Famílias">Assistência Comunitária e Famílias</option>
              <option value="Outro Eixo de Cooperação">Outro Eixo de Cooperação</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Tipo de Parceria Proposta *
            </label>
            <input
              type="text"
              name="proposalType"
              required
              placeholder="Ex: Convênio Educacional, Cessão de Espaço, Apoio a Projetos"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Resumo da Proposta Institucional *
          </label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Apresente os objetivos pretendidos, público estimado e como a instituição deseja colaborar com as finalidades estatutárias do ICSE..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
          ></textarea>
          {feedback?.errors?.message && (
            <p className="text-xs text-red-600 mt-1">{feedback.errors.message[0]}</p>
          )}
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              name="termsAccepted"
              required
              className="mt-1 rounded text-icse-blue-600 focus:ring-icse-blue-500"
            />
            <span>
              Declaro que os dados fornecidos são verídicos e autorizo o ICSE a processá-los com fins de análise e contato de cooperação interinstitucional.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processando envio...</span>
            </>
          ) : (
            <>
              <Handshake className="w-4 h-4" />
              <span>Enviar Proposta Institucional</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

