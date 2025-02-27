import app from './app';
import { LOGS } from './utils/index.logs';
import { config } from "./config/index.config";

const PORT = config.PORT;

app.listen(PORT, () => console.log(LOGS.SERVICE_START, PORT));
