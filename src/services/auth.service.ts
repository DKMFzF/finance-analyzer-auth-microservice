import axios from 'axios';
import { config } from "../config/index.config";
import { User } from '../types/user';
import logger from '../utils/logger';

/**
 * проверка что пользователь существует
 */

export const checkUserCredentials = async (login: string, password: string): Promise<User> => {
    logger.info("[LOG]: checkUserCredentials start");
    const response = await axios.post<User>(
      `${config.USER_SERVICE_URL}${config.USER_SERVICE_URL_CHECK_USER}`, 
      { login, password }
    );
    logger.info("[LOG]: the user is in the system");
    return response.data;
};
