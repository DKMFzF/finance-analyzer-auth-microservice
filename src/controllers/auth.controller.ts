import { Request, Response } from 'express';
import axios from 'axios';
import { SECRET_KEY, USER_SERVICE_URL } from '../utils/jwt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { LoginRequestBody, User } from '../types/user';

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { login, password } = req.body;

    try {
        const response = await axios.post<User>(`${USER_SERVICE_URL}/check-user`, { login, password });
        const user = response.data;

        const token = jwt.sign({ userId: user.id, login: user.login }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Неверные учетные данные' });
        console.log("[ERROR]: Invalid credentials");
    }
};
