import { Request } from 'express';
import busboy from 'busboy';
import { checkIsFileAllowed, getFileExtension, writableStream } from '../utils/utils';
import { FILE_SIZE_LIMIT } from '../constants/constants';


class VideoService {
  upload = (requestStream: Request, res) => {
    const bb = busboy({
      headers: requestStream.headers,
      limits: {
        fileSize: FILE_SIZE_LIMIT
      }
    });
    let fileSizeExceeded = false;
    let isFileAttached = false;

    bb.on('file', (name, file, info) => {
      isFileAttached = true;
      const { filename } = info;
      const fileExtension = getFileExtension(filename);
      const allowedExtension = ["mp4", "webm", "ogg"];
      const isFileAllowed = checkIsFileAllowed(fileExtension, allowedExtension);
      if (!isFileAllowed) {
        res.status(500).json({
          status: 500,
          data: 'Помилка завантаження відео.'
        });
      }
      file.on('limit', () => {
        fileSizeExceeded = true;
        file.resume();
      });

      file.on('data', (data) => {
        if (fileSizeExceeded) return;
        writableStream.write(data);
      });

    });

    bb.on('finish', () => {
      if (fileSizeExceeded || !isFileAttached) {
        res.status(500).json({
          status: 500,
          data: 'Помилка завантаження відео.'
        });
      } else {
        res.status(200).json({
          status: 200,
          data: 'Відео успішно завантажено!'
        });
      }
    });

    requestStream.pipe(bb);
  };
}

export default VideoService;