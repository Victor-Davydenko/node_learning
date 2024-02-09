import { Router } from 'express';
import userRouter from './userRouter/userRouter';

const router = Router();

router.use(userRouter);
export default router;
