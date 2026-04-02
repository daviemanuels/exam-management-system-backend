import prismaClient from "../../prisma";
import { TipoExame } from "@prisma/client";

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

    // 🔥 número automático
    const lastExame = await prismaClient.exame.findFirst({
      orderBy: { numero: "desc" },
    });

    let numero = "1";

    if (lastExame) {
      numero = String(Number(lastExame.numero) + 1).padStart(6, "0"); // 🔥 melhorado
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

    return exame;
  }
}
