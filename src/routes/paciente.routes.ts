import { Router } from "express";

// Controllers
import { CreatePacienteController } from "../controllers/paciente/CreatePacienteController";

// Middleware
import { auth } from "../middlewares/auth";

const pacienteRoutes = Router();

// instância
const createPacienteController = new CreatePacienteController();

// rotas
pacienteRoutes.post("/pacientes", auth, createPacienteController.handle);

export { pacienteRoutes };
