import { Request, Response } from "express";
import { DeletePacienteService } from "../../services/paciente/DeletePacienteService";

class DeletePacienteController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new DeletePacienteService();

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    try {
      const result = await service.execute({ id });

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}

export { DeletePacienteController };
