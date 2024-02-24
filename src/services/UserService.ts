import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { UserDTO } from '../dtos/dtos';
import ApiError from '../exception/ApiError';
import tokenService from './TokenService';

class UserService {
  users = [];
  constructor() {
  }

  login = async ({ username, password }) => {
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw ApiError.BadCredentials('Username or password is invalid');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw ApiError.BadCredentials('Username or password is invalid');
    }
    const userDTO = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDTO });
    tokenService.saveToken(tokens.refreshToken);
    return tokens;
  };

  createUser = async (newUser) => {
    const candidate = this.users.find(({ username }) => newUser.username === username);
    if (candidate) {
      throw ApiError.UserAlreadyExists();
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 12);
    const user = {
      id: v4(),
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    };
    this.users.push(user);

    return new UserDTO(newUser);
  };

  refreshToken = (token) => {
    if (!token) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.verifyToken(token, process.env.JWT_REFRESH_SECRET);
    const tokenFromDB = tokenService.findToken(token);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = this.findUser(userData.id);
    const userDTO = new UserDTO(user);
    tokenService.removeToken(token);
    const tokens = tokenService.generateTokens({...userDTO});
    tokenService.saveToken(tokens.refreshToken);
    return tokens;
  };

  findUser = (id) => {
    const user = this.users.find((user) => user.id === id);
    return user;
  };
}



export default new UserService();