export type SumResult = {
  output: string;
  value: number;
}

export type ModelType ='alert' | 'confirm' | 'form';

export type Modal = {
  visible: boolean;
  type: ModelType;
  message: string;
  title: string;
  action: string;
  payload: any;
  component: string;
  params: any;
}

export type OpenModalPayload = {
  type: ModelType;
  message: string;
  title: string;
  action: string;
  payload: any;
  component: string | "";
  params: any;
}

export type UserInfo = {
  id: string;
  username: string;
  email: string;
}

export type UserState = {
  userInfo: UserInfo | null;
  token: string | null;
}

export type LoginForm = {
  form: {
    username: string;
    password: string;
  }
}

export type RegistrationForm = {
  form: {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
}

export type Timestamp = {
  created_at: string;
  updated_at: string;
}

export type Creator = UserInfo & Timestamp

export type Updater = UserInfo & Timestamp

export type Book = {
  id: number;
  name: string;
  price: number;
  abstract: string;
  publisher: Publisher | null;
  author: Array<Author>;
  creator: Creator;
  updater: Updater;
} & Timestamp

export type Publisher = {
  id: number;
  name: string;
  description: string;
  creator: Creator;
  updater: Updater
} & Timestamp

export type Author = {
  id: number;
  name: string;
  description: string;
  creator: Creator;
  updater: Updater;
  books: Array<Book>;
} & Timestamp

/*
{
  "id": 12,
  "name": "Book I",
  "price": "25.0",
  "abstract": "This is the description of Book I.",
  "created_at": "2021-01-27T12:11:39.520Z",
  "updated_at": "2021-01-27T12:11:39.520Z",
  "authors": [],
  "creator": {
      "id": 1,
      "username": "admin",
      "email": "admin@railsapp.com",
      "created_at": "2021-01-25T12:25:59.088Z",
      "updated_at": "2021-01-25T12:25:59.088Z"
  },
  "updater": {
      "id": 1,
      "username": "admin",
      "email": "admin@railsapp.com",
      "created_at": "2021-01-25T12:25:59.088Z",
      "updated_at": "2021-01-25T12:25:59.088Z"
  },
  "publisher": {
      "id": 2,
      "name": "Publisher B",
      "description": "The description for publisher B",
      "created_at": "2021-01-25T12:25:59.351Z",
      "updated_at": "2021-01-25T12:25:59.351Z"
  }
}
*/