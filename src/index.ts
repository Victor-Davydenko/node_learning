import 'dotenv/config';

import app from "./server";

const PORT = process.env.PORT || 3001;


const startApp = () => {
  app.listen(PORT, () => {
    console.log(`App has been started on the port ${PORT}`);
  });
};

startApp();