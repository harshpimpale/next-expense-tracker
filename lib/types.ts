export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface Expense {
  id: string;
  userId: string;
  date: string;
  category: string;
  amount: number;
  note: string;
  createdAt: string;
}

export const CATEGORIES = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Healthcare',
  'Education',
  'Other'
];
