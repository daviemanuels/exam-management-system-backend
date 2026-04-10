import { Router } from "express";

// Controllers
import { CreatePacienteController } from "../controllers/paciente/CreatePacienteController";

// Middleware
import { auth } from "../middlewares/auth";
import { GetPacienteController } from "../controllers/paciente/GetPacienteController";
import { UpdatePacienteController } from "../controllers/paciente/UpdatePacienteController";
import { DeletePacienteController } from "../controllers/paciente/DeletePacienteController";
import { isAdmin } from "../middlewares/admin";

const pacienteRoutes = Router();

// instância
const createPacienteController = new CreatePacienteController();
const getPacienteController = new GetPacienteController();
const updatePacienteController = new UpdatePacienteController();
const deletePacienteController = new DeletePacienteController();

// rotas

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gerenciamento de pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaciente'
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado
 */

pacienteRoutes.post(
  "/pacientes",
  auth,
  isAdmin,
  createPacienteController.handle,
);

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Lista pacientes com paginação e filtros
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
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
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtrar por nome do paciente
 *
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar por email
 *
 *       - in: query
 *         name: cpf
 *         schema:
 *           type: string
 *         description: Filtrar por CPF
 *
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Paciente'
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
 *         description: Erro ao buscar pacientes
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
pacienteRoutes.get("/pacientes", auth, getPacienteController.handle);

/**
 * @swagger
 * /paciente/{id}:
 *   put:
 *     summary: Atualiza um paciente
 *     tags: [Pacientes]
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
 *             $ref: '#/components/schemas/UpdatePaciente'
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *       401:
 *         description: Não autorizado
 */

pacienteRoutes.put(
  "/paciente/:id",
  auth,
  isAdmin,
  updatePacienteController.handle,
);

/**
 * @swagger
 * /paciente/{id}:
 *   delete:
 *     summary: Remove um paciente
 *     tags: [Pacientes]
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
 *         description: Paciente removido com sucesso
 *       404:
 *         description: Paciente não encontrado
 *       401:
 *         description: Não autorizado
 */

pacienteRoutes.delete(
  "/paciente/:id",
  auth,
  isAdmin,
  deletePacienteController.handle,
);

export { pacienteRoutes };
