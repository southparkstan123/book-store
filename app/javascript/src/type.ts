export type SumResult = {
  output: string;
  value: number;
}

export type ModelType ='alert' | 'confirm' | 'form';

export type ModuleType = 'book' | 'author' | 'publisher';

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

export type BookForm = {
  name: string,
  abstract: string,
  price: number | null,
  publisher_id: number | null,
  author_ids: Array<number>
}

export type AuthorForm = {
  name: string,
  description: string
}

export type PublisherForm = {
  name: string,
  description: string
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
  authors: Array<Author>;
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
