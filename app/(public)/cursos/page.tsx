import Link from "next/link";
import prisma from "@/lib/prisma";
import CourseCard from "@/components/CourseCard";
import { GraduationCap, BookOpen, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Cursos e Oportunidades | ICSE — Instituto Centro Social Elcimar",
  description:
    "Cursos livres, capacitações e preparatórios gratuitos oferecidos pelo ICSE para jovens e adultos em Macaé - RJ.",
};

export const revalidate = 60;

export default async function CursosPage() {
  const courses = await prisma.course.findMany({
    where: {
      status: { not: "ARQUIVADO" },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-12 py-12">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-icse-blue-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-3 py-1 rounded-md inline-block">
              Capacitação Profissional & Cidadania
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Cursos e Oportunidades
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Conforme o Artigo 2º de seu Estatuto, o ICSE atua na oferta e intermediação de cursos preparatórios, palestras, oficinas livres e qualificação gratuita para jovens e adultos da comunidade.
            </p>
          </div>
        </div>
      </section>

      {/* Catálogo de Cursos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <GraduationCap className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Nenhum curso com inscrições ativas</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Nossa equipe está estruturando os novos editais e turmas. Fique atento às notícias ou deixe uma mensagem em nosso canal de contato.
            </p>
            <Link
              href="/contato"
              className="inline-block text-xs font-semibold text-icse-blue-700 hover:underline pt-2"
            >
              Falar com a coordenação social
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Nota Institucional */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Aviso de Gratuidade e Confirmação:</strong> Os cursos promovidos diretamente pelo ICSE são inteiramente gratuitos e não possuem taxa de matrícula. A realização efetiva de cada turma está condicionada ao preenchimento do quórum mínimo e confirmação dos instrutores voluntários ou parceiros conveniados.
          </p>
        </div>
      </section>
    </div>
  );
}

