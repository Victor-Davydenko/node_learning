import axios from 'axios';
import {BASE_URL} from '../constants/constants';
import ApiError from '../exception/exception';
class UserService {
  constructor() {
  }
  getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return {
        status: 200,
        users: response.data
      };
    } catch (e) {
      throw ApiError.UnexpectedError();
    }
  };

  createUser = async (newUser) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, { ...newUser });
      return {
        status: 201,
        user: response.data,
        message: 'User was successfully created!'
      };
    } catch (e) {
      throw ApiError.UnexpectedError();
    }
  };

  deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/users/${id}`);
      return {
        status: 202,
        message: 'User was successfully deleted!'
      };
    } catch (e) {
      throw ApiError.UnexpectedError();
    }
  };
}

export default UserService;