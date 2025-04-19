import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

const Finance = () => {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Finance Manager</h1>
        <p className="text-gray-400">Track your student expenses, budget, and financial goals</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-midnight-400 rounded-xl p-6">
          <p className="text-gray-400 mb-1">Monthly Budget</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">$1,200</span>
            <span className="text-green-400 text-xs mb-1">+$200 from last month</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-2 bg-midnight-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-sunny-400" style={{ width: '65%' }}></div>
            </div>
            <span className="text-gray-300 text-sm">65%</span>
          </div>
          <p className="text-gray-400 text-xs mt-1">$780 spent of $1,200</p>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center justify-between mb-1">
            <p className="text-gray-400">Income</p>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <span className="text-2xl font-bold text-white">$2,450</span>
          <p className="text-green-400 text-xs mt-1">+12% from last month</p>
          <div className="mt-2 pt-2 border-t border-midnight-300">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Part-time job</span>
              <span className="text-white">$1,800</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Freelance</span>
              <span className="text-white">$650</span>
            </div>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center justify-between mb-1">
            <p className="text-gray-400">Expenses</p>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </div>
          <span className="text-2xl font-bold text-white">$1,840</span>
          <p className="text-red-400 text-xs mt-1">+8% from last month</p>
          <div className="mt-2 pt-2 border-t border-midnight-300">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Rent</span>
              <span className="text-white">$800</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Food</span>
              <span className="text-white">$400</span>
            </div>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-1">
            <p className="text-gray-400">Savings</p>
            <DollarSign className="h-4 w-4 text-electric-400 ml-1" />
          </div>
          <span className="text-2xl font-bold text-white">$4,280</span>
          <div className="mt-2 pt-2 border-t border-midnight-300">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Savings Goal</span>
              <span className="text-white">$10,000</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-2 bg-midnight-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-electric-400" style={{ width: '42.8%' }}></div>
              </div>
              <span className="text-gray-300 text-sm">42.8%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-midnight-400 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Spending Overview</h2>
            <select className="bg-midnight-200 text-gray-300 rounded px-2 py-1 text-sm">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          <div className="p-6 h-[300px] flex items-center justify-center">
            <div className="w-full h-full bg-midnight-300 rounded-lg flex items-center justify-center">
              <PieChart className="h-16 w-16 text-gray-400" />
              <span className="ml-4 text-gray-300">Spending data visualization would appear here</span>
            </div>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200">
            <h2 className="text-xl font-semibold text-white">Top Categories</h2>
          </div>
          <div className="p-4 space-y-4">
            {[
              { label: 'Rent & Utilities', amount: 850, percent: 46, color: 'electric-400' },
              { label: 'Food & Groceries', amount: 400, percent: 22, color: 'skyblue-400' },
              { label: 'Education', amount: 250, percent: 14, color: 'sunny-400' },
              { label: 'Transportation', amount: 180, percent: 10, color: 'green-400' },
              { label: 'Entertainment', amount: 160, percent: 8, color: 'orange-400' },
            ].map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">{cat.label}</span>
                  <span className="text-white">${cat.amount}</span>
                </div>
                <div className="h-2 bg-midnight-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{cat.percent}% of monthly expenses</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-midnight-400 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200">
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
        </div>
        <div className="divide-y divide-midnight-300">
          {[
            { date: 'Oct 12', name: 'Campus Bookstore', amount: -89.95, category: 'Education' },
            { date: 'Oct 10', name: 'Tech Cafe', amount: -15.45, category: 'Food' },
            { date: 'Oct 8', name: 'Monthly Stipend', amount: 600, category: 'Income' },
            { date: 'Oct 5', name: 'Campus Shuttle', amount: -25, category: 'Transportation' },
            { date: 'Oct 3', name: 'Freelance Project', amount: 320, category: 'Income' },
            { date: 'Oct 1', name: 'Rent Payment', amount: -800, category: 'Housing' },
          ].map((tx, i) => (
            <div key={i} className="px-6 py-4 hover:bg-midnight-300 transition-colors">
              <div className="flex justify-between">
                <div>
                  <p className="text-white font-medium">{tx.name}</p>
                  <p className="text-sm text-gray-400">{tx.date} • {tx.category}</p>
                </div>
                <div className={`text-right font-medium ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finance;