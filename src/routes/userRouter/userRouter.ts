import { Router } from 'express';
import UserController from '../../controllers/userController';

const userRouter = Router();

userRouter.get('/api/v1/users', UserController.getUsers);
userRouter.post('/api/v1/users', UserController.createUser);
userRouter.delete('/api/v1/users/:id', UserController.deleteUser);

export default userRouter;
