// import { Request, Response, NextFunction } from 'express';
// import { verifyToken } from '../services/auth.service';

// /**
//  * проверка токена
//  */

// export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ error: 'Нет токена' });

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = await verifyToken(token);
//     (req as any).user = decoded; // Добавляем user в объект запроса
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Неверный токен' });
//   }
// };
