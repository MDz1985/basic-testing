// Uncomment the code below and write your tests
import { throttledGetDataFromApi } from './index';
import axios from 'axios';

// jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const relativePath = '/posts/1';
    const create = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
