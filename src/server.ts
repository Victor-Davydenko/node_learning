import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import router from './routes';
import { errorMiddlware } from './middlwares/errorMiddlware';
import notFoundMiddlware from './middlwares/notFoundMiddlware';
import strategy from './middlwares/passportMiddlware';


const app = express();

app.use(json());
app.use(cookieParser());
app.use('/', router);
app.use(passport.initialize());
strategy(passport);
app.use(notFoundMiddlware, errorMiddlware);

export default app;