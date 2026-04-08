import prismaClient from "../../prisma";
import { CreateLogService } from "../logs/CreateLogService";

interface IRequest {
  nome: string;
  status?: boolean;
  userId: string;
}

export class CreateServicoService {
  async execute({ nome, status = true, userId }: IRequest) {
    // valida nome
    if (!nome || nome.trim() === "") {
      throw new Error("Nome do serviço é obrigatório");
    }

    // evita duplicidade
    const servicoExists = await prismaClient.servico.findFirst({
      where: {
        nome: {
          equals: nome,
          mode: "insensitive",
        },
      },
    });

    if (servicoExists) {
      throw new Error("Serviço já cadastrado");
    }

    // criação
    const servico = await prismaClient.servico.create({
      data: {
        nome,
        status,
      },
    });

    // log
    const logService = new CreateLogService();

    try {
      await logService.execute({
        userId,
        message: `Cadastrou serviço ${servico.nome} (status: ${servico.status ? "ativo" : "inativo"})`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return servico;
  }
}
