import DbService from './DbService';

class UserService {
  constructor(private dbService: DbService) {
  }
  getUsers = async () => {
    try {
      const parsedDB = await this.dbService.readDataBase();
      return {
        users: parsedDB.data
      };
    } catch (e) {
      throw new Error('Something went wrong!');
    }
  };

  createUser = async (newUser) => {
    try {
      const parsedDB = await this.dbService.readDataBase();
      parsedDB.data.push(newUser);
      await this.dbService.writeDataBase(parsedDB);
      return {
        user: newUser,
        message: 'User was successfully created!'
      };
    } catch (e) {
      throw new Error('Something went wrong!');
    }
  };
}

export default UserService;