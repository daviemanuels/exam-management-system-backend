import { Request, Response } from "express";
import { CreateExameService } from "../../services/exames/CreateExameService";
import { TipoExame } from "@prisma/client";

export class CreateExameController {
  async handle(req: Request, res: Response) {
    const { tipo, pacienteId, servicos } = req.body;
    const userId = req.userId;

    // 🔹 validações básicas (rápidas)
    if (!tipo) {
      return res.status(400).json({ error: "Tipo é obrigatório" });
    }

    if (!pacienteId) {
      return res.status(400).json({ error: "Paciente é obrigatório" });
    }

    const service = new CreateExameService();

    try {
      const exame = await service.execute({
        tipo: tipo as TipoExame, // 👈 alinhado com Prisma
        pacienteId,
        userId,
        servicos, // 👈 agora suportando N:N
      });

      return res.json(exame);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao criar exame",
      });
    }
  }
}
