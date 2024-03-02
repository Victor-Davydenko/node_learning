import bcrypt from 'bcrypt';
import { UserDTO } from '../dtos/dtos';
import ApiError from '../exception/ApiError';
import tokenService from './TokenService';
import { UserModel } from '../db/models/userModel';

type TUser = {
  username: string;
  email: string;
  password: string
  id: string
}

class UserService {
  constructor() {
  }

  login = async ({ username, password }) => {
    const user = await UserModel.findOne({ username }) as TUser;
    if (!user) {
      throw ApiError.BadCredentials('Username or password is invalid');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw ApiError.BadCredentials('Username or password is invalid');
    }
    const userDTO = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDTO });
    return tokens;
  };

  createUser = async (newUser) => {
    const candidate = await UserModel.findOne({ username: newUser.username });
    if (candidate) {
      throw ApiError.UserAlreadyExists();
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 12);
    const user = {
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    };
    await UserModel.create(user);

    return new UserDTO(newUser);
  };

  refreshToken = async (user) => {
    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const userFromDB = await UserModel.findById(user.id) as TUser;
    const userDTO = new UserDTO(userFromDB);
    const tokens = tokenService.generateTokens({...userDTO});
    return tokens;
  };
}

export default new UserService();