import Link from "next/link";
import prisma from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";
import { Filter, Layers } from "lucide-react";

export const metadata = {
  title: "Projetos Sociais | ICSE — Instituto Centro Social Elcimar",
  description:
    "Catálogo oficial de projetos sociais do ICSE com status em andamento, planejados e concluídos em Macaé e região.",
};

export const revalidate = 60;

interface ProjectsPageProps {
  searchParams: {
    status?: string;
    area?: string;
  };
}

export default async function ProjetosPage({ searchParams }: ProjectsPageProps) {
  const selectedStatus = searchParams.status;
  const selectedArea = searchParams.area;

  const whereClause: any = {
    status: { not: "ARQUIVADO" },
  };

  if (selectedStatus && selectedStatus !== "ALL") {
    whereClause.status = selectedStatus;
  }

  if (selectedArea && selectedArea !== "ALL") {
    whereClause.areaId = selectedArea;
  }

  const [projects, areas] = await Promise.all([
    prisma.project.findMany({
      where: whereClause,
      include: { area: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.area.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="space-y-12 py-12">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-icse-blue-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-3 py-1 rounded-md inline-block">
              Iniciativas Comunitárias
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Projetos Sociais
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Conheça os programas formulados e mantidos pelo ICSE. Todas as iniciativas são identificadas com seu status real (Planejado, Em Andamento ou Concluído) em conformidade com as diretrizes de transparência institucional.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <Filter className="w-4 h-4 text-icse-blue-600" />
            <span>Filtros do Catálogo:</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/projetos"
              className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                !selectedStatus && !selectedArea
                  ? "bg-icse-blue-700 text-white border-icse-blue-700"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Todos os Projetos
            </Link>
            <Link
              href="/projetos?status=EM_ANDAMENTO"
              className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                selectedStatus === "EM_ANDAMENTO"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Em Andamento
            </Link>
            <Link
              href="/projetos?status=PLANEJADO"
              className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                selectedStatus === "PLANEJADO"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Planejados
            </Link>
            <Link
              href="/projetos?status=CONCLUIDO"
              className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                selectedStatus === "CONCLUIDO"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              Concluídos
            </Link>
          </div>
        </div>
      </section>

      {/* Grid de Projetos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Nenhum projeto encontrado</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Não encontramos projetos para os filtros selecionados. Tente selecionar outro filtro ou confira nossas notícias para os próximos anúncios.
            </p>
            <Link
              href="/projetos"
              className="inline-block text-xs font-semibold text-icse-blue-700 hover:underline pt-2"
            >
              Limpar filtros
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <ProjectCard
                key={proj.id}
                slug={proj.slug}
                title={proj.title}
                summary={proj.summary}
                targetAudience={proj.targetAudience}
                location={proj.location}
                status={proj.status}
                areaName={proj.area.name}
                coverImage={proj.coverImage}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

