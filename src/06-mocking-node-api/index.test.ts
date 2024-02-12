// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as path from 'path';
import fs from 'fs/promises';
import * as f from 'fs';

jest.mock('fs/promises');
jest.mock('fs');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback: jest.Mock<void> = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(timeoutSpy).toHaveBeenCalledTimes(1);
    expect(timeoutSpy).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback: jest.Mock<void> = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const callback: jest.Mock<void> = jest.fn();
    const interval = 1000;
    doStuffByInterval(callback, interval);
    expect(intervalSpy).toHaveBeenCalledTimes(1);
    expect(intervalSpy).toBeCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback: jest.Mock<void> = jest.fn();
    const interval = 1000;
    let times = 0;
    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(++times);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(++times);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(++times);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    const fileName = 'example.txt';
    await readFileAsynchronously(fileName);
    expect(join).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    const existsSync = jest.spyOn(f, 'existsSync').mockReturnValue(false);
    const fileName = 'test.txt';
    const result = await readFileAsynchronously(fileName);
    expect(existsSync).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'Test me';
    const existsSync = jest.spyOn(f, 'existsSync').mockReturnValue(true);
    const readFile = jest.spyOn(fs, 'readFile').mockResolvedValue(fileContent);
    const fileName = 'test.txt';
    const result = await readFileAsynchronously(fileName);
    expect(existsSync).toBeTruthy();
    expect(readFile).toBeCalled();
    expect(result).toBe(fileContent);
  });
});
