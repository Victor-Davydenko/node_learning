import { Request, Response } from 'express';
import VideoService from '../services/videoService';


class VideoController {
  constructor (private videoService: VideoService) {
  }
  upload = async (req: Request, res: Response) => {
    this.videoService.upload(req, res);
  };
}

export default new VideoController(new VideoService());