import prismaClient from "../../prisma";

class GetRoleService {
  async execute() {
    const roles = await prismaClient.role.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return roles;
  }
}

export { GetRoleService };
