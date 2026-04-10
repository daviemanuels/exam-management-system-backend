/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *           example: ADMIN
 *         description:
 *           type: string
 *           example: Administrador do sistema
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     CreateRole:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: ADMIN
 *         description:
 *           type: string
 *           example: Administrador do sistema
 *
 *     UpdateRole:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */
