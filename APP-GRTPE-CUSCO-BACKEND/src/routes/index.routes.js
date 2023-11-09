import { Router } from "express";

import pkg from "../../package.json";
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to our API",
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
  });
});

/**
 * @swagger
 * /api/verify:
 *   get:
 *     summary: verify if the token is valid
 *     tags:
 *       - Auth
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: Logged in
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Logged in
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

router.get("/verify", verifyToken, (req, res) => {
  res.json({
    message: "You are logged in",
  });
});

export default router;
