import express from 'express';
import routes from './routes';
import { LOGS } from './utils/index.logs';

const app = express();
app.use(express.json());

app.use('/', routes);

console.log(LOGS.SERVICE_INIT);

export default app;