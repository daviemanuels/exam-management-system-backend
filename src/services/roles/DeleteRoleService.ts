import prismaClient from "../../prisma";
import { CreateLogService } from "../logs/CreateLogService";

interface DeleteRoleRequest {
  id: string;
  userId: string; //
}

class DeleteRoleService {
  async execute({ id, userId }: DeleteRoleRequest) {
    if (!id) {
      throw new Error("ID da role é obrigatório");
    }

    // Verifica se a role existe
    const role = await prismaClient.role.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });

    if (!role) {
      throw new Error("Role não encontrada");
    }

    // regra de proteção
    if (role.users.length > 0) {
      throw new Error(
        "Não é possível deletar uma role com usuários vinculados",
      );
    }

    // guarda dados antes de deletar
    const nome = role.name;

    await prismaClient.role.delete({
      where: { id },
    });

    // LOG
    const logService = new CreateLogService();

    try {
      await logService.execute({
        userId,
        message: `Excluiu role ${nome}`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return { message: "Role deletada com sucesso" };
  }
}

export { DeleteRoleService };
