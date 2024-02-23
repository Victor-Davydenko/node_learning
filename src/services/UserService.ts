import bcrypt from 'bcrypt';
import { UserDTO } from '../dtos/dtos';
import ApiError from '../exception/ApiError';

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
    return new UserDTO(user);
  };

  createUser = async (newUser) => {
    const candidate = this.users.find(({ username }) => newUser.username === username);
    if (candidate) {
      throw ApiError.UserAlreadyExists();
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 12);
    this.users.push({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    });

    return new UserDTO(newUser);
  };
}



export default UserService;