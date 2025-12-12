import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { deleteExpense } from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const success = deleteExpense(params.id, session.userId as string);

  if (!success) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Expense deleted' });
}
