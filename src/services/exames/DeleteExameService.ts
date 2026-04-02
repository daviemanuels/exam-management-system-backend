import prismaClient from "../../prisma";

class DeleteExameService {
  async execute(id: string) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const exameExiste = await prismaClient.exame.findUnique({
      where: { id },
    });

    if (!exameExiste) {
      throw new Error("Exame não encontrado");
    }

    await prismaClient.$transaction(async (tx) => {
      // remove vínculos
      await tx.exameServico.deleteMany({
        where: { exameId: id },
      });

      // remove exame
      await tx.exame.delete({
        where: { id },
      });
    });

    return { message: "Exame excluído com sucesso" };
  }
}

export { DeleteExameService };
