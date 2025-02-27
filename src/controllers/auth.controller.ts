import { Request, Response, NextFunction } from 'express';
import { checkUserCredentials } from '../services/auth.service';
// @ts-ignore
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { loginSchema } from '../utils/validation';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      logger.error(`[ERROR]: ${error.details[0].message}`);
      return res.status(400).json({ message: error.details[0].message });
    }

    const { login, password } = req.body;
    const user = await checkUserCredentials(login, password);

    const token = jwt.sign({ userId: user.id, login: user.login }, 'supersecret', { expiresIn: '1h' });
    logger.info(`[LOG]: User ${user.login} logged in successfully`);
    res.status(200).json({ token });
  } catch (error) {
    logger.error(`[ERROR]: ${error}`);
    next(error);
  }
};