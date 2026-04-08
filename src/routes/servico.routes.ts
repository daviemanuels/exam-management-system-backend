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
servicoRoutes.post("/servicos", auth, isAdmin, createServicoController.handle);
servicoRoutes.get("/servicos", auth, getServicoController.handle);
servicoRoutes.put(
  "/servico/:id",
  auth,
  isAdmin,
  updateServicoController.handle,
);
servicoRoutes.delete(
  "/servico/:id",
  auth,
  isAdmin,
  deleteServicoController.handle,
);

export { servicoRoutes };
