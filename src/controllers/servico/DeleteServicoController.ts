import { Request, Response } from "express";
import { DeleteServicoService } from "../../services/servico/DeleteServicoService";

class DeleteServicoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Não autorizado",
      });
    }

    const service = new DeleteServicoService();

    const result = await service.execute({
      id,
      userId,
    });

    return res.json(result);
  }
}

export { DeleteServicoController };
