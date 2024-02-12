import 'dotenv/config';

import app from './server';
import { createDb } from './database/dbUtils/dbUtils';
import hw4 from './hw4/hw4';

const PORT = process.env.PORT || 3001;

const startApp = () => {
  app.listen(PORT, async () => {
    await createDb();
    console.log(`App has been started on the port ${PORT}`);
  });
};

// startApp();

hw4();