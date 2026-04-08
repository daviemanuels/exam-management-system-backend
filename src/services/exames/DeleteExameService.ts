import prismaClient from "../../prisma";
import { CreateLogService } from "../logs/CreateLogService";

interface IRequest {
  id: string;
  userId: string; //  necessário pro log
}

class DeleteExameService {
  async execute({ id, userId }: IRequest) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const exameExiste = await prismaClient.exame.findUnique({
      where: { id },
      include: {
        paciente: true,
        servicos: {
          include: { servico: true },
        },
      },
    });

    if (!exameExiste) {
      throw new Error("Exame não encontrado");
    }

    //  Guarda dados antes de excluir (pro log)
    const numero = exameExiste.numero;
    const tipo = exameExiste.tipo;
    const pacienteNome = exameExiste.paciente?.nome || "Sem paciente";

    const nomesServicos =
      exameExiste.servicos?.map((s) => s.servico.nome).join(", ") || "Nenhum";

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

    //  LOG
    const logService = new CreateLogService();

    try {
      await logService.execute({
        userId,
        message: `Excluiu exame Nº ${numero} (${tipo}) do paciente ${pacienteNome}. Serviços: ${nomesServicos}`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return { message: "Exame excluído com sucesso" };
  }
}

export { DeleteExameService };
