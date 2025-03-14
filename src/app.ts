import express from 'express';
import routes from './routes';
import { LOGS } from './utils/custom.logs';
import logger from './utils/logger/logger';
import { errorHandler } from './middleware/error.middleware';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
// @ts-ignore
import compression from 'compression';

const app = express();
app.use(express.json());

app.use('/', routes);
app.use(errorHandler);

app.use(compression());
app.use(helmet());
app.use(rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 100 
}));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

logger.info(LOGS.SERVICE_INIT);

export default app;
