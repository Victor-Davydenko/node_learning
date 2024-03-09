import { Router } from 'express';
import userRouter from './userRouter/userRouter';
import postRouter from './postRouter/postRouter';

const router = Router();

router.use(userRouter);
router.use(postRouter);
export default router;
