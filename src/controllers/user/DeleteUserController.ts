import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          message: "ID inválido",
        });
      }

      const service = new DeleteUserService();

      const result = await service.execute(id);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao deletar usuário",
      });
    }
  }
}
