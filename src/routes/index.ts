// routes/index.ts
import { Router } from "express";

import { userRoutes } from "./user.routes";
import { pacienteRoutes } from "./paciente.routes";
import { exameRoutes } from "./exame.routes";
import { servicoRoutes } from "./servico.routes";
import { roleRoutes } from "./role.routes";
import { dashboardRoutes } from "./dashboard.routes";

const router = Router();

router.use(userRoutes);
router.use(pacienteRoutes);
router.use(exameRoutes);
router.use(servicoRoutes);
router.use(roleRoutes);
router.use(dashboardRoutes);

export { router };
