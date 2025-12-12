'use client';

import { Expense } from '@/lib/types';

interface AnalyticsProps {
  expenses: Expense[];
}

const categoryIcons: Record<string, string> = {
  'Food': '🍔',
  'Transportation': '🚗',
  'Entertainment': '🎬',
  'Shopping': '🛍️',
  'Bills': '📄',
  'Healthcare': '⚕️',
  'Education': '📚',
  'Other': '📦',
};

const categoryColors: Record<string, string> = {
  'Food': 'from-orange-500 to-red-500',
  'Transportation': 'from-blue-500 to-cyan-500',
  'Entertainment': 'from-purple-500 to-pink-500',
  'Shopping': 'from-green-500 to-emerald-500',
  'Bills': 'from-yellow-500 to-orange-500',
  'Healthcare': 'from-red-500 to-pink-500',
  'Education': 'from-indigo-500 to-purple-500',
  'Other': 'from-gray-500 to-slate-500',
};

export default function Analytics({ expenses }: AnalyticsProps) {
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="space-y-6">
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Spending</p>
              <h3 className="text-5xl font-bold">${totalSpent.toFixed(2)}</h3>
              <p className="text-blue-100 text-sm mt-2">{expenses.length} transactions recorded</p>
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span>📊</span> Category Breakdown
        </h3>
        
        {sortedCategories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-lg">No expenses to analyze yet</p>
            <p className="text-sm mt-1">Add your first expense to see insights</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedCategories.map(([category, amount]) => {
              const percentage = (amount / totalSpent) * 100;
              const icon = categoryIcons[category] || '📦';
              const colorClass = categoryColors[category] || 'from-gray-500 to-slate-500';
              
              return (
                <div key={category} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        ${amount.toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${colorClass} h-3 rounded-full transition-all duration-500 ease-out shadow-sm`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
