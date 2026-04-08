import { Router } from "express";
import { auth } from "../middlewares/auth";
import { GetLogsController } from "../controllers/logs/GetLogController";

const logRoutes = Router();

const getLogController = new GetLogsController();

logRoutes.get("/logs", auth, getLogController.handle);

export { logRoutes };
