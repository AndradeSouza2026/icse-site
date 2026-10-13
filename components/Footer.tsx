import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  FileText,
  Heart,
  ExternalLink,
} from "lucide-react";

interface FooterProps {
  settings?: {
    siteName?: string;
    cnpj?: string;
    address?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    workingHours?: string;
    instagram?: string | null;
    facebook?: string | null;
    youtube?: string | null;
  } | null;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const siteName = settings?.siteName || "ICSE — Instituto Centro Social Elcimar";
  const cnpj = settings?.cnpj || "97.542.996/0001-07";
  const address =
    settings?.address ||
    "Avenida Dr. Sérgio Vieira de Melo, nº 55, Lagomar, Macaé — RJ, CEP 27966-620";
  const phone = settings?.phone || "(22) 2772-0000";
  const email = settings?.email || "contato@icse.org.br";
  const workingHours = settings?.workingHours || "Segunda a Sexta, das 08h às 17h";

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Faixa superior de compromisso */}
      <div className="bg-icse-blue-900/60 border-b border-white/5 py-4 px-4 text-center text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            Associação Civil Sem Fins Lucrativos (Constituição: 04/10/2009)
          </span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span>Registro RCPJ Comarca da Capital nº 26203</span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="text-slate-400">Recursos 100% aplicados na consecução de finalidades sociais</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1: Identidade Institucional */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white p-1 flex-shrink-0 shadow-md">
                <Image
                  src="/images/logo-icse.jpg"
                  alt="Logo Oficial ICSE"
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">ICSE</h3>
                <p className="text-xs text-slate-400 leading-snug">
                  Instituto Centro Social Elcimar
                </p>
                <p className="text-[11px] text-emerald-400 font-medium">
                  Juntos por uma sociedade melhor!
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Organização social e comunitária autônoma, dedicada à educação básica e profissional, apoio estudantil, assistência social, saúde preventiva e desenvolvimento sustentável em Macaé e no Estado do Rio de Janeiro.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>
                <strong className="text-slate-300">CNPJ:</strong> {cnpj}
              </div>
              <div>
                <strong className="text-slate-300">Sede Provisória:</strong> Lagomar, Macaé/RJ
              </div>
            </div>
          </div>

          {/* Coluna 2: Navegação Institucional */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-icse-blue-500 pl-2">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/quem-somos" className="hover:text-white transition-colors">
                  Quem Somos & História
                </Link>
              </li>
              <li>
                <Link href="/areas-de-atuacao" className="hover:text-white transition-colors">
                  Áreas de Atuação
                </Link>
              </li>
              <li>
                <Link href="/projetos" className="hover:text-white transition-colors">
                  Projetos Sociais
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="hover:text-white transition-colors">
                  Cursos & Oportunidades
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="hover:text-white transition-colors">
                  Notícias & Comunicados
                </Link>
              </li>
              <li>
                <Link href="/transparencia" className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400">
                  <FileText className="w-3.5 h-3.5" />
                  Portal da Transparência & Estatuto
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Participe & Engajamento */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-icse-orange-500 pl-2">
              Participe Conosco
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/seja-voluntario"
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium"
                >
                  <Heart className="w-3.5 h-3.5" />
                  Seja um Voluntário ICSE
                </Link>
              </li>
              <li>
                <Link href="/seja-parceiro" className="hover:text-white transition-colors">
                  Propostas de Parceria PJ / Convênios
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="hover:text-white transition-colors">
                  Inscrições em Cursos Livres
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade & LGPD
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Canal de Ouvidoria & Dúvidas
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="text-slate-500 hover:text-slate-300 text-[11px] inline-flex items-center gap-1"
                >
                  <span>Acesso Administrativo</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato & Localização */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-icse-green-500 pl-2">
              Sede e Atendimento
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-icse-blue-400 flex-shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-icse-orange-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{workingHours}</span>
              </div>
            </div>

            {/* Aviso LGPD */}
            <div className="mt-4 p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60 text-[11px] text-slate-400">
              Tratamento ético e seguro de dados pessoais conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).
            </div>
          </div>
        </div>

        {/* Linha Divisória e Rodapé Final */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            © {currentYear} {siteName}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/transparencia" className="hover:text-white transition-colors">
              Transparência Ativa
            </Link>
            <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
              Privacidade e Termos
            </Link>
            <Link href="/contato" className="hover:text-white transition-colors">
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

