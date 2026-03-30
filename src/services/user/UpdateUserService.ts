import prismaClient from "../../prisma";
import { StatusGeral } from "@prisma/client";

interface UpdateUserRequest {
  id: string;
  nome?: string;
  login?: string;
  senha?: string;
  funcao_usuario?: string;
  roleId?: string;
  status?: StatusGeral;
}

class UpdateUserService {
  async execute({
    id,
    nome,
    login,
    senha,
    funcao_usuario,
    roleId,
    status,
  }: UpdateUserRequest) {
    const userExists = await prismaClient.user.findFirst({
      where: { id },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    const user = await prismaClient.user.update({
      where: { id },
      data: {
        nome,
        login,
        senha,
        funcao_usuario,
        roleId,
        status,
      },
    });

    return user;
  }
}

export { UpdateUserService };
