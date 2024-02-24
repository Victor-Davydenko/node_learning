import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  constructor(private userService: typeof UserService) {
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const tokens = await this.userService.login(userData);
      res.cookie('refresh', tokens.refreshToken, { httpOnly: true, maxAge: +process.env.REFRESH_COOKIE_MAX_AGE });
      res.header('token', `Bearer ${tokens.accessToken}`);
      return res.json({
        status: 200,
        message: 'User successfully logged in',
        token: tokens.accessToken
      });
    } catch (e) {
      next(e);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
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

  refreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refresh;
      const tokens = this.userService.refreshToken(refreshToken);
      res.cookie('refresh', tokens.refreshToken, { httpOnly: true, maxAge: +process.env.REFRESH_COOKIE_MAX_AGE });
      res.header('token', `Bearer ${tokens.accessToken}`);
      return res.json({
        status: 200,
        message: 'User successfully logged in',
        token: tokens.accessToken
      });
    } catch (e) {
      next(e);
    }
  };

  getProfile = (req, res, next) => {
    try {
      res.json({
        data: 'some private data'
      });
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController(UserService);