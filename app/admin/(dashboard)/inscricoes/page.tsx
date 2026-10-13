import prisma from "@/lib/prisma";
import { UserCheck, Trash2, Mail, Phone, MapPin } from "lucide-react";
import { updateEnrollmentStatusAction, deleteEnrollmentAction } from "@/app/actions/admin-inbox";

export const dynamic = "force-dynamic";

export default async function AdminInscricoesPage() {
  const enrollments = await prisma.courseEnrollment.findMany({
    include: { course: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Inscrições Recebidas nos Cursos
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Acompanhe os dados de alunos interessados e altere status de confirmação.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Total de Inscrições ({enrollments.length})
          </h2>
        </div>

        {enrollments.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Nenhuma inscrição registrada até o momento.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Aluno</th>
                  <th className="py-3.5 px-6">Curso Pretendido</th>
                  <th className="py-3.5 px-6">Contatos</th>
                  <th className="py-3.5 px-6">Localidade</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enrollments.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div>{e.fullName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        {new Date(e.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-icse-blue-800">{e.course.title}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>{e.email}</div>
                      <div className="text-slate-400">{e.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div>{e.neighborhood || "Lagomar"}</div>
                      <div className="text-slate-400">{e.city}</div>
                    </td>
                    <td className="py-4 px-6">
                      <form
                        action={async (formData) => {
                          "use server";
                          const newStatus = formData.get("status") as string;
                          await updateEnrollmentStatusAction(e.id, newStatus);
                        }}
                      >
                        <select
                          name="status"
                          defaultValue={e.status}
                          // @ts-ignore
                          onChange="this.form.requestSubmit()"
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none bg-white ${
                            e.status === "CONFIRMADO"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : e.status === "PENDENTE"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : "bg-slate-100 text-slate-700 border-slate-300"
                          }`}
                        >
                          <option value="PENDENTE">PENDENTE</option>
                          <option value="CONFIRMADO">CONFIRMADO</option>
                          <option value="LISTA_ESPERA">LISTA DE ESPERA</option>
                          <option value="CANCELADO">CANCELADO</option>
                        </select>
                      </form>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <form
                        action={async () => {
                          "use server";
                          await deleteEnrollmentAction(e.id);
                        }}
                        className="inline-block"
                      >
                        <button
                          type="submit"
                          title="Excluir inscrição"
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

