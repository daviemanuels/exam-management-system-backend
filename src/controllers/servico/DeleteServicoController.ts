import { Request, Response } from "express";
import { DeleteServicoService } from "../../services/servico/DeleteServicoService";

class DeleteServicoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteServicoService();

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const result = await service.execute(id);

    return res.json(result);
  }
}

export { DeleteServicoController };
