import { Router } from "express";
import toursController from "../controllers/tours.controller.js";
const router = Router()


/**
 * @openapi
 * tags:
 *   name: Tours
 *   description: Tours management
 */


/**
 * @openapi
 * /api/v1/tours:
 *   get:
 *     tags:
 *       - Tours
 *     summary: Get all tours
 *     responses:
 *       200:
 *         description: A list of tours
 */
router.get('/', toursController.getAllTours)

/**
 * @openapi
 * /api/v1/tours/{tourId}:
 *   get:
 *     tags:
 *       - Tours
 *     summary: Get tour by ID
 *     parameters:
 *      - in: path
 *        name: tourId
 *        required: true
 *        schema:
 *          type: number
 *        description: The id of the tour
 *     responses:
 *       200:
 *         description: A tour
 *       404:
 *         description: Tour not found
 */
router.get('/:tourId', toursController.getTourByID)

/**
 * @openapi
 * /api/v1/tours:
 *   post:
 *     tags:
 *       - Tours
 *     summary: Add a new tour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               duration:
 *                 type: number
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               maxGroupSize:
 *                 type: number
 *             required:
 *               - name
 *               - duration
 *               - description
 *               - difficulty
 *               - maxGroupSize
 *     responses:
 *       200:
 *         description: The new list
 */
router.post('/', toursController.createTour)

/**
 * @openapi
 * /api/v1/tours/{tourId}:
 *   patch:
 *     tags:
 *       - Tours
 *     summary: Edit a tour
 *     parameters:
 *      - in: path
 *        name: tourId
 *        required: true
 *        schema:
 *          type: number
 *        description: The id of the tour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               duration:
 *                 type: number
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: string
 *               maxGroupSize:
 *                 type: number
 *     responses:
 *       200:
 *         description: The new list
 */
router.patch('/:tourId', toursController.updateTour)

/**
 * @openapi
 * /api/v1/tours/{tourId}:
 *   delete:
 *     tags:
 *       - Tours
 *     summary: Delete tour by ID
 *     parameters:
 *      - in: path
 *        name: tourId
 *        required: true
 *        schema:
 *          type: number
 *        description: The id of the tour
 *     responses:
 *       200:
 *         description: A tour
 *       404:
 *         description: Tour not found
 */
router.delete('/:tourId', toursController.deleteTour)

export default router;