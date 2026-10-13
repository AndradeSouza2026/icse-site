import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { FolderKanban, Plus, Trash2, MapPin, Users } from "lucide-react";
import { createProjectAction, deleteProjectAction } from "@/app/actions/admin-projects";

export const dynamic = "force-dynamic";

export default async function AdminProjetosPage() {
  const [projects, areas] = await Promise.all([
    prisma.project.findMany({
      include: { area: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.area.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Gerenciamento de Projetos Sociais
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Cadastre e gerencie projetos institucionais com identificação clara de status real.
        </p>
      </div>

      {/* Formulário de Criação Rápida */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-icse-blue-600" />
          <span>Cadastrar Novo Projeto</span>
        </h2>

        <form
          action={async (formData: FormData) => {
            "use server";
            await createProjectAction(formData);
          }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Título do Projeto *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Ex: Projeto Qualifica Macaé"
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
                placeholder="ex: qualifica-macae"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Área de Atuação *
              </label>
              <select
                name="areaId"
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 outline-none"
              >
                <option value="">Selecione a área...</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Público-Alvo *
              </label>
              <input
                type="text"
                name="targetAudience"
                required
                placeholder="Ex: Jovens de 16 a 29 anos"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Local de Execução *
              </label>
              <input
                type="text"
                name="location"
                defaultValue="Lagomar, Macaé — RJ"
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Situação Inicial *
              </label>
              <select
                name="status"
                required
                defaultValue="PLANEJADO"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 outline-none"
              >
                <option value="PLANEJADO">Planejado (Em captação/planejamento)</option>
                <option value="EM_ANDAMENTO">Em Andamento (Ativo)</option>
                <option value="CONCLUIDO">Concluído</option>
                <option value="ARQUIVADO">Arquivado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              Resumo Institucional (Curto) *
            </label>
            <input
              type="text"
              name="summary"
              required
              placeholder="Breve descrição em 1 ou 2 frases para os cartões públicos"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              Descrição Detalhada e Justificativa *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Objetivos do projeto, impacto esperado e fundamentação conforme estatuto..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Salvar Projeto
          </button>
        </form>
      </div>

      {/* Lista de Projetos Existentes */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Projetos Cadastrados ({projects.length})</h2>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Nenhum projeto cadastrado no sistema.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Projeto</th>
                  <th className="py-3.5 px-6">Área</th>
                  <th className="py-3.5 px-6">Público / Local</th>
                  <th className="py-3.5 px-6">Situação</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{p.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">/{p.slug}</div>
                    </td>
                    <td className="py-4 px-6">{p.area.name}</td>
                    <td className="py-4 px-6">
                      <div>{p.targetAudience}</div>
                      <div className="text-slate-400">{p.location}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === "EM_ANDAMENTO"
                            ? "bg-emerald-100 text-emerald-800"
                            : p.status === "PLANEJADO"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteProjectAction(p.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          title="Excluir projeto"
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

