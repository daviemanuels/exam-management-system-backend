import prismaClient from "../../prisma";
import { TipoExame } from "@prisma/client";
import { CreateLogService } from "../logs/CreateLogService";

interface IRequest {
  tipo: TipoExame;
  pacienteId: string;
  userId: string;
  servicos?: string[];
}

export class CreateExameService {
  async execute({ tipo, pacienteId, userId, servicos }: IRequest) {
    // 🔹 valida tipo (runtime)
    const tiposValidos = Object.values(TipoExame) as TipoExame[];

    if (!tiposValidos.includes(tipo)) {
      throw new Error(
        `Tipo de exame inválido. Valores permitidos: ${tiposValidos.join(", ")}`,
      );
    }

    // 🔹 valida paciente
    const pacienteExists = await prismaClient.paciente.findUnique({
      where: { id: pacienteId },
    });

    if (!pacienteExists) {
      throw new Error("Paciente não encontrado");
    }

    // 🔹 valida serviços (se vier)
    if (servicos && servicos.length > 0) {
      const servicosExists = await prismaClient.servico.findMany({
        where: {
          id: { in: servicos },
        },
      });

      if (servicosExists.length !== servicos.length) {
        throw new Error("Um ou mais serviços são inválidos");
      }
    }

    //  número automático
    const lastExame = await prismaClient.exame.findFirst({
      orderBy: { numero: "desc" },
    });

    let numero = "000001";

    if (lastExame) {
      numero = String(Number(lastExame.numero) + 1).padStart(6, "0");
    }

    // 🔹 criação com serviços
    const exame = await prismaClient.exame.create({
      data: {
        numero,
        tipo,
        pacienteId,
        userId,
        servicos: servicos
          ? {
              create: servicos.map((servicoId) => ({
                servico: {
                  connect: { id: servicoId },
                },
              })),
            }
          : undefined,
      },
      include: {
        servicos: {
          include: {
            servico: true,
          },
        },
      },
    });

    // LOGS
    const logService = new CreateLogService();

    try {
      const nomesServicos =
        exame.servicos?.map((s) => s.servico.nome).join(", ") || "Nenhum";

      await logService.execute({
        userId,
        message: `Criou exame Nº ${numero} (${tipo}) para o paciente ${pacienteExists.nome}. Serviços: ${nomesServicos}`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return exame;
  }
}
