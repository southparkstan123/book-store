import axios from 'axios';
import { getGreetingMessage } from '@/services/APIServices';

jest.mock('axios');

describe('getGreetingMessage', () => {
  it('fetches success response from an API', async () => {
    const data = {
      data: {
        message: 'Hello'
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getGreetingMessage()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('/api/v1/greeting');
  });
   
  it('fetches error response from an API', async () => {
    const errorMessage = 'Network Error';
 
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
     
    await expect(getGreetingMessage()).rejects.toThrow(errorMessage);
  });
});