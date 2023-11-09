import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserPassword,
  updateUserRoles,
} from "../controllers/user.controller.js";
import { isAdmin, isModerator, verifyToken } from "../middlewares/authJwt.js";
import {
  checkExistingUser,
  checkExistingRole,
} from "../middlewares/verifySignup.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           required: true
 *           description: Role name
 *       example:
 *         _id: idndnndn1222323mdmd
 *         name: user
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fullname:
 *           type: string
 *           required: true
 *           description: the user full name
 *         email:
 *           type: string
 *           required: true
 *           description: the user email
 *         phoneNumber:
 *           type: string
 *           description: the user phone number
 *         password:
 *           type: string
 *           required: true
 *           description: the user password
 *         roles:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Role/properties/_id"
 *         resetToken:
 *           type: string
 *           description: the user reset token
 *         resetTokenExpiry:
 *           type: string
 *           description: the user reset token expiration
 *       example:
 *         _id: 1394rjj3jjemdm
 *         fullname: Juan
 *         email: Juan@gmail.com
 *         phoneNumber: 999999999
 *         password: password
 *         roles: [user]
 */

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Return all users
 *     tags:
 *       - User
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: all users
 *         content:
 *           aplication/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       401:
 *         description: Not authorized!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Not authorized!
 *       403:
 *         description: Require Moderator Role!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Require Moderator Role!
 *       404:
 *         description: User not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User not found
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

router.get("/", [verifyToken, isModerator], getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Return a user
 *     tags:
 *       - User
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter user id
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: Not authorized!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Not authorized!
 *       404:
 *         description: User not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User not found
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

router.get("/:id", verifyToken, getUser);

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       description: User data for creating a new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *    
 *             example:
 *               fullname: Juan
 *               email: Juan@gmail.com
 *               phoneNumber: 999999999
 *               password: password
 *               roles: [user]
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: No roles
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: No roles
 *       401:
 *         description: Not authorized!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Not authorized!
 *       403:
 *         description: Require Admin Role!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Require Admin Role!
 *       404:
 *         description: User not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User not found
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

router.post(
  "/",
  [verifyToken, isAdmin, checkExistingUser, checkExistingRole],
  createUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags:
 *       - User
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter user id
 *     requestBody:
 *       description: User data for updating a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 required: true
 *               phoneNumber:
 *                 type: string
 *             example:
 *               fullName: John Smith
 *               phoneNumber: 900000000
 *     responses:
 *       201:
 *         description: Successfully user updated
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: Not authorized!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Not authorized!
 *       404:
 *         description: User not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User not found
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

router.put("/:id", verifyToken, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - User
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter user id
 *     responses:
 *       204:
 *         description: No content
 *       401:
 *         description: Not authorized!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Not authorized!
 *       403:
 *         description: Require Admin Role!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Require Admin Role!
 *       404:
 *         description: User not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User not found
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

router.delete("/:id", [verifyToken, isAdmin], deleteUser);

/**
 * @swagger
 * /api/users/update-password:
 *   put:
 *     summary: Change user password
 *     tags:
 *       - User
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       description: User data for change user password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 required: true
 *               newPassword:
 *                 type: string
 *                 required: true
 *             example:
 *               password: password
 *               newPassword: newPassword
 *     responses:
 *       200:
 *         description: Successfully password updated
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Successfully password updated
 *       401:
 *         description: Not authorized!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Not authorized!
 *       400:
 *         description: Invalid passwords
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Invalid passwords
 *       404:
 *         description: User not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User not found
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

router.put("/:id/update-password", verifyToken, updateUserPassword);

/**
 * @swagger
 * /api/users/{id}/roles:
 *   put:
 *     summary: Update user role
 *     tags:
 *       - User
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter user id
 *     requestBody:
 *       description: User data for updating user role
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roles:
 *                 type: array
 *                 required: true
 *             example:
 *               roles: ["user"]
 *     responses:
 *       201:
 *         description: Successfully user updated
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: Not authorized!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Not authorized!
 *       403:
 *         description: Require Admin Role!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Require Admin Role!
 *       404:
 *         description: User not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User not found
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

router.put(
  "/:id/roles",
  [verifyToken, isAdmin, checkExistingRole],
  updateUserRoles
);

export default router;
