"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderKanban,
  GraduationCap,
  Newspaper,
  FileText,
  Mail,
  Heart,
  Handshake,
  UserCheck,
  Settings,
  Users,
  ShieldAlert,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAdmin } from "@/app/actions/auth";

interface AdminSidebarProps {
  userRole?: string;
}

export default function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Painel Geral", href: "/admin", icon: LayoutDashboard },
    { name: "Projetos Sociais", href: "/admin/projetos", icon: FolderKanban },
    { name: "Cursos e Vagas", href: "/admin/cursos", icon: GraduationCap },
    { name: "Inscrições nos Cursos", href: "/admin/inscricoes", icon: UserCheck },
    { name: "Notícias & Blog", href: "/admin/noticias", icon: Newspaper },
    { name: "Transparência & Docs", href: "/admin/documentos", icon: FileText },
    { name: "Mensagens de Contato", href: "/admin/mensagens", icon: Mail },
    { name: "Voluntários Inscritos", href: "/admin/voluntarios", icon: Heart },
    { name: "Propostas de Parceria", href: "/admin/parcerias", icon: Handshake },
  ];

  const adminOnlyNavigation = [
    { name: "Configurações do Site", href: "/admin/configuracoes", icon: Settings },
    { name: "Usuários & Auditoria", href: "/admin/usuarios", icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 min-h-screen">
      {/* Topo do Menu com Logo */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white p-1 flex-shrink-0 overflow-hidden">
          <Image
            src="/images/logo-icse.jpg"
            alt="ICSE Admin"
            width={40}
            height={40}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="overflow-hidden">
          <h2 className="text-sm font-bold text-white truncate">ICSE Painel</h2>
          <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">
            {userRole === "ADMIN" ? "Administrador Geral" : "Editor de Conteúdo"}
          </span>
        </div>
      </div>

      {/* Links de Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
          Gestão de Conteúdo
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
                isActive
                  ? "bg-icse-blue-700 text-white shadow-xs font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {userRole === "ADMIN" && (
          <div className="pt-4">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Administração Geral
            </div>
            {adminOnlyNavigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? "bg-icse-blue-700 text-white shadow-xs font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Rodapé com Atalho para o Site e Logout */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ver Site Público</span>
          </span>
        </Link>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Encerrar Sessão</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

