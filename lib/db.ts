import dbConnect from './mongoose';
import User from './models/User';
import Expense from './models/Expense';
import { User as UserType, Expense as ExpenseType } from './types';

// User operations
export const findUserByEmail = async (email: string): Promise<UserType | null> => {
  await dbConnect();
  const user = await User.findOne({ email }).lean();
  
  if (!user) return null;
  
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    password: user.password,
  };
};

export const createUser = async (userData: UserType): Promise<UserType> => {
  await dbConnect();
  
  const user = await User.create({
    email: userData.email,
    name: userData.name,
    password: userData.password,
  });

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    password: user.password,
  };
};

// Expense operations
export const getExpensesByUserId = async (userId: string): Promise<ExpenseType[]> => {
  await dbConnect();
  
  const expenses = await Expense.find({ userId })
    .sort({ date: -1, createdAt: -1 })
    .lean();

  return expenses.map(exp => ({
    id: exp._id.toString(),
    userId: exp.userId,
    date: exp.date,
    category: exp.category,
    amount: exp.amount,
    note: exp.note,
    createdAt: exp.createdAt.toISOString(),
  }));
};

export const createExpense = async (expenseData: ExpenseType): Promise<ExpenseType> => {
  await dbConnect();
  
  const expense = await Expense.create({
    userId: expenseData.userId,
    date: expenseData.date,
    category: expenseData.category,
    amount: expenseData.amount,
    note: expenseData.note,
  });

  return {
    id: expense._id.toString(),
    userId: expense.userId,
    date: expense.date,
    category: expense.category,
    amount: expense.amount,
    note: expense.note,
    createdAt: expense.createdAt.toISOString(),
  };
};

export const deleteExpense = async (id: string, userId: string): Promise<boolean> => {
  await dbConnect();
  
  const result = await Expense.deleteOne({ _id: id, userId });
  return result.deletedCount === 1;
};
