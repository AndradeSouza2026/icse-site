import prisma from "@/lib/prisma";
import { Mail, Trash2 } from "lucide-react";
import { updateContactStatusAction, deleteContactMessageAction } from "@/app/actions/admin-inbox";

export const dynamic = "force-dynamic";

export default async function AdminMensagensPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Mensagens do Formulário de Contato
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Mensagens recebidas pela ouvidoria e canal de atendimento da comunidade.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Mensagens Recebidas ({messages.length})
          </h2>
        </div>

        {messages.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Nenhuma mensagem registrada no momento.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Remetente</th>
                  <th className="py-3.5 px-6">Assunto / Mensagem</th>
                  <th className="py-3.5 px-6">Data</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {messages.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{m.name}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{m.email}</div>
                      {m.phone && <div className="text-[10px] text-slate-400 font-normal">{m.phone}</div>}
                    </td>
                    <td className="py-4 px-6 max-w-md">
                      <div className="font-semibold text-slate-900">{m.subject}</div>
                      <p className="text-slate-600 line-clamp-2 mt-0.5 whitespace-pre-line">
                        {m.message}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(m.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-4 px-6">
                      <form
                        action={async (formData) => {
                          "use server";
                          const newStatus = formData.get("status") as string;
                          await updateContactStatusAction(m.id, newStatus);
                        }}
                      >
                        <select
                          name="status"
                          defaultValue={m.status}
                          // @ts-ignore
                          onChange="this.form.requestSubmit()"
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none bg-white ${
                            m.status === "NOVA"
                              ? "bg-rose-50 text-rose-800 border-rose-300"
                              : m.status === "RESPONDIDA"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-slate-100 text-slate-700 border-slate-300"
                          }`}
                        >
                          <option value="NOVA">NOVA</option>
                          <option value="LIDA">LIDA</option>
                          <option value="RESPONDIDA">RESPONDIDA</option>
                          <option value="ARQUIVADA">ARQUIVADA</option>
                        </select>
                      </form>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteContactMessageAction(m.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          title="Excluir mensagem"
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

