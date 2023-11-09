import { Router } from "express";
import { textQuery } from "../controllers/chatbot.controller";

const router = Router();

/**
 * @swagger
 * /api/chatbot/text-query:
 *   post:
 *     summary: Chat bot request
 *     tags:
 *       - ChatBot
 *     requestBody:
 *       description: User data for Registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties::
 *               user_id:
 *                 type: string
 *                 required: true
 *                 description: the user full name
 *               text:
 *                 type: string
 *                 required: true
 *                 description: the user email
 *             example:
 *               user_id: 64e7720021f0a4c5ceaac424
 *               text: Hola
 *     responses:
 *       200:
 *         description: sucessful response
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: success
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

// Define una ruta para recibir mensajes del usuario
router.post("/text-query", textQuery);

export default router;
