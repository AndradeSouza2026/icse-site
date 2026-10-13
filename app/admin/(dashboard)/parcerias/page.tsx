import prisma from "@/lib/prisma";
import { Handshake, Trash2 } from "lucide-react";
import { updatePartnerStatusAction, deletePartnerProposalAction } from "@/app/actions/admin-inbox";

export const dynamic = "force-dynamic";

export default async function AdminParceriasPage() {
  const proposals = await prisma.partnerProposal.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Propostas de Parceria PJ e Convênios
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Demandas e convênios propostos por empresas, faculdades e organizações.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Propostas Recebidas ({proposals.length})
          </h2>
        </div>

        {proposals.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Nenhuma proposta de parceria registrada no momento.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Instituição / Responsável</th>
                  <th className="py-3.5 px-6">Área / Tipo Proposto</th>
                  <th className="py-3.5 px-6">Mensagem</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {proposals.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{p.organizationName}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{p.contactPerson}</div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        {p.email} • {p.phone}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-icse-blue-800">{p.areaOfInterest}</span>
                      <div className="text-slate-500 text-[11px] mt-0.5">{p.proposalType}</div>
                    </td>
                    <td className="py-4 px-6 max-w-sm">
                      <p className="line-clamp-2 text-slate-600 leading-relaxed whitespace-pre-line">
                        {p.message}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <form
                        action={async (formData) => {
                          "use server";
                          const newStatus = formData.get("status") as string;
                          await updatePartnerStatusAction(p.id, newStatus);
                        }}
                      >
                        <select
                          name="status"
                          defaultValue={p.status}
                          // @ts-ignore
                          onChange="this.form.requestSubmit()"
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none bg-white ${
                            p.status === "NOVO"
                              ? "bg-purple-50 text-purple-800 border-purple-300"
                              : p.status === "FORMALIZADO"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-slate-100 text-slate-700 border-slate-300"
                          }`}
                        >
                          <option value="NOVO">NOVO</option>
                          <option value="EM_ANALISE">EM ANÁLISE</option>
                          <option value="EM_REUNIAO">EM REUNIÃO</option>
                          <option value="FORMALIZADO">FORMALIZADO</option>
                          <option value="RECUSADO">RECUSADO</option>
                        </select>
                      </form>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deletePartnerProposalAction(p.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          title="Excluir proposta"
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

