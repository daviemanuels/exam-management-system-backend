import prismaClient from "../../prisma";
import { TipoExame, StatusExame } from "@prisma/client";

interface IRequest {
  tipo?: TipoExame;
  status?: StatusExame;
  pacienteNome?: string;
  page?: number;
  limit?: number;
}

export class ListExamesService {
  async execute({
    tipo,
    status,
    pacienteNome,
    page = 1,
    limit = 10,
  }: IRequest) {
    const skip = (page - 1) * limit;

    // 🔹 filtros dinâmicos
    const where: any = {
      ...(tipo && { tipo }),
      ...(status && { status }),
      ...(pacienteNome && {
        paciente: {
          nome: {
            contains: pacienteNome,
            mode: "insensitive",
          },
        },
      }),
    };

    // 🔹 busca dados + total
    const [exames, total] = await prismaClient.$transaction([
      prismaClient.exame.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          dataCadastro: "desc",
        },
        include: {
          paciente: true,
          servicos: {
            include: {
              servico: true,
            },
          },
        },
      }),

      prismaClient.exame.count({ where }),
    ]);

    return {
      data: exames,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
