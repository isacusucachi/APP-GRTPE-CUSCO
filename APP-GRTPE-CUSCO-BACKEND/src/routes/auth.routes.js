import { Router } from "express";
import {
  forgotPasswordHandler,
  resetPasswordTokenHandler,
  signinHandler,
  signupHandler,
  verifyResetPasswordTokenHandler,
} from "../controllers/auth.controller";
import { checkExistingUser } from "../middlewares/verifySignup";

const router = Router();

/**
 * @swagger
 * securityDefinitions:
 *   jwtToken:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: JWT token for authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User data for Registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties::
 *               fullname:
 *                 type: string
 *                 required: true
 *                 description: the user full name
 *               email:
 *                 type: string
 *                 required: true
 *                 description: the user email
 *               phoneNumber:
 *                 type: string
 *                 description: the user phone number
 *               password:
 *                 type: string
 *                 required: true
 *                 description: the user password
 *             example:
 *               fullname: Juan
 *               email: Juan@gmail.com
 *               phoneNumber: 999999999
 *               password: password
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: success
 *       409:
 *         description: There is already a user with the entered email
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: There is already a user with the entered email
 *       500:
 *         description: Bad request
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Error!
 */
router.post("/signup", [checkExistingUser], signupHandler);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User data for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties::
 *               email:
 *                 type: string
 *                 required: true
 *                 description: the user email
 *               password:
 *                 type: string
 *                 required: true
 *                 description: the user password
 *             example:
 *               email: Juan@gmail.com
 *               password: password
 *     responses:
 *       200:
 *         description: login successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: success
 *       401:
 *         description: Incorrect password
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Incorrect password
 *       404:
 *         description: Email not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: The email is not linked to any account.
 *       500:
 *         description: Bad request
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Error!
 */

router.post("/signin", signinHandler);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Email linked to account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties::
 *               email:
 *                 type: string
 *                 required: true
 *                 description: the user email
 *             example:
 *               email: Juan@gmail.com
 *     responses:
 *       200:
 *         description: Email sent
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Email sent
 *       404:
 *         description: Email not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: The email is not linked to any account.
 *       500:
 *         description: Bad request
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Error!
 */

router.post("/forgot-password", forgotPasswordHandler);

/**
 * @swagger
 * /api/auth/verify-reset-password-token:
 *   post:
 *     summary: verify token to reset password
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Data to verify to reset the password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties::
 *               email:
 *                 type: string
 *                 required: true
 *                 description: the user email
 *               token:
 *                 type: string
 *                 required: true
 *                 decription: Token that was sent to the mail
 *             example:
 *               email: Juan@gmail.com
 *               token: "666666"
 *     responses:
 *       200:
 *         description: Valid token
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Valid token
 *       401:
 *         description: Invalid or expired token
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Invalid or expired token
 *       404:
 *         description: Email not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: The email is not linked to any account.
 *       500:
 *         description: Bad request
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Error!
 */

router.post("/verify-reset-password-token", verifyResetPasswordTokenHandler);

/**
 * @swagger
 * /api/auth/reset-password:
 *   put:
 *     summary: Reset password
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Data to reset the password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties::
 *               email:
 *                 type: string
 *                 required: true
 *                 description: The user email
 *               token:
 *                 type: string
 *                 required: true
 *                 decription: Token that was sent to the mail
 *               newPassword:
 *                 type: string
 *                 required: true
 *                 description: New password
 *             example:
 *               email: Juan@gmail.com
 *               token: "666666"
 *               newPassword: newpassword
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: updated successfully
 *       400:
 *         description: New password same as old
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: The new password cannot be the same as the old one
 *       401:
 *         description: Invalid or expired token
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Invalid or expired token
 *       404:
 *         description: Email not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: The email is not linked to any account.
 *       500:
 *         description: Bad request
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Error!
 */

router.put("/reset-password", resetPasswordTokenHandler);

export default router;
