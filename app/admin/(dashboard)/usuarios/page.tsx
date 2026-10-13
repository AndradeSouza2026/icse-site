import prisma from "@/lib/prisma";
import { Users, UserPlus, Shield, Clock, CheckCircle2, XCircle } from "lucide-react";
import { createUserAction, toggleUserStatusAction } from "@/app/actions/admin-users";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminUsuariosPage() {
  // Garantir que apenas ADMIN pode acessar
  await requireAdmin();

  const [users, auditLogs] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    }),
    prisma.auditLog.findMany({
      take: 25,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Usuários Administrativos & Auditoria do Sistema
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Controle de acesso granular (ADMIN e EDITOR) e histórico de ações registradas no banco.
        </p>
      </div>

      {/* Formulário de Novo Usuário */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-icse-blue-600" />
          <span>Cadastrar Novo Usuário Administrativo</span>
        </h2>

        <form
          action={async (formData: FormData) => {
            "use server";
            await createUserAction(formData);
          }}
          className="space-y-4 text-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Nome do Usuário *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Ex: João da Silva"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                E-mail de Login *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="exemplo@icse.org.br"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Senha Inicial *
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Mínimo 6 caracteres"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">
                Perfil de Acesso *
              </label>
              <select
                name="role"
                required
                defaultValue="EDITOR"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-icse-blue-500 outline-none"
              >
                <option value="EDITOR">EDITOR (Conteúdo, Cursos e Projetos)</option>
                <option value="ADMIN">ADMIN (Acesso Integral)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Cadastrar Usuário
          </button>
        </form>
      </div>

      {/* Lista de Usuários */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Usuários Cadastrados ({users.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Nome</th>
                <th className="py-3.5 px-6">E-mail</th>
                <th className="py-3.5 px-6">Perfil</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6 font-semibold text-slate-900">{u.name}</td>
                  <td className="py-4 px-6 font-mono text-slate-600">{u.email}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        u.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                        u.isActive ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {u.isActive ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Ativo</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Inativo</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <form
                      action={async () => {
                        "use server";
                        await toggleUserStatusAction(u.id, u.isActive);
                      }}
                      className="inline-block"
                    >
                      <button
                        type="submit"
                        className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:underline"
                      >
                        {u.isActive ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log de Auditoria Completo */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-icse-blue-600" />
            <span>Trilha de Auditoria (Últimos 25 eventos)</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Data / Hora</th>
                <th className="py-3.5 px-6">Ação</th>
                <th className="py-3.5 px-6">Módulo</th>
                <th className="py-3.5 px-6">Detalhes</th>
                <th className="py-3.5 px-6 text-right">Usuário</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-6 text-slate-400 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString("pt-BR")}
                  </td>
                  <td className="py-3.5 px-6 font-bold text-icse-blue-700">{log.action}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">{log.resource}</td>
                  <td className="py-3.5 px-6 text-slate-600 max-w-md">{log.details || "-"}</td>
                  <td className="py-3.5 px-6 text-right font-medium text-slate-700">
                    {log.userName || "Sistema"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

