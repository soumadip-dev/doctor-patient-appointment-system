import { Router } from 'express';
import { register, login, logout, isAuthenticated } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/is-auth', protect, isAuthenticated);

export default router;
