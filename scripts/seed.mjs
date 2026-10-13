import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando povoamento inicial do banco de dados do ICSE...");

  // 1. Criar ou atualizar Administrador Geral
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@icse.org.br";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin@ICSE2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      email: adminEmail,
      name: process.env.SEED_ADMIN_NAME || "Administrador Geral ICSE",
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log(`✅ Administrador configurado: ${admin.email}`);

  // 2. Configurações Institucionais Oficiais
  const siteSetting = await prisma.siteSetting.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteName: "ICSE — Instituto Centro Social Elcimar",
      tagline: "Juntos por uma sociedade melhor!",
      cnpj: "97.542.996/0001-07",
      foundationDate: "04 de outubro de 2009",
      registryInfo: "Cartório de Registro Civil de Pessoas Jurídicas da Comarca da Capital do Rio de Janeiro, sob nº 26203",
      address: "Avenida Dr. Sérgio Vieira de Melo, nº 55, Lagomar, Macaé — RJ, CEP 27966-620",
      email: "contato@icse.org.br",
      phone: "(22) 2772-0000",
      whatsapp: "(22) 99999-0000",
      workingHours: "Segunda a Sexta-feira, das 08h às 17h",
      instagram: "https://instagram.com/icseoficial",
      facebook: "https://facebook.com/icseoficial",
      youtube: "https://youtube.com",
      heroTitle: "Transformando vidas, fortalecendo comunidades",
      heroSubtitle: "Educação, inclusão e desenvolvimento social para construir novas oportunidades no Estado do Rio de Janeiro.",
      aboutSummary: "O ICSE — Instituto Centro Social Elcimar é uma associação civil de direito privado sem fins lucrativos, 100% social, com princípios de utilidade pública, legalidade, impessoalidade, moralidade, publicidade e eficiência. Fundado em 4 de outubro de 2009 em Macaé/RJ.",
      mission: "Atender a todos que a ela se dirigirem, independente de classe social, sexo, raça, cor ou crença, promovendo qualificação profissional, cidadania ativa, apoio comunitário e preservação ambiental.",
      vision: "Consolidar-se como polo de excelência comunitária e referência em projetos de impacto social e educacional na Região Norte Fluminense.",
      values: "Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência, Transparência, Solidariedade e Inclusão.",
    },
  });
  console.log("✅ Configurações institucionais carregadas.");

  // 3. Áreas de Atuação
  const areasData = [
    {
      slug: "educacao-qualificacao",
      name: "Educação e Qualificação Profissional",
      icon: "GraduationCap",
      colorClass: "blue",
      summary: "Cursos livres, capacitação continuada e preparatórios voltados à inserção no mercado de trabalho.",
      description: "Conforme o Art. 2º do Estatuto, o ICSE atua na promoção de cursos profissionalizantes gratuitos, cursos preparatórios para vestibulares sociais e mercado de trabalho, além de palestras e seminários de capacitação para jovens e adultos.",
      targetAudience: "Jovens e adultos que buscam qualificação e recolocação no mercado de trabalho.",
      order: 1,
    },
    {
      slug: "inclusao-assistencia-social",
      name: "Inclusão Social e Assistência Social",
      icon: "Users",
      colorClass: "orange",
      summary: "Apoio a famílias carentes, pessoas com deficiência (PCD), crianças, jovens, mulheres e idosos.",
      description: "Desenvolvimento de iniciativas de assistência social e defesa de garantias para todas as parcelas vulneráveis da sociedade, combatendo a desigualdade e estimulando a autonomia cidadã sem distinção de raça, credo ou gênero.",
      targetAudience: "Famílias em vulnerabilidade, PCDs, idosos e minorias da comunidade.",
      order: 2,
    },
    {
      slug: "saude-qualidade-de-vida",
      name: "Saúde e Qualidade de Vida",
      icon: "HeartPulse",
      colorClass: "red",
      summary: "Iniciativas preventivas de saúde, parcerias odontológicas e orientação para o bem-estar.",
      description: "Prerrogativa estatutária voltada à celebração de convênios com instituições públicas e privadas para viabilização de telemedicina, apoio preventivo e campanhas de saúde comunitária.",
      targetAudience: "Moradores e famílias da comunidade de Lagomar e de Macaé.",
      order: 3,
    },
    {
      slug: "meio-ambiente-sustentabilidade",
      name: "Meio Ambiente e Sustentabilidade",
      icon: "Leaf",
      colorClass: "green",
      summary: "Defesa e preservação ambiental, incentivo ao desenvolvimento sustentável e educação ecológica.",
      description: "Promoção de ações de preservação, reciclagem comunitária, estudos de tecnologias sociais alternativas e desenvolvimento sustentável para as futuras gerações.",
      targetAudience: "Comunidade local, estudantes e defensores ambientais.",
      order: 4,
    },
    {
      slug: "esporte-lazer",
      name: "Esporte, Lazer e Recreação",
      icon: "Activity",
      colorClass: "purple",
      summary: "Práticas esportivas saudáveis, integração recreativa e fortalecimento de vínculos comunitários.",
      description: "Incentivo a atividades físicas, oficinas esportivas para jovens e momentos de convivência comunitária como instrumentos de disciplina, saúde e inclusão social.",
      targetAudience: "Crianças, adolescentes e jovens da região.",
      order: 5,
    },
    {
      slug: "cultura-arte",
      name: "Cultura, Arte e Atividades Comunitárias",
      icon: "Palette",
      colorClass: "amber",
      summary: "Valorização da cultura popular, oficinas artísticas e expressão comunitária.",
      description: "Encontros, oficinas de arte, manifestações culturais e incentivo à difusão de conhecimento, incluindo a prerrogativa de comunicação comunitária e eventos culturais.",
      targetAudience: "Artistas locais, crianças, estudantes e toda a comunidade.",
      order: 6,
    },
    {
      slug: "apoio-estudantil",
      name: "Apoio Estudantil e Oportunidades Educacionais",
      icon: "BookOpen",
      colorClass: "blue",
      summary: "Intermediação de bolsas de estudo, convênios de estágios e assessoria educacional.",
      description: "Suporte a estudantes universitários, pós-graduandos e alunos de cursos livres na facilitação de estágios, bolsas de graduação e intercâmbio de oportunidades com instituições de ensino.",
      targetAudience: "Estudantes secundaristas, universitários e concluintes de cursos livres.",
      order: 7,
    },
    {
      slug: "voluntariado-comunitario",
      name: "Voluntariado e Desenvolvimento Comunitário",
      icon: "HandHeart",
      colorClass: "teal",
      summary: "Engajamento cidadão de voluntários e fortalecimento das lideranças locais.",
      description: "Mobilização de profissionais e cidadãos dispostos a doar tempo, talento e solidariedade para o avanço dos projetos e o atendimento às famílias de Macaé.",
      targetAudience: "Profissionais, universitários e voluntários de todas as áreas.",
      order: 8,
    },
  ];

  for (const a of areasData) {
    await prisma.area.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }
  console.log("✅ 8 Áreas de atuação do estatuto cadastradas.");

  // 4. Projetos Iniciais Oficiais (Identificados com clareza)
  const educacaoArea = await prisma.area.findUnique({ where: { slug: "educacao-qualificacao" } });
  const meioAmbienteArea = await prisma.area.findUnique({ where: { slug: "meio-ambiente-sustentabilidade" } });
  const inclusaoArea = await prisma.area.findUnique({ where: { slug: "inclusao-assistencia-social" } });

  if (educacaoArea) {
    await prisma.project.upsert({
      where: { slug: "projeto-qualifica-macae" },
      update: {},
      create: {
        slug: "projeto-qualifica-macae",
        title: "Projeto Qualifica Macaé — Capacitação e Futuro",
        summary: "Iniciativa de qualificação profissional básica e preparatório para inserção produtiva de jovens de Lagomar e Macaé.",
        description: "Estruturação de turmas gratuitas para desenvolvimento de competências em atendimento, técnicas administrativas e inclusão digital, alinhado aos compromissos do Art. 2º do Estatuto do ICSE.",
        targetAudience: "Jovens e adultos a partir de 16 anos residentes em Macaé.",
        location: "Lagomar, Macaé — RJ",
        status: "PLANEJADO",
        coverImage: "/images/hero-social.jpg",
        isFeatured: true,
        areaId: educacaoArea.id,
      },
    });
  }

  if (meioAmbienteArea) {
    await prisma.project.upsert({
      where: { slug: "projeto-lagomar-sustentavel" },
      update: {},
      create: {
        slug: "projeto-lagomar-sustentavel",
        title: "Lagomar Sustentável — Preservação e Cidadania",
        summary: "Ações de conscientização ecológica, oficinas de reaproveitamento de materiais e preservação de áreas comunitárias.",
        description: "Projeto focado na promoção do desenvolvimento sustentável e educação ambiental para crianças e famílias, incentivando práticas que preservem o ecossistema local.",
        targetAudience: "Moradores de Lagomar e estudantes de escolas do entorno.",
        location: "Bairro Lagomar, Macaé — RJ",
        status: "PLANEJADO",
        coverImage: "/images/hero-social.jpg",
        isFeatured: true,
        areaId: meioAmbienteArea.id,
      },
    });
  }

  if (inclusaoArea) {
    await prisma.project.upsert({
      where: { slug: "projeto-acolher-comunitario" },
      update: {},
      create: {
        slug: "projeto-acolher-comunitario",
        title: "Acolher Comunitário — Apoio e Dignidade Familiar",
        summary: "Mapeamento socioassistencial e acolhimento de famílias em situação de vulnerabilidade social.",
        description: "Espaço de escuta, orientação para benefícios públicos socioassistenciais e encaminhamento comunitário conforme as prerrogativas estatutárias do ICSE.",
        targetAudience: "Famílias de baixa renda, idosos e pessoas com deficiência.",
        location: "Sede ICSE — Lagomar, Macaé — RJ",
        status: "PLANEJADO",
        coverImage: "/images/hero-social.jpg",
        isFeatured: true,
        areaId: inclusaoArea.id,
      },
    });
  }
  console.log("✅ Projetos institucionais planejados cadastrados.");

  // 5. Cursos e Oportunidades Iniciais
  await prisma.course.upsert({
    where: { slug: "curso-informatica-basica-inclusao-digital" },
    update: {},
    create: {
      slug: "curso-informatica-basica-inclusao-digital",
      title: "Inclusão Digital e Informática Prática",
      summary: "Capacitação prática em navegação na web, ferramentas de escritório, elaboração de currículos e serviços digitais.",
      description: "Curso livre desenvolvido para fornecer autonomia tecnológica no uso de computadores, editores de texto e serviços públicos digitais aos participantes.",
      workload: "30 horas",
      modality: "PRESENCIAL",
      location: "Sede ICSE — Lagomar, Macaé — RJ",
      requirements: "Idade a partir de 16 anos. Não é necessário conhecimento prévio.",
      totalSlots: 20,
      enrollmentPeriod: "Abertura em breve pela coordenação pedagógica",
      status: "EM_BREVE",
      isFeatured: true,
    },
  });

  await prisma.course.upsert({
    where: { slug: "curso-rotinas-administrativas-atendimento" },
    update: {},
    create: {
      slug: "curso-rotinas-administrativas-atendimento",
      title: "Rotinas Administrativas e Atendimento ao Cliente",
      summary: "Técnicas de atendimento com excelência, organização documental e comunicação corporativa.",
      description: "Curso preparatório focado no desenvolvimento de postura profissional, comunicação assertiva e rotinas de escritório para ingresso no mercado.",
      workload: "40 horas",
      modality: "PRESENCIAL",
      location: "Sede ICSE — Lagomar, Macaé — RJ",
      requirements: "Ensino Fundamental concluído ou cursando.",
      totalSlots: 25,
      enrollmentPeriod: "Divulgação do edital em breve",
      status: "EM_BREVE",
      isFeatured: true,
    },
  });
  console.log("✅ Cursos e oportunidades cadastradas.");

  // 6. Notícias Institucionais
  await prisma.news.upsert({
    where: { slug: "icse-lanca-portal-institucional-transparencia" },
    update: {},
    create: {
      slug: "icse-lanca-portal-institucional-transparencia",
      title: "ICSE lança portal institucional para ampliar transparência e canal com a comunidade",
      subtitle: "A plataforma oficial centraliza informações estatutárias, canais para voluntários, parceiros e divulgação de cursos.",
      content: `O Instituto Centro Social Elcimar (ICSE) disponibiliza à população de Macaé e do Estado do Rio de Janeiro sua plataforma web oficial. 

Com o novo portal, cidadãos, estudantes e lideranças podem consultar diretamente o Estatuto Social registrado, acompanhar as áreas de atuação em educação, assistência social, saúde e meio ambiente, além de manifestar interesse em voluntariado e parcerias institucionais.

A iniciativa reafirma o compromisso permanente do ICSE com os princípios da legalidade, moralidade, transparência e atendimento universal a toda a comunidade sem qualquer discriminação.`,
      category: "Institucional",
      author: "Diretoria Executiva do ICSE",
      status: "PUBLICADO",
      publishedAt: new Date(),
    },
  });

  await prisma.news.upsert({
    where: { slug: "reforma-estatutaria-e-compromisso-comunitario-2026" },
    update: {},
    create: {
      slug: "reforma-estatutaria-e-compromisso-comunitario-2026",
      title: "ICSE consolida atualização de seu estatuto e reafirma missão social em Lagomar",
      subtitle: "Diretoria Executiva e Conselho Fiscal registram formalmente as prerrogativas de apoio estudantil, qualificação e desenvolvimento comunitário.",
      content: `Em conformidade com as deliberações assembleares e formalização em cartório de registro civil, o ICSE registrou sua alteração estatutária em Macaé. 

O documento estabelece detalhadamente as prerrogativas da instituição no apoio estudantil, intermediação de estágios, desenvolvimento de cursos profissionalizantes gratuitos e programas de saúde e meio ambiente.

Os recursos da associação são 100% aplicados no território nacional exclusivamente para os seus fins sociais, com gestão voluntária de sua diretoria executiva e fiscalização do Conselho Fiscal.`,
      category: "Institucional",
      author: "Secretaria Geral do ICSE",
      status: "PUBLICADO",
      publishedAt: new Date(Date.now() - 86400000 * 3),
    },
  });
  console.log("✅ Notícias institucionais cadastradas.");

  // 7. Documento Institucional (Estatuto)
  await prisma.document.upsert({
    where: { id: "doc-estatuto-oficial-2026" },
    update: {},
    create: {
      id: "doc-estatuto-oficial-2026",
      title: "Estatuto Social do ICSE — Primeira Alteração Consolidada",
      description: "Documento oficial registrado no RCPJ da Comarca da Capital do RJ sob nº 26203 e ata de alteração de 15/02/2026, com sede em Lagomar, Macaé/RJ.",
      category: "ESTATUTO",
      fileUrl: "/documentos/estatuto-icse-oficial.pdf",
      fileType: "PDF",
      fileSize: "1.4 MB",
      publicationDate: new Date("2026-02-15"),
      active: true,
    },
  });
  console.log("✅ Documento de transparência registrado.");

  // 8. Registro de Auditoria Inicial
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      userName: admin.name,
      action: "SISTEMA_INICIALIZADO",
      resource: "DatabaseSeed",
      details: "Povoamento inicial concluído com sucesso com dados oficiais do estatuto.",
      ipAddress: "127.0.0.1",
    },
  });

  console.log("🎉 Seed do ICSE finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

