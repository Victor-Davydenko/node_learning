import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  constructor(private userService: UserService) {
  }

  login = async (req: Request, res: Response, next) => {
    try {
      const userData = req.body;
      const user = await this.userService.login(userData);
      return res.json({
        status: 200,
        message: 'User successfully logged in',
        user
      });
    } catch (e) {
      next(e);
    }
  };

  createUser = async (req: Request, res: Response, next) => {
    try {
      const { username, password, email } = req.body;
      const user = await this.userService.createUser({ username, password, email });
      return res.status(201).json({
        status: 201,
        message: 'User has been successfully created!',
        user
      });
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController(new UserService());