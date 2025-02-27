import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { protectedRoute } from '../controllers/protected.controller';
import { config } from "../config/index.config";

const router = Router();

router.post(config.USER_SERVICE_URL_LOGIN, login);
router.get(config.USER_SERVICE_URL_PROTECTED, protectedRoute);

export default router;
