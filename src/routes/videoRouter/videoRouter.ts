import { Router } from 'express';
import videoController from '../../controllers/videoController';

const videoRouter = Router();

videoRouter.post('/upload', videoController.upload);

export default videoRouter;
