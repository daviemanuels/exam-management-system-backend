import { Request, Response } from "express";
import { DeleteExameService } from "../../services/exames/DeleteExameService";

class DeleteExameController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeleteExameService();

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const result = await service.execute(id);

    return res.json(result);
  }
}

export { DeleteExameController };
