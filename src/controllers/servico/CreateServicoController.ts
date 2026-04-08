import { Request, Response } from "express";
import { CreateServicoService } from "../../services/servico/CreateServicoService";

export class CreateServicoController {
  async handle(req: Request, res: Response) {
    const { nome, status } = req.body;

    // 🔹 validação básica
    if (!nome) {
      return res.status(400).json({
        error: "Nome é obrigatório",
      });
    }

    const service = new CreateServicoService();

    const userId = req.userId;

    try {
      const servico = await service.execute({
        nome,
        status,
        userId,
      });

      return res.json(servico);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao criar serviço",
      });
    }
  }
}
