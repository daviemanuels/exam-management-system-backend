import prismaClient from "../../prisma";

interface IRequest {
  page?: number;
  limit?: number;
  userId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

class GetLogsService {
  async execute({
    page = 1,
    limit = 10,
    userId,
    search,
    startDate,
    endDate,
  }: IRequest) {
    const skip = (page - 1) * limit;

    const where: any = {};

    // filtro por usuário
    if (userId) {
      where.userId = userId;
    }

    // filtro por texto
    if (search) {
      where.message = {
        contains: search,
        mode: "insensitive",
      };
    }

    // filtro por data
    if (startDate || endDate) {
      where.createdAt = {};

      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }

      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    const [logs, total] = await prismaClient.$transaction([
      prismaClient.log.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              nome: true,
              login: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),

      prismaClient.log.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: logs,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}

export { GetLogsService };
