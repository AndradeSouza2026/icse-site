# Portal Institucional do ICSE — Instituto Centro Social Elcimar

Plataforma web institucional completa, moderna, acessível e segura desenvolvida para o **ICSE — Instituto Centro Social Elcimar** (Associação privada sem fins lucrativos, CNPJ 97.542.996/0001-07, com sede em Lagomar, Macaé — RJ).

---

## 🏛️ 1. Identificação Institucional Oficial

As informações institucionais foram rigorosamente extraídas e validadas conforme o **Estatuto Social Oficial do ICSE** (Primeira Alteração de 15 de fevereiro de 2026):

- **Razão Social:** ICSE — Instituto Centro Social Elcimar
- **Natureza Jurídica:** Associação Privada Sem Fins Lucrativos (100% social, com princípios de utilidade pública)
- **CNPJ:** `97.542.996/0001-07`
- **Data de Constituição:** 04 de outubro de 2009
- **Registro Cartorário:** Cartório de Registro Civil de Pessoas Jurídicas da Comarca da Capital do Estado do Rio de Janeiro, sob nº 26203
- **Endereço da Sede Provisória:** Avenida Dr. Sérgio Vieira de Melo, nº 55, Lagomar, Macaé — RJ, CEP 27966-620
- **Princípios Estatutários (Art. 2º, XIII):** Legalidade, Impessoalidade, Moralidade, Publicidade, Economicidade e Eficiência
- **Aplicação de Recursos (Art. 3º e 29):** 100% das rendas e receitas são aplicadas no território nacional na consecução dos fins sociais
- **Diretoria Voluntária (Art. 22):** Cargos não remunerados, sem distribuição de lucros ou bonificações
- **Diretoria Estatutária (Ata 2026):**
  - **Presidente:** Luís Claudio de Morais Marques
  - **Vice-Presidente:** Marcilene Martins Siqueira
  - **Primeira Secretária:** Marciana Martins Siqueira
  - **Tesoureiro:** Clederson de Jesus Santos
  - **Conselho Fiscal:** Neide de Souza Santos, Ana Cláudia da Silva Marques, Erick Bernado Gomes

---

## 🚀 2. Arquitetura Técnica & Tecnologias

- **Framework:** Next.js 14 (App Router, Server Components & Server Actions)
- **Linguagem:** TypeScript 5.6
- **Estilização:** Tailwind CSS 3.4 com paleta institucional (Azul `#0e5a9e`, Verde `#16a34a`, Laranja `#ea580c`, Branco e Cinza)
- **Banco de Dados & ORM:** Prisma ORM 5.22
  - *Ambiente de Desenvolvimento Local:* SQLite (`dev.db`)
  - *Ambiente de Produção:* PostgreSQL (basta alterar a variável `DATABASE_URL` e o provider)
- **Autenticação:** Cookies HTTP-Only com JWT assinado (`jose`) e hash criptográfico de senhas (`bcryptjs`)
- **Validação de Dados:** Zod em todas as camadas de entrada (Server Actions e formulários)
- **Ícones:** Lucide React
- **Segurança & LGPD:** Termos de consentimento obrigatórios, minimização de dados, trilha de auditoria completa (`AuditLog`), sem dados sensíveis em logs

---

## 🌐 3. Estrutura de Páginas e Módulos

### 3.1 Portal Público
- `/` — **Página Inicial:** Hero institucional impactante com a logo oficial, apresentação do ICSE, cartões das 8 áreas estatutárias, projetos sociais, cursos gratuitos, notícias recentes, voluntariado, parcerias e rodapé completo.
- `/quem-somos` — **Quem Somos:** Histórico de fundação em 2009, registro em cartório, compromissos estatutários, missão, visão e valores editoriais, e nominata completa da Diretoria e Conselho Fiscal.
- `/areas-de-atuacao` — **Áreas de Atuação:** 8 eixos temáticos do Art. 2º com detalhamento, público atendido e projetos vinculados:
  1. Educação e Qualificação Profissional
  2. Inclusão Social e Assistência Social
  3. Saúde e Qualidade de Vida
  4. Meio Ambiente e Sustentabilidade
  5. Esporte, Lazer e Recreação
  6. Cultura, Arte e Atividades Comunitárias
  7. Apoio Estudantil e Oportunidades Educacionais
  8. Voluntariado e Desenvolvimento Comunitário
- `/projetos` e `/projetos/[slug]` — **Catálogo de Projetos:** Filtros por situação (*Planejado*, *Em Andamento*, *Concluído*), ficha técnica, público-alvo, localização e canais de apoio.
- `/cursos` e `/cursos/[slug]` — **Cursos & Oportunidades:** Carga horária, modalidade (Presencial, EAD, Híbrido), localidade, requisitos e **formulário integrado de inscrição/manifestação de interesse**.
- `/noticias` e `/noticias/[slug]` — **Comunicação Institucional:** Publicações, matérias, comunicados da presidência e categorias.
- `/transparencia` — **Portal da Transparência:** Download e consulta direta do **Estatuto Social Oficial em PDF** (`/documentos/estatuto-icse-oficial.pdf`), diretrizes de governança e formulário para transparência passiva.
- `/seja-voluntario` — **Formulário de Voluntariado:** Cadastro com áreas de preferência, disponibilidade de turnos, motivação e consentimento LGPD.
- `/seja-parceiro` — **Formulário de Parcerias PJ:** Canal para diálogo com empresas, universidades e órgãos públicos para convênios e apoio a projetos.
- `/contato` — **Fale Conosco:** Dados da sede em Lagomar, horário de atendimento, telefones, e-mail e formulário de ouvidoria.
- `/politica-de-privacidade` — **LGPD:** Diretrizes de proteção de dados conforme a Lei Federal 13.709/2018.
- `/sitemap.xml` e `/robots.txt` — SEO institucional otimizado para Macaé e o Rio de Janeiro.

