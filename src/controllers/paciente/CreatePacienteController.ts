import { Request, Response } from "express";
import { CreatePacienteService } from "../../services/paciente/CreatePacienteService";
import { Sexo } from "@prisma/client";

export class CreatePacienteController {
  async handle(req: Request, res: Response) {
    const {
      nome,
      cpf,
      dataNascimento,
      email,
      telefone,
      nacionalidade,
      sexo,
      endereco,
    } = req.body;

    const service = new CreatePacienteService();

    try {
      const paciente = await service.execute({
        nome,
        cpf,
        dataNascimento,
        email,
        telefone,
        nacionalidade,
        sexo: sexo as Sexo, // 🔥 importante
        endereco,
      });

      return res.json(paciente);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao criar paciente",
      });
    }
  }
}
