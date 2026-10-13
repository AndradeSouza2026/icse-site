import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail institucional ou pessoal inválido"),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(3, "O assunto deve ter pelo menos 3 caracteres"),
  message: z.string().min(10, "A mensagem deve conter pelo menos 10 caracteres"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar a política de privacidade e tratamento de dados (LGPD)" }),
  }),
});

export const VolunteerFormSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional().or(z.literal("")),
  areasOfInterest: z.string().min(2, "Selecione ou descreva ao menos uma área de interesse"),
  availability: z.string().min(2, "Informe sua disponibilidade de dias ou turnos"),
  motivation: z.string().optional().or(z.literal("")),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "O consentimento LGPD é obrigatório para manifestação de interesse" }),
  }),
});

export const PartnerFormSchema = z.object({
  organizationName: z.string().min(3, "Razão social ou nome fantasia da instituição é obrigatório"),
  contactPerson: z.string().min(3, "Nome do representante responsável é obrigatório"),
  email: z.string().email("E-mail corporativo ou institucional inválido"),
  phone: z.string().min(8, "Telefone para contato institucional é obrigatório"),
  cnpj: z.string().optional().or(z.literal("")),
  areaOfInterest: z.string().min(2, "Selecione a área de cooperação"),
  proposalType: z.string().min(2, "Informe a modalidade ou formato de parceria proposta"),
  message: z.string().min(15, "Apresente um resumo da proposta com pelo menos 15 caracteres"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "O consentimento institucional para contato é obrigatório" }),
  }),
});

export const CourseEnrollmentSchema = z.object({
  courseId: z.string().min(1, "Curso não identificado"),
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail é obrigatório"),
  phone: z.string().min(8, "Telefone / WhatsApp é obrigatório para contato"),
  dateOfBirth: z.string().optional().or(z.literal("")),
  city: z.string().default("Macaé"),
  neighborhood: z.string().min(2, "Bairro de residência é obrigatório"),
  educationalLevel: z.string().optional().or(z.literal("")),
  observation: z.string().optional().or(z.literal("")),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "O aceite das condições e privacidade é obrigatório" }),
  }),
});

export const LoginFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const ProjectAdminSchema = z.object({
  title: z.string().min(3, "Título do projeto é obrigatório"),
  slug: z.string().min(3, "Slug amigável é obrigatório"),
  areaId: z.string().min(1, "Área de atuação é obrigatória"),
  summary: z.string().min(10, "Resumo é obrigatório"),
  description: z.string().min(20, "Descrição detalhada é obrigatória"),
  targetAudience: z.string().min(3, "Público-alvo é obrigatório"),
  location: z.string().default("Macaé - RJ e Região"),
  status: z.enum(["PLANEJADO", "EM_ANDAMENTO", "CONCLUIDO", "ARQUIVADO"]),
  coverImage: z.string().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
});

export const CourseAdminSchema = z.object({
  title: z.string().min(3, "Título do curso é obrigatório"),
  slug: z.string().min(3, "Slug amigável é obrigatório"),
  summary: z.string().min(10, "Resumo do curso é obrigatório"),
  description: z.string().min(20, "Descrição programática é obrigatória"),
  workload: z.string().optional().or(z.literal("")),
  modality: z.enum(["PRESENCIAL", "ONLINE", "HIBRIDO"]),
  location: z.string().default("Sede ICSE - Lagomar, Macaé/RJ"),
  requirements: z.string().optional().or(z.literal("")),
  totalSlots: z.number().int().positive().optional().nullable(),
  enrollmentPeriod: z.string().optional().or(z.literal("")),
  status: z.enum(["INSCRICOES_ABERTAS", "INSCRICOES_ENCERRADAS", "EM_BREVE", "ARQUIVADO"]),
  isFeatured: z.boolean().default(false),
});

export const NewsAdminSchema = z.object({
  title: z.string().min(5, "Título da notícia é obrigatório"),
  slug: z.string().min(3, "Slug amigável é obrigatório"),
  subtitle: z.string().optional().or(z.literal("")),
  content: z.string().min(20, "Conteúdo da publicação é obrigatório"),
  coverImage: z.string().optional().or(z.literal("")),
  category: z.string().default("Institucional"),
  author: z.string().default("Comunicação ICSE"),
  status: z.enum(["RASCUNHO", "PUBLICADO"]),
});

export const DocumentAdminSchema = z.object({
  title: z.string().min(3, "Título do documento é obrigatório"),
  description: z.string().min(5, "Descrição do documento é obrigatória"),
  category: z.enum(["ESTATUTO", "RELATORIO_ANUAL", "PRESTACAO_CONTAS", "ATAS", "EDITAIS", "OUTROS"]),
  fileUrl: z.string().min(1, "Link ou caminho do arquivo é obrigatório"),
  fileType: z.string().default("PDF"),
  fileSize: z.string().optional().or(z.literal("")),
  active: z.boolean().default(true),
});

export const SiteSettingsSchema = z.object({
  siteName: z.string().min(3),
  tagline: z.string().min(3),
  cnpj: z.string().min(14),
  foundationDate: z.string(),
  registryInfo: z.string(),
  address: z.string().min(5),
  email: z.string().email(),
  phone: z.string().min(5),
  whatsapp: z.string().min(5),
  workingHours: z.string(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  heroTitle: z.string().min(5),
  heroSubtitle: z.string().min(10),
  aboutSummary: z.string().min(20),
  mission: z.string().min(10),
  vision: z.string().min(10),
  values: z.string().min(10),
});

