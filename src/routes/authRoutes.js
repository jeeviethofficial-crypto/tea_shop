import { Router } from 'express';
import {
  register,
  login,
  getMe,
  addTastingNote
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRegister, validateLogin } from '../middleware/validate.js';

const router = Router();

// Public auth endpoints
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected customer endpoints (Bearer token)
router.get('/me', protect, getMe);
router.post('/tasting-journal', protect, addTastingNote);

export default router;
