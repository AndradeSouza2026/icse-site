import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Páginas Estáticas
  const staticRoutes = [
    "",
    "/quem-somos",
    "/areas-de-atuacao",
    "/projetos",
    "/cursos",
    "/noticias",
    "/transparencia",
    "/seja-voluntario",
    "/seja-parceiro",
    "/contato",
    "/politica-de-privacidade",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Páginas Dinâmicas
  const [projects, courses, news] = await Promise.all([
    prisma.project.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.course.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.news.findMany({
      where: { status: "PUBLICADO" },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projetos/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const courseRoutes = courses.map((c) => ({
    url: `${baseUrl}/cursos/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const newsRoutes = news.map((n) => ({
    url: `${baseUrl}/noticias/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...courseRoutes, ...newsRoutes];
}

