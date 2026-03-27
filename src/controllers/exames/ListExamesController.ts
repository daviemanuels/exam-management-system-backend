import { Request, Response } from "express";
import { ListExamesService } from "../../services/exames/ListExamesService";
import { TipoExame, StatusExame } from "@prisma/client";

export class ListExamesController {
  async handle(req: Request, res: Response) {
    const { tipo, status, pacienteNome, page, limit } = req.query;

    const service = new ListExamesService();

    try {
      const exames = await service.execute({
        tipo: tipo as TipoExame,
        status: status as StatusExame,
        pacienteNome: pacienteNome as string,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      });

      return res.json(exames);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao listar exames",
      });
    }
  }
}
