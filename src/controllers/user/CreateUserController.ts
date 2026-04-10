import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { nome, login, senha, funcao_usuario, roleId } = req.body;

      const service = new CreateUserService();

      const result = await service.execute({
        nome,
        login,
        senha,
        funcao_usuario,
        roleId,
      });

      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao criar usuário",
      });
    }
  }
}
