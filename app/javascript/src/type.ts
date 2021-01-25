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