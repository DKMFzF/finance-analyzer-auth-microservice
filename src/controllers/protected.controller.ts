import { Request, Response } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';
// import { SECRET_KEY } from '../utils/jwt';
import { TokenPayload } from '../types/user';
import { config } from "../config/index.config"

export const protectedRoute = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Нет токена' });
    const token = authHeader.split(' ')[1];

    // @ts-ignore
    jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
        if (err || typeof decoded !== 'object') return res.status(401).json({ error: 'Неверный токен' });
        const userData = decoded as TokenPayload;
        res.json({ message: 'Доступ разрешен', user: userData });
    });
};
