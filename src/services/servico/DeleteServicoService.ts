import prismaClient from "../../prisma";

class DeleteServicoService {
  async execute(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const servicoExiste = await prismaClient.servico.findUnique({
      where: { id },
    });

    if (!servicoExiste) {
      throw new Error("Serviço não encontrado");
    }

    // 🔥 validação importante
    const vinculado = await prismaClient.exameServico.findFirst({
      where: {
        servicoId: id,
      },
    });

    if (vinculado) {
      throw new Error("Não é possível excluir um serviço vinculado a exames");
    }

    await prismaClient.servico.delete({
      where: { id },
    });

    return { message: "Serviço excluído com sucesso" };
  }
}

export { DeleteServicoService };
