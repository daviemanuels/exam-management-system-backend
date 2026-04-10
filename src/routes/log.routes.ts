import { Router } from "express";
import { auth } from "../middlewares/auth";
import { GetLogsController } from "../controllers/logs/GetLogController";

const logRoutes = Router();

const getLogController = new GetLogsController();

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Lista logs do sistema com filtros e paginação
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Página atual
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Quantidade de registros por página
 *
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filtrar por ID do usuário
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Busca por texto na mensagem do log
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2025-01-01
 *         description: Data inicial (YYYY-MM-DD)
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2025-12-31
 *         description: Data final (YYYY-MM-DD)
 *
 *     responses:
 *       200:
 *         description: Logs retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogsResponse'
 *
 *       401:
 *         description: Não autorizado
 *
 *       400:
 *         description: Erro ao buscar logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
logRoutes.get("/logs", auth, getLogController.handle);

export { logRoutes };
