import app from './app';
import { LOGS } from './utils/custom.logs';
import { config } from "./config/index.config";
import logger from './utils/logger';

const PORT = config.PORT;

app.listen(PORT, () => logger.info(LOGS.SERVICE_START, PORT));
