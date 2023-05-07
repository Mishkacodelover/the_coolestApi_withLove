import express from "express";
import userController from "../controller/user_controller.js";
import validateLogin from "../utils/validate_login.js";
import verifyToken from "../utils/verifyToken.js";

const userRouter = express.Router();

/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Creates a new user
 *     tags: [createUser]
 *     description: Use this endpoint to create a new user.
 *     requestBody:
 *       description: Object containing the data of the user to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               padre:
 *                  type: string
 *               tipo:
 *                  type: number
 *               numserie:
 *                  type: string
 *             required:
 *               - nombre
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     password:
 *                       type: string
 *                       example: $2b$10$1vW...
 *       400:
 *         description: Bad request
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Something is wrong with the body data entered
 *       409:
 *         description: User already exists
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: An error occurred while creating the user
 */
userRouter.post("/createUser", userController.createUser);

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: password123
 *       required:
 *         - email
 *         - password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         jwt:
 *           type: string
 *           description: The JSON Web Token for the authenticated user.
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 500
 *           description: The HTTP status code of the error.
 *         success:
 *           type: boolean
 *           example: false
 *           description: Whether the operation was successful or not.
 *         error:
 *           type: string
 *           example: Internal server error.
 *           description: A description of the error that occurred.
 * /login:
 *   post:
 *     summary: Authenticates a user and returns a JSON Web Token.
 *     tags: [login]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '400':
 *         description: Invalid request body.
 *       '401':
 *         description: Invalid email or password.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post("/login", validateLogin, userController.login);

/**
 * @swagger
 * /getData:
 *   get:
 *     security:
 *       - bearerAuth: []
 *       - in: header
 *     summary: Get user data.
 *     tags: [getData]
 *     description: Retrieve all user data from the database ordered by "padre" field
 *
 *     responses:
 *       200:
 *         description: A list of user data objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *       500:
 *         description: An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */
userRouter.get("/getData", verifyToken, userController.getData);

export default userRouter;
