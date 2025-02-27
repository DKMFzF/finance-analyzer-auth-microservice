import axios from 'axios';
import { USER_SERVICE_URL } from '../utils/jwt';
import { User } from '../types/user';

export const checkUserCredentials = async (login: string, password: string): Promise<User> => {
    const response = await axios.post<User>(`${USER_SERVICE_URL}/check-user`, { login, password });
    return response.data;
};