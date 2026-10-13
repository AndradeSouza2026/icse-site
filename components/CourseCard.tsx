import Link from "next/link";
import { Clock, MapPin, Laptop, GraduationCap, ArrowRight } from "lucide-react";

interface CourseCardProps {
  slug: string;
  title: string;
  summary: string;
  workload?: string | null;
  modality: string;
  location: string;
  status: string;
  totalSlots?: number | null;
  enrollmentPeriod?: string | null;
}

const courseStatusMap: Record<string, { label: string; class: string }> = {
  INSCRICOES_ABERTAS: {
    label: "Inscrições Abertas",
    class: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  EM_BREVE: {
    label: "Em Breve / Planejado",
    class: "bg-amber-50 text-amber-700 border-amber-200",
  },
  INSCRICOES_ENCERRADAS: {
    label: "Inscrições Encerradas",
    class: "bg-slate-100 text-slate-600 border-slate-200",
  },
  ARQUIVADO: {
    label: "Arquivado",
    class: "bg-slate-100 text-slate-500 border-slate-200",
  },
};

export default function CourseCard({
  slug,
  title,
  summary,
  workload,
  modality,
  location,
  status,
  totalSlots,
  enrollmentPeriod,
}: CourseCardProps) {
  const badge = courseStatusMap[status] || courseStatusMap.EM_BREVE;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div className="p-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-icse-blue-700">
            <GraduationCap className="w-3.5 h-3.5" />
            Qualificação Gratuita
          </span>
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.class}`}
          >
            {badge.label}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-icse-blue-800 transition-colors mb-2.5 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {summary}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{workload || "Carga horária a definir"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Laptop className="w-3.5 h-3.5 text-slate-400" />
            <span>{modality}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {totalSlots && (
          <div className="mt-3 text-[11px] text-icse-green-700 font-medium">
            Vagas confirmadas: {totalSlots}
          </div>
        )}
      </div>

      <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">
          {enrollmentPeriod ? enrollmentPeriod : "Período informado no edital"}
        </span>
        <Link
          href={`/cursos/${slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-icse-blue-700 hover:text-icse-blue-900"
        >
          <span>Ver Curso & Inscrever</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

