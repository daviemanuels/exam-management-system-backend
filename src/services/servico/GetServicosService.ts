import prismaClient from "../../prisma";

class GetServicosService {
  async execute() {
    const servicos = await prismaClient.servico.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return servicos;
  }
}

export { GetServicosService };
