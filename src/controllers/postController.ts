import { Request, Response } from 'express';
import PostService from '../services/PostService';

class PostController {

  constructor(private postService: PostService) {
  }

  getPosts = async (req: Request, res: Response, next) => {
    try {
      const users = await this.postService.getPosts();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  };

  createPost = async (req: Request, res: Response, next) => {
    try {
      const { title, body, userId } = req.body;
      const response = await this.postService.createPost({ title, body, userId });
      return res.json(response);
    } catch (e) {
      next(e);
    }
  };

  deletePost = async (req: Request, res: Response, next) => {
    try {
      const { id } = req.params;
      const response = await this.postService.deletePost(id);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  };
}

export default new PostController(new PostService());