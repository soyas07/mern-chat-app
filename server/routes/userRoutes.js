import express from 'express';
import { registerUser, authUser } from '../contorllers/userControllers.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);

export default router;