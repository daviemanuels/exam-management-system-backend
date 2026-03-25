import { Router } from "express";

// Controllers
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthController } from "./controllers/user/AuthController";

const router = Router();

// Instâncias
const createUserController = new CreateUserController();
const authController = new AuthController();

// Rotas
router.post("/users", createUserController.handle);
router.post("/login", authController.handle);

export { router as routes };
