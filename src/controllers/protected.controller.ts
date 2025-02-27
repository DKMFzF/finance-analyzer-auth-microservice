import { Request, Response } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/user';
import { config } from "../config/index.config"
import logger from '../utils/logger/logger';

export const protectedRoute = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    logger.info('[LOG]: protect access');
    if (!authHeader) {
        logger.error('[ERROR]: in header no token');
        return res.status(401).json({ error: 'Нет токена' });
    }
    const token = authHeader.split(' ')[1];

    // @ts-ignore
    jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
        logger.info('[LOG]: jwt verfy');
        if (err || typeof decoded !== 'object') {
            logger.error('[ERROR]: invalid token');
            return res.status(401).json({ error: 'Неверный токен' });
        }
        const userData = decoded as TokenPayload;
        logger.info('[LOG]: access is allowed');
        res.json({ message: 'Доступ разрешен', user: userData });
    });
};
