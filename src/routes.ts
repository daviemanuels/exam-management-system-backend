import { Router } from "express";

// Controllers
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthController } from "./controllers/user/AuthController";
import { CreatePacienteController } from "./controllers/paciente/CreatePacienteController";

// Middleware
import { auth } from "./middlewares/auth";
import { CreateExameController } from "./controllers/exames/CreateExameController";
import { CreateServicoController } from "./controllers/servico/CreateServicoController";
import { ListExamesController } from "./controllers/exames/ListExamesController";
import { DashboardController } from "./controllers/estatisticas/DashboardController";
import { GetUsersController } from "./controllers/user/GetUsersController";
import { GetRoleController } from "./controllers/roles/GetRoleController";
import { CreateRoleController } from "./controllers/roles/CreateRoleController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";

const router = Router();

// Instâncias
const createUserController = new CreateUserController();
const authController = new AuthController();
const createPacienteController = new CreatePacienteController();
const createExameController = new CreateExameController();
const createServicoController = new CreateServicoController();
const listExamesController = new ListExamesController();
const dashboardController = new DashboardController();
const getUsersController = new GetUsersController();
const getRoleController = new GetRoleController();
const createRoleController = new CreateRoleController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

// Rotas públicas
router.post("/users", createUserController.handle);
router.post("/login", authController.handle);

// 🔒 Rota protegida
router.post("/pacientes", auth, createPacienteController.handle);
router.post("/exames", auth, createExameController.handle);
router.post("/servicos", auth, createServicoController.handle);
router.get("/exames", auth, listExamesController.handle);
router.get("/dashboard", auth, dashboardController.handle);

router.get("/users", auth, getUsersController.handle);
router.put("/users/:id", auth, updateUserController.handle);
router.delete("/user/:id", auth, deleteUserController.handle);
router.get("/roles", auth, getRoleController.handle);
router.post("/roles", auth, createRoleController.handle);

export { router as routes };