### 3.2 Painel Administrativo (`/admin`)
- `/admin/login` — Autenticação segura com credenciais protegidas e auditoria de login.
- `/admin` — **Dashboard Geral:** Indicadores reais calculados a partir do banco de dados (projetos em andamento, inscrições pendentes, mensagens não lidas, voluntários, propostas de parcerias, trilha de auditoria).
- `/admin/projetos` — Criar, listar, alterar status e remover projetos.
- `/admin/cursos` — Publicar novos cursos, gerenciar vagas e períodos de inscrição.
- `/admin/inscricoes` — Gerenciar candidatos inscritos nos cursos com alteração de status (*Pendente*, *Confirmado*, *Lista de Espera*, *Cancelado*).
- `/admin/noticias` — Redigir, publicar e gerenciar comunicados com status (*Publicado* ou *Rascunho*).
- `/admin/documentos` — Publicar e classificar atos oficiais, relatórios e atas na transparência.
- `/admin/mensagens` — Consultar mensagens de contato com status (*Nova*, *Lida*, *Respondida*, *Arquivada*).
- `/admin/voluntarios` — Gestão de voluntários cadastrados com triagem e contatos.
- `/admin/parcerias` — Gestão de propostas de convênios institucionais com status (*Novo*, *Em Análise*, *Em Reunião*, *Formalizado*).
- `/admin/configuracoes` — Edição em tempo real de contatos, horários, textos da Home e dados da sede (Acesso restrito ao perfil `ADMIN`).
- `/admin/usuarios` — Criação de novos operadores (`ADMIN` ou `EDITOR`), ativação/desativação e visualização completa da trilha de auditoria (`AuditLog`).

---

## 💻 4. Guia de Execução Local

### Pré-requisitos
- Node.js versão 18 ou superior (Node v26 verificado)
- npm ou npx

### Passo a Passo

1. **Clonar ou abrir o repositório:**
   ```bash
   cd "ICSE - SITE"
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Configurar o arquivo `.env`:**
   O arquivo `.env` já vem pré-configurado para desenvolvimento local com SQLite:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="icse-secret-super-seguro-trocar-em-producao-2026-chave-admin"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   SEED_ADMIN_EMAIL="admin@icse.org.br"
   SEED_ADMIN_PASSWORD="Admin@ICSE2026!"
   SEED_ADMIN_NAME="Administrador Geral ICSE"
   ```

4. **Sincronizar o Banco de Dados e Executar o Seed Inicial:**
   ```bash
   npx prisma db push
   node scripts/seed.mjs
   ```

5. **Iniciar o Servidor em Modo de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse o portal público em `http://localhost:3000`.

6. **Acessar o Painel Administrativo:**
   Acesse `http://localhost:3000/admin/login` e informe:
   - **E-mail:** `admin@icse.org.br`
   - **Senha:** `Admin@ICSE2026!`

---

## 🧪 5. Execução de Testes Automatizados

Para rodar a bateria de testes de integridade institucional, autenticação, persistência de formulários e auditoria:
```bash
node scripts/test-flows.mjs
```

Para validar a compilação completa de produção:
```bash
npm run build
```

---

## 🔒 6. Publicação em Produção (Deploy)

### 6.1 Preparação para PostgreSQL
Caso deseje utilizar PostgreSQL em produção (como no Supabase, Neon ou Render):
1. No arquivo `prisma/schema.prisma`, altere o datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Defina a variável `DATABASE_URL="postgresql://usuario:senha@host:5432/icse_db"` no provedor de hospedagem.
3. Gere o client e execute o schema:
   ```bash
   npx prisma db push
   node scripts/seed.mjs
   ```

### 6.2 Vercel / Servidor VPS
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Variáveis de Ambiente Necessárias:**
  - `DATABASE_URL`
  - `JWT_SECRET` (gerar uma chave forte aleatória com 32+ caracteres)
  - `NEXT_PUBLIC_SITE_URL` (ex: `https://icse.org.br`)
  - `SEED_ADMIN_EMAIL`
  - `SEED_ADMIN_PASSWORD`

---

## 💾 7. Política de Backup do Banco de Dados

- **SQLite (Dev):** Faça backup periódico copiando o arquivo `prisma/dev.db` para um local seguro ou storage versionado.
- **PostgreSQL (Prod):** Configure backups automáticos diários usando `pg_dump`:
  ```bash
  pg_dump -U usuario -h host -d icse_db > backup_icse_$(date +%Y%m%d).sql
  ```
- **Restauração:**
  ```bash
  psql -U usuario -h host -d icse_db < backup_icse_20260215.sql
  ```

---

## ⚖️ 8. Licença & Direitos Autorais

© 2026 **ICSE — Instituto Centro Social Elcimar**. Todos os direitos reservados.
Projeto desenvolvido para fortalecer a transformação social e comunitária em Macaé — RJ.

