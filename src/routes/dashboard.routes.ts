import { Router } from "express";

// Controllers
import { DashboardController } from "../controllers/estatisticas/DashboardController";

// Middleware
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/admin";

const dashboardRoutes = Router();

// instância
const dashboardController = new DashboardController();

// rota
dashboardRoutes.get("/dashboard", auth, isAdmin, dashboardController.handle);

export { dashboardRoutes };
