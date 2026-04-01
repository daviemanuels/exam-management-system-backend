import { Request, Response } from "express";
import { UpdateRoleService } from "../../services/roles/UpdateRoleService";

class UpdateRoleController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, status } = req.body;

    const updateRoleService = new UpdateRoleService();

    try {
      const role = await updateRoleService.execute({
        id: String(id),
        name,
        status,
      });

      return res.json(role);
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}

export { UpdateRoleController };
