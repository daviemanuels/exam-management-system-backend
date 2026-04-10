import { Router } from "express";

// Controllers
import { DashboardController } from "../controllers/estatisticas/DashboardController";

// Middleware
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/admin";

const dashboardRoutes = Router();

// instância
const dashboardController = new DashboardController();

// rota

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Retorna estatísticas gerais do sistema
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do dashboard retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 *
 *       401:
 *         description: Não autorizado
 *
 *       403:
 *         description: Acesso negado (somente admin)
 *
 *       400:
 *         description: Erro ao carregar dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
dashboardRoutes.get("/dashboard", auth, isAdmin, dashboardController.handle);

export { dashboardRoutes };
