import prisma from "@/lib/prisma";
import { Heart, Trash2 } from "lucide-react";
import { updateVolunteerStatusAction, deleteVolunteerAction } from "@/app/actions/admin-inbox";

export const dynamic = "force-dynamic";

export default async function AdminVoluntariosPage() {
  const volunteers = await prisma.volunteerApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Manifestações de Voluntariado
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Cidadãos interessados em colaborar com as oficinas e ações comunitárias do ICSE.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Candidatos Voluntários ({volunteers.length})
          </h2>
        </div>

        {volunteers.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Nenhuma manifestação de voluntariado recebida até o momento.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Voluntário</th>
                  <th className="py-3.5 px-6">Área de Interesse</th>
                  <th className="py-3.5 px-6">Disponibilidade</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {volunteers.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{v.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{v.email}</div>
                      {v.phone && <div className="text-[10px] text-slate-400 font-normal">{v.phone}</div>}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-icse-orange-700">{v.areasOfInterest}</span>
                      {v.motivation && (
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          &quot;{v.motivation}&quot;
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6">{v.availability}</td>
                    <td className="py-4 px-6">
                      <form
                        action={async (formData) => {
                          "use server";
                          const newStatus = formData.get("status") as string;
                          await updateVolunteerStatusAction(v.id, newStatus);
                        }}
                      >
                        <select
                          name="status"
                          defaultValue={v.status}
                          // @ts-ignore
                          onChange="this.form.requestSubmit()"
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none bg-white ${
                            v.status === "NOVO"
                              ? "bg-orange-50 text-orange-800 border-orange-300"
                              : v.status === "CONTATADO"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-slate-100 text-slate-700 border-slate-300"
                          }`}
                        >
                          <option value="NOVO">NOVO</option>
                          <option value="EM_ANALISE">EM ANÁLISE</option>
                          <option value="CONTATADO">CONTATADO</option>
                          <option value="ARQUIVADO">ARQUIVADO</option>
                        </select>
                      </form>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteVolunteerAction(v.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          title="Excluir cadastro"
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

