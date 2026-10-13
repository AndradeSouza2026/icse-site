import Link from "next/link";
import { User, Bell, ExternalLink } from "lucide-react";

interface AdminHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Painel de Controle Institucional
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="text-xs font-medium text-slate-600 hover:text-icse-blue-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
        >
          <span>Visualizar Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="w-8 h-8 rounded-full bg-icse-blue-100 text-icse-blue-800 flex items-center justify-center font-bold text-xs">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">{user.name}</p>
            <p className="text-[10px] text-slate-500 leading-tight">{user.email}</p>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              user.role === "ADMIN"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}
          >
            {user.role}
          </span>
        </div>
      </div>
    </header>
  );
}

