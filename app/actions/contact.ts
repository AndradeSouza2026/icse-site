"use server";

import prisma from "@/lib/prisma";
import { ContactFormSchema } from "@/lib/schemas";

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      subject: formData.get("subject"),
      message: formData.get("message"),
      termsAccepted: formData.get("termsAccepted") === "on" || formData.get("termsAccepted") === "true",
    };

    const validated = ContactFormSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Por favor, corrija os erros no formulário.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { name, email, phone, subject, message } = validated.data;

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: "NOVA",
        termsAccepted: true,
      },
    });

    return {
      success: true,
      message: "Mensagem enviada com sucesso! Nossa equipe institucional retornará em breve.",
    };
  } catch (error) {
    console.error("Erro ao enviar mensagem de contato:", error);
    return {
      success: false,
      message: "Ocorreu uma instabilidade ao enviar sua mensagem. Tente novamente mais tarde.",
    };
  }
}

