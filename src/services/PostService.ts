import axios from 'axios';
import {BASE_URL} from '../constants/constants';
import ApiError from '../exception/exception';
class UserService {
  constructor() {
  }
  getPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      return {
        status: 200,
        posts: response.data
      };
    } catch (e) {
      throw ApiError.UnexpectedError();
    }
  };

  createPost = async (newPost) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, { ...newPost });
      return {
        status: 201,
        post: response.data,
        message: 'Post was successfully created!'
      };
    } catch (e) {
      throw ApiError.UnexpectedError();
    }
  };

  deletePost = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${id}`);
      return {
        status: 202,
        message: 'Post was successfully deleted!'
      };
    } catch (e) {
      throw ApiError.UnexpectedError();
    }
  };
}

export default UserService;