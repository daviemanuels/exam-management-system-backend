import prismaClient from "../../prisma";

interface DeletePacienteRequest {
  id: string;
}

class DeletePacienteService {
  async execute({ id }: DeletePacienteRequest) {
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

    // 🔒 proteção (muito importante no teu sistema)
    if (paciente.exames.length > 0) {
      throw new Error("Não é possível deletar paciente com exames vinculados");
    }

    await prismaClient.paciente.delete({
      where: { id },
    });

    return { message: "Paciente deletado com sucesso" };
  }
}

export { DeletePacienteService };
