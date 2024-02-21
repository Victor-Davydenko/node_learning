import { Router } from 'express';
import UserController from '../../controllers/userController';
import { validationMiddleware } from '../../middlwares/validationMiddlware';
import { createUserValidationSchema, loginUserValidationSchema } from '../../validationSchemas/validationSchemas';

const userRouter = Router();

userRouter.get('/signin', validationMiddleware(loginUserValidationSchema), UserController.login);
userRouter.post('/signup', validationMiddleware(createUserValidationSchema), UserController.createUser);

export default userRouter;
