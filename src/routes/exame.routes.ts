import { Router } from "express";

import { CreateExameController } from "../controllers/exames/CreateExameController";
import { ListExamesController } from "../controllers/exames/ListExamesController";
import { auth } from "../middlewares/auth";

const exameRoutes = Router();

const createExameController = new CreateExameController();
const listExamesController = new ListExamesController();

exameRoutes.post("/exames", auth, createExameController.handle);
exameRoutes.get("/exames", auth, listExamesController.handle);

export { exameRoutes };
