import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Calendar, User, ArrowLeft, Share2, FileText } from "lucide-react";

interface NewsDetailsProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateMetadata({ params }: NewsDetailsProps) {
  const article = await prisma.news.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return { title: "Publicação Não Encontrada" };

  return {
    title: `${article.title} | Notícias ICSE`,
    description: article.subtitle || article.title,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailsProps) {
  const article = await prisma.news.findUnique({
    where: { slug: params.slug },
  });

  if (!article || article.status !== "PUBLICADO") {
    notFound();
  }

  const dateStr = new Date(article.publishedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Link
          href="/noticias"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-icse-blue-700 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para notícias</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-icse-blue-800 bg-blue-50 px-3 py-1 rounded-md">
            {article.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{dateStr}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <User className="w-4 h-4 text-slate-400" />
            <span>{article.author}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {article.subtitle}
          </p>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs space-y-6">
        <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {article.content}
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <span>Veículo Oficial de Comunicação do ICSE</span>
          <Link
            href="/transparencia"
            className="text-icse-blue-700 font-bold hover:underline inline-flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Consultar Documentos Oficiais em Transparência</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

