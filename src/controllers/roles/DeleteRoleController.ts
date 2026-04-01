import { Request, Response } from "express";
import { DeleteRoleService } from "../../services/roles/DeleteRoleService";

class DeleteRoleController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteRoleService = new DeleteRoleService();

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    try {
      const result = await deleteRoleService.execute({ id });

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
}

export { DeleteRoleController };
