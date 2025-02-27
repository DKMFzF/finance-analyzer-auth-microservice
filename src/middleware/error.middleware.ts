import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * обработка ошибок в сервисе 
 */

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
};
