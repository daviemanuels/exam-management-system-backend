# 🧪 Exam Management System — Backend API

Este é o backend do **Exam Management System**, uma API REST desenvolvida com **Node.js**, **Express** e **Prisma**, responsável pelo gerenciamento de pacientes, exames, serviços, permissões e logs do sistema.

A API também conta com documentação interativa utilizando **Swagger (OpenAPI)**.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger (OpenAPI)
- JWT (Autenticação)

---

## Architecture

Frontend (Vercel) -> https://github.com/daviemanuels/exam-management-system-frontend
↓
Backend (Render)
↓
Database (Neon)

## 🌐 Base URL

https://exam-management-system-backend-6gzw.onrender.com

## 📄 API Documentation

Swagger disponível em:

👉 https://exam-management-system-backend-6gzw.onrender.com/docs

## 📚 Documentação da API (Swagger - LOCAL)

A documentação interativa está disponível após iniciar o servidor:

👉 **http://localhost:3333/docs**

No Swagger você pode:

- Visualizar todas as rotas da API
- Testar endpoints diretamente
- Ver schemas de request/response
- Utilizar autenticação via Bearer Token

---

## 🔐 Autenticação

A API utiliza autenticação via **JWT (Bearer Token)**.

### Como usar no Swagger:

1. Faça login na rota `/login`
2. Copie o token retornado
3. Clique em **Authorize** no Swagger
4. Insira: Bearer SEU_TOKEN

---

## 📦 Estrutura do Projeto

```bash
src/
├── controllers/ # Camada de controle (entrada das requisições)
├── services/ # Regras de negócio
├── routes/ # Definição das rotas
├── middlewares/ # Autenticação e autorização
├── prisma/ # Configuração do banco de dados
├── docs/
│ └── schemas/ # Schemas Swagger organizados
```

---

## 🧩 Funcionalidades

### 👤 Autenticação

- Login de usuários
- Proteção de rotas com JWT

### 🧑‍⚕️ Pacientes

- Criar paciente
- Listar pacientes (com paginação e filtros)
- Atualizar paciente
- Remover paciente

### 🧪 Exames

- Criar exames
- Listar exames (com filtros por tipo, status e paciente)
- Controle de status (PENDENTE / CONCLUIDO)

### 🧾 Serviços

- CRUD completo de serviços
- Utilizados na criação de exames

### 🔐 Roles (Permissões)

- Controle de acesso baseado em roles
- Rotas protegidas para administradores

### 📊 Dashboard

- Estatísticas gerais do sistema
- Total de pacientes
- Total de exames
- Distribuição por tipo

### 📜 Logs (Auditoria)

- Registro de ações do sistema
- Filtros por:
  - usuário
  - texto
  - período (data inicial/final)
- Paginação

---

## 🔍 Padrões da API

### 📌 Paginação

Alguns endpoints utilizam: ?page=1&limit=10

---

### 📌 Filtros

Exemplo:
/exames?tipo=ANATOMO&status=PENDENTE

---

### 📌 Resposta padrão (exemplo)

```json
{
  "data": [],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

## ⚙️ Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/db"
JWT_SECRET="sua_chave_secreta"
NODE_ENV=production
```

### 4. Configurar o Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Rodar o servidor

```bash
npm run dev
```

### 6. Acessar documentação

```bash
http://localhost:3333/docs
```
