import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', (req, res) => authController.registerUserWithEmailAndPassword(req, res));
router.post('/login', (req, res) => authController.loginUserWithEmailAndPassword(req, res));
router.post('/refresh', (req, res) => authController.refreshToken(req, res));

// Protected routes
router.post('/logout', verifyAccessToken, (req, res) => authController.logout(req, res));
router.get('/me', verifyAccessToken, (req, res) => authController.getCurrentUser(req, res));

export const authRoutes = router;
