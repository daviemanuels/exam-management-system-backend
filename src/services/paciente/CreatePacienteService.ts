import prismaClient from "../../prisma";
import { Sexo } from "@prisma/client";

interface IRequest {
  nome: string;
  cpf: string;
  dataNascimento: string;
  email?: string;
  telefone?: string;
  nacionalidade?: string;
  sexo: Sexo;
  endereco?: string;
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

    return paciente;
  }
}
