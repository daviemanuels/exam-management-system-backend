import prismaClient from "../../prisma";
import bcrypt from "bcrypt";

interface CreateUserRequest {
  nome: string;
  login: string;
  senha: string;
  funcao_usuario: string;
  roleId: string;
}

export class CreateUserService {
  async execute({
    nome,
    login,
    senha,
    funcao_usuario,
    roleId,
  }: CreateUserRequest) {
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
        funcao_usuario,
        roleId,
      },
    });

    return user;
  }
}
