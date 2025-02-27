import logger from '../../../src/utils/logger/logger';
import winston from 'winston';

jest.mock('winston', () => ({
  format: {
    json: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
  createLogger: jest.fn().mockReturnValue({
    info: jest.fn(),
    error: jest.fn(),
  }),
}));

describe('logger', () => {
  it('should log info messages', () => {
    logger.info('Test info message');
    expect(logger.info).toHaveBeenCalledWith('Test info message');
  });

  it('should log error messages', () => {
    logger.error('Test error message');
    expect(logger.error).toHaveBeenCalledWith('Test error message');
  });
});