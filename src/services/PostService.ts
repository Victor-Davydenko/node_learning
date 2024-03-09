import {PostModel} from '../db/models/PostModel';

class PostService {
  constructor() {
  }

  create = async ({ title, body, userId }) => {
    const post = await PostModel.create({  title, body, owner: userId });
    return post;
  };

  getPost = async (postId) => {
    const post = await PostModel.findById(postId);
    return post;
  };

  updatePost = async (postId, post) => {
    const updatedPost = await PostModel.findByIdAndUpdate(postId, post, { new: true });
    return updatedPost;
  };
}

export default new PostService();