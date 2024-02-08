import axios from 'axios';
import fsPromise from 'fs/promises';
import path from 'path';

const hw3DownloadImageTask = () => {

  const getFileNameFromURL = (path) => {
    const url = new URL(path);
    return  url.pathname.split('/').slice(-1).join('');
  };

  const processImage = async (pathFrom: string, pathToStore: string) => {
    const fileNameWithExtension = getFileNameFromURL(pathFrom);
    try {
      const response = await axios.get(pathFrom, { responseType: 'arraybuffer' });
      await fsPromise.writeFile(path.join(pathToStore, fileNameWithExtension), response.data);
      return `Image successfully stored to ${pathToStore}`;
    } catch (e) {
      throw new Error('Something went wrong');
    }
  };

  const pathFile = 'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2023/07/celestial-events-color-palettes_featured.jpg?resize=1250,1120';
  const pathToStore = path.resolve(__dirname, 'downloads');

  processImage(pathFile, pathToStore)
    .then((data) => console.log(data))
    .catch((e) => console.log(e.message));
};

export default hw3DownloadImageTask;