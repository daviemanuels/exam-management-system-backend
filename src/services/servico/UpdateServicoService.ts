import prismaClient from "../../prisma";
import { CreateLogService } from "../logs/CreateLogService";

interface IRequest {
  id: string;
  nome: string;
  status: boolean;
  userId: string;
}

class UpdateServicoService {
  async execute({ id, nome, status, userId }: IRequest) {
    if (!id) {
      throw new Error("ID do serviço é obrigatório");
    }

    const servicoExiste = await prismaClient.servico.findUnique({
      where: { id },
    });

    if (!servicoExiste) {
      throw new Error("Serviço não encontrado");
    }

    const servico = await prismaClient.servico.update({
      where: { id },
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
        message: `Atualizou serviço ${servicoExiste.nome} → ${servico.nome} (status: ${servicoExiste.status ? "ativo" : "inativo"} → ${servico.status ? "ativo" : "inativo"})`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return servico;
  }
}

export { UpdateServicoService };
