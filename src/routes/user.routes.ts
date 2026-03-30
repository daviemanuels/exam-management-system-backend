import { Router } from "express";

// Controllers
import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthController } from "../controllers/user/AuthController";
import { GetUsersController } from "../controllers/user/GetUsersController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";

// middleware
import { auth } from "../middlewares/auth";

const userRoutes = Router();

// instâncias
const createUserController = new CreateUserController();
const authController = new AuthController();
const getUsersController = new GetUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

// públicas
userRoutes.post("/users", createUserController.handle);
userRoutes.post("/login", authController.handle);

// protegidas
userRoutes.get("/users", auth, getUsersController.handle);
userRoutes.put("/users/:id", auth, updateUserController.handle);
userRoutes.delete("/users/:id", auth, deleteUserController.handle);

export { userRoutes };
