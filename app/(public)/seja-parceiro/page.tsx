import PartnerForm from "@/components/PartnerForm";
import { Handshake, Building2, ShieldCheck, GraduationCap, HeartPulse } from "lucide-react";

export const metadata = {
  title: "Seja um Parceiro | ICSE — Instituto Centro Social Elcimar",
  description:
    "Proponha convênios, parcerias socioambientais e cooperação institucional com o ICSE em Macaé e no Rio de Janeiro.",
};

export default function SejaParceiroPage() {
  return (
    <div className="space-y-12 py-12">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-icse-blue-900 via-blue-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-3 py-1 rounded-md inline-block">
              Alianças Estratégicas & Responsabilidade Social
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Seja um Parceiro Institucional
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              O ICSE possui prerrogativa estatutária expressa para firmar convênios, contratos de cooperação e parcerias com entidades públicas, empresas privadas, universidades e organismos nacionais e internacionais.
            </p>
          </div>
        </div>
      </section>

      {/* Como Cooperar e Formulário */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Informações Institucionais */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Modalidades de Parceria Previstas no Estatuto
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                As iniciativas conjuntas podem se materializar através de acordos formais aprovados pela Diretoria Executiva do ICSE:
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <GraduationCap className="w-5 h-5 text-icse-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Bolsas de Estudo & Estágios (Art. 2º c, d):</strong>
                    <p className="text-slate-500 mt-0.5">Convênios com universidades e empresas para vagas de estágio e bolsas a estudantes atendidos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <HeartPulse className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Saúde & Telemedicina Comunitária (Art. 2º b):</strong>
                    <p className="text-slate-500 mt-0.5">Parcerias com clínicas e planos de saúde preventiva para moradores associados.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <Building2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Responsabilidade Social e ESG:</strong>
                    <p className="text-slate-500 mt-0.5">Apoio a projetos ambientais, capacitação profissional técnica e desenvolvimento comunitário.</p>
                  </div>
                </div>
              </div>

              {/* Aviso Estatutário */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-icse-blue-900">
                  <ShieldCheck className="w-4 h-4 text-icse-blue-600" />
                  <span>Aviso de Governança</span>
                </div>
                <p>
                  A submissão desta proposta gera um registro para triagem e diálogo com a presidência da associação. Nenhum convênio ou obrigação mútua é formalizado automaticamente antes da celebração de instrumento jurídico próprio.
                </p>
              </div>
            </div>
          </div>

          {/* Formulário Interativo */}
          <div className="lg:col-span-7">
            <PartnerForm />
          </div>
        </div>
      </section>
    </div>
  );
}

