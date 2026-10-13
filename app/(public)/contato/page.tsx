import prisma from "@/lib/prisma";
import ContactForm from "@/components/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Contato & Sede | ICSE — Instituto Centro Social Elcimar",
  description:
    "Fale com o Instituto Centro Social Elcimar em Macaé/RJ. Endereço em Lagomar, telefones, e-mail institucional e ouvidoria.",
};

export const revalidate = 60;

export default async function ContatoPage() {
  const settings = await prisma.siteSetting.findUnique({
    where: { id: "singleton" },
  });

  const address =
    settings?.address ||
    "Avenida Dr. Sérgio Vieira de Melo, nº 55, Lagomar, Macaé — RJ, CEP 27966-620";
  const phone = settings?.phone || "(22) 2772-0000";
  const email = settings?.email || "contato@icse.org.br";
  const workingHours = settings?.workingHours || "Segunda a Sexta, das 08h às 17h";

  return (
    <div className="space-y-12 py-12">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-icse-blue-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-3 py-1 rounded-md inline-block">
              Atendimento à Comunidade
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Fale com o ICSE
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Estamos de portas abertas para ouvir a comunidade de Lagomar, cidadãos de Macaé, estudantes, voluntários e parceiros. Envie sua mensagem ou utilize nossos canais oficiais.
            </p>
          </div>
        </div>
      </section>

      {/* Dados de Contato e Formulário */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Informações da Sede */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-slate-900">
                Informações Institucionais da Sede
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase text-slate-500">Endereço da Sede Provisória</strong>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-icse-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase text-slate-500">Telefone Institucional</strong>
                    <p className="text-slate-700 mt-0.5">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase text-slate-500">E-mail de Contato</strong>
                    <a href={`mailto:${email}`} className="text-icse-blue-700 hover:underline mt-0.5 block">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase text-slate-500">Horário de Atendimento</strong>
                    <p className="text-slate-700 mt-0.5">{workingHours}</p>
                  </div>
                </div>
              </div>

              {/* Bloco de Dados Cadastrais */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-900">Dados Oficiais do Estatuto:</p>
                <p>CNPJ: 97.542.996/0001-07</p>
                <p>Cartório de Registro Civil de Pessoas Jurídicas sob nº 26203</p>
              </div>
            </div>
          </div>

          {/* Formulário Interativo */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

