import { Request, Response } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { protectedRoute } from '../../src/controllers/protected.controller';
import logger from '../../src/utils/logger';

// Мокаем jwt и logger
jest.mock('jsonwebtoken');
jest.mock('../../src/utils/logger');

describe('protectedRoute', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 401 if no token is provided', () => {
    protectedRoute(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Нет токена' });
    expect(logger.info).toHaveBeenCalledWith('[LOG]: protect access');
    expect(logger.error).toHaveBeenCalledWith('[ERROR]: in header no token');
  });

  it('should return 401 if token is invalid', () => {
    req.headers = { authorization: 'Bearer invalid-token' };

    // Мокаем ошибку в jwt.verify
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    protectedRoute(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Неверный токен' });
    expect(logger.info).toHaveBeenCalledWith('[LOG]: jwt verfy');
    expect(logger.error).toHaveBeenCalledWith('[ERROR]: invalid token');
  });

  it('should return 200 and user data if token is valid', () => {
    req.headers = { authorization: 'Bearer valid-token' };

    // Мокаем успешную проверку токена
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null, { userId: 1, login: 'test' });
    });

    protectedRoute(req as Request, res as Response);

    expect(res.status).not.toHaveBeenCalled(); // status не вызывается, так как res.json вызывается напрямую
    expect(res.json).toHaveBeenCalledWith({
      message: 'Доступ разрешен',
      user: { userId: 1, login: 'test' },
    });
    expect(logger.info).toHaveBeenCalledWith('[LOG]: jwt verfy');
    expect(logger.info).toHaveBeenCalledWith('[LOG]: access is allowed');
  });
});
