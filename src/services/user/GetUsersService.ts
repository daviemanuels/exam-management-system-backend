import prismaClient from "../../prisma";

class GetUsersService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        nome: true,
        login: true,
        status: true,
        createdAt: true,
        funcao_usuario: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  }
}

export { GetUsersService };
