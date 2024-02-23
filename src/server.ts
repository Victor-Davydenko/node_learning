import express, { json } from 'express';
import router from './routes';
import { errorMiddlware } from './middlwares/errorMiddlware';
import notFoundMiddlware from './middlwares/notFoundMiddlware';

const app = express();

app.use(json());
app.use('/', router);
app.use(notFoundMiddlware, errorMiddlware);

export default app;