import prisma from "@/lib/prisma";
import { GraduationCap, Plus, Trash2, Clock, Laptop, Users } from "lucide-react";
import { createCourseAction, deleteCourseAction } from "@/app/actions/admin-courses";

export const dynamic = "force-dynamic";

export default async function AdminCursosPage() {
  const courses = await prisma.course.findMany({
    include: {
      _count: {
        select: { enrollments: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Gerenciamento de Cursos e Oportunidades
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Cadastre cursos gratuitos, controle status de inscrições e acompanhe turmas.
        </p>
      </div>

      {/* Formulário de Criação de Curso */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-icse-blue-600" />
          <span>Cadastrar Novo Curso</span>
        </h2>

        <form
          action={async (formData: FormData) => {
            "use server";
            await createCourseAction(formData);
          }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Nome do Curso *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Ex: Introdução à Informática e Internet"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Slug (URL Amigável) *
              </label>
              <input
                type="text"
                name="slug"
                required
                placeholder="ex: informatica-basica"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Modalidade *
              </label>
              <select
                name="modality"
                required
                defaultValue="PRESENCIAL"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 outline-none"
              >
                <option value="PRESENCIAL">Presencial</option>
                <option value="ONLINE">Online (EAD)</option>
                <option value="HIBRIDO">Híbrido</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Carga Horária
              </label>
              <input
                type="text"
                name="workload"
                placeholder="Ex: 40 horas"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Total de Vagas
              </label>
              <input
                type="number"
                name="totalSlots"
                placeholder="Ex: 25"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Período de Inscrição
              </label>
              <input
                type="text"
                name="enrollmentPeriod"
                placeholder="Ex: 10/03 a 25/03"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Status das Inscrições *
              </label>
              <select
                name="status"
                required
                defaultValue="EM_BREVE"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 outline-none"
              >
                <option value="EM_BREVE">Em Breve / Turma em Planejamento</option>
                <option value="INSCRICOES_ABERTAS">Inscrições Abertas</option>
                <option value="INSCRICOES_ENCERRADAS">Inscrições Encerradas</option>
                <option value="ARQUIVADO">Arquivado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Local de Realização
              </label>
              <input
                type="text"
                name="location"
                defaultValue="Sede ICSE - Lagomar, Macaé/RJ"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Requisitos de Participação
              </label>
              <input
                type="text"
                name="requirements"
                placeholder="Ex: Idade mínima 16 anos. Ensino Fundamental."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              Resumo Curto *
            </label>
            <input
              type="text"
              name="summary"
              required
              placeholder="Resumo em 1 ou 2 linhas para exibição nos cards"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              Descrição Programática Completa *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Conteúdo programático, metodologia e cronograma das aulas..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Publicar Curso
          </button>
        </form>
      </div>

      {/* Lista de Cursos */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Cursos Registrados ({courses.length})</h2>
        </div>

        {courses.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Nenhum curso cadastrado até o momento.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Curso</th>
                  <th className="py-3.5 px-6">Modalidade / Carga</th>
                  <th className="py-3.5 px-6">Inscrições</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{c.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">/{c.slug}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div>{c.modality}</div>
                      <div className="text-slate-400">{c.workload || "A definir"}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-900">{c._count.enrollments} inscritos</span>
                      {c.totalSlots && <span className="text-slate-400"> / {c.totalSlots} vagas</span>}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          c.status === "INSCRICOES_ABERTAS"
                            ? "bg-emerald-100 text-emerald-800"
                            : c.status === "EM_BREVE"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteCourseAction(c.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          title="Excluir curso"
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

