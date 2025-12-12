import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getExpensesByUserId, createExpense } from '@/lib/db';
import { Expense } from '@/lib/types';

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const category = searchParams.get('category');

    // ✅ Added await here
    let expenses = await getExpensesByUserId(session.userId as string);

    // Apply filters
    if (startDate) {
      expenses = expenses.filter(e => e.date >= startDate);
    }
    if (endDate) {
      expenses = expenses.filter(e => e.date <= endDate);
    }
    if (category && category !== 'all') {
      expenses = expenses.filter(e => e.category === category);
    }

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { date, category, amount, note } = await request.json();

    const expense: Expense = {
      id: crypto.randomUUID(),
      userId: session.userId as string,
      date,
      category,
      amount: parseFloat(amount),
      note,
      createdAt: new Date().toISOString(),
    };

    // ✅ Added await here
    const createdExpense = await createExpense(expense);

    return NextResponse.json(createdExpense, { status: 201 });
  } catch (error) {
    console.error('Create expense error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
