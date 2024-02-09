import { Request, Response } from 'express';
import path from 'path';
import UserService from '../services/UserService';
import DbService from '../services/DbService';

class UserController {

  constructor(private userService: UserService) {
  }

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getUsers();
      return res.status(200).json(users);
    } catch (e) {
      res.status(404).json(e.message);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        res.status(401).json('Bad credentials was provided!');
      }
      const response = await this.userService.createUser({ login, password });
      return res.json(response);
    } catch (e) {
      console.log(e);
    }
  };
}

export default new UserController(new UserService(new DbService(path.join(__dirname, '..', 'database' ,'db.json'))));