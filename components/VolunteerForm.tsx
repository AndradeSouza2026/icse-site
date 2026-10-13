"use client";

import { useState } from "react";
import { submitVolunteerForm } from "@/app/actions/volunteer";
import { Heart, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function VolunteerForm() {
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
      const res = await submitVolunteerForm(formData);
      setFeedback(res);
      if (res.success) {
        form.reset();
      }
    } catch {
      setFeedback({
        success: false,
        message: "Ocorreu um erro inesperado de comunicação. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-icse-orange-500" />
          Formulário de Manifestação de Voluntariado
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Preencha seus dados para colaborar com as iniciativas sociais e educacionais do ICSE. O envio desta manifestação não gera vínculo empregatício nem obrigatoriedade de convocação imediata.
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
            <p className="font-semibold">{feedback.success ? "Sucesso!" : "Atenção"}</p>
            <p className="mt-0.5">{feedback.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Nome Completo *
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="Seu nome completo"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
          />
          {feedback?.errors?.fullName && (
            <p className="text-xs text-red-600 mt-1">{feedback.errors.fullName[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              E-mail para Contato *
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

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Telefone / WhatsApp (Opcional)
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="(22) 99999-9999"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Área de Interesse ou Habilidade *
          </label>
          <select
            name="areasOfInterest"
            required
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
          >
            <option value="">Selecione onde gostaria de contribuir...</option>
            <option value="Educação e Cursos Profissionalizantes">Educação e Cursos Profissionalizantes</option>
            <option value="Apoio Pedagógico e Estudantil">Apoio Pedagógico e Estudantil</option>
            <option value="Assistência e Inclusão Social">Assistência e Inclusão Social</option>
            <option value="Saúde Preventiva e Qualidade de Vida">Saúde Preventiva e Qualidade de Vida</option>
            <option value="Meio Ambiente e Ações Sustentáveis">Meio Ambiente e Ações Sustentáveis</option>
            <option value="Esporte, Recreação e Lazer">Esporte, Recreação e Lazer</option>
            <option value="Cultura, Arte e Oficinas">Cultura, Arte e Oficinas</option>
            <option value="Comunicação, Mídias e Apoio Administrativo">Comunicação, Mídias e Apoio Administrativo</option>
          </select>
          {feedback?.errors?.areasOfInterest && (
            <p className="text-xs text-red-600 mt-1">{feedback.errors.areasOfInterest[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Disponibilidade de Dias e Turnos *
          </label>
          <input
            type="text"
            name="availability"
            required
            placeholder="Ex: Sábados pela manhã / Terças e quintas à tarde"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
          />
          {feedback?.errors?.availability && (
            <p className="text-xs text-red-600 mt-1">{feedback.errors.availability[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Mensagem ou Breve Experiência (Opcional)
          </label>
          <textarea
            name="motivation"
            rows={3}
            placeholder="Conte um pouco sobre sua motivação em ser voluntário no ICSE..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
          ></textarea>
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
              Autorizo o tratamento dos dados informados para contato institucional e organização do quadro de voluntários do ICSE, em conformidade com a LGPD (Lei 13.709/2018).
            </span>
          </label>
          {feedback?.errors?.termsAccepted && (
            <p className="text-xs text-red-600 mt-1">{feedback.errors.termsAccepted[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-icse-orange-600 hover:bg-icse-orange-500 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enviando manifestação...</span>
            </>
          ) : (
            <>
              <Heart className="w-4 h-4" />
              <span>Enviar Manifestação de Voluntariado</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

