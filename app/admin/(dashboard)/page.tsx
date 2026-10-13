import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  FolderKanban,
  GraduationCap,
  Newspaper,
  Mail,
  Heart,
  Handshake,
  UserCheck,
  FileText,
  ArrowRight,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    totalProjects,
    activeProjects,
    totalCourses,
    totalEnrollments,
    pendingEnrollments,
    totalNews,
    pendingMessages,
    totalVolunteers,
    newVolunteers,
    totalPartners,
    newPartners,
    totalDocs,
    recentAudits,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: "EM_ANDAMENTO" } }),
    prisma.course.count({ where: { status: { not: "ARQUIVADO" } } }),
    prisma.courseEnrollment.count(),
    prisma.courseEnrollment.count({ where: { status: "PENDENTE" } }),
    prisma.news.count({ where: { status: "PUBLICADO" } }),
    prisma.contactMessage.count({ where: { status: "NOVA" } }),
    prisma.volunteerApplication.count(),
    prisma.volunteerApplication.count({ where: { status: "NOVO" } }),
    prisma.partnerProposal.count(),
    prisma.partnerProposal.count({ where: { status: "NOVO" } }),
    prisma.document.count({ where: { active: true } }),
    prisma.auditLog.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const cards = [
    {
      title: "Projetos Sociais",
      count: totalProjects,
      sub: `${activeProjects} em andamento`,
      href: "/admin/projetos",
      icon: FolderKanban,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Cursos Ofertados",
      count: totalCourses,
      sub: `${totalEnrollments} inscrições registradas`,
      href: "/admin/cursos",
      icon: GraduationCap,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Inscrições Pendentes",
      count: pendingEnrollments,
      sub: "Aguardando confirmação",
      href: "/admin/inscricoes",
      icon: UserCheck,
      color: "bg-amber-50 text-amber-700",
    },
    {
      title: "Mensagens Não Lidas",
      count: pendingMessages,
      sub: "Formulário de contato",
      href: "/admin/mensagens",
      icon: Mail,
      color: "bg-rose-50 text-rose-700",
    },
    {
      title: "Voluntários",
      count: totalVolunteers,
      sub: `${newVolunteers} novos cadastros`,
      href: "/admin/voluntarios",
      icon: Heart,
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Parcerias PJ",
      count: totalPartners,
      sub: `${newPartners} novas propostas`,
      href: "/admin/parcerias",
      icon: Handshake,
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Notícias Ativas",
      count: totalNews,
      sub: "Publicadas no portal",
      href: "/admin/noticias",
      icon: Newspaper,
      color: "bg-teal-50 text-teal-700",
    },
    {
      title: "Documentos Públicos",
      count: totalDocs,
      sub: "Transparência & Estatuto",
      href: "/admin/documentos",
      icon: FileText,
      color: "bg-slate-100 text-slate-800",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Dashboard Institucional
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Visão geral em tempo real dos cadastros, inscrições e demandas do ICSE.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Banco Conectado • Macaé/RJ</span>
        </div>
      </div>

      {/* Grid de Métricas Reais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-icse-blue-300 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">{card.title}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900">{card.count}</span>
                <p className="text-xs text-slate-500 mt-1">{card.sub}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-icse-blue-700 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>Gerenciar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Seção Inferior: Atividades Recentes e Atalhos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Auditoria / Logs Recentes */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-icse-blue-600" />
              <span>Registro de Auditoria Recente</span>
            </h3>
            <Link
              href="/admin/usuarios"
              className="text-xs text-icse-blue-700 font-semibold hover:underline"
            >
              Ver todos
            </Link>
          </div>

          {recentAudits.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">Nenhum evento registrado no log.</p>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {recentAudits.map((log) => (
                <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-800">
                      <span className="text-icse-blue-700">{log.action}:</span> {log.resource}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{log.details}</p>
                  </div>
                  <div className="text-right flex-shrink-0 text-[11px] text-slate-400">
                    <p>{log.userName || "Sistema"}</p>
                    <p>{new Date(log.createdAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Atalhos Rápidos */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-4">
            Ações Rápidas
          </h3>
          <div className="space-y-2 text-xs">
            <Link
              href="/admin/projetos"
              className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-700 border border-slate-200 transition"
            >
              + Cadastrar Novo Projeto Social
            </Link>
            <Link
              href="/admin/cursos"
              className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-700 border border-slate-200 transition"
            >
              + Publicar Novo Curso ou Vaga
            </Link>
            <Link
              href="/admin/noticias"
              className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-700 border border-slate-200 transition"
            >
              + Escrever Notícia Institucional
            </Link>
            <Link
              href="/admin/documentos"
              className="block p-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-700 border border-slate-200 transition"
            >
              + Disponibilizar Documento / Ata
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

