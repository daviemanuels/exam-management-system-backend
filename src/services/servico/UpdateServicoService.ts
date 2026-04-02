import prismaClient from "../../prisma";

interface IRequest {
  id: string;
  nome: string;
  status: boolean;
}

class UpdateServicoService {
  async execute({ id, nome, status }: IRequest) {
    if (!id) {
      throw new Error("ID do serviço é obrigatório");
    }

    const servicoExiste = await prismaClient.servico.findUnique({
      where: { id },
    });

    if (!servicoExiste) {
      throw new Error("Serviço não encontrado");
    }

    const servico = await prismaClient.servico.update({
      where: { id },
      data: {
        nome,
        status,
      },
    });

    return servico;
  }
}

export { UpdateServicoService };
