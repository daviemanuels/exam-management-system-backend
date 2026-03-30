import prismaClient from "../../prisma";

export class DeleteUserService {
  async execute(userId: string) {
    const userExists = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    await prismaClient.user.delete({
      where: { id: userId },
    });

    return { message: "Usuário deletado com sucesso" };
  }
}
