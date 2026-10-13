"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin, hashPassword, recordAudit } from "@/lib/auth";

export async function createUserAction(formData: FormData) {
  const current = await requireAdmin();

  const name = formData.get("name") as string;
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "EDITOR";

  if (!name || !email || !password || password.length < 6) {
    return { success: false, error: "Nome, e-mail e senha de no mínimo 6 caracteres são obrigatórios." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "Este e-mail já está em uso por outro usuário." };
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      isActive: true,
    },
  });

  await recordAudit("CRIOU_USUARIO", "Usuários", `Criou o usuário ${user.email} (${user.role})`, current);
  revalidatePath("/admin/usuarios");
  return { success: true };
}

export async function toggleUserStatusAction(id: string, currentStatus: boolean) {
  const current = await requireAdmin();
  if (current.userId === id) {
    return { success: false, error: "Você não pode desativar o seu próprio usuário logado." };
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { isActive: !currentStatus },
  });

  await recordAudit("STATUS_USUARIO", "Usuários", `Alterou status do usuário ${updated.email} para ${updated.isActive ? "Ativo" : "Inativo"}`, current);
  revalidatePath("/admin/usuarios");
  return { success: true };
}

