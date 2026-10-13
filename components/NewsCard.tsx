import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

interface NewsCardProps {
  slug: string;
  title: string;
  subtitle?: string | null;
  category: string;
  author: string;
  publishedAt: Date | string;
}

export default function NewsCard({
  slug,
  title,
  subtitle,
  category,
  author,
  publishedAt,
}: NewsCardProps) {
  const dateStr = new Date(publishedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div className="p-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-icse-blue-700 bg-icse-blue-50 px-2.5 py-1 rounded-md">
            {category}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{dateStr}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-icse-blue-800 transition-colors mb-2.5 line-clamp-2">
          {title}
        </h3>

        {subtitle && (
          <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 flex items-center gap-1 text-[11px]">
          <User className="w-3 h-3 text-slate-400" />
          {author}
        </span>
        <Link
          href={`/noticias/${slug}`}
          className="inline-flex items-center gap-1 font-semibold text-icse-blue-700 hover:text-icse-blue-900"
        >
          <span>Ler publicação</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

