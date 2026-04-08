import { TipoExame } from "@prisma/client";
import prismaClient from "../../prisma";
import { CreateLogService } from "../logs/CreateLogService";

interface IRequest {
  id: string;
  tipo: TipoExame;
  pacienteId: string;
  servicos: string[];
  userId: string; //  precisa adicionar
}

class UpdateExameService {
  async execute({ id, tipo, pacienteId, servicos, userId }: IRequest) {
    if (!id) {
      throw new Error("ID do exame é obrigatório");
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

    // Transação pra garantir consistência
    const exame = await prismaClient.$transaction(async (tx) => {
      // Remove vínculos antigos
      await tx.exameServico.deleteMany({
        where: { exameId: id },
      });

      // Atualiza exame + recria vínculos
      const updated = await tx.exame.update({
        where: { id },
        data: {
          tipo,
          pacienteId,
          servicos: {
            create: servicos.map((servicoId) => ({
              servico: {
                connect: { id: servicoId },
              },
            })),
          },
        },
        include: {
          paciente: true,
          servicos: {
            include: {
              servico: true,
            },
          },
        },
      });

      return updated;
    });

    // LOG
    const logService = new CreateLogService();

    try {
      const nomesServicos =
        exame.servicos?.map((s) => s.servico.nome).join(", ") || "Nenhum";

      await logService.execute({
        userId,
        message: `Atualizou exame Nº ${exame.numero} (${tipo}) do paciente ${exame.paciente.nome}. Serviços: ${nomesServicos}`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return exame;
  }
}

export { UpdateExameService };
