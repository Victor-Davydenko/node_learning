import fsPromise from 'fs/promises';

class DbService {
  constructor(readonly pathToDb: string) {
  }

  async readDataBase() {
    const database = await fsPromise.readFile(this.pathToDb, { encoding: 'utf-8' });
    return JSON.parse(database);
  }

  async writeDataBase(data) {
    const stringifiedDB = JSON.stringify(data);
    await fsPromise.writeFile(this.pathToDb, stringifiedDB);
  }
}

export default DbService;