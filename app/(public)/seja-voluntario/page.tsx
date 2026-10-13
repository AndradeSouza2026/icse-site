import VolunteerForm from "@/components/VolunteerForm";
import { Heart, CheckCircle2, ShieldCheck, Users, Sparkles } from "lucide-react";

export const metadata = {
  title: "Seja um Voluntário | ICSE — Instituto Centro Social Elcimar",
  description:
    "Faça parte das iniciativas do ICSE em Macaé. Inscreva-se como voluntário em oficinas, projetos sociais e apoio comunitário.",
};

export default function SejaVoluntarioPage() {
  return (
    <div className="space-y-12 py-12">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-icse-orange-600 via-orange-600 to-amber-700 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-200 bg-white/10 px-3 py-1 rounded-md inline-block">
              Engajamento Comunitário & Solidariedade
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Seja um Voluntário no ICSE
            </h1>
            <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
              O trabalho voluntário é a alma da atuação comunitária do Instituto Centro Social Elcimar. Suas habilidades, conhecimento e disposição em ajudar podem fazer a diferença direta na vida de crianças, jovens e famílias de Macaé.
            </p>
          </div>
        </div>
      </section>

      {/* Como Funciona e Formulário */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Informações Institucionais */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Como Funciona o Programa de Voluntariado
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                O voluntariado no ICSE é regido pela Lei Federal nº 9.608/1998 e pelo Estatuto Social da instituição. Trata-se de uma atividade não remunerada, de interesse cívico, educacional e comunitário.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900">1. Cadastro da Manifestação:</strong>
                    <p className="text-slate-500 mt-0.5">Preencha o formulário informando sua disponibilidade e áreas de interesse.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-icse-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900">2. Análise da Coordenação:</strong>
                    <p className="text-slate-500 mt-0.5">Nossa equipe cruza as demandas ativas dos projetos com o perfil dos inscritos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900">3. Acolhimento e Termo de Adesão:</strong>
                    <p className="text-slate-500 mt-0.5">Convocação para reunião de alinhamento e assinatura do Termo Oficial de Adesão Voluntária.</p>
                  </div>
                </div>
              </div>

              {/* Aviso Estatutário */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Aviso Importante</span>
                </div>
                <p>
                  O envio desta manifestação não gera ingresso imediato nem obrigatoriedade de convocação automática, dependendo da abertura e calendário de cada projeto.
                </p>
              </div>
            </div>
          </div>

          {/* Formulário Interativo */}
          <div className="lg:col-span-7">
            <VolunteerForm />
          </div>
        </div>
      </section>
    </div>
  );
}

