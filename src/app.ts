import express from 'express';
import routes from './routes';
import { LOGS } from './utils/custom.logs';
import logger from './utils/logger';
import { errorHandler } from './middleware/error.middleware';

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


const app = express();
app.use(express.json());

app.use('/', routes);
app.use(errorHandler);

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

logger.info(LOGS.SERVICE_INIT);

export default app;