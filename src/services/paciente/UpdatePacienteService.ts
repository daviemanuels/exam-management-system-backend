import prismaClient from "../../prisma";
import { Sexo } from "@prisma/client";
import { CreateLogService } from "../logs/CreateLogService";

interface UpdatePacienteRequest {
  id: string;
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: string;
  nacionalidade?: string;
  sexo?: Sexo;
  endereco?: string;
  userId: string; //
}

class UpdatePacienteService {
  async execute({
    id,
    nome,
    cpf,
    email,
    telefone,
    dataNascimento,
    nacionalidade,
    sexo,
    endereco,
    userId,
  }: UpdatePacienteRequest) {
    if (!id) {
      throw new Error("ID do paciente é obrigatório");
    }

    const paciente = await prismaClient.paciente.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    // 🔒 valida CPF duplicado
    if (cpf) {
      const cpfExists = await prismaClient.paciente.findFirst({
        where: {
          cpf,
          NOT: { id },
        },
      });

      if (cpfExists) {
        throw new Error("Já existe um paciente com esse CPF");
      }
    }

    const updated = await prismaClient.paciente.update({
      where: { id },
      data: {
        ...(nome && { nome }),
        ...(cpf && { cpf }),
        ...(email && { email }),
        ...(telefone && { telefone }),
        ...(dataNascimento && { dataNascimento }),
        ...(nacionalidade && { nacionalidade }),
        ...(sexo && { sexo }),
        ...(endereco && { endereco }),
      },
    });

    //  LOG
    const logService = new CreateLogService();

    try {
      await logService.execute({
        userId,
        message: `Atualizou paciente ${updated.nome} (CPF: ${updated.cpf})`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return updated;
  }
}

export { UpdatePacienteService };
