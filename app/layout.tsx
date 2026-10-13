import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ICSE — Instituto Centro Social Elcimar | Macaé - RJ",
    template: "%s | ICSE — Instituto Centro Social Elcimar",
  },
  description:
    "Associação civil sem fins lucrativos dedicada à educação, inclusão social, saúde comunitária, meio ambiente e desenvolvimento social em Macaé e no Estado do Rio de Janeiro. CNPJ: 97.542.996/0001-07.",
  keywords: [
    "ICSE",
    "Instituto Centro Social Elcimar",
    "Macaé",
    "Lagomar",
    "Projetos Sociais",
    "Cursos Gratuitos",
    "Apoio Estudantil",
    "Assistência Social Macaé",
    "Terceiro Setor",
    "ONG Macaé",
  ],
  authors: [{ name: "Instituto Centro Social Elcimar" }],
  creator: "ICSE",
  publisher: "ICSE",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "ICSE — Instituto Centro Social Elcimar | Macaé - RJ",
    description:
      "Transformando vidas e fortalecendo comunidades com educação, qualificação profissional, saúde preventiva e assistência social.",
    url: "/",
    siteName: "ICSE — Instituto Centro Social Elcimar",
    images: [
      {
        url: "/images/logo-icse.jpg",
        width: 800,
        height: 800,
        alt: "Logo Oficial ICSE - Instituto Centro Social Elcimar",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/images/logo-icse.jpg" />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-icse-blue-100 selection:text-icse-blue-900">
        {children}
      </body>
    </html>
  );
}

