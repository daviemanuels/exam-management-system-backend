/*
  Warnings:

  - Added the required column `sexo` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('Masculino', 'Feminino');

-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "email" TEXT,
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "nacionalidade" TEXT,
ADD COLUMN     "sexo" "Sexo" NOT NULL,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "dataNascimento" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExameServico" (
    "id" TEXT NOT NULL,
    "exameId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExameServico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExameServico" ADD CONSTRAINT "ExameServico_exameId_fkey" FOREIGN KEY ("exameId") REFERENCES "Exame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExameServico" ADD CONSTRAINT "ExameServico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
