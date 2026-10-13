"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAuth, recordAudit } from "@/lib/auth";

export async function updateContactStatusAction(id: string, status: string, internalNotes?: string) {
  const user = await requireAuth();
  await prisma.contactMessage.update({
    where: { id },
    data: {
      status,
      internalNotes: internalNotes ?? undefined,
    },
  });
  await recordAudit("ATUALIZOU_MENSAGEM", "Mensagens", `Alterou status da mensagem ID ${id} para ${status}`, user);
  revalidatePath("/admin/mensagens");
  return { success: true };
}

export async function deleteContactMessageAction(id: string) {
  const user = await requireAuth();
  await prisma.contactMessage.delete({ where: { id } });
  await recordAudit("EXCLUIU_MENSAGEM", "Mensagens", `Excluiu mensagem de contato ID ${id}`, user);
  revalidatePath("/admin/mensagens");
  return { success: true };
}

export async function updateVolunteerStatusAction(id: string, status: string, internalNotes?: string) {
  const user = await requireAuth();
  await prisma.volunteerApplication.update({
    where: { id },
    data: {
      status,
      internalNotes: internalNotes ?? undefined,
    },
  });
  await recordAudit("ATUALIZOU_VOLUNTARIO", "Voluntários", `Alterou status da manifestação de voluntário ${id} para ${status}`, user);
  revalidatePath("/admin/voluntarios");
  return { success: true };
}

export async function deleteVolunteerAction(id: string) {
  const user = await requireAuth();
  await prisma.volunteerApplication.delete({ where: { id } });
  await recordAudit("EXCLUIU_VOLUNTARIO", "Voluntários", `Excluiu inscrição de voluntário ID ${id}`, user);
  revalidatePath("/admin/voluntarios");
  return { success: true };
}

export async function updatePartnerStatusAction(id: string, status: string, internalNotes?: string) {
  const user = await requireAuth();
  await prisma.partnerProposal.update({
    where: { id },
    data: {
      status,
      internalNotes: internalNotes ?? undefined,
    },
  });
  await recordAudit("ATUALIZOU_PARCERIA", "Parcerias", `Alterou status da proposta de parceria ${id} para ${status}`, user);
  revalidatePath("/admin/parcerias");
  return { success: true };
}

export async function deletePartnerProposalAction(id: string) {
  const user = await requireAuth();
  await prisma.partnerProposal.delete({ where: { id } });
  await recordAudit("EXCLUIU_PARCERIA", "Parcerias", `Excluiu proposta de parceria ID ${id}`, user);
  revalidatePath("/admin/parcerias");
  return { success: true };
}

export async function updateEnrollmentStatusAction(id: string, status: string, observation?: string) {
  const user = await requireAuth();
  await prisma.courseEnrollment.update({
    where: { id },
    data: {
      status,
      observation: observation ?? undefined,
    },
  });
  await recordAudit("ATUALIZOU_INSCRICAO", "Inscrições", `Alterou status da inscrição ${id} para ${status}`, user);
  revalidatePath("/admin/inscricoes");
  return { success: true };
}

export async function deleteEnrollmentAction(id: string) {
  const user = await requireAuth();
  await prisma.courseEnrollment.delete({ where: { id } });
  await recordAudit("EXCLUIU_INSCRICAO", "Inscrições", `Excluiu inscrição de aluno ID ${id}`, user);
  revalidatePath("/admin/inscricoes");
  return { success: true };
}

