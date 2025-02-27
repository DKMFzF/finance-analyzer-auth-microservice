import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { protectedRoute } from '../controllers/protected.controller';

const router = Router();

router.post('/login', login);
router.get('/protected', protectedRoute);

export default router;
