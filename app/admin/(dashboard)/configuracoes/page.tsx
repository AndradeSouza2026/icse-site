import prisma from "@/lib/prisma";
import { Settings, Save, ShieldCheck } from "lucide-react";
import { updateSiteSettingsAction } from "@/app/actions/admin-settings";

export const dynamic = "force-dynamic";

export default async function AdminConfiguracoesPage() {
  const settings = await prisma.siteSetting.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Configurações Institucionais do ICSE
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Edição de informações estatutárias, contatos, dados da sede e chamadas da página inicial.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
        <form
          action={async (formData: FormData) => {
            "use server";
            await updateSiteSettingsAction(formData);
          }}
          className="space-y-6 text-xs"
        >
          {/* Dados Legais Oficiais */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Identificação Jurídica & Estatuto</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Nome da Instituição *
                </label>
                <input
                  type="text"
                  name="siteName"
                  required
                  defaultValue={settings?.siteName || "ICSE — Instituto Centro Social Elcimar"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Slogan Institucional *
                </label>
                <input
                  type="text"
                  name="tagline"
                  required
                  defaultValue={settings?.tagline || "Juntos por uma sociedade melhor!"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  CNPJ Oficial *
                </label>
                <input
                  type="text"
                  name="cnpj"
                  required
                  defaultValue={settings?.cnpj || "97.542.996/0001-07"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Data de Constituição Estatutária *
                </label>
                <input
                  type="text"
                  name="foundationDate"
                  required
                  defaultValue={settings?.foundationDate || "04 de outubro de 2009"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Registro Cartorário *
                </label>
                <input
                  type="text"
                  name="registryInfo"
                  required
                  defaultValue={settings?.registryInfo || "Cartório de Registro Civil de Pessoas Jurídicas da Comarca da Capital do RJ sob nº 26203"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Sede e Contatos */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
              Localização da Sede & Canais de Atendimento
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Endereço Oficial da Sede *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  defaultValue={settings?.address || "Avenida Dr. Sérgio Vieira de Melo, nº 55, Lagomar, Macaé — RJ, CEP 27966-620"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  E-mail Oficial de Contato *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={settings?.email || "contato@icse.org.br"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Telefone Institucional *
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  defaultValue={settings?.phone || "(22) 2772-0000"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  WhatsApp Oficial *
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  required
                  defaultValue={settings?.whatsapp || "(22) 99999-0000"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Horário de Atendimento *
                </label>
                <input
                  type="text"
                  name="workingHours"
                  required
                  defaultValue={settings?.workingHours || "Segunda a Sexta-feira, das 08h às 17h"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Textos da Seção Hero */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
              Banner Principal da Página Inicial (Hero)
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Título Principal *
                </label>
                <input
                  type="text"
                  name="heroTitle"
                  required
                  defaultValue={settings?.heroTitle || "Transformando vidas, fortalecendo comunidades"}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Subtítulo do Banner *
                </label>
                <input
                  type="text"
                  name="heroSubtitle"
                  required
                  defaultValue={settings?.heroSubtitle || "Educação, inclusão e desenvolvimento social para construir novas oportunidades no Estado do Rio de Janeiro."}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Diretrizes Editoriais */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">
              Apresentação & Diretrizes Editoriais
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Resumo Institucional *
                </label>
                <textarea
                  name="aboutSummary"
                  required
                  rows={2}
                  defaultValue={settings?.aboutSummary || ""}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Missão Proposta *
                  </label>
                  <textarea
                    name="mission"
                    required
                    rows={3}
                    defaultValue={settings?.mission || ""}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Visão Proposta *
                  </label>
                  <textarea
                    name="vision"
                    required
                    rows={3}
                    defaultValue={settings?.vision || ""}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Valores Propostos *
                  </label>
                  <textarea
                    name="values"
                    required
                    rows={3}
                    defaultValue={settings?.values || ""}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-icse-blue-500 outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-icse-blue-700 hover:bg-icse-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações Institucionais</span>
          </button>
        </form>
      </div>
    </div>
  );
}

