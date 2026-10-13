import prisma from "@/lib/prisma";
import { FileText, Plus, Trash2, Download } from "lucide-react";
import { createDocumentAction, deleteDocumentAction } from "@/app/actions/admin-documents";

export const dynamic = "force-dynamic";

export default async function AdminDocumentosPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Gerenciamento de Documentos & Transparência
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Disponibilize o estatuto, relatórios anuais, convênios autorizados e atas assembleares.
        </p>
      </div>

      {/* Formulário de Novo Documento */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-icse-blue-600" />
          <span>Registrar Novo Documento Oficial</span>
        </h2>

        <form
          action={async (formData: FormData) => {
            "use server";
            await createDocumentAction(formData);
          }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Título do Documento *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Ex: Estatuto Social Consolidado 2026"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Categoria *
              </label>
              <select
                name="category"
                defaultValue="ESTATUTO"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 outline-none"
              >
                <option value="ESTATUTO">Estatuto Social</option>
                <option value="RELATORIO_ANUAL">Relatório de Atividades</option>
                <option value="PRESTACAO_CONTAS">Prestação de Contas Aprovada</option>
                <option value="ATAS">Ata de Eleição / Posse</option>
                <option value="EDITAIS">Edital de Convocação</option>
                <option value="OUTROS">Outros Documentos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Caminho do Arquivo / URL *
              </label>
              <input
                type="text"
                name="fileUrl"
                defaultValue="/documentos/estatuto-icse-oficial.pdf"
                required
                placeholder="Ex: /documentos/estatuto-icse-oficial.pdf"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Tamanho Estimado
              </label>
              <input
                type="text"
                name="fileSize"
                defaultValue="1.4 MB"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">
              Descrição e Referência Legal *
            </label>
            <textarea
              name="description"
              required
              rows={2}
              placeholder="Ex: Registrado no RCPJ da Comarca da Capital sob nº 26203 com ata de alteração de 15/02/2026..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Publicar Documento na Transparência
          </button>
        </form>
      </div>

      {/* Lista de Documentos */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Documentos Publicados ({documents.length})</h2>
        </div>

        {documents.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Nenhum documento registrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Documento</th>
                  <th className="py-3.5 px-6">Categoria</th>
                  <th className="py-3.5 px-6">Tamanho / Data</th>
                  <th className="py-3.5 px-6">Acesso</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{doc.title}</div>
                      <div className="text-[10px] text-slate-400 font-normal line-clamp-1">
                        {doc.description}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-icse-blue-700 font-bold text-[10px]">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>{doc.fileSize || "PDF"}</div>
                      <div className="text-slate-400">
                        {new Date(doc.publicationDate).toLocaleDateString("pt-BR")}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        className="text-icse-blue-700 hover:underline font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Ver Arquivo</span>
                      </a>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteDocumentAction(doc.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          title="Excluir documento"
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

