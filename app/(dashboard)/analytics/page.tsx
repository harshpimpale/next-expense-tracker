'use client';

import { useEffect, useState } from 'react';
import Analytics from '@/components/Analytics';
import { Expense } from '@/lib/types';

export default function AnalyticsPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch('/api/expenses');
      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
      <Analytics expenses={expenses} />
    </div>
  );
}
