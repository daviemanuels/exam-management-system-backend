import prismaClient from "../../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async execute({ login, senha }: any) {
    const user = await prismaClient.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new Error("Usuário ou senha inválidos");
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);

    if (!passwordMatch) {
      throw new Error("Usuário ou senha inválidos");
    }

    const token = jwt.sign(
      { id: user.id },
      "secret", // depois colocamos no .env
      {
        expiresIn: "1d",
      },
    );

    return {
      user: {
        id: user.id,
        nome: user.nome,
        login: user.login,
      },
      token,
    };
  }
}
