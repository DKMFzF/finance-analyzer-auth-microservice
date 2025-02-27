import axios from 'axios';
import logger from '../utils/logger';

export const checkUserCredentials = async (login: string, password: string) => {
  logger.info('[LOG]: checkUserCredentials start');
  try {
    const response = await axios.post('http://user-service:4000/check-user', { login, password });
    logger.info('[LOG]: the user is in the system');
    return response.data;
  } catch (error) {
    logger.error(`[ERROR]: ${error}`);
    throw new Error('Invalid credentials');
  }
};