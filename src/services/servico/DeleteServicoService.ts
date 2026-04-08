import prismaClient from "../../prisma";
import { CreateLogService } from "../logs/CreateLogService";

interface IRequest {
  id: string;
  userId: string;
}

class DeleteServicoService {
  async execute({ id, userId }: IRequest) {
    if (!id) {
      throw new Error("ID é obrigatório");
    }

    const servicoExiste = await prismaClient.servico.findUnique({
      where: { id },
    });

    if (!servicoExiste) {
      throw new Error("Serviço não encontrado");
    }

    // validação importante
    const vinculado = await prismaClient.exameServico.findFirst({
      where: {
        servicoId: id,
      },
    });

    if (vinculado) {
      throw new Error("Não é possível excluir um serviço vinculado a exames");
    }

    // guarda dados antes de excluir
    const nome = servicoExiste.nome;
    const status = servicoExiste.status;

    await prismaClient.servico.delete({
      where: { id },
    });

    // log
    const logService = new CreateLogService();

    try {
      await logService.execute({
        userId,
        message: `Excluiu serviço ${nome} (status: ${status ? "ativo" : "inativo"})`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return { message: "Serviço excluído com sucesso" };
  }
}

export { DeleteServicoService };
