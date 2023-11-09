import { Router } from "express";
import {
  createInstitutionalInformation,
  deleteInstitutionalInformation,
  getInstitutionalInformation,
  getInstitutionalInformations,
  uploadInstitutionalInformation,
} from "../controllers/InstitutionalInformation.controller";
import { verifyToken, isModerator } from "../middlewares/authJwt.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     InstitutionalInformation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           required: true
 *           trim: true
 *           description: Institutional information title
 *         iconUrl:
 *           type: string
 *           required: true
 *           description: Institutional information icon url
 *         urlLink:
 *           type: string
 *           required: true
 *           description: Institutional information url link
 *       example:
 *         _id: 1000000es000213
 *         title: Organigrama
 *         iconUrl: htpps://example.com/icon/1000000
 *         urlLink: htpps://example.com/
 */

/**
 * @swagger
 * /api/institutional-information/:
 *   get:
 *     summary: Return all institution informations
 *     tags:
 *       - Institutional Information
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: All institution informations
 *         content:
 *           aplication/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/InstitutionalInformation"
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

router.get("/", verifyToken, getInstitutionalInformations);

/**
 * @swagger
 * /api/institutional-information/{id}:
 *   get:
 *     summary: Return a Institutional Information
 *     tags:
 *       - Institutional Information
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter institutional information id
 *     responses:
 *       200:
 *         description: An institutional information
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/InstitutionalInformation"
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
 *         description: Institutional information not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Institutional information  not found
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

router.get("/:id", verifyToken, getInstitutionalInformation);

/**
 * @swagger
 * /api/institutional-information/:
 *   post:
 *     summary: Create a institutional information
 *     tags:
 *       - Institutional Information
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       description: Information data for creating a new Instituonal information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               iconUrl:
 *                 type: string
 *                 required: true
 *               urlLink:
 *                 type: string
 *                 required: true
 *             example:
 *               title: Service title
 *               iconUrl: http://example.com/icon/00000
 *               urlLink: http://example.com/
 *     responses:
 *       200:
 *         description: Service created successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/Service"
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

router.post("/", [verifyToken, isModerator], createInstitutionalInformation);

/**
 * @swagger
 * /api/institutional-information/{id}:
 *   put:
 *     summary: Update a institutional information
 *     tags:
 *       - Institutional Information
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter institutional information id
 *     requestBody:
 *       description: User data for updating a institutional information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               iconUrl:
 *                 type: string
 *                 required: true
 *               urlLink:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Institutional information  updated successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/InstitutionalInformation"
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
 *         description: User or InstitutionalI nformation not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User or Institutional Information not found
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

router.put("/:id", [verifyToken, isModerator], uploadInstitutionalInformation);

/**
 * @swagger
 * /api/institutional-information/{id}:
 *   delete:
 *     summary: Delete a institutional information
 *     tags:
 *       - Institutional Information
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter Institutional Information id
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
 *         description: Service or User not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Carousel or User not found
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

router.delete(
  "/:id",
  [verifyToken, isModerator],
  deleteInstitutionalInformation
);

export default router;
