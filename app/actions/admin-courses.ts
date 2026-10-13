"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAuth, recordAudit } from "@/lib/auth";
import { CourseAdminSchema } from "@/lib/schemas";

export async function createCourseAction(formData: FormData) {
  const user = await requireAuth();

  const totalSlotsRaw = formData.get("totalSlots") as string;
  const raw = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g, "-"),
    summary: formData.get("summary") as string,
    description: formData.get("description") as string,
    workload: (formData.get("workload") as string) || null,
    modality: (formData.get("modality") as any) || "PRESENCIAL",
    location: (formData.get("location") as string) || "Sede ICSE - Lagomar, Macaé/RJ",
    requirements: (formData.get("requirements") as string) || null,
    totalSlots: totalSlotsRaw ? parseInt(totalSlotsRaw, 10) : null,
    enrollmentPeriod: (formData.get("enrollmentPeriod") as string) || null,
    status: (formData.get("status") as any) || "EM_BREVE",
    isFeatured: formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on",
  };

  const parsed = CourseAdminSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos: " + JSON.stringify(parsed.error.flatten().fieldErrors) };
  }

  const existing = await prisma.course.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return { success: false, error: "Já existe um curso cadastrado com este slug." };
  }

  const course = await prisma.course.create({
    data: {
      ...parsed.data,
      totalSlots: parsed.data.totalSlots || null,
    },
  });

  await recordAudit("CRIOU_CURSO", "Cursos", `Criou o curso: ${course.title}`, user);
  revalidatePath("/cursos");
  revalidatePath("/admin/cursos");
  return { success: true };
}

export async function updateCourseAction(id: string, formData: FormData) {
  const user = await requireAuth();

  const totalSlotsRaw = formData.get("totalSlots") as string;
  const raw = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g, "-"),
    summary: formData.get("summary") as string,
    description: formData.get("description") as string,
    workload: (formData.get("workload") as string) || null,
    modality: (formData.get("modality") as any) || "PRESENCIAL",
    location: (formData.get("location") as string) || "Sede ICSE - Lagomar, Macaé/RJ",
    requirements: (formData.get("requirements") as string) || null,
    totalSlots: totalSlotsRaw ? parseInt(totalSlotsRaw, 10) : null,
    enrollmentPeriod: (formData.get("enrollmentPeriod") as string) || null,
    status: (formData.get("status") as any) || "EM_BREVE",
    isFeatured: formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on",
  };

  const parsed = CourseAdminSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos." };
  }

  await prisma.course.update({
    where: { id },
    data: {
      ...parsed.data,
      totalSlots: parsed.data.totalSlots || null,
    },
  });

  await recordAudit("ATUALIZOU_CURSO", "Cursos", `Atualizou curso ID: ${id}`, user);
  revalidatePath("/cursos");
  revalidatePath("/admin/cursos");
  return { success: true };
}

export async function deleteCourseAction(id: string) {
  const user = await requireAuth();
  const c = await prisma.course.delete({ where: { id } });
  await recordAudit("EXCLUIU_CURSO", "Cursos", `Excluiu curso: ${c.title}`, user);
  revalidatePath("/cursos");
  revalidatePath("/admin/cursos");
  return { success: true };
}

