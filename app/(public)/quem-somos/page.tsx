import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  Compass,
  Heart,
  Scale,
  FileText,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Quem Somos | ICSE — Instituto Centro Social Elcimar",
  description:
    "História, diretoria, finalidades estatutárias e princípios do Instituto Centro Social Elcimar, fundado em 2009 em Macaé - RJ.",
};

export default function QuemSomosPage() {
  const leadership = [
    { role: "Presidente", name: "Luís Claudio de Morais Marques", body: "Diretoria Executiva" },
    { role: "Vice-Presidente", name: "Marcilene Martins Siqueira", body: "Diretoria Executiva" },
    { role: "Primeira Secretária", name: "Marciana Martins Siqueira", body: "Diretoria Executiva" },
    { role: "Tesoureiro", name: "Clederson de Jesus Santos", body: "Diretoria Executiva" },
    { role: "Conselheira Fiscal", name: "Neide de Souza Santos", body: "Conselho Fiscal" },
    { role: "Conselheira Fiscal", name: "Ana Cláudia da Silva Marques", body: "Conselho Fiscal" },
    { role: "Conselheiro Fiscal", name: "Erick Bernado Gomes", body: "Conselho Fiscal" },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Banner de Topo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-icse-blue-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-3 py-1 rounded-md inline-block">
              Histórico & Identidade Institucional
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Quem Somos
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              O <strong>ICSE — Instituto Centro Social Elcimar</strong> é uma associação civil de direito privado sem fins lucrativos, organizada pela sociedade civil de Lagomar, Macaé — RJ, para atuar no desenvolvimento educacional, comunitário e na defesa dos direitos sociais.
            </p>
          </div>
        </div>
      </section>

      {/* Identificação Institucional e Histórico */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs">
            <h2 className="text-2xl font-bold text-slate-900">
              Origem e Constituição da Associação
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Constituído em <strong>04 de outubro de 2009</strong>, o ICSE nasceu da iniciativa de moradores, trabalhadores e estudantes mobilizados para criar um espaço legítimo de apoio às famílias e jovens da Região Norte Fluminense.
              </p>
              <p>
                A entidade possui registro formal no <strong>Cartório de Registro Civil de Pessoas Jurídicas da Comarca da Capital do Estado do Rio de Janeiro</strong>, sob o nº <strong>26203</strong>, e está inscrita no CNPJ sob o número <strong>97.542.996/0001-07</strong>, mantendo sua sede provisória na Avenida Dr. Sérgio Vieira de Melo, nº 55, no bairro Lagomar, município de Macaé — RJ.
              </p>
              <p>
                Conforme definido expressamente em seu Estatuto Social (Art. 1º, Parágrafo Primeiro), o instituto é 100% social e sem fins lucrativos, dotado de princípios de utilidade pública, livre e independente de órgãos governamentais ou político-partidários, possuindo autonomia administrativa e financeira.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Compromissos Fundamentais do Estatuto
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-icse-blue-600 mt-2 flex-shrink-0"></span>
                  <span><strong>Universalidade:</strong> Atendimento a todos sem distinção de raça, cor, gênero ou crença.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-icse-blue-600 mt-2 flex-shrink-0"></span>
                  <span><strong>Destinação de Recursos:</strong> Rendas 100% aplicadas em território nacional na consecução social.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-icse-blue-600 mt-2 flex-shrink-0"></span>
                  <span><strong>Voluntariado Diretivo:</strong> Dirigentes e conselheiros não recebem remuneração pela gestão.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-icse-blue-600 mt-2 flex-shrink-0"></span>
                  <span><strong>Princípios Constitucionais:</strong> Legalidade, impessoalidade, moralidade, publicidade e eficiência.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Dados Legais Rápidos */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-200 pb-2">
              Ficha Técnica Institucional
            </h3>
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <p className="font-semibold text-slate-500 uppercase">Razão Social</p>
                <p className="font-medium text-slate-900 mt-0.5">ICSE — Instituto Centro Social Elcimar</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500 uppercase">Natureza Jurídica</p>
                <p className="font-medium text-slate-900 mt-0.5">Associação Privada Sem Fins Lucrativos (399-9)</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500 uppercase">CNPJ</p>
                <p className="font-medium text-slate-900 mt-0.5 font-mono">97.542.996/0001-07</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500 uppercase">Data de Constituição</p>
                <p className="font-medium text-slate-900 mt-0.5">04 de outubro de 2009</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500 uppercase">Registro em Cartório</p>
                <p className="font-medium text-slate-900 mt-0.5">RCPJ Comarca da Capital/RJ sob nº 26203</p>
              </div>
              <div>
                <p className="font-semibold text-slate-500 uppercase">Endereço da Sede Provisória</p>
                <p className="font-medium text-slate-900 mt-0.5">
                  Av. Dr. Sérgio Vieira de Melo, nº 55, Lagomar, Macaé — RJ, CEP 27966-620
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores (Diretriz Editorial) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-icse-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">
            Diretrizes Estratégicas
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            Missão, Visão e Valores
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            * Propostas editoriais de diretriz institucional alinhadas aos objetivos sociais do estatuto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-icse-blue-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Nossa Missão</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Promover a transformação comunitária, a inclusão social e o desenvolvimento humano por meio de cursos profissionalizantes gratuitos, apoio estudantil e ações socioassistenciais para famílias de Macaé.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Nossa Visão</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ser reconhecido como um polo de referência e credibilidade em assistência social, qualificação para o mercado de trabalho e fortalecimento comunitário na Região Norte Fluminense.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Nossos Valores</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ética, Legalidade, Impessoalidade, Moralidade, Transparência, Fraternidade, Respeito à Diversidade e Responsabilidade Social com a comunidade.
            </p>
          </div>
        </div>
      </section>

      {/* Diretoria Executiva e Conselho Fiscal (Oficiais do Estatuto) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold text-icse-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">
              Estrutura Organizacional Estatutária
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Diretoria Executiva e Conselho Fiscal
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Composição oficial constante da ata e consolidação estatutária registrada em Macaé — RJ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {leadership.map((member, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-icse-blue-700">
                  {member.role}
                </span>
                <p className="text-sm font-bold text-slate-900">{member.name}</p>
                <p className="text-xs text-slate-500">{member.body}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <span>Mandato quadrienal estabelecido pelo Art. 19 do Estatuto Social.</span>
            <Link
              href="/transparencia"
              className="text-icse-blue-700 font-bold hover:underline inline-flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Estatuto Completo em Transparência</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

