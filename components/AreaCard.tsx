import Link from "next/link";
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
  LucideIcon,
} from "lucide-react";

interface AreaCardProps {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  colorClass?: string;
}

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

const colorStyleMap: Record<
  string,
  { bg: string; text: string; border: string; badge: string }
> = {
  blue: {
    bg: "bg-blue-50/70",
    text: "text-blue-700",
    border: "group-hover:border-blue-400",
    badge: "bg-blue-100 text-blue-800",
  },
  green: {
    bg: "bg-emerald-50/70",
    text: "text-emerald-700",
    border: "group-hover:border-emerald-400",
    badge: "bg-emerald-100 text-emerald-800",
  },
  orange: {
    bg: "bg-orange-50/70",
    text: "text-orange-700",
    border: "group-hover:border-orange-400",
    badge: "bg-orange-100 text-orange-800",
  },
  red: {
    bg: "bg-rose-50/70",
    text: "text-rose-700",
    border: "group-hover:border-rose-400",
    badge: "bg-rose-100 text-rose-800",
  },
  purple: {
    bg: "bg-purple-50/70",
    text: "text-purple-700",
    border: "group-hover:border-purple-400",
    badge: "bg-purple-100 text-purple-800",
  },
  amber: {
    bg: "bg-amber-50/70",
    text: "text-amber-700",
    border: "group-hover:border-amber-400",
    badge: "bg-amber-100 text-amber-800",
  },
  teal: {
    bg: "bg-teal-50/70",
    text: "text-teal-700",
    border: "group-hover:border-teal-400",
    badge: "bg-teal-100 text-teal-800",
  },
};

export default function AreaCard({
  slug,
  name,
  icon,
  summary,
  colorClass = "blue",
}: AreaCardProps) {
  const IconComponent = iconMap[icon] || BookOpen;
  const style = colorStyleMap[colorClass] || colorStyleMap.blue;

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${style.border}`}
    >
      <div>
        <div
          className={`w-13 h-13 rounded-xl flex items-center justify-center mb-5 ${style.bg} ${style.text} transition-transform group-hover:scale-110 duration-300`}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-icse-blue-800 transition-colors mb-2.5">
          {name}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {summary}
        </p>
      </div>

      <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          href={`/areas-de-atuacao#${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-icse-blue-700 hover:text-icse-blue-900 group-hover:underline"
        >
          <span>Conhecer área</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <span className="text-[11px] text-slate-500 font-medium">Estatuto Art. 2º</span>
      </div>
    </div>
  );
}

