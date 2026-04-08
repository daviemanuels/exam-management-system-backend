import { Request, Response } from "express";
import { UpdateExameService } from "../../services/exames/UpdateExameService";

class UpdateExameController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { tipo, pacienteId, servicos } = req.body;

    const userId = req.userId;

    const service = new UpdateExameService();

    const exame = await service.execute({
      id: String(id),
      tipo,
      pacienteId,
      servicos,
      userId,
    });

    return res.json(exame);
  }
}

export { UpdateExameController };
