import { User, Expense } from './types';

// In-memory database (replace with real DB in production)
export const users: User[] = [];
export const expenses: Expense[] = [];

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(u => u.email === email);
};

export const createUser = (user: User): User => {
  users.push(user);
  return user;
};

export const getExpensesByUserId = (userId: string): Expense[] => {
  return expenses.filter(e => e.userId === userId);
};

export const createExpense = (expense: Expense): Expense => {
  expenses.push(expense);
  return expense;
};

export const deleteExpense = (id: string, userId: string): boolean => {
  const index = expenses.findIndex(e => e.id === id && e.userId === userId);
  if (index > -1) {
    expenses.splice(index, 1);
    return true;
  }
  return false;
};
