import { Request, Response } from "express";
import { UpdateExameService } from "../../services/exames/UpdateExameService";

class UpdateExameController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { tipo, pacienteId, servicos } = req.body;

    const service = new UpdateExameService();

    const exame = await service.execute({
      id: String(id),
      tipo,
      pacienteId,
      servicos,
    });

    return res.json(exame);
  }
}

export { UpdateExameController };
