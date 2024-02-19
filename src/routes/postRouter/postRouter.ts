import { Router } from 'express';
import PostController from '../../controllers/postController';
import {postValidationMiddleware} from '../../middleware/postValidationMiddleware';
import {postMiddlware} from '../../middleware/postMiddlware';

const postRouter = Router();

postRouter.use(postMiddlware);

postRouter.get('/api/v1/posts', PostController.getPosts);
postRouter.post('/api/v1/posts', postValidationMiddleware, PostController.createPost);
postRouter.delete('/api/v1/posts/:id', PostController.deletePost);

export default postRouter;
