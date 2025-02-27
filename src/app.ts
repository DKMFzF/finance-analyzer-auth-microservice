import express from 'express';
import routes from './routes';
import { LOGS } from './utils/custom.logs';
import logger from './utils/logger';

const app = express();
app.use(express.json());

app.use('/', routes);

logger.info(LOGS.SERVICE_INIT);

export default app;