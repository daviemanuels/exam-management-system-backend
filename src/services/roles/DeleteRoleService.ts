import prismaClient from "../../prisma";

interface DeleteRoleRequest {
  id: string;
}

class DeleteRoleService {
  async execute({ id }: DeleteRoleRequest) {
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

    // 🔒 Regra importante: não deletar se houver usuários vinculados
    if (role.users.length > 0) {
      throw new Error(
        "Não é possível deletar uma role com usuários vinculados",
      );
    }

    await prismaClient.role.delete({
      where: { id },
    });

    return { message: "Role deletada com sucesso" };
  }
}

export { DeleteRoleService };
