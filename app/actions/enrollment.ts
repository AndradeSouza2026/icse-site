"use server";

import prisma from "@/lib/prisma";
import { CourseEnrollmentSchema } from "@/lib/schemas";
import { ActionResult } from "./contact";

export async function submitEnrollmentForm(formData: FormData): Promise<ActionResult> {
  try {
    const rawData = {
      courseId: formData.get("courseId"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth") || "",
      city: formData.get("city") || "Macaé",
      neighborhood: formData.get("neighborhood"),
      educationalLevel: formData.get("educationalLevel") || "",
      observation: formData.get("observation") || "",
      termsAccepted: formData.get("termsAccepted") === "on" || formData.get("termsAccepted") === "true",
    };

    const validated = CourseEnrollmentSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios da inscrição.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const {
      courseId,
      fullName,
      email,
      phone,
      dateOfBirth,
      city,
      neighborhood,
      educationalLevel,
      observation,
    } = validated.data;

    // Verificar se o curso existe
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return {
        success: false,
        message: "Oportunidade ou curso não localizado.",
      };
    }

    await prisma.courseEnrollment.create({
      data: {
        courseId,
        fullName,
        email,
        phone,
        dateOfBirth: dateOfBirth || null,
        city: city || "Macaé",
        neighborhood,
        educationalLevel: educationalLevel || null,
        observation: observation || null,
        status: "PENDENTE",
        termsAccepted: true,
      },
    });

    return {
      success: true,
      message: `Inscrição/Manifestação de interesse no curso "${course.title}" registrada com sucesso! Fique atento ao seu telefone e e-mail para confirmação da turma e orientações presenciais na sede.`,
    };
  } catch (error) {
    console.error("Erro ao registrar inscrição:", error);
    return {
      success: false,
      message: "Falha ao registrar inscrição no momento. Tente novamente mais tarde.",
    };
  }
}

