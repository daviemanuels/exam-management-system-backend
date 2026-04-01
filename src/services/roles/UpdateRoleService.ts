import prismaClient from "../../prisma";
import { StatusGeral } from "@prisma/client";

interface UpdateRoleRequest {
  id: string;
  name?: string;
  status?: StatusGeral;
}

class UpdateRoleService {
  async execute({ id, name, status }: UpdateRoleRequest) {
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

    return role;
  }
}

export { UpdateRoleService };
