import { Request, Response } from "express";
import { DeleteExameService } from "../../services/exames/DeleteExameService";

class DeleteExameController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    //  pega o userId (ajuste conforme seu middleware de auth)
    const userId = req.userId;

    const service = new DeleteExameService();

    const result = await service.execute({
      id,
      userId,
    });

    return res.json(result);
  }
}

export { DeleteExameController };
