import 'dotenv/config';

import app from './server';
import startDB from './db/db_config';

const PORT = process.env.PORT || 3001;

const startApp = async () => {
  try {
    await startDB();
    app.listen(PORT, () => {
      console.log(`App has been started on the port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();