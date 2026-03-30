import { Request, Response } from "express";
import { GetRoleService } from "../../services/roles/GetRoleService";

class GetRoleController {
  async handle(req: Request, res: Response) {
    try {
      const service = new GetRoleService();

      const roles = await service.execute();

      return res.json(roles);
    } catch (error) {
      console.error("Erro ao buscar roles:", error);

      return res.status(500).json({
        message: "Erro ao buscar roles",
      });
    }
  }
}

export { GetRoleController };
