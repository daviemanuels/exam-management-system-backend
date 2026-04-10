import { Router } from "express";

// Controllers
import { CreateServicoController } from "../controllers/servico/CreateServicoController";

// Middleware
import { auth } from "../middlewares/auth";
import { GetServicosController } from "../controllers/servico/GetServicosController";
import { UpdateServicoController } from "../controllers/servico/UpdateServicoController";
import { DeleteServicoController } from "../controllers/servico/DeleteServicoController";
import { isAdmin } from "../middlewares/admin";

const servicoRoutes = Router();

// instância
const createServicoController = new CreateServicoController();
const getServicoController = new GetServicosController();
const updateServicoController = new UpdateServicoController();
const deleteServicoController = new DeleteServicoController();

// rota

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateServico'
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente admin)
 */
servicoRoutes.post("/servicos", auth, isAdmin, createServicoController.handle);

/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Lista todos os serviços
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servico'
 *       401:
 *         description: Não autorizado
 */
servicoRoutes.get("/servicos", auth, getServicoController.handle);

/**
 * @swagger
 * /servico/{id}:
 *   put:
 *     summary: Atualiza um serviço
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateServico'
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *       404:
 *         description: Serviço não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente admin)
 */
servicoRoutes.put(
  "/servico/:id",
  auth,
  isAdmin,
  updateServicoController.handle,
);

/**
 * @swagger
 * /servico/{id}:
 *   delete:
 *     summary: Remove um serviço
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Serviço removido com sucesso
 *       404:
 *         description: Serviço não encontrado
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente admin)
 */
servicoRoutes.delete(
  "/servico/:id",
  auth,
  isAdmin,
  deleteServicoController.handle,
);

export { servicoRoutes };
