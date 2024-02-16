import { Router } from 'express';
import userRouter from './userRouter/userRouter';
import videoRouter from './videoRouter/videoRouter';

const router = Router();

router.use(userRouter);
router.use(videoRouter);
export default router;
