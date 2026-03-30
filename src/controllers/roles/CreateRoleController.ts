import { Request, Response } from "express";
import { CreateRoleService } from "../../services/roles/CreateRoleService";

class CreateRoleController {
  async handle(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const service = new CreateRoleService();

      const role = await service.execute({ name });

      return res.status(201).json(role);
    } catch (error: any) {
      console.error("Erro ao criar role:", error);

      return res.status(400).json({
        message: error.message || "Erro ao criar role",
      });
    }
  }
}

export { CreateRoleController };
