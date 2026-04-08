import { Request, Response } from "express";
import { UpdatePacienteService } from "../../services/paciente/UpdatePacienteService";
import { Sexo } from "@prisma/client";

class UpdatePacienteController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const {
      nome,
      cpf,
      email,
      telefone,
      dataNascimento,
      nacionalidade,
      sexo,
      endereco,
    } = req.body;

    const service = new UpdatePacienteService();

    const userId = req.userId;

    try {
      const paciente = await service.execute({
        id: String(id),
        nome,
        cpf,
        email,
        telefone,
        dataNascimento,
        nacionalidade,
        sexo: sexo as Sexo, //  cast necessário
        endereco,
        userId,
      });

      return res.json(paciente);
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}

export { UpdatePacienteController };
