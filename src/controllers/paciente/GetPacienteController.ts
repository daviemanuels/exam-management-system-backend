import { Request, Response } from "express";
import { GetPacienteService } from "../../services/paciente/GetPacienteService";

class GetPacienteController {
  async handle(req: Request, res: Response) {
    const { page, limit, nome, email, cpf } = req.query;

    const service = new GetPacienteService();

    try {
      const pacientes = await service.execute({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        nome: nome as string,
        email: email as string,
        cpf: cpf as string,
      });

      return res.json(pacientes);
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}

export { GetPacienteController };
