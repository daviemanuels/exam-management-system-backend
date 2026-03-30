-- CreateEnum
CREATE TYPE "StatusGeral" AS ENUM ('Desativado', 'Ativo');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "funcao_usuario" TEXT,
ADD COLUMN     "roleId" TEXT,
ADD COLUMN     "status" "StatusGeral" NOT NULL DEFAULT 'Ativo';

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
