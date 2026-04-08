import prismaClient from "../../prisma";
import { CreateLogService } from "../logs/CreateLogService";

interface DeletePacienteRequest {
  id: string;
  userId: string; //
}

class DeletePacienteService {
  async execute({ id, userId }: DeletePacienteRequest) {
    if (!id) {
      throw new Error("ID do paciente é obrigatório");
    }

    const paciente = await prismaClient.paciente.findUnique({
      where: { id },
      include: {
        exames: true,
      },
    });

    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    // 🔒 proteção
    if (paciente.exames.length > 0) {
      throw new Error("Não é possível deletar paciente com exames vinculados");
    }

    //  guarda dados antes de deletar
    const nome = paciente.nome;
    const cpf = paciente.cpf;

    await prismaClient.paciente.delete({
      where: { id },
    });

    //  LOG
    const logService = new CreateLogService();

    try {
      await logService.execute({
        userId,
        message: `Excluiu paciente ${nome} (CPF: ${cpf})`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return { message: "Paciente deletado com sucesso" };
  }
}

export { DeletePacienteService };
