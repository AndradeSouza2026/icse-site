import Link from "next/link";
import prisma from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";
import {
  GraduationCap,
  Users,
  HeartPulse,
  Leaf,
  Activity,
  Palette,
  BookOpen,
  HandHeart,
  ArrowRight,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

export const metadata = {
  title: "Áreas de Atuação | ICSE — Instituto Centro Social Elcimar",
  description:
    "Conheça os 8 eixos de atuação do ICSE aprovados em estatuto: educação, inclusão social, saúde, meio ambiente, esporte, cultura e apoio comunitário em Macaé.",
};

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Users,
  HeartPulse,
  Leaf,
  Activity,
  Palette,
  BookOpen,
  HandHeart,
};

export const revalidate = 60;

export default async function AreasDeAtuacaoPage() {
  const areas = await prisma.area.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    include: {
      projects: {
        where: { status: { not: "ARQUIVADO" } },
      },
    },
  });

  return (
    <div className="space-y-16 py-12">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-icse-blue-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-3 py-1 rounded-md inline-block">
              Eixos Estatutários de Ação
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Áreas de Atuação
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              O Instituto Centro Social Elcimar estrutura suas atividades em 8 eixos prioritários definidos no Artigo 2º de seu Estatuto Social, buscando responder às demandas de desenvolvimento social e comunitário da população de Macaé e região.
            </p>
          </div>
        </div>
      </section>

      {/* Navegação Rápida por Pílulas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 pb-4">
          {areas.map((a) => (
            <a
              key={a.id}
              href={`#${a.slug}`}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-icse-blue-700 hover:border-icse-blue-300 transition shadow-2xs"
            >
              {a.name}
            </a>
          ))}
        </div>
      </section>

      {/* Lista Detalhada de Áreas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {areas.map((area, index) => {
          const Icon = iconMap[area.icon] || BookOpen;

          return (
            <div
              key={area.id}
              id={area.slug}
              className="scroll-mt-24 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-icse-blue-50 text-icse-blue-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Eixo {index + 1} • Estatuto Art. 2º
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-0.5">{area.name}</h2>
                  </div>
                </div>

                <Link
                  href="/seja-voluntario"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition self-start sm:self-auto"
                >
                  <span>Apoiar esta área</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                    Finalidade Institucional & Escopo
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {area.description}
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-800">Público Atendido nesta Frente:</p>
                    <p>{area.targetAudience}</p>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-blue-50/50 rounded-2xl p-6 border border-blue-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-icse-blue-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-icse-blue-600" />
                    Prerrogativa Estatutária
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Atuação fundamentada nas deliberações oficiais do ICSE, permitindo a celebração de termos de cooperação com o poder público, órgãos federais, estaduais e municipais, além de instituições privadas.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/seja-parceiro"
                      className="text-xs font-bold text-icse-blue-700 hover:underline flex items-center gap-1"
                    >
                      <span>Propor parceria neste eixo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Projetos Relacionados */}
              {area.projects && area.projects.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">
                    Projetos Vinculados a este Eixo:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {area.projects.map((proj) => (
                      <ProjectCard
                        key={proj.id}
                        slug={proj.slug}
                        title={proj.title}
                        summary={proj.summary}
                        targetAudience={proj.targetAudience}
                        location={proj.location}
                        status={proj.status}
                        areaName={area.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

