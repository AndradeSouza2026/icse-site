import Link from "next/link";
import prisma from "@/lib/prisma";
import NewsCard from "@/components/NewsCard";
import { Newspaper } from "lucide-react";

export const metadata = {
  title: "Notícias e Comunicados | ICSE — Instituto Centro Social Elcimar",
  description:
    "Acompanhe as decisões, informes e publicações oficiais do ICSE em Lagomar, Macaé - RJ.",
};

export const revalidate = 60;

export default async function NoticiasPage() {
  const news = await prisma.news.findMany({
    where: { status: "PUBLICADO" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="space-y-12 py-12">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-icse-blue-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-3 py-1 rounded-md inline-block">
              Canal de Comunicação Oficial
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Notícias e Comunicados
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Fique informado sobre os acontecimentos institucionais, decisões assembleares, parcerias firmadas e novidades nos projetos sociais do ICSE.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Notícias */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {news.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <Newspaper className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Nenhuma publicação registrada</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Novos comunicados institucionais serão disponibilizados nesta seção assim que veiculados pela diretoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}

