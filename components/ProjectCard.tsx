import Link from "next/link";
import { MapPin, Users, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  title: string;
  summary: string;
  targetAudience: string;
  location: string;
  status: string;
  areaName?: string;
  coverImage?: string | null;
}

const statusBadgeMap: Record<string, { label: string; class: string }> = {
  PLANEJADO: {
    label: "Planejado",
    class: "bg-blue-50 text-blue-700 border-blue-200",
  },
  EM_ANDAMENTO: {
    label: "Em Andamento",
    class: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  CONCLUIDO: {
    label: "Concluído",
    class: "bg-purple-50 text-purple-700 border-purple-200",
  },
  ARQUIVADO: {
    label: "Arquivado",
    class: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

export default function ProjectCard({
  slug,
  title,
  summary,
  targetAudience,
  location,
  status,
  areaName,
}: ProjectCardProps) {
  const badge = statusBadgeMap[status] || statusBadgeMap.PLANEJADO;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div className="p-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          {areaName && (
            <span className="text-xs font-semibold text-icse-blue-700 uppercase tracking-wider">
              {areaName}
            </span>
          )}
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

        <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{targetAudience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">Iniciativa ICSE</span>
        <Link
          href={`/projetos/${slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-icse-blue-700 hover:text-icse-blue-900"
        >
          <span>Ver detalhes</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

