'use client';

import { useEffect, useState } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import Analytics from '@/components/Analytics';
import { Expense } from '@/lib/types';

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    const res = await fetch('/api/expenses');
    if (res.ok) {
      const data = await res.json();
      setExpenses(data);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseForm onSubmit={fetchExpenses} />
        <Analytics expenses={expenses} />
      </div>
    </div>
  );
}
