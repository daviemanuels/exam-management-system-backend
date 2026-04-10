import { Router } from "express";

// Controllers
import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthController } from "../controllers/user/AuthController";
import { GetUsersController } from "../controllers/user/GetUsersController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";

// middleware
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/admin";

const userRoutes = Router();

// instâncias
const createUserController = new CreateUserController();
const authController = new AuthController();
const getUsersController = new GetUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "uuid"
 *         nome:
 *           type: string
 *           example: "João Silva"
 *         login:
 *           type: string
 *           example: "joao123"
 *         status:
 *           type: string
 *           example: "Ativo"
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - nome
 *               - senha
 *             properties:
 *               login:
 *                 type: string
 *                 example: "admin"
 *               nome:
 *                 type: string
 *                 example: "Administrador"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na requisição
 */
userRoutes.post("/users", createUserController.handle);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - senha
 *             properties:
 *               login:
 *                 type: string
 *                 example: "admin"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas
 */
userRoutes.post("/login", authController.handle);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRoutes.get("/users", auth, isAdmin, getUsersController.handle);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Nome"
 *               status:
 *                 type: string
 *                 example: "Ativo"
 *               role_name:
 *                 type: string
 *                 example: "Administrador"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.put("/users/:id", auth, updateUserController.handle);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.delete("/users/:id", auth, isAdmin, deleteUserController.handle);

export { userRoutes };
