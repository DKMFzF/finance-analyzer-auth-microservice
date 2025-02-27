import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
// import { SECRET_KEY, USER_SERVICE_URL } from '../utils/jwt';
import { config } from "../config/index.config";
// @ts-ignore
import jwt from 'jsonwebtoken';
import { LoginRequestBody, User } from '../types/user';
import { loginSchema } from '../utils/validation';
import { checkUserCredentials } from "../services/auth.service";

/**
 * модуль запроса для входа в систему 
 */

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { login, password } = req.body;
        const user = await checkUserCredentials(login, password);

        const token = jwt.sign({ userId: user.id, login: user.login }, config.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};
