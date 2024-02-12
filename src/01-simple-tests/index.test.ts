// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  let a: number, b: number;
  beforeAll(() => {
    a = 12;
    b = 3;
  });
  test('should add two numbers', () => {
    const action = Action.Add;
    expect(simpleCalculator({ a, b, action })).toEqual(a + b);
  });

  test('should subtract two numbers', () => {
    const action = Action.Subtract;
    expect(simpleCalculator({ a, b, action })).toEqual(a - b);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;
    expect(simpleCalculator({ a, b, action })).toEqual(a * b);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;
    expect(simpleCalculator({ a, b, action })).toEqual(a / b);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;
    expect(simpleCalculator({ a, b, action })).toEqual(a ** b);
  });

  test('should return null for invalid action', () => {
    const action = 'error';
    expect(simpleCalculator({ a, b, action })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const wrongA = 'der';
    const wrongB: string[] = ['a', 'b'];
    const action = Action.Add;
    expect(simpleCalculator({ a: wrongA, b: wrongB, action })).toEqual(null);
  });
});
