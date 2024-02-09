import path from 'path';
import fsPromise from 'fs/promises';

const DBPATH = path.resolve(__dirname, '..', 'db.json');
const DBMODEL = JSON.stringify({
  'data': [],
});

const checkDbExists = async () => {
  try {
    await fsPromise.access(DBPATH);
    return true;
  } catch (e) {
    return false;
  }
};

export const createDb = async () => {
  try {
    const isDbExists = await checkDbExists();
    if (!isDbExists) {
      await fsPromise.writeFile(DBPATH, DBMODEL, { encoding: 'utf-8' });
      console.log('DB was successfully created!');
    } else {
      console.log('DB exists and connection is created!');
    }
  } catch (e) {
    throw new Error('DB was not created!!!');
  }
};
