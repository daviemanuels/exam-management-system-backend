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
pacienteRoutes.post(
  "/pacientes",
  auth,
  isAdmin,
  createPacienteController.handle,
);
pacienteRoutes.get("/pacientes", auth, getPacienteController.handle);
pacienteRoutes.put(
  "/paciente/:id",
  auth,
  isAdmin,
  updatePacienteController.handle,
);
pacienteRoutes.delete(
  "/paciente/:id",
  auth,
  isAdmin,
  deletePacienteController.handle,
);

export { pacienteRoutes };
