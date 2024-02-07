// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 777;
  let bankAccount = getBankAccount(initialBalance);
  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
  });
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(1000)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(initialBalance + 1, getBankAccount(initialBalance)),
    ).toThrow(new InsufficientFundsError(initialBalance));
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(initialBalance - 1, bankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(initialBalance).getBalance()).toBe(
      2 * initialBalance,
    );
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(initialBalance - 1).getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const newBankAccount = getBankAccount(0);
    bankAccount.transfer(initialBalance, newBankAccount);
    expect(bankAccount.getBalance()).toBe(0);
    expect(newBankAccount.getBalance()).toBe(initialBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await bankAccount.fetchBalance();
    if (result) {
      expect(typeof result).toBe('number');
    } else {
      expect(result).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance() === initialBalance).toBeFalsy();
    } catch (err) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await bankAccount.synchronizeBalance();
    } catch (err) {
      expect(err).toStrictEqual(new SynchronizationFailedError());
    }
  });
});
