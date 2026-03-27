import prismaClient from "../../prisma";
import { StatusExame, TipoExame } from "@prisma/client";

export class DashboardService {
  async execute() {
    // 🔹 totais gerais
    const [totalPacientes, totalExames] = await Promise.all([
      prismaClient.paciente.count(),
      prismaClient.exame.count(),
    ]);

    // 🔹 exames por status
    const statusData = await prismaClient.exame.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    const status = Object.values(StatusExame).map((s) => {
      const found = statusData.find((item) => item.status === s);
      return {
        status: s,
        total: found?._count.status || 0,
      };
    });

    // 🔹 exames por tipo
    const tipoData = await prismaClient.exame.groupBy({
      by: ["tipo"],
      _count: {
        tipo: true,
      },
    });

    const tipos = Object.values(TipoExame).map((t) => {
      const found = tipoData.find((item) => item.tipo === t);
      return {
        tipo: t,
        total: found?._count.tipo || 0,
      };
    });

    // 🔹 exames por mês (últimos 6 meses)
    const now = new Date();
    const meses = [];

    for (let i = 5; i >= 0; i--) {
      const data = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const inicio = new Date(data.getFullYear(), data.getMonth(), 1);
      const fim = new Date(data.getFullYear(), data.getMonth() + 1, 0);

      const total = await prismaClient.exame.count({
        where: {
          dataCadastro: {
            gte: inicio,
            lte: fim,
          },
        },
      });

      meses.push({
        mes: data.toLocaleString("pt-BR", { month: "short" }),
        total,
      });
    }

    return {
      totais: {
        pacientes: totalPacientes,
        exames: totalExames,
      },
      status,
      tipos,
      meses,
    };
  }
}
