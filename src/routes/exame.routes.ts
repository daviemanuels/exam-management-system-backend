import { Router } from "express";

import { CreateExameController } from "../controllers/exames/CreateExameController";
import { ListExamesController } from "../controllers/exames/ListExamesController";
import { auth } from "../middlewares/auth";
import { UpdateExameController } from "../controllers/exames/UpdateExameController";
import { DeleteExameController } from "../controllers/exames/DeleteExameController";

const exameRoutes = Router();

const createExameController = new CreateExameController();
const listExamesController = new ListExamesController();
const updateExamesController = new UpdateExameController();
const deleteExamesController = new DeleteExameController();

exameRoutes.post("/exames", auth, createExameController.handle);
exameRoutes.get("/exames", auth, listExamesController.handle);
exameRoutes.put("/exame/:id", auth, updateExamesController.handle);
exameRoutes.delete("/exame/:id", auth, deleteExamesController.handle);

export { exameRoutes };
