import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "icse-secret-super-seguro-trocar-em-producao-2026-chave-admin"
);

export const AUTH_COOKIE_NAME = "icse_admin_token";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR";
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as "ADMIN" | "EDITOR",
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("Não autorizado: Faça login no painel administrativo.");
  }
  return session;
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await requireAuth();
  if (session.role !== "ADMIN") {
    throw new Error("Acesso restrito: Requer privilégios de Administrador Geral.");
  }
  return session;
}

export async function recordAudit(
  action: string,
  resource: string,
  details?: string,
  user?: SessionPayload | null
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: user?.userId || null,
        userName: user?.name || "Sistema / Convidado",
        action,
        resource,
        details: details || null,
      },
    });
  } catch (err) {
    console.error("Falha ao registrar auditoria:", err);
  }
}

