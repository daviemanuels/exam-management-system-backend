import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Exam Management System API",
      version: "1.0.0",
    },
    tags: [
      { name: "Auth", description: "Autenticação" },
      { name: "Dashboard", description: "Estatísticas do sistema" },
      { name: "Users", description: "Gerenciamento de usuários" },
      { name: "Pacientes", description: "Gerenciamento de pacientes" },
      { name: "Exames", description: "Gerenciamento de exames" },
      { name: "Serviços", description: "Gerenciamento de serviços" },
      { name: "Roles", description: "Controle de permissões" },
      { name: "Logs", description: "Auditoria do sistema" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    isProd
      ? path.join(__dirname, "../routes/*.js")
      : path.join(__dirname, "../routes/*.ts"),

    isProd
      ? path.join(__dirname, "../docs/schemas/*.js")
      : path.join(__dirname, "../docs/schemas/*.ts"),
  ],
});
