interface ToDo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  username: string;
  password: string;
}

export type JsonPlaceholderData = Comment | Post | ToDo