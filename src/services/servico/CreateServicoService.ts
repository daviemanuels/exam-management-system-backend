import prisma from "../../prisma";

interface IRequest {
  nome: string;
  status?: boolean;
}

export class CreateServicoService {
  async execute({ nome, status = true }: IRequest) {
    // 🔹 valida nome
    if (!nome || nome.trim() === "") {
      throw new Error("Nome do serviço é obrigatório");
    }

    // 🔹 evita duplicidade
    const servicoExists = await prisma.servico.findFirst({
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

    // 🔹 criação
    const servico = await prisma.servico.create({
      data: {
        nome,
        status,
      },
    });

    return servico;
  }
}
