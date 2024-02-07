// Uncomment the code below and write your tests
import { throttledGetDataFromApi } from './index';
import axios from 'axios';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.advanceTimersByTime(5000);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const relativePath = '/posts/1';
    const create = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const mockAxios: typeof axios = jest.genMockFromModule('axios');
    mockAxios.create = jest.fn(() => mockAxios);
    const instance = mockAxios.create({
      baseURL,
    });
    const create = jest.spyOn(axios, 'create').mockReturnValue(instance);
    const get = jest.spyOn(instance, 'get').mockResolvedValue({ data: 'fd' });
    await throttledGetDataFromApi(relativePath);
    expect(create).toHaveBeenCalledWith({ baseURL });
    expect(get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const responseData = { testKey: 'testValue' };
    const mockAxios: typeof axios = jest.genMockFromModule('axios');
    mockAxios.create = jest.fn(() => mockAxios);
    const instance = mockAxios.create({
      baseURL,
    });
    const create = jest.spyOn(axios, 'create').mockReturnValue(instance);
    const get = jest
      .spyOn(instance, 'get')
      .mockResolvedValue({ data: responseData });
    const result = await throttledGetDataFromApi(relativePath);
    expect(create).toHaveBeenCalledWith({ baseURL });
    expect(get).toHaveBeenCalledWith(relativePath);
    expect(result).toEqual(responseData);
  });
});
