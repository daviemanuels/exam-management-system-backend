import prismaClient from "../../prisma";
import bcrypt from "bcrypt";

export class CreateUserService {
  async execute({ nome, login, senha }: any) {
    const userExists = await prismaClient.user.findUnique({
      where: { login },
    });

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    const passwordHash = await bcrypt.hash(senha, 10);

    const user = await prismaClient.user.create({
      data: {
        nome,
        login,
        senha: passwordHash,
      },
    });

    return user;
  }
}
