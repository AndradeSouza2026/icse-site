"use server";

import prisma from "@/lib/prisma";
import { VolunteerFormSchema } from "@/lib/schemas";
import { ActionResult } from "./contact";

export async function submitVolunteerForm(formData: FormData): Promise<ActionResult> {
  try {
    const rawData = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      areasOfInterest: formData.get("areasOfInterest"),
      availability: formData.get("availability"),
      motivation: formData.get("motivation") || "",
      termsAccepted: formData.get("termsAccepted") === "on" || formData.get("termsAccepted") === "true",
    };

    const validated = VolunteerFormSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Verifique os dados informados para o cadastro voluntário.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { fullName, email, phone, areasOfInterest, availability, motivation } = validated.data;

    await prisma.volunteerApplication.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        areasOfInterest,
        availability,
        motivation: motivation || null,
        status: "NOVO",
        termsAccepted: true,
      },
    });

    return {
      success: true,
      message: "Manifestação de voluntariado registrada com sucesso! Agradecemos sua disposição em fortalecer nossa comunidade. Entraremos em contato conforme o cronograma de projetos.",
    };
  } catch (error) {
    console.error("Erro ao registrar voluntário:", error);
    return {
      success: false,
      message: "Não foi possível registrar seu interesse no momento. Por favor, tente novamente.",
    };
  }
}

