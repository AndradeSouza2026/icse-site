"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAuth, recordAudit } from "@/lib/auth";
import { NewsAdminSchema } from "@/lib/schemas";

export async function createNewsAction(formData: FormData) {
  const user = await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g, "-"),
    subtitle: (formData.get("subtitle") as string) || null,
    content: formData.get("content") as string,
    coverImage: (formData.get("coverImage") as string) || null,
    category: (formData.get("category") as string) || "Institucional",
    author: (formData.get("author") as string) || "Comunicação ICSE",
    status: (formData.get("status") as any) || "PUBLICADO",
  };

  const parsed = NewsAdminSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos: " + JSON.stringify(parsed.error.flatten().fieldErrors) };
  }

  const existing = await prisma.news.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return { success: false, error: "Já existe uma notícia com este slug." };
  }

  const news = await prisma.news.create({
    data: {
      ...parsed.data,
      subtitle: parsed.data.subtitle || null,
      coverImage: parsed.data.coverImage || null,
      publishedAt: new Date(),
    },
  });

  await recordAudit("CRIOU_NOTICIA", "Notícias", `Criou notícia: ${news.title}`, user);
  revalidatePath("/noticias");
  revalidatePath("/admin/noticias");
  return { success: true };
}

export async function updateNewsAction(id: string, formData: FormData) {
  const user = await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g, "-"),
    subtitle: (formData.get("subtitle") as string) || null,
    content: formData.get("content") as string,
    coverImage: (formData.get("coverImage") as string) || null,
    category: (formData.get("category") as string) || "Institucional",
    author: (formData.get("author") as string) || "Comunicação ICSE",
    status: (formData.get("status") as any) || "PUBLICADO",
  };

  const parsed = NewsAdminSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos." };
  }

  await prisma.news.update({
    where: { id },
    data: {
      ...parsed.data,
      subtitle: parsed.data.subtitle || null,
      coverImage: parsed.data.coverImage || null,
    },
  });

  await recordAudit("ATUALIZOU_NOTICIA", "Notícias", `Atualizou notícia ID: ${id}`, user);
  revalidatePath("/noticias");
  revalidatePath("/admin/noticias");
  return { success: true };
}

export async function deleteNewsAction(id: string) {
  const user = await requireAuth();
  const n = await prisma.news.delete({ where: { id } });
  await recordAudit("EXCLUIU_NOTICIA", "Notícias", `Excluiu notícia: ${n.title}`, user);
  revalidatePath("/noticias");
  revalidatePath("/admin/noticias");
  return { success: true };
}

