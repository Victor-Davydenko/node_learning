import { NextFunction } from 'express';
import PostService from '../services/PostService';

class PostController {
  constructor(private postService: typeof PostService) {
  }

  createPost = async (req, res, next: NextFunction) => {
    try {
      const { user: { id: userId }, body: { title, body } } = req;
      const post = await this.postService.create({ title, body, userId });
      return res.json({
        status: 201,
        message: 'Post successfully created',
        post
      });
    } catch (e) {
      next(e);
    }
  };

  getPost = async (req, res, next: NextFunction) => {
    try {
      const { id: postId } = req.params;
      const post = await this.postService.getPost(postId);
      return res.json({
        status: 200,
        post
      });
    } catch (e) {
      next(e);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const post = req.body;
      const postId = req.params.id;
      const updatedPost = await this.postService.updatePost(postId, post);
      return res.json({
        status: 201,
        message: 'Post has been successfully updated',
        post: updatedPost
      });
    } catch (e) {
      next(e);
    }
  };
}

export default new PostController(PostService);