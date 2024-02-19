import { Request, Response } from 'express';
import UserService from '../services/UserService';
import ApiError from '../exception/exception';

class UserController {

  constructor(private userService: UserService) {
  }

  getUsers = async (req: Request, res: Response, next) => {
    try {
      const users = await this.userService.getUsers();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  };

  createUser = async (req: Request, res: Response, next) => {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        throw ApiError.BadCredentials();
      }
      const response = await this.userService.createUser({ login, password });
      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

  deleteUser = async (req: Request, res: Response, next) => {
    try {
      const { id } = req.params;
      const response = await this.userService.deleteUser(id);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController(new UserService());