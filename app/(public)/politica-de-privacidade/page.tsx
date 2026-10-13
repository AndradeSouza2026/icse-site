import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Política de Privacidade & LGPD | ICSE",
  description:
    "Diretrizes de proteção e tratamento de dados pessoais do Instituto Centro Social Elcimar em conformidade com a Lei Federal nº 13.709/2018 (LGPD).",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-icse-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md">
          Conformidade com a Lei Federal 13.709/2018
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Política de Privacidade e Proteção de Dados
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Última atualização institucional: Fevereiro de 2026 • ICSE — Instituto Centro Social Elcimar
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            1. Compromisso Institucional
          </h2>
          <p>
            O <strong>Instituto Centro Social Elcimar (ICSE)</strong>, pessoa jurídica de direito privado sem fins lucrativos, inscrita no CNPJ sob o nº <strong>97.542.996/0001-07</strong>, estabelece esta Política para demonstrar seu compromisso inegociável com a segurança, privacidade e confidencialidade dos dados pessoais coletados em suas plataformas digitais e processos associativos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-icse-blue-600" />
            2. Coleta Mínima e Finalidade dos Dados
          </h2>
          <p>
            O ICSE adota o princípio da minimização, coletando exclusivamente dados estritamente necessários para as seguintes finalidades públicas e sociais:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Formulário de Contato:</strong> Nome, e-mail e telefone para resposta a dúvidas comunitárias e ouvidoria.</li>
            <li><strong>Manifestação de Voluntariado:</strong> Nome, contatos, disponibilidade e áreas de interesse para triagem e integração ao corpo de voluntários.</li>
            <li><strong>Proposta de Parceria:</strong> Dados cadastrais institucionais e do representante para análise e diálogo interinstitucional.</li>
            <li><strong>Inscrição em Cursos:</strong> Nome, contato, escolaridade e residência para formação de turmas, controle de frequência e expedição de certificados de capacitação.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" />
            3. Não Compartilhamento Comercial
          </h2>
          <p>
            O ICSE não comercializa, não aluga e não cede dados de beneficiários, voluntários ou parceiros para finalidades publicitárias ou terceiros. Compartilhamentos ocorrem estritamente quando exigidos por obrigação legal, prestação de contas aos órgãos de fiscalização pública ou convênios educacionais expressamente autorizados pelo titular.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-icse-blue-600" />
            4. Direitos do Titular (Art. 18 da LGPD)
          </h2>
          <p>
            O titular dos dados tem o direito de solicitar a qualquer tempo a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou a revogação do consentimento, mediante solicitação formal pelo e-mail <strong>contato@icse.org.br</strong> ou na secretaria da sede em Lagomar, Macaé — RJ.
          </p>
        </section>
      </div>
    </div>
  );
}

