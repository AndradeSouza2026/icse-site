"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
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
      const res = await submitContactForm(formData);
      setFeedback(res);
      if (res.success) {
        form.reset();
      }
    } catch {
      setFeedback({
        success: false,
        message: "Ocorreu um erro no envio. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Send className="w-5 h-5 text-icse-blue-600" />
          Envie sua Mensagem para o ICSE
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Dúvidas, sugestões, solicitações de apoio ou informações comunitárias.
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
            <p className="font-semibold">{feedback.success ? "Mensagem Enviada" : "Atenção"}</p>
            <p className="mt-0.5">{feedback.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Seu nome"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
            {feedback?.errors?.name && (
              <p className="text-xs text-red-600 mt-1">{feedback.errors.name[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              E-mail para Resposta *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="seuemail@exemplo.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
            {feedback?.errors?.email && (
              <p className="text-xs text-red-600 mt-1">{feedback.errors.email[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Telefone (Opcional)
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="(22) 99999-9999"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Assunto *
            </label>
            <input
              type="text"
              name="subject"
              required
              placeholder="Ex: Informações sobre cursos ou projetos"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
            {feedback?.errors?.subject && (
              <p className="text-xs text-red-600 mt-1">{feedback.errors.subject[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Mensagem *
          </label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Escreva sua mensagem com detalhes..."
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
              Concordo com o envio dos dados e confirmo que li a Política de Privacidade do ICSE.
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
              <span>Enviando mensagem...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Enviar Mensagem</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

