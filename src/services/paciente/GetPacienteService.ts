import prismaClient from "../../prisma";

interface GetPacienteRequest {
  page?: number;
  limit?: number;
  nome?: string;
  email?: string;
  cpf?: string;
}

class GetPacienteService {
  async execute({
    page = 1,
    limit = 10,
    nome,
    email,
    cpf,
  }: GetPacienteRequest) {
    const skip = (page - 1) * limit;

    const where = {
      ...(nome && {
        nome: {
          contains: nome,
          mode: "insensitive" as const,
        },
      }),
      ...(email && {
        email: {
          contains: email,
          mode: "insensitive" as const,
        },
      }),
      ...(cpf && {
        cpf: {
          contains: cpf,
        },
      }),
    };

    const pacientes = await prismaClient.paciente.findMany({
      skip,
      take: limit,
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prismaClient.paciente.count({ where });

    return {
      data: pacientes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export { GetPacienteService };
