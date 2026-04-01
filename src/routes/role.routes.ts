import { Router } from "express";
import { auth } from "../middlewares/auth";

import { GetRoleController } from "../controllers/roles/GetRoleController";
import { CreateRoleController } from "../controllers/roles/CreateRoleController";
import { UpdateRoleController } from "../controllers/roles/UpdateRoleController";
import { DeleteRoleController } from "../controllers/roles/DeleteRoleController";

const roleRoutes = Router();

const getRoleController = new GetRoleController();
const createRoleController = new CreateRoleController();
const updateRoleController = new UpdateRoleController();
const deleteRoleController = new DeleteRoleController();

roleRoutes.get("/roles", auth, getRoleController.handle);
roleRoutes.post("/roles", auth, createRoleController.handle);
roleRoutes.put("/role/:id", auth, updateRoleController.handle);
roleRoutes.delete("/role/:id", auth, deleteRoleController.handle);

export { roleRoutes };
