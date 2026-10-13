"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAuth, recordAudit } from "@/lib/auth";
import { ProjectAdminSchema } from "@/lib/schemas";

export async function createProjectAction(formData: FormData) {
  const user = await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g, "-"),
    areaId: formData.get("areaId") as string,
    summary: formData.get("summary") as string,
    description: formData.get("description") as string,
    targetAudience: formData.get("targetAudience") as string,
    location: (formData.get("location") as string) || "Macaé - RJ e Região",
    status: formData.get("status") as any,
    coverImage: (formData.get("coverImage") as string) || null,
    isFeatured: formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on",
  };

  const parsed = ProjectAdminSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos: " + JSON.stringify(parsed.error.flatten().fieldErrors) };
  }

  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return { success: false, error: "Já existe um projeto com este slug." };
  }

  const project = await prisma.project.create({
    data: {
      ...parsed.data,
      coverImage: parsed.data.coverImage || null,
    },
  });

  await recordAudit("CRIOU_PROJETO", "Projetos", `Criou o projeto: ${project.title}`, user);
  revalidatePath("/projetos");
  revalidatePath("/admin/projetos");
  return { success: true };
}

export async function updateProjectAction(id: string, formData: FormData) {
  const user = await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g, "-"),
    areaId: formData.get("areaId") as string,
    summary: formData.get("summary") as string,
    description: formData.get("description") as string,
    targetAudience: formData.get("targetAudience") as string,
    location: (formData.get("location") as string) || "Macaé - RJ e Região",
    status: formData.get("status") as any,
    coverImage: (formData.get("coverImage") as string) || null,
    isFeatured: formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on",
  };

  const parsed = ProjectAdminSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos." };
  }

  await prisma.project.update({
    where: { id },
    data: {
      ...parsed.data,
      coverImage: parsed.data.coverImage || null,
    },
  });

  await recordAudit("ATUALIZOU_PROJETO", "Projetos", `Atualizou o projeto ID: ${id}`, user);
  revalidatePath("/projetos");
  revalidatePath("/admin/projetos");
  return { success: true };
}

export async function deleteProjectAction(id: string) {
  const user = await requireAuth();
  const proj = await prisma.project.delete({ where: { id } });
  await recordAudit("EXCLUIU_PROJETO", "Projetos", `Excluiu projeto: ${proj.title}`, user);
  revalidatePath("/projetos");
  revalidatePath("/admin/projetos");
  return { success: true };
}

