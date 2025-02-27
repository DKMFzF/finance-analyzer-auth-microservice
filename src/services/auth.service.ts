import axios from 'axios';
import { config } from "../config/index.config";
import { User } from '../types/user';

/**
 * проверка что пользователь существует
 */

export const checkUserCredentials = async (login: string, password: string): Promise<User> => {
    const response = await axios.post<User>(
      `${config.USER_SERVICE_URL}${config.USER_SERVICE_URL_CHECK_USER}`, 
      { login, password }
    );
    return response.data;
};