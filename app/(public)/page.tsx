import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import AreaCard from "@/components/AreaCard";
import ProjectCard from "@/components/ProjectCard";
import CourseCard from "@/components/CourseCard";
import NewsCard from "@/components/NewsCard";
import {
  ShieldCheck,
  Award,
  Users,
  GraduationCap,
  Heart,
  Handshake,
  ArrowRight,
  BookOpen,
  FileText,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, areas, projects, courses, news] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "singleton" } }),
    prisma.area.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    }),
    prisma.project.findMany({
      where: { status: { not: "ARQUIVADO" } },
      include: { area: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.course.findMany({
      where: { status: { not: "ARQUIVADO" } },
      take: 2,
      orderBy: { createdAt: "desc" },
    }),
    prisma.news.findMany({
      where: { status: "PUBLICADO" },
      take: 3,
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  const heroTitle = settings?.heroTitle || "Transformando vidas, fortalecendo comunidades";
  const heroSubtitle =
    settings?.heroSubtitle ||
    "Educação, inclusão e desenvolvimento social para construir novas oportunidades.";

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. SEÇÃO HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-icse-blue-900 to-slate-900 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Associação Sem Fins Lucrativos • Fundada em 2009</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
                {heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/quem-somos"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-icse-orange-600 hover:bg-icse-orange-500 font-bold text-white text-sm shadow-lg shadow-orange-950/20 hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                  <span>Conheça o ICSE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/areas-de-atuacao"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold text-white text-sm backdrop-blur-md transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Áreas de Atuação</span>
                </Link>
              </div>

              {/* Destaques Rápidos */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-center lg:text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                  <p className="text-xs text-slate-300">Social e Sem Fins Lucrativos</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-emerald-400">Lagomar</p>
                  <p className="text-xs text-slate-300">Sede em Macaé / RJ</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-amber-400">8 Eixos</p>
                  <p className="text-xs text-slate-300">Atuação Estatutária</p>
                </div>
              </div>
            </div>

            {/* Imagem / Logo Oficial em Destaque */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-80 md:w-96 p-4 rounded-3xl bg-white shadow-2xl border-4 border-white/20">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-2">
                  <Image
                    src="/images/logo-icse.jpg"
                    alt="Logo Oficial do ICSE - Instituto Centro Social Elcimar"
                    width={400}
                    height={400}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-bold text-icse-blue-900 uppercase tracking-wider">
                    Instituto Centro Social Elcimar
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    CNPJ: 97.542.996/0001-07
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. APRESENTAÇÃO INSTITUCIONAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-icse-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">
                Identidade e Compromisso Social
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Uma instituição construída para apoiar, educar e promover a cidadania
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                O <strong>ICSE — Instituto Centro Social Elcimar</strong> é uma associação civil de direito privado, sem fins lucrativos e com princípios de utilidade pública, constituída em <strong>4 de outubro de 2009</strong>, com sede em Lagomar, Macaé — RJ.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nossas finalidades estatutárias abrangem a oferta de apoio estudantil, incentivo à qualificação profissional, assessoria técnica comunitária, programas de saúde preventiva, preservação ambiental e integração pelo esporte e lazer. Suas rendas são integralmente aplicadas no território nacional para o desenvolvimento de suas causas sociais.
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200/70 space-y-3 text-xs text-slate-700">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Garantias Estatutárias
              </h3>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-icse-blue-600 mt-1.5 flex-shrink-0"></span>
                <span>Atendimento sem qualquer distinção de raça, cor, credo ou sexo.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-icse-blue-600 mt-1.5 flex-shrink-0"></span>
                <span>Diretoria voluntária sem remuneração patrimonial (Art. 22).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-icse-blue-600 mt-1.5 flex-shrink-0"></span>
                <span>Princípios de legalidade, impessoalidade, moralidade e eficiência.</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/transparencia"
                  className="text-icse-blue-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Consultar Estatuto Oficial</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ÁREAS DE ATUAÇÃO ESTATUTÁRIAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-md">
            Eixos de Ação Comunitária
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Áreas de Atuação do ICSE
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Iniciativas e finalidades aprovadas no estatuto social para o desenvolvimento integral de Macaé e região.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => (
            <AreaCard
              key={area.id}
              slug={area.slug}
              name={area.name}
              icon={area.icon}
              summary={area.summary}
              colorClass={area.colorClass}
            />
          ))}
        </div>
      </section>

      {/* 4. PROJETOS E INICIATIVAS SOCIAIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-icse-orange-700 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-md">
              Ações no Território
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Projetos e Iniciativas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Projetos cadastrados pela instituição com status e dados oficiais transparentes.
            </p>
          </div>
          <Link
            href="/projetos"
            className="text-xs font-bold text-icse-blue-700 hover:text-icse-blue-900 flex items-center gap-1"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
            Nenhum projeto social cadastrado no momento. Acompanhe nossas publicações institucionais.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* 5. CURSOS E OPORTUNIDADES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-icse-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">
              Capacitação & Futuro
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Cursos e Oportunidades Educacionais
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Cursos livres e oportunidades de qualificação profissional abertas ou planejadas pela equipe.
            </p>
          </div>
          <Link
            href="/cursos"
            className="text-xs font-bold text-icse-blue-700 hover:text-icse-blue-900 flex items-center gap-1"
          >
            <span>Ver todos os cursos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
            Não há turmas ou cursos abertos no momento. Novas oportunidades serão publicadas nesta seção.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                slug={course.slug}
                title={course.title}
                summary={course.summary}
                workload={course.workload}
                modality={course.modality}
                location={course.location}
                status={course.status}
                totalSlots={course.totalSlots}
                enrollmentPeriod={course.enrollmentPeriod}
              />
            ))}
          </div>
        )}
      </section>

      {/* 6. NOTÍCIAS RECENTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-md">
              Comunicação Oficial
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Notícias e Comunicados
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Acompanhe as atualizações institucionais, decisões assembleares e informes do ICSE.
            </p>
          </div>
          <Link
            href="/noticias"
            className="text-xs font-bold text-icse-blue-700 hover:text-icse-blue-900 flex items-center gap-1"
          >
            <span>Ver todas as notícias</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {news.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
            Nenhuma publicação recente cadastrada.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                slug={item.slug}
                title={item.title}
                subtitle={item.subtitle}
                category={item.category}
                author={item.author}
                publishedAt={item.publishedAt}
              />
            ))}
          </div>
        )}
      </section>

      {/* 7. VOLUNTARIADO E PARCERIAS (CHAMADA DUPLA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Box Voluntariado */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between shadow-lg shadow-orange-950/10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Faça Parte: Seja um Voluntário</h3>
              <p className="text-orange-50 text-sm leading-relaxed">
                Sua dedicação, tempo e talento podem transformar vidas. Venha somar com as oficinas pedagógicas, projetos comunitários e ações sociais do ICSE em Macaé.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/seja-voluntario"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-700 hover:bg-orange-50 font-bold text-sm rounded-xl transition shadow-sm"
              >
                <span>Manifestar Interesse em Voluntariado</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Box Parcerias */}
          <div className="bg-gradient-to-br from-icse-blue-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between shadow-lg shadow-blue-950/10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Parcerias Institucionais e Convênios</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Empresas, faculdades e entidades sociais podem celebrar convênios conosco para bolsas de estudo, saúde preventiva, qualificação técnica e responsabilidade socioambiental.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/seja-parceiro"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-icse-blue-900 hover:bg-blue-50 font-bold text-sm rounded-xl transition shadow-sm"
              >
                <span>Propor Convênio ou Parceria</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TRANSPARÊNCIA E ESTATUTO CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl border border-slate-200/90 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Portal da Transparência & Documentos Oficiais
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Consulte o Estatuto Social registrado no RCPJ, atas assembleares e relatórios de atividades da associação.
              </p>
            </div>
          </div>
          <Link
            href="/transparencia"
            className="flex-shrink-0 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition flex items-center gap-2 shadow-xs"
          >
            <span>Acessar Transparência</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

