import { Router } from 'express';
import PostController from '../../controllers/postController';
import authMiddlware from '../../middlwares/authMiddlware';
import { validationMiddleware } from '../../middlwares/validationMiddlware';
import {
  updatePostValidationSchema,
  postValidationSchema,
  updatePostPropertyValidationSchema
} from '../../validationSchemas/validationSchemas';
import checkOwnerShipMiddleware from '../../middlwares/checkOwnerShipMiddleware';


const postRouter = Router();

postRouter.post('/posts', [authMiddlware('jwt_access'), validationMiddleware(postValidationSchema)], PostController.createPost);
postRouter.get('/posts/:id', PostController.getPost);
postRouter.put('/posts/:id/update',[authMiddlware('jwt_access'), checkOwnerShipMiddleware, validationMiddleware(updatePostValidationSchema)], PostController.updatePost);
postRouter.patch('/posts/:id/updatePostProperty',[authMiddlware('jwt_access'), checkOwnerShipMiddleware, validationMiddleware(updatePostPropertyValidationSchema)], PostController.updatePost);

export default postRouter;
