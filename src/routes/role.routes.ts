import { Router } from "express";
import { auth } from "../middlewares/auth";

import { GetRoleController } from "../controllers/roles/GetRoleController";
import { CreateRoleController } from "../controllers/roles/CreateRoleController";
import { UpdateRoleController } from "../controllers/roles/UpdateRoleController";
import { DeleteRoleController } from "../controllers/roles/DeleteRoleController";
import { isAdmin } from "../middlewares/admin";

const roleRoutes = Router();

const getRoleController = new GetRoleController();
const createRoleController = new CreateRoleController();
const updateRoleController = new UpdateRoleController();
const deleteRoleController = new DeleteRoleController();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gerenciamento de roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Lista todas as roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente admin)
 */
roleRoutes.get("/roles", auth, isAdmin, getRoleController.handle);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Cria uma nova role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRole'
 *     responses:
 *       201:
 *         description: Role criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente admin)
 */
roleRoutes.post("/roles", auth, createRoleController.handle);

/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Atualiza uma role
 *     tags: [Roles]
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
 *             $ref: '#/components/schemas/UpdateRole'
 *     responses:
 *       200:
 *         description: Role atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role não encontrada
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente admin)
 */
roleRoutes.put("/role/:id", auth, isAdmin, updateRoleController.handle);

/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Remove uma role
 *     tags: [Roles]
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
 *         description: Role deletada com sucesso
 *       404:
 *         description: Role não encontrada
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (somente admin)
 */
roleRoutes.delete("/role/:id", auth, isAdmin, deleteRoleController.handle);

export { roleRoutes };
