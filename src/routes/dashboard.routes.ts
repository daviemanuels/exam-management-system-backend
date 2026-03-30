import { Router } from "express";

// Controllers
import { DashboardController } from "../controllers/estatisticas/DashboardController";

// Middleware
import { auth } from "../middlewares/auth";

const dashboardRoutes = Router();

// instância
const dashboardController = new DashboardController();

// rota
dashboardRoutes.get("/dashboard", auth, dashboardController.handle);

export { dashboardRoutes };
