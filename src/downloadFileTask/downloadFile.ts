import axios from 'axios';
import fsPromise from 'fs/promises';
import path from 'path';
import fs from 'fs';

const hw3DownloadImageTask = () => {

  const getFileNameFromURL = (path) => {
    const url = new URL(path);
    return  url.pathname.split('/').slice(-1).join('');
  };

  const checkFolderExists = async (pathToStore) => {
    try {
      await fsPromise.access(pathToStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const createFolder = (path) => {
    fs.mkdirSync(path);
  };

  const processImage = async (pathFrom: string, pathToStore: string) => {
    const fileNameWithExtension = getFileNameFromURL(pathFrom);
    const isDirectroryToStoreExists = await checkFolderExists(pathToStore);
    if (!isDirectroryToStoreExists) {
      createFolder(pathToStore);
    }
    try {
      const response = await axios.get(pathFrom, { responseType: 'arraybuffer' });
      await fsPromise.writeFile(path.join(pathToStore, fileNameWithExtension), response.data);
      return `Image successfully stored to ${pathToStore}`;
    } catch (e) {
      throw new Error(e);
    }
  };

  const pathFile = 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2023/07/celestial-events-color-palettes_featured.jpg?resize=1250,1120';
  const pathToStore = path.resolve(__dirname, 'downloads');

  processImage(pathFile, pathToStore)
    .then((data) => console.log(data))
    .catch((e) => console.log(e.message));
};

export default hw3DownloadImageTask;