/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         message:
 *           type: string
 *           example: Usuário criou um novo paciente
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     LogsResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Log'
 *         total:
 *           type: integer
 *           example: 200
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 */
