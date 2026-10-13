import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export const metadata = {
  title: "Portal da Transparência & Documentos | ICSE",
  description:
    "Acesso público aos documentos constitutivos, Estatuto Social registrado no RCPJ e relatórios institucionais do Instituto Centro Social Elcimar.",
};

export const revalidate = 60;

export default async function TransparenciaPage() {
  const documents = await prisma.document.findMany({
    where: { active: true },
    orderBy: { publicationDate: "desc" },
  });

  return (
    <div className="space-y-12 py-12">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-icse-blue-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-3 py-1 rounded-md inline-block">
              Transparência Ativa & Boa Governança
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Portal da Transparência
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              O Instituto Centro Social Elcimar pauta sua atuação na conformidade legal, moralidade e publicidade de seus atos. Disponibilizamos aqui nossos documentos oficiais, registros civis e relatórios institucionais aprovados.
            </p>
          </div>
        </div>
      </section>

      {/* Princípios de Governança */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-icse-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Registro Cartorário Regular</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Constituído em 04/10/2009 com registro no Cartório de Registro Civil de Pessoas Jurídicas da Capital/RJ sob o nº 26203 e ata consolidada em Macaé/RJ.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Destinação Integral de Recursos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conforme o Artigo 3º e 29 do Estatuto, 100% dos recursos obtidos são aplicados no desenvolvimento dos objetivos sociais em território nacional.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Diretoria Não Remunerada</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Os membros da Diretoria Executiva e Conselho Fiscal não percebem nenhuma remuneração por suas atividades, garantindo a gestão voluntária.
            </p>
          </div>
        </div>
      </section>

      {/* Catálogo de Documentos Públicos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Documentos e Atos Oficiais</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Arquivos disponibilizados para consulta pública, auditoria e download direto.
          </p>
        </div>

        {documents.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
            Nenhum documento cadastrado no momento.
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => {
              const pubDate = new Date(doc.publicationDate).toLocaleDateString("pt-BR");

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-icse-blue-300 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-icse-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
                          {doc.category}
                        </span>
                        <span className="text-[11px] text-slate-400">Publicado em: {pubDate}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{doc.title}</h3>
                      <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-semibold text-xs flex items-center gap-2 transition shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Baixar Documento ({doc.fileSize || "PDF"})</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Transparência Passiva / Solicitação de Informação */}
        <div className="mt-12 bg-slate-100 rounded-3xl p-8 border border-slate-200 text-xs text-slate-600 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-icse-blue-700" />
            <span>Serviço de Informação ao Cidadão e Auditoria (Transparência Passiva)</span>
          </div>
          <p className="leading-relaxed">
            Caso necessite de certidões, esclarecimentos institucionais ou documentos adicionais não constantes nesta página, você pode protocolar uma solicitação diretamente com a Secretaria do ICSE através de nosso canal de comunicação.
          </p>
          <div>
            <Link
              href="/contato"
              className="text-icse-blue-700 font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Abrir solicitação institucional</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

