import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import EnrollmentForm from "@/components/EnrollmentForm";
import {
  Clock,
  MapPin,
  Laptop,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface CourseDetailsProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateMetadata({ params }: CourseDetailsProps) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
  });

  if (!course) return { title: "Curso Não Encontrado" };

  return {
    title: `${course.title} | Cursos ICSE`,
    description: course.summary,
  };
}

const courseStatusMap: Record<string, { label: string; class: string }> = {
  INSCRICOES_ABERTAS: {
    label: "Inscrições Abertas",
    class: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  EM_BREVE: {
    label: "Em Breve / Turma em Estruturação",
    class: "bg-amber-50 text-amber-800 border-amber-200",
  },
  INSCRICOES_ENCERRADAS: {
    label: "Inscrições Encerradas",
    class: "bg-slate-100 text-slate-700 border-slate-200",
  },
  ARQUIVADO: {
    label: "Arquivado",
    class: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

export default async function CourseDetailPage({ params }: CourseDetailsProps) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
  });

  if (!course) {
    notFound();
  }

  const badge = courseStatusMap[course.status] || courseStatusMap.EM_BREVE;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <Link
          href="/cursos"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-icse-blue-700 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para catálogo de cursos</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
            Curso Gratuito • ICSE
          </span>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.class}`}
          >
            {badge.label}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {course.title}
        </h1>
      </div>

      {/* Grid de Ficha Técnica */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-600 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-icse-blue-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">Carga Horária</p>
            <p className="text-slate-500">{course.workload || "A definir"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Laptop className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">Modalidade</p>
            <p className="text-slate-500">{course.modality}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">Local das Aulas</p>
            <p className="text-slate-500 truncate">{course.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-5 h-5 text-purple-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">Vagas Confirmadas</p>
            <p className="text-slate-500">
              {course.totalSlots ? `${course.totalSlots} vagas` : "A divulgar"}
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo e Ementa */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs space-y-8">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Visão Geral</h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
            {course.summary}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Descrição Programática</h2>
          <div className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {course.description}
          </div>
        </div>

        {course.requirements && (
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              Requisitos de Participação:
            </p>
            <p>{course.requirements}</p>
          </div>
        )}
      </div>

      {/* Formulário de Inscrição Integrado */}
      <div id="inscricao">
        <EnrollmentForm courseId={course.id} courseTitle={course.title} />
      </div>
    </div>
  );
}

