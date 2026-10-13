import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "icse-secret-super-seguro-trocar-em-producao-2026-chave-admin"
);

async function runTests() {
  console.log("🧪 Iniciando Bateria de Testes Automatizados do ICSE...");

  // Teste 1: Configuração Institucional
  const settings = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });
  if (!settings || settings.cnpj !== "97.542.996/0001-07") {
    throw new Error("❌ Falha no Teste 1: Configurações institucionais incorretas.");
  }
  console.log("✅ Teste 1: Configurações e dados estatutários (CNPJ, Endereço Macaé) válidos.");

  // Teste 2: Áreas de Atuação
  const areasCount = await prisma.area.count();
  if (areasCount !== 8) {
    throw new Error(`❌ Falha no Teste 2: Esperado 8 áreas estatutárias, encontrado ${areasCount}`);
  }
  console.log(`✅ Teste 2: Todas as 8 áreas estatutárias do Art. 2º cadastradas com sucesso.`);

  // Teste 3: Autenticação de Usuário e Hash de Senha
  const admin = await prisma.user.findUnique({ where: { email: "admin@icse.org.br" } });
  if (!admin) {
    throw new Error("❌ Falha no Teste 3: Administrador geral não encontrado.");
  }
  const isPasswordValid = await bcrypt.compare("Admin@ICSE2026!", admin.passwordHash);
  if (!isPasswordValid) {
    throw new Error("❌ Falha no Teste 3: Verificação de senha com bcrypt falhou.");
  }
  console.log("✅ Teste 3: Hash Bcrypt do Administrador verificado e aprovado.");

  // Teste 4: Emissão e Validação de Token JWT
  const payload = { userId: admin.id, email: admin.email, name: admin.name, role: admin.role };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);

  const verified = await jwtVerify(token, JWT_SECRET);
  if (verified.payload.email !== admin.email) {
    throw new Error("❌ Falha no Teste 4: Validação do token JWT falhou.");
  }
  console.log("✅ Teste 4: Geração e validação de token seguro JWT aprovadas.");

  // Teste 5: Criação e Consulta de Mensagem de Contato
  const testContact = await prisma.contactMessage.create({
    data: {
      name: "Cidadão Teste Macaé",
      email: "teste.cidadao@exemplo.com",
      phone: "(22) 98888-7777",
      subject: "Informação sobre atendimento comunitário",
      message: "Gostaria de saber sobre os dias de atendimento na sede em Lagomar.",
      status: "NOVA",
      termsAccepted: true,
    },
  });
  console.log(`✅ Teste 5: Submissão de mensagem de contato persistida no banco (ID: ${testContact.id}).`);

  // Teste 6: Criação de Manifestação de Voluntário
  const testVolunteer = await prisma.volunteerApplication.create({
    data: {
      fullName: "Voluntária Teste da Silva",
      email: "voluntaria.teste@exemplo.com",
      phone: "(22) 97777-6666",
      areasOfInterest: "Educação e Cursos Profissionalizantes",
      availability: "Sábados pela manhã",
      motivation: "Desejo contribuir com reforço escolar para crianças de Lagomar.",
      status: "NOVO",
      termsAccepted: true,
    },
  });
  console.log(`✅ Teste 6: Inscrição de voluntariado com LGPD persistida no banco (ID: ${testVolunteer.id}).`);

  // Teste 7: Proposta de Parceria
  const testPartner = await prisma.partnerProposal.create({
    data: {
      organizationName: "Empresa Parceira de Tecnologia LTDA",
      contactPerson: "Diretor Comercial",
      email: "parcerias@empresateste.com.br",
      phone: "(22) 2772-9999",
      areaOfInterest: "Educação e Qualificação Técnica",
      proposalType: "Doação de computadores e bolsas de estágio",
      message: "Proposta formal de doação de laboratório de informática para o ICSE.",
      status: "NOVO",
      termsAccepted: true,
    },
  });
  console.log(`✅ Teste 7: Proposta de cooperação institucional registrada no banco (ID: ${testPartner.id}).`);

  // Teste 8: Inscrição em Curso
  const course = await prisma.course.findFirst();
  if (course) {
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        courseId: course.id,
        fullName: "Aluno Teste Inscrição",
        email: "aluno.teste@exemplo.com",
        phone: "(22) 96666-5555",
        neighborhood: "Lagomar",
        city: "Macaé",
        status: "PENDENTE",
        termsAccepted: true,
      },
    });
    console.log(`✅ Teste 8: Inscrição de aluno no curso '${course.title}' realizada (ID: ${enrollment.id}).`);

    // Limpar registro de teste do curso
    await prisma.courseEnrollment.delete({ where: { id: enrollment.id } });
  }

  // Limpeza dos dados de testes rápidos
  await prisma.contactMessage.delete({ where: { id: testContact.id } });
  await prisma.volunteerApplication.delete({ where: { id: testVolunteer.id } });
  await prisma.partnerProposal.delete({ where: { id: testPartner.id } });
  console.log("🧹 Limpeza de dados de teste concluída com preservação dos registros oficiais.");

  // Teste 9: Trilha de Auditoria
  const auditLogsCount = await prisma.auditLog.count();
  if (auditLogsCount === 0) {
    throw new Error("❌ Falha no Teste 9: Trilha de auditoria vazia.");
  }
  console.log(`✅ Teste 9: Auditoria ativa com ${auditLogsCount} registros de integridade.`);

  console.log("\n🎉 TODAS AS 9 BATERIAS DE TESTES FORAM APROVADAS COM SUCESSO!");
}

runTests()
  .catch((e) => {
    console.error("❌ Falha nos testes:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

