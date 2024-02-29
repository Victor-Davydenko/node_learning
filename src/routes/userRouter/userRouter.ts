import { Router } from 'express';
import UserController from '../../controllers/userController';
import { validationMiddleware } from '../../middlwares/validationMiddlware';
import { createUserValidationSchema, loginUserValidationSchema } from '../../validationSchemas/validationSchemas';
import authMiddlware from '../../middlwares/authMiddlware';
import refreshMiddleware from '../../middlwares/refreshMiddleware';

const userRouter = Router();

userRouter.get('/signin', validationMiddleware(loginUserValidationSchema), UserController.login);
userRouter.post('/signup', validationMiddleware(createUserValidationSchema), UserController.createUser);
userRouter.get('/api/auth/refresh-token',refreshMiddleware, UserController.refreshToken);
userRouter.get('/profile', authMiddlware, UserController.getProfile);

export default userRouter;
