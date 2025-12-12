import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  userId: string;
  date: string;
  category: string;
  amount: number;
  note: string;
  createdAt: Date;
}

const ExpenseSchema = new Schema<IExpense>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
    index: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: 0,
  },
  note: {
    type: String,
    default: '',
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for better query performance
ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ userId: 1, category: 1 });

export default mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);
