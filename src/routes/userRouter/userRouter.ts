import { Router } from 'express';
import UserController from '../../controllers/userController';

const userRouter = Router();

userRouter.get('/api/v1/users', UserController.getUsers);
userRouter.post('/user', UserController.createUser);

export default userRouter;
