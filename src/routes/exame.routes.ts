import { Router } from "express";

import { CreateExameController } from "../controllers/exames/CreateExameController";
import { ListExamesController } from "../controllers/exames/ListExamesController";
import { UpdateExameController } from "../controllers/exames/UpdateExameController";
import { DeleteExameController } from "../controllers/exames/DeleteExameController";

import { auth } from "../middlewares/auth";

const exameRoutes = Router();

// controllers
const createExameController = new CreateExameController();
const listExamesController = new ListExamesController();
const updateExamesController = new UpdateExameController();
const deleteExamesController = new DeleteExameController();

/**
 * @swagger
 * tags:
 *   name: Exames
 *   description: Gerenciamento de exames
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exame:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "uuid"
 *         nome:
 *           type: string
 *           example: "Hemograma"
 *         tipo:
 *           type: string
 *           example: "Anatomo"
 *         status:
 *           type: string
 *           example: "Ativo"
 *         createdAt:
 *           type: string
 *           example: "2026-04-10T10:00:00.000Z"
 */

/**
 * @swagger
 * /exames:
 *   post:
 *     summary: Cria um novo exame
 *     tags: [Exames]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *               - pacienteId
 *               - servicos
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum:
 *                   - ANATOMO
 *                   - COLPO
 *                   - IMUNO
 *                   - OUTROS
 *                 example: ANATOMO
 *               pacienteId:
 *                 type: string
 *                 example: 59f8c8dc-d252-4afc-a005-b2c0f8d76004
 *               servicos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - 96c16fbe-1ee7-4d2d-9d3d-988a97d7d50a
 *     responses:
 *       201:
 *         description: Exame criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 pacienteId:
 *                   type: string
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado
 */
exameRoutes.post("/exames", auth, createExameController.handle);

/**
 * @swagger
 * /exames:
 *   get:
 *     summary: Lista exames com filtros e paginação
 *     tags: [Exames]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum:
 *             - ANATOMO
 *             - COLPO
 *             - IMUNO
 *             - OUTROS
 *         description: Filtrar por tipo de exame
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - PENDENTE
 *             - CONCLUIDO
 *         description: Filtrar por status do exame
 *
 *       - in: query
 *         name: pacienteNome
 *         schema:
 *           type: string
 *         description: Filtrar por nome do paciente
 *
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
 *     responses:
 *       200:
 *         description: Lista de exames retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Exame'
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *
 *       400:
 *         description: Erro ao listar exames
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *
 *       401:
 *         description: Não autorizado
 */
exameRoutes.get("/exames", auth, listExamesController.handle);

/**
 * @swagger
 * /exames/{id}:
 *   put:
 *     summary: Atualiza um exame
 *     tags: [Exames]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do exame
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Hemograma atualizado"
 *               tipo:
 *                 type: string
 *                 example: "Citológico"
 *               status:
 *                 type: string
 *                 example: "Ativo"
 *     responses:
 *       200:
 *         description: Exame atualizado com sucesso
 *       404:
 *         description: Exame não encontrado
 */
exameRoutes.put("/exames/:id", auth, updateExamesController.handle);

/**
 * @swagger
 * /exames/{id}:
 *   delete:
 *     summary: Remove um exame
 *     tags: [Exames]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do exame
 *     responses:
 *       200:
 *         description: Exame removido com sucesso
 *       404:
 *         description: Exame não encontrado
 */
exameRoutes.delete("/exames/:id", auth, deleteExamesController.handle);

export { exameRoutes };
