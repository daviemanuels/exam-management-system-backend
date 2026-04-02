import { Request, Response } from "express";
import { UpdateServicoService } from "../../services/servico/UpdateServicoService";

class UpdateServicoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, status } = req.body;

    const service = new UpdateServicoService();

    const servico = await service.execute({
      id: String(id),
      nome,
      status,
    });

    return res.json(servico);
  }
}

export { UpdateServicoController };
