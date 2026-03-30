import { Request, Response } from "express";
import { DashboardService } from "../../services/estatisticas/DashboardService";

export class DashboardController {
  async handle(req: Request, res: Response) {
    const service = new DashboardService();

    try {
      const data = await service.execute();
      return res.json(data);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Erro ao carregar dashboard",
      });
    }
  }
}
