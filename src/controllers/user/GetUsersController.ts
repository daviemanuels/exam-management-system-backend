import { Request, Response } from "express";
import { GetUsersService } from "../../services/user/GetUsersService";

class GetUsersController {
  async handle(req: Request, res: Response) {
    try {
      const service = new GetUsersService();

      const users = await service.execute();

      return res.json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);

      return res.status(500).json({
        message: "Erro ao buscar usuários",
      });
    }
  }
}

export { GetUsersController };
