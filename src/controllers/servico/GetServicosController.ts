import { Request, Response } from "express";
import { GetServicosService } from "../../services/servico/GetServicosService";

class GetServicosController {
  async handle(req: Request, res: Response) {
    const service = new GetServicosService();

    const servicos = await service.execute();

    return res.json(servicos);
  }
}

export { GetServicosController };
