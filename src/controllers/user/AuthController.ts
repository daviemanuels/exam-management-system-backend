import { Request, Response } from "express";
import { AuthService } from "../../services/user/AuthService";

export class AuthController {
  async handle(req: Request, res: Response) {
    const { login, senha } = req.body;

    const service = new AuthService();

    const result = await service.execute({ login, senha });

    return res.json(result);
  }
}
