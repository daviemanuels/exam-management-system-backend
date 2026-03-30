import prismaClient from "../../prisma";

interface CreateRoleRequest {
  name: string;
}

class CreateRoleService {
  async execute({ name }: CreateRoleRequest) {
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

    return role;
  }
}

export { CreateRoleService };
