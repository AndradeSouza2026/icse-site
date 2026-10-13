"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin, recordAudit } from "@/lib/auth";
import { SiteSettingsSchema } from "@/lib/schemas";

export async function updateSiteSettingsAction(formData: FormData) {
  const user = await requireAdmin();

  const raw = {
    siteName: formData.get("siteName") as string,
    tagline: formData.get("tagline") as string,
    cnpj: formData.get("cnpj") as string,
    foundationDate: formData.get("foundationDate") as string,
    registryInfo: formData.get("registryInfo") as string,
    address: formData.get("address") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    whatsapp: formData.get("whatsapp") as string,
    workingHours: formData.get("workingHours") as string,
    instagram: (formData.get("instagram") as string) || null,
    facebook: (formData.get("facebook") as string) || null,
    youtube: (formData.get("youtube") as string) || null,
    heroTitle: formData.get("heroTitle") as string,
    heroSubtitle: formData.get("heroSubtitle") as string,
    aboutSummary: formData.get("aboutSummary") as string,
    mission: formData.get("mission") as string,
    vision: formData.get("vision") as string,
    values: formData.get("values") as string,
  };

  const parsed = SiteSettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos: " + JSON.stringify(parsed.error.flatten().fieldErrors) };
  }

  await prisma.siteSetting.upsert({
    where: { id: "singleton" },
    update: parsed.data,
    create: {
      id: "singleton",
      ...parsed.data,
    },
  });

  await recordAudit("ATUALIZOU_CONFIGURACOES", "Configurações", "Atualizou dados institucionais do ICSE", user);
  revalidatePath("/", "layout");
  revalidatePath("/admin/configuracoes");
  return { success: true };
}

