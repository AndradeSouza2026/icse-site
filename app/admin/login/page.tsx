"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/actions/auth";
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await loginAdmin(null, formData);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg("Ocorreu uma falha ao tentar autenticar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-icse-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-8 sm:p-10 space-y-8">
        {/* Logo e Título */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-md mx-auto border border-slate-100">
            <Image
              src="/images/logo-icse.jpg"
              alt="Logo ICSE"
              width={64}
              height={64}
              className="object-contain w-full h-full"
            />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Área Administrativa
          </h1>
          <p className="text-xs text-slate-500">
            Acesso restrito à Diretoria e equipe autorizada do ICSE.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              E-mail Administrativo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                required
                defaultValue="admin@icse.org.br"
                placeholder="admin@icse.org.br"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Senha de Acesso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 focus:border-icse-blue-500 outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Autenticando...</span>
              </>
            ) : (
              <>
                <span>Entrar no Sistema</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 text-center text-xs text-slate-500">
          <Link href="/" className="hover:text-icse-blue-700 transition">
            ← Voltar para o portal público do ICSE
          </Link>
          <span className="text-[10px] text-slate-400">
            Sessão protegida por criptografia e log de auditoria permanente.
          </span>
        </div>
      </div>
    </div>
  );
}

