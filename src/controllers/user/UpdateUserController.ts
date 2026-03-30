import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, login, senha, funcao_usuario, roleId, status } = req.body;

      const service = new UpdateUserService();

      const user = await service.execute({
        id: String(id),
        nome,
        login,
        senha,
        funcao_usuario,
        roleId,
        status,
      });

      return res.json(user);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);

      return res.status(500).json({
        message: "Erro ao atualizar usuário",
      });
    }
  }
}

export { UpdateUserController };
