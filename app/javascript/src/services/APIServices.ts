import axios from 'axios';
import { LoginForm, RegistrationForm } from '@/type';

export async function getGreetingMessage(): Promise<AxiosResponse<any>> {
  const result = await axios.get('/api/v1/greeting');
  return result;
}

export async function signin(payload: LoginForm): Promise<AxiosResponse<any>> {
  const result = await axios.post('/api/v1/user/login', payload);
  // set the access token in localStorage
  localStorage.setItem('token', result.data.token);
  return result;
}

export async function verify(): Promise<AxiosResponse<any>> {
  // get the access token in localStorage
  const token: string | null = localStorage.getItem('token');

  return await axios.get('/api/v1/user/auto_login', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function register(payload: RegistrationForm): Promise<AxiosResponse<any>> {
  const result = await axios.post('/api/v1/user/register', payload);
  return result;
}

export async function signout(): Promise<any> {
  // remove the token stored in localStorage
  return await localStorage.removeItem('token');
}