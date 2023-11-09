import { Router } from "express";

import { verifyToken, isModerator } from "../middlewares/authJwt.js";
import {
  createCarouselImage,
  deleteCarouselImage,
  getCarouselImage,
  getCarouselImages,
  uploadCarouselImage,
} from "../controllers/carouselImage.controller.js";

import upload from "../middlewares/upload.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CarouselImage:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *           description: Image name
 *         URLLink:
 *           type: string
 *           required: true
 *           description: Link to obtain more information about Image
 *         imageUrl:
 *           type: string
 *           required: true
 *           description: Link of the image when it is uploaded to the cloud
 *         public_id:
 *           type: string
 *           required: true
 *           description: Image id when it is uploaded to the cloud
 *       example:
 *         name: bienvenido
 *         URLLink: http://example.com
 *         imageUrl: http://example.com
 *         public_id: bienvenido_id
 */

/**
 * @swagger
 * /api/carouselImages/:
 *   get:
 *     summary: Return all carousel images
 *     tags:
 *       - Carousel Image
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: All carousel images
 *         content:
 *           aplication/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/CarouselImage"
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

router.get("/", verifyToken, getCarouselImages);

/**
 * @swagger
 * /api/carouselImages/{id}:
 *   get:
 *     summary: Return a carousel Image
 *     tags:
 *       - Carousel Image
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter category id
 *     responses:
 *       200:
 *         description: Carousel Image information
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/CarouselImage"
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
 *         description: Carousel image not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Carousel image not found
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

router.get("/:id", verifyToken, getCarouselImage);

/**
 * @swagger
 * /api/carouselImages/:
 *   post:
 *     summary: Create a new carousel image
 *     tags:
 *       - Carousel Image
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       description: User data for creating a new carousel image
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image: 
 *                 type: string
 *                 format: binary
 *               URLLink: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Carousel image created successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/CarouselImage"
 *       400:
 *         description: Upload a image!
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Upload a image!
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

router.post(
  "/",
  [verifyToken, isModerator],
  upload.single("image"),
  createCarouselImage
);

/**
 * @swagger
 * /api/carouselImages/{id}:
 *   put:
 *     summary: Update a carousel image
 *     tags:
 *       - Carousel Image
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter carousel image id
 *     requestBody:
 *       description: User data for updating a carousel image
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image: 
 *                 type: string
 *                 format: binary
 *               URLLink: 
 *                 type: string
 *     responses:
 *       201:
 *         description: Carousel Image updated successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/CarouselImage"
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
 *         description: User or Carousel image not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User or Carousel image not found
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
  "/:id",
  [verifyToken, isModerator],
  upload.single("image"),
  uploadCarouselImage
);

/**
 * @swagger
 * /api/carouselImage/{id}:
 *   delete:
 *     summary: Delete a carousel image
 *     tags:
 *       - Carousel Image
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter carousel image id
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
 *         description: Carousel image or User not found
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

router.delete("/:id", [verifyToken, isModerator], deleteCarouselImage);

export default router;
