import path from 'path';
import fs from 'fs';
import { Writable } from 'stream';

export const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop();
};

export const checkIsFileAllowed = (fileExtension: string, allowedExtensions: string[]): boolean => {
  return allowedExtensions.includes(fileExtension);
};

export const writableStream = new Writable({
  write(chunk, encoding, callback) {
    fs.appendFile(path.resolve(__dirname,'..', 'uploads', 'result.mp4'), chunk, {}, (error) => {
      if (error) {
        callback(error);
      } else {
        callback();
      }
    });
  }
});