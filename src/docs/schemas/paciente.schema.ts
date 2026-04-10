/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePaciente:
 *       type: object
 *       required:
 *         - nome
 *         - cpf
 *         - sexo
 *       properties:
 *         nome:
 *           type: string
 *         cpf:
 *           type: string
 *         sexo:
 *           $ref: '#/components/schemas/Sexo'
 *
 *     UpdatePaciente:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         cpf:
 *           type: string
 *         sexo:
 *           $ref: '#/components/schemas/Sexo'
 *         status:
 *           $ref: '#/components/schemas/StatusGeral'
 *
 *     Paciente:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         nome:
 *           type: string
 *
 */
