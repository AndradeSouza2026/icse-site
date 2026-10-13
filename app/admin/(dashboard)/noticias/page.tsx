import prisma from "@/lib/prisma";
import { Newspaper, Plus, Trash2, Calendar, User } from "lucide-react";
import { createNewsAction, deleteNewsAction } from "@/app/actions/admin-news";

export const dynamic = "force-dynamic";

export default async function AdminNoticiasPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Gerenciamento de Notícias & Comunicados
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Crie matérias institucionais, decisões de assembleia e comunicados da diretoria.
        </p>
      </div>

      {/* Formulário de Nova Notícia */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-icse-blue-600" />
          <span>Escrever Nova Publicação</span>
        </h2>

        <form
          action={async (formData: FormData) => {
            "use server";
            await createNewsAction(formData);
          }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Título da Notícia *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Ex: ICSE conclui atualização cadastral e abre novas iniciativas em Lagomar"
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
                placeholder="ex: atualizacao-cadastral-2026"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Categoria *
              </label>
              <input
                type="text"
                name="category"
                defaultValue="Institucional"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Autor Institucional *
              </label>
              <input
                type="text"
                name="author"
                defaultValue="Diretoria Executiva do ICSE"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Status da Publicação *
              </label>
              <select
                name="status"
                defaultValue="PUBLICADO"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 outline-none"
              >
                <option value="PUBLICADO">Publicado no Portal</option>
                <option value="RASCUNHO">Rascunho (Privado)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              Subtítulo / Linha de Apoio
            </label>
            <input
              type="text"
              name="subtitle"
              placeholder="Frase resumo que aparece no topo da matéria e nos cards"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              Texto da Notícia *
            </label>
            <textarea
              name="content"
              required
              rows={4}
              placeholder="Redija o texto completo da matéria com parágrafos claros..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Salvar Notícia
          </button>
        </form>
      </div>

      {/* Lista de Notícias */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Notícias Cadastradas ({news.length})</h2>
        </div>

        {news.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Nenhuma notícia cadastrada.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Título</th>
                  <th className="py-3.5 px-6">Categoria</th>
                  <th className="py-3.5 px-6">Autor</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{item.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">/{item.slug}</div>
                    </td>
                    <td className="py-4 px-6">{item.category}</td>
                    <td className="py-4 px-6">{item.author}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          item.status === "PUBLICADO"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteNewsAction(item.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          title="Excluir notícia"
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

