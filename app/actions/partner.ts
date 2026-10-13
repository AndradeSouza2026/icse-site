"use server";

import prisma from "@/lib/prisma";
import { PartnerFormSchema } from "@/lib/schemas";
import { ActionResult } from "./contact";

export async function submitPartnerForm(formData: FormData): Promise<ActionResult> {
  try {
    const rawData = {
      organizationName: formData.get("organizationName"),
      contactPerson: formData.get("contactPerson"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      cnpj: formData.get("cnpj") || "",
      areaOfInterest: formData.get("areaOfInterest"),
      proposalType: formData.get("proposalType"),
      message: formData.get("message"),
      termsAccepted: formData.get("termsAccepted") === "on" || formData.get("termsAccepted") === "true",
    };

    const validated = PartnerFormSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Por favor, revise os dados da proposta institucional.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { organizationName, contactPerson, email, phone, cnpj, areaOfInterest, proposalType, message } =
      validated.data;

    await prisma.partnerProposal.create({
      data: {
        organizationName,
        contactPerson,
        email,
        phone,
        cnpj: cnpj || null,
        areaOfInterest,
        proposalType,
        message,
        status: "NOVO",
        termsAccepted: true,
      },
    });

    return {
      success: true,
      message: "Proposta de parceria institucional enviada com sucesso! A diretoria do ICSE analisará o alinhamento com nossas finalidades estatutárias e fará contato oficial.",
    };
  } catch (error) {
    console.error("Erro ao enviar proposta de parceria:", error);
    return {
      success: false,
      message: "Falha ao registrar proposta de parceria. Tente novamente mais tarde.",
    };
  }
}

