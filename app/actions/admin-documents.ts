"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAuth, recordAudit } from "@/lib/auth";
import { DocumentAdminSchema } from "@/lib/schemas";

export async function createDocumentAction(formData: FormData) {
  const user = await requireAuth();

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: (formData.get("category") as any) || "ESTATUTO",
    fileUrl: formData.get("fileUrl") as string,
    fileType: (formData.get("fileType") as string) || "PDF",
    fileSize: (formData.get("fileSize") as string) || "1.0 MB",
    active: formData.get("active") === "true" || formData.get("active") === "on",
  };

  const parsed = DocumentAdminSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos: " + JSON.stringify(parsed.error.flatten().fieldErrors) };
  }

  const doc = await prisma.document.create({
    data: {
      ...parsed.data,
      fileSize: parsed.data.fileSize || null,
      publicationDate: new Date(),
    },
  });

  await recordAudit("CRIOU_DOCUMENTO", "Transparência", `Criou documento: ${doc.title}`, user);
  revalidatePath("/transparencia");
  revalidatePath("/documentos");
  revalidatePath("/admin/documentos");
  return { success: true };
}

export async function deleteDocumentAction(id: string) {
  const user = await requireAuth();
  const d = await prisma.document.delete({ where: { id } });
  await recordAudit("EXCLUIU_DOCUMENTO", "Transparência", `Excluiu documento: ${d.title}`, user);
  revalidatePath("/transparencia");
  revalidatePath("/documentos");
  revalidatePath("/admin/documentos");
  return { success: true };
}

