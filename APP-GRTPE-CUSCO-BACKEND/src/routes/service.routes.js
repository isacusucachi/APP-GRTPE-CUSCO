import { Router } from "express";
import {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
  createServiceDetail,
  deleteServiceDetail,
  getServiceDetails,
  getServiceDetail,
  updateServiceDetail,
} from "../controllers/service.controller";
import { verifyToken, isModerator } from "../middlewares/authJwt.js";
import upload from "../middlewares/upload";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           required: true
 *           trim: true
 *           description: Service title
 *         description:
 *           type: string
 *           description: Service description
 *       example:
 *         _id: 1000000es000213
 *         title: Carnet Construcción Civil
 *         description: blablabla
 *     ServiceDetail:
 *       type: object
 *       properties:
 *         serviceID:
 *           $ref: '#/components/schemas/Service/properties/_id'
 *         URLLink:
 *           type: string
 *           description: Service details url link
 *         URLDetail:
 *           type: string
 *           required: true
 *           description: Link of the image when it is uploaded to the cloud
 *         imgPublic_id:
 *           type: string
 *           required: true
 *           description: Image id when it is uploaded to the cloud
 *       example:
 *         serviceID: 0000201000aehe22l
 *         description: blablabla
 *         URLLink: http://example.com
 *         URLDetail: http://example.com
 *         imgPublic_id: bienvenido_id
 */

/**
 * @swagger
 * /api/services/:
 *   get:
 *     summary: Return all services
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     responses:
 *       200:
 *         description: All services
 *         content:
 *           aplication/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Service"
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

router.get("/", verifyToken, getServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Return a Service
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service id
 *     responses:
 *       200:
 *         description: Service information
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
 *       404:
 *         description: Service not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Service not found
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

router.get("/:id", verifyToken, getService);

/**
 * @swagger
 * /api/services/:
 *   post:
 *     summary: Create a new service
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     requestBody:
 *       description: Service data for creating a new service
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *             example:
 *               title: Service title
 *               description: Service description
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

router.post("/", [verifyToken, isModerator], createService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service id
 *     requestBody:
 *       description: User data for updating a carousel image
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               description:
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
 *         description: User or Service detail not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User or Service detail not found
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

router.put("/:id", [verifyToken, isModerator], updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service id
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

router.delete("/:id", [verifyToken, isModerator], deleteService);

/**
 * @swagger
 * /api/services/{service_id}/details:
 *   get:
 *     summary: Return all services details
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service id
 *     responses:
 *       200:
 *         description: All services details
 *         content:
 *           aplication/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/ServiceDetail"
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
 *         description: User or Service detail not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User or Service detail not found
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

router.get("/:service_id/details", verifyToken, getServiceDetails);

/**
 * @swagger
 * /api/services/{service_id}/details/{id}:
 *   get:
 *     summary: Return a Service detail
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service id
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service detail id
 *     responses:
 *       200:
 *         description: Service detail information
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ServiceDetail"
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
 *         description: Service detail not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Service detail not found
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

router.get("/:service_id/details/:id", verifyToken, getServiceDetail);

/**
 * @swagger
 * /api/services/{service_id}/details:
 *   post:
 *     summary: Create a new service detail
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service id
 *     requestBody:
 *       description: Service data for creating a new service detail
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               URLLink:
 *                 type: string
 *                 required: true
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Service detail created successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ServiceDetail"
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
 *       406:
 *         description: Invalid Category id
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Invalid Category id
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
  "/:service_id/details/",
  [verifyToken, isModerator],
  upload.single("image"),
  createServiceDetail
);

/**
 * @swagger
 * /api/services/{service_id}/details/{id}:
 *   put:
 *     summary: Update a service
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service id
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service detail id
 *     requestBody:
 *       description: User data for updating a service detail
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
 *         description: Service detail updated successfully
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/ServiceDetail"
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
 *         description: User or Service detail image not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: User or Service detail image not found
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
  "/:service_id/details/:id",
  [verifyToken, isModerator],
  upload.single("image"),
  updateServiceDetail
);

/**
 * @swagger
 * /api/services/{service_id}/details/{id}:
 *   delete:
 *     summary: Delete a service detail
 *     tags:
 *       - Service
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: path
 *         name: service_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service detail id
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter service id
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
 *         description: Service detail or User not found
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *               example:
 *                 message: Service detail or User not found
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
  "/:service_id/details/:id",
  [verifyToken, isModerator],
  deleteServiceDetail
);

export default router;
