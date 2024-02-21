import express, { json } from 'express';
import router from './routes';
import { errorMiddlware } from './middlwares/errorMiddlware';

const app = express();

app.use(json());
app.use('/', router);
app.use(errorMiddlware);

export default app;