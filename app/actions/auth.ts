"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { LoginFormSchema } from "@/lib/schemas";
import {
  AUTH_COOKIE_NAME,
  comparePassword,
  recordAudit,
  signSessionToken,
} from "@/lib/auth";

export interface LoginActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function loginAdmin(
  prevState: LoginActionResult | null,
  formData: FormData
): Promise<LoginActionResult> {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validated = LoginFormSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Dados de acesso incompletos.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validated.data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !user.isActive) {
      return {
        success: false,
        message: "Credenciais inválidas ou conta inativa.",
      };
    }

    const isMatch = await comparePassword(password, user.passwordHash);

    if (!isMatch) {
      return {
        success: false,
        message: "Credenciais inválidas ou conta inativa.",
      };
    }

    // Criar token JWT
    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "ADMIN" | "EDITOR",
    });

    // Configurar cookie seguro HTTP-only
    cookies().set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 horas
    });

    await recordAudit(
      "LOGIN_SUCESSO",
      "Autenticacao",
      `Usuário ${user.email} efetuou login com perfil ${user.role}`,
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role as "ADMIN" | "EDITOR",
      }
    );

    return {
      success: true,
      message: "Autenticação realizada com sucesso. Redirecionando...",
    };
  } catch (error) {
    console.error("Erro no login administrativo:", error);
    return {
      success: false,
      message: "Erro no servidor ao processar autenticação.",
    };
  }
}

export async function logoutAdmin() {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect("/admin/login");
}

