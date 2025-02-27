import axios from 'axios';
import { config } from '../config/index.config';

/**
 * работа с user service
 */

interface User {
  id: number;
  login: string;
}

export const checkUserCredentials = async (login: string, password: string): Promise<User> => {
  const response = await axios.post<User>(`${config.USER_SERVICE_URL}/check-user`, { login, password });
  return response.data;
};