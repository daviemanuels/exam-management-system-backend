import prismaClient from "../../prisma";
import { CreateLogService } from "../logs/CreateLogService";

interface CreateRoleRequest {
  name: string;
  userId: string; //
}

class CreateRoleService {
  async execute({ name, userId }: CreateRoleRequest) {
    // verifica se já existe role com esse nome
    const roleExists = await prismaClient.role.findFirst({
      where: {
        name,
      },
    });

    if (roleExists) {
      throw new Error("Role já existe");
    }

    const role = await prismaClient.role.create({
      data: {
        name,
      },
    });

    // LOG
    const logService = new CreateLogService();

    try {
      await logService.execute({
        userId,
        message: `Cadastrou role ${role.name}`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return role;
  }
}

export { CreateRoleService };
