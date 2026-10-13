"use client";

import { useState } from "react";
import { submitEnrollmentForm } from "@/app/actions/enrollment";
import { GraduationCap, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface EnrollmentFormProps {
  courseId: string;
  courseTitle: string;
}

export default function EnrollmentForm({ courseId, courseTitle }: EnrollmentFormProps) {
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
      const res = await submitEnrollmentForm(formData);
      setFeedback(res);
      if (res.success) {
        form.reset();
      }
    } catch {
      setFeedback({
        success: false,
        message: "Ocorreu um erro no processamento da inscrição. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-icse-blue-600" />
          Manifestação de Interesse / Pré-Inscrição
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Curso selecionado: <strong className="text-icse-blue-700">{courseTitle}</strong>.
          Preencha o formulário para inclusão no registro de interessados da coordenação social.
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
            <p className="font-semibold">{feedback.success ? "Inscrição Registrada" : "Atenção"}</p>
            <p className="mt-0.5">{feedback.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="courseId" value={courseId} />

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Nome Completo do Aluno *
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
              E-mail *
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
              Telefone / WhatsApp *
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="(22) 99999-9999"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
            {feedback?.errors?.phone && (
              <p className="text-xs text-red-600 mt-1">{feedback.errors.phone[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Data de Nascimento
            </label>
            <input
              type="date"
              name="dateOfBirth"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Município *
            </label>
            <input
              type="text"
              name="city"
              defaultValue="Macaé"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Bairro de Residência *
            </label>
            <input
              type="text"
              name="neighborhood"
              required
              placeholder="Ex: Lagomar, Aeroporto, etc."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Escolaridade
            </label>
            <select
              name="educationalLevel"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            >
              <option value="">Selecione sua escolaridade...</option>
              <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</option>
              <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
              <option value="Ensino Médio Cursando">Ensino Médio Cursando</option>
              <option value="Ensino Médio Completo">Ensino Médio Completo</option>
              <option value="Superior Cursando">Superior Cursando</option>
              <option value="Superior Completo">Superior Completo</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Observação ou Necessidade Especial
            </label>
            <input
              type="text"
              name="observation"
              placeholder="Ex: Necessidade de acessibilidade física, etc."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
            />
          </div>
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
              Declaro que as informações são exatas e autorizo o ICSE a processá-las para fins de chamada, confirmação de matrícula e registros pedagógicos.
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
              <span>Registrando inscrição...</span>
            </>
          ) : (
            <>
              <GraduationCap className="w-4 h-4" />
              <span>Confirmar Manifestação de Inscrição</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

