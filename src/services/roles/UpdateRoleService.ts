import prismaClient from "../../prisma";
import { StatusGeral } from "@prisma/client";
import { CreateLogService } from "../logs/CreateLogService";

interface UpdateRoleRequest {
  id: string;
  name?: string;
  status?: StatusGeral;
  userId: string; //
}

class UpdateRoleService {
  async execute({ id, name, status, userId }: UpdateRoleRequest) {
    if (!id) {
      throw new Error("ID da role é obrigatório");
    }

    const roleExists = await prismaClient.role.findUnique({
      where: { id },
    });

    if (!roleExists) {
      throw new Error("Role não encontrada");
    }

    if (name) {
      const nameExists = await prismaClient.role.findFirst({
        where: {
          name,
          NOT: { id },
        },
      });

      if (nameExists) {
        throw new Error("Já existe uma role com esse nome");
      }
    }

    const role = await prismaClient.role.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(status && { status }),
      },
    });

    // LOG
    const logService = new CreateLogService();

    try {
      await logService.execute({
        userId,
        message: `Atualizou role ${roleExists.name} → ${role.name} (status: ${role.status})`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return role;
  }
}

export { UpdateRoleService };
