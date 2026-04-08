import { Request, Response } from "express";
import { GetLogsService } from "../../services/logs/GetLogService";

class GetLogsController {
  async handle(req: Request, res: Response) {
    const { page, limit, userId, search, startDate, endDate } = req.query;

    const service = new GetLogsService();

    const result = await service.execute({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      userId: userId as string,
      search: search as string,
      startDate: startDate as string,
      endDate: endDate as string,
    });

    return res.json(result);
  }
}

export { GetLogsController };
