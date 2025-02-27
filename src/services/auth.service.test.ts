import { checkUserCredentials } from '../../src/services/auth.service';
import axios from 'axios';
import logger from '../utils/logger/logger';

jest.mock('axios');
jest.mock('../../src/utils/logger');

describe('checkUserCredentials', () => {
  it('should return user data if credentials are valid', async () => {
    // Мокаем ответ от user-service
    (axios.post as jest.Mock).mockResolvedValue({
      data: { id: 1, login: 'test' },
    });

    const user = await checkUserCredentials('test', 'test');

    expect(user).toEqual({ id: 1, login: 'test' });
    expect(axios.post).toHaveBeenCalledWith(
      'http://user-service:4000/check-user',
      { login: 'test', password: 'test' }
    );
    expect(logger.info).toHaveBeenCalledWith('[LOG]: checkUserCredentials start');
    expect(logger.info).toHaveBeenCalledWith('[LOG]: the user is in the system');
  });

  it('should throw an error if credentials are invalid', async () => {
    // Мокаем ошибку от user-service
    (axios.post as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    await expect(checkUserCredentials('wrong', 'wrong')).rejects.toThrow('Invalid credentials');
    expect(logger.info).toHaveBeenCalledWith('[LOG]: checkUserCredentials start');
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Invalid credentials')); // Проверяем, что logger.error был вызван с сообщением об ошибке
  });
});
