import Link from "next/link";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 text-center shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-icse-blue-700 flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Erro 404
          </span>
          <h1 className="text-2xl font-black text-slate-900">
            Página Não Encontrada
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            O endereço acessado não existe, foi movido ou está temporariamente indisponível no portal institucional do ICSE.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Página Inicial</span>
          </Link>
          <Link
            href="/contato"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-2"
          >
            <span>Fale Conosco</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

