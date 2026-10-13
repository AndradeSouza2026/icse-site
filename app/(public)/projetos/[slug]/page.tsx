import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  MapPin,
  Users,
  Calendar,
  ArrowLeft,
  Heart,
  Handshake,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface ProjectDetailsProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateMetadata({ params }: ProjectDetailsProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return { title: "Projeto Não Encontrado" };

  return {
    title: `${project.title} | Projetos ICSE`,
    description: project.summary,
  };
}

const statusBadgeMap: Record<string, { label: string; class: string }> = {
  PLANEJADO: {
    label: "Planejado (Aguardando captação/início)",
    class: "bg-blue-50 text-blue-800 border-blue-200",
  },
  EM_ANDAMENTO: {
    label: "Em Andamento Ativo",
    class: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  CONCLUIDO: {
    label: "Concluído com Sucesso",
    class: "bg-purple-50 text-purple-800 border-purple-200",
  },
  ARQUIVADO: {
    label: "Arquivado",
    class: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

export default async function ProjectDetailPage({ params }: ProjectDetailsProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: { area: true },
  });

  if (!project) {
    notFound();
  }

  const badge = statusBadgeMap[project.status] || statusBadgeMap.PLANEJADO;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <Link
          href="/projetos"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-icse-blue-700 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para catálogo de projetos</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-icse-blue-800 bg-blue-50 px-3 py-1 rounded-md">
            {project.area.name}
          </span>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.class}`}
          >
            {badge.label}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {project.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-600 shadow-2xs">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-icse-blue-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">Público-Alvo</p>
            <p className="text-slate-500">{project.targetAudience}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">Local de Execução</p>
            <p className="text-slate-500">{project.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">Eixo Temático</p>
            <p className="text-slate-500">{project.area.name}</p>
          </div>
        </div>
      </div>

      {/* Conteúdo Detalhado */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs space-y-8">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Resumo da Iniciativa</h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
            {project.summary}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Descrição Completa e Objetivos</h2>
          <div className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {project.description}
          </div>
        </div>

        {/* Informações de Transparência do Projeto */}
        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-600 space-y-2">
          <p className="font-bold text-icse-blue-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-icse-blue-700" />
            Declaração de Transparência Social
          </p>
          <p>
            O ICSE mantém registros fidedignos de cada fase deste projeto. As atividades são desenvolvidas em conformidade com o Estatuto Social e submetidas ao acompanhamento da Diretoria Executiva e Conselho Fiscal.
          </p>
        </div>
      </div>

      {/* Como Participar / Engajar */}
      <div className="bg-gradient-to-r from-icse-blue-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold">Deseja apoiar este projeto?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
            Você pode atuar como voluntário nessa iniciativa ou, caso represente uma instituição, propor um termo de parceria e apoio social.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/seja-voluntario"
            className="px-5 py-2.5 rounded-xl bg-icse-orange-600 hover:bg-icse-orange-500 font-bold text-xs text-white transition flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            <span>Ser Voluntário</span>
          </Link>
          <Link
            href="/seja-parceiro"
            className="px-5 py-2.5 rounded-xl bg-white text-icse-blue-900 hover:bg-slate-100 font-bold text-xs transition flex items-center gap-2"
          >
            <Handshake className="w-4 h-4" />
            <span>Apoiar como Parceiro</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

