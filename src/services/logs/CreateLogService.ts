import prismaClient from "../../prisma";

interface CreateLogRequest {
  userId: string;
  message: string;
}

class CreateLogService {
  async execute({ userId, message }: CreateLogRequest) {
    return await prismaClient.log.create({
      data: {
        userId,
        message,
      },
    });
  }
}

export { CreateLogService };
