import express, { json } from 'express';
import router from './routes';
import errorMiddleware from './middleware/errorMiddlware';

const app = express();

app.use(json());
app.use('/', router);
app.use(errorMiddleware);

export default app;