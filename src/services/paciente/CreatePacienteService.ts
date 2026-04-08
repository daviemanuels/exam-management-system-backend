import prismaClient from "../../prisma";
import { Sexo } from "@prisma/client";
import { CreateLogService } from "../logs/CreateLogService";

interface IRequest {
  nome: string;
  cpf: string;
  dataNascimento: string;
  email?: string;
  telefone?: string;
  nacionalidade?: string;
  sexo: Sexo;
  endereco?: string;
  userId: string; //
}

export class CreatePacienteService {
  async execute({
    nome,
    cpf,
    dataNascimento,
    email,
    telefone,
    nacionalidade,
    sexo,
    endereco,
    userId,
  }: IRequest) {
    // 🔹 Verifica CPF
    const pacienteExists = await prismaClient.paciente.findUnique({
      where: { cpf },
    });

    if (pacienteExists) {
      throw new Error("Paciente já cadastrado com esse CPF");
    }

    if (!Object.values(Sexo).includes(sexo)) {
      throw new Error(
        `Sexo inválido. Valores permitidos: ${Object.values(Sexo).join(", ")}`,
      );
    }

    // 🔹 Criação
    const paciente = await prismaClient.paciente.create({
      data: {
        nome,
        cpf,
        dataNascimento,
        email,
        telefone,
        nacionalidade,
        sexo,
        endereco,
      },
    });

    //  LOG
    const logService = new CreateLogService();

    try {
      await logService.execute({
        userId,
        message: `Cadastrou paciente ${paciente.nome} (CPF: ${paciente.cpf})`,
      });
    } catch (err) {
      console.error("Erro ao gerar log:", err);
    }

    return paciente;
  }
}
