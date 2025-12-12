'use client';

import { useEffect, useState } from 'react';
import ExpenseList from '@/components/ExpenseList';
import FilterBar from '@/components/FilterBar';
import { Expense } from '@/lib/types';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'all',
  });

  const fetchExpenses = async () => {
    const params = new URLSearchParams();
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.category) params.append('category', filters.category);

    const res = await fetch(`/api/expenses?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setExpenses(data);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchExpenses();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">All Expenses</h1>
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </div>
  );
}
