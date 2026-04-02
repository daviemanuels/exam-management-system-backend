import { TipoExame } from "@prisma/client";
import prismaClient from "../../prisma";

interface IRequest {
  id: string;
  tipo: TipoExame;
  pacienteId: string;
  servicos: string[];
}

class UpdateExameService {
  async execute({ id, tipo, pacienteId, servicos }: IRequest) {
    if (!id) {
      throw new Error("ID do exame é obrigatório");
    }

    const exameExiste = await prismaClient.exame.findUnique({
      where: { id },
    });

    if (!exameExiste) {
      throw new Error("Exame não encontrado");
    }

    // 🔥 Transação pra garantir consistência
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

    return exame;
  }
}

export { UpdateExameService };
