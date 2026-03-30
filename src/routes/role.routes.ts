import { Router } from "express";
import { auth } from "../middlewares/auth";

import { GetRoleController } from "../controllers/roles/GetRoleController";
import { CreateRoleController } from "../controllers/roles/CreateRoleController";

const roleRoutes = Router();

const getRoleController = new GetRoleController();
const createRoleController = new CreateRoleController();

roleRoutes.get("/roles", auth, getRoleController.handle);
roleRoutes.post("/roles", auth, createRoleController.handle);

export { roleRoutes };
