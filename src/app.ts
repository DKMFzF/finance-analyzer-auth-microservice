import express, { Request, Response } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';
import axios from 'axios';

const app = express();
app.use(express.json());

const SECRET_KEY = 'supersecret';

// Используем docker DNS имя для User Service:
const USER_SERVICE_URL = 'http://user-service:4000';

// const USER_SERVICE_URL = 'http://localhost:4000';

interface LoginRequestBody {
  login: string;
  password: string;
}

interface User {
  id: number;
  login: string;
}

interface TokenPayload {
  userId: number;
  login: string;
}

// Вход пользователя и выдача токена
app.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { login, password } = req.body;

    try {
        const response = await axios.post<User>(`${USER_SERVICE_URL}/check-user`, { login, password });
        const user = response.data;

        const token = jwt.sign({ userId: user.id, login: user.login }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Неверные учетные данные' });
        console.log("[ERROR]: Invalid credentials")
    }
});

// Пример защищённого эндпоинта (если требуется)
app.get('/protected', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Нет токена' });
    }

    const token = authHeader.split(' ')[1];

    // @ts-ignore
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err || typeof decoded !== 'object') {
            return res.status(401).json({ error: 'Неверный токен' });
        }

        const userData = decoded as TokenPayload;
        res.json({ message: 'Доступ разрешен', user: userData });
    });
});

app.listen(3000, () => console.log('Auth Service запущен на порту 3000'));
