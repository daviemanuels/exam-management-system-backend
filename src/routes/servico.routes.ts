import { Router } from "express";

// Controllers
import { CreateServicoController } from "../controllers/servico/CreateServicoController";

// Middleware
import { auth } from "../middlewares/auth";

const servicoRoutes = Router();

// instância
const createServicoController = new CreateServicoController();

// rota
servicoRoutes.post("/servicos", auth, createServicoController.handle);

export { servicoRoutes };
