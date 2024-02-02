import axios, { AxiosResponse } from "axios";
import { JsonPlaceholderData, User } from "./types";
const homework2 = () => {
  const getData = async (url:string): Promise<AxiosResponse<JsonPlaceholderData>> => {
    try {
      return await axios.get<JsonPlaceholderData>(url);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const showResult = <T>(data: T) => {
    console.log(data);
  };

  const processData = async (urls: string[]): Promise<void> => {
    const dataStorage: JsonPlaceholderData[] = [];
    for (const url of urls) {
      const { data } = await getData(url);
      dataStorage.push(data);
    }
    showResult<JsonPlaceholderData[]>(dataStorage);
  };

  const urlsToFetch: string[] = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/comments/1', 'https://jsonplaceholder.typicode.com/posts/1'];

  processData(urlsToFetch);

  const users: User[] = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
    { username: 'admin', password: 'admin123' }
  ];

  async function authenticateUser(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const user:User = users.find((user) => user.username === username);
      if (!user) {
        reject(new Error('Username is invalid'));
      }
      if (user && user.password === password) {
        resolve(user);
      } else {
        reject(new Error('Password is invalid'));
      }
    });
  }

  authenticateUser('user1', 'password1')
    .then(user => {
      console.log('user authenticated', user);
    })
    .catch(error => {
      console.error('Authentication failed:', error.message);
    });
};

export default homework2;
