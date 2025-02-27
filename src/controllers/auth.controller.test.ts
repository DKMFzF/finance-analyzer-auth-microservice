import { login } from '../../src/controllers/auth.controller';
import { checkUserCredentials } from '../../src/services/auth.service';
// @ts-ignore
import jwt from 'jsonwebtoken';
import logger from '../utils/logger/logger';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../src/services/auth.service');
jest.mock('jsonwebtoken');
jest.mock('../../src/utils/logger');

describe('login', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        login: 'test',
        password: 'test',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return a token if credentials are valid', async () => {
    // Мокаем ответ от checkUserCredentials
    (checkUserCredentials as jest.Mock).mockResolvedValue({ id: 1, login: 'test' });
    // Мокаем ответ от jwt.sign
    (jwt.sign as jest.Mock).mockReturnValue('fake-token');

    await login(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'fake-token' });
    expect(logger.info).toHaveBeenCalledWith('[LOG]: User test logged in successfully');
  });

  it('should return 400 if validation fails', async () => {
    req.body = { login: '', password: '' }; // Невалидные данные

    await login(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) });
    expect(logger.error).toHaveBeenCalled();
  });

  it('should call next with error if checkUserCredentials fails', async () => {
    // Мокаем ошибку от checkUserCredentials
    (checkUserCredentials as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    await login(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(logger.error).toHaveBeenCalled();
  });
});