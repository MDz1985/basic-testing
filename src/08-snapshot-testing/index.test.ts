// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values: number[] = [1, 2, 3, 4, 5];
    const list = generateLinkedList(values);
    const testList = values
      .reverse()
      .reduce<{ value: unknown; next: unknown }>(
        (next, value) => ({ next, value }),
        {
          value: null,
          next: null,
        },
      );
    expect(list).toStrictEqual(testList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values: number[] = [1, 2, 3, 4, 5];
    const list = generateLinkedList(values);
    expect(list).toMatchSnapshot();
  });
});
