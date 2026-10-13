import Header from "@/components/Header";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";

export const revalidate = 60; // revalidação a cada 60 segundos

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings = null;
  try {
    settings = await prisma.siteSetting.findUnique({
      where: { id: "singleton" },
    });
  } catch (err) {
    console.error("Erro ao carregar configurações públicas:", err);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        siteName={settings?.siteName}
        phone={settings?.phone}
        email={settings?.email}
        address="Lagomar, Macaé — RJ"
      />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}

