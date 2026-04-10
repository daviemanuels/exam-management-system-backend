/**
 * @swagger
 * components:
 *   schemas:
 *     Servico:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         nome:
 *           type: string
 *           example: Hemograma Completo
 *         valor:
 *           type: number
 *           example: 50.0
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     CreateServico:
 *       type: object
 *       required:
 *         - nome
 *         - valor
 *       properties:
 *         nome:
 *           type: string
 *           example: Hemograma Completo
 *         valor:
 *           type: number
 *           example: 50.0
 *
 *     UpdateServico:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         valor:
 *           type: number
 */
