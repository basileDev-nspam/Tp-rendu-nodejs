import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { Router } from 'express';
const router = Router();
import authController from '../controllers/auth.controller.js';

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Users management
 */

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: USERS.length,
    data: { users: USERS },
  });
});

/**
 * @openapi
 * /api/v1/users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The id of the user
 *     responses:
 *       200:
 *         description: A user
 *       404:
 *         description: User not found
 */
router.get('/:userId', (req, res) => {
  for (const u of USERS) {
    if (u._id === req.params.userId) {
      res.status(200).json(u);
    }
  }
  res.status(404).send(`User with id ${req.params['userId']} does not exists`);
});

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Add a new user
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
router.post('/', async (req, res) => {
  const newTours = req.body;
  // newTours.id = USERS.length
  USERS.push({ id: USERS.length, ...newTours });

  fsp
    .writeFile(
      './dev-data/data/users-simple.json',
      JSON.stringify(USERS, null, 2),
    )
    .then(() => {
      res.status(200).json({
        status: 'success',
        results: USERS.length,
        data: { users: USERS },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        details: err,
      });
    });
});

/**
 * @openapi
 * /api/v1/users/{userId}:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Edit a user
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The id of the user
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
router.patch('/:userId', (req, res) => {
  if (!USERS[req.params['userId']]) {
    res
      .status(404)
      .send(`User with id ${req.params['userId']} does not exists`);
  }
  Object.assign(USERS[req.params['userId']], req.body);
  fsp
    .writeFile(
      './dev-data/data/users-simple.json',
      JSON.stringify(USERS, null, 2),
    )
    .then(() => {
      res.status(200).json(USERS[req.params['userId']]);
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        details: err,
      });
    });
});

/**
 * @openapi
 * /api/v1/users/{userId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by ID
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: The id of the user
 *     responses:
 *       200:
 *         description: A user
 *       404:
 *         description: User not found
 */
router.delete('/:userId', (req, res) => {
  if (!USERS[req.params['userId']]) {
    res
      .status(404)
      .send(`User with id ${req.params['userId']} does not exists`);
  }
  USERS.splice(req.params.userId, 1);
  fsp
    .writeFile(
      './dev-data/data/users-simple.json',
      JSON.stringify(USERS, null, 2),
    )
    .then(() => {
      res.status(200).json({
        status: 'success',
        results: USERS.length,
        data: { users: USERS },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        details: err,
      });
    });
});

router.post('/signup', authController.signup);

export default router;
