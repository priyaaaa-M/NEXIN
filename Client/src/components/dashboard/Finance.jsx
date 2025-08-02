import React, { useState, useEffect } from 'react';
import '../../styles/theme.css';
import {
  DollarSign, TrendingUp, TrendingDown, PieChart,
  Plus, Settings, Download, Moon, Sun, X,
  Wallet, Home, Utensils, Shirt, Heart, Gift, Plane, Book, MoreHorizontal,
  AlertTriangle, FileText, Bell, Briefcase, Laptop, Building2, CircleDollarSign, Car, ShoppingBag, Receipt
} from 'lucide-react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Finance = () => {
  // State for dark mode
  const [darkMode, setDarkMode] = useState(true);

  // State for transactions
  const [transactions, setTransactions] = useState([]);

  // Categories for income and expenses
  const incomeCategories = [
    { id: 'Salary', label: 'Salary', icon: <Briefcase size={16} className="text-skyblue" /> },
    { id: 'Freelance', label: 'Freelance', icon: <Laptop size={16} className="text-green" /> },
    { id: 'Investment', label: 'Investment', icon: <TrendingUp size={16} className="text-purple" /> },
    { id: 'Business', label: 'Business', icon: <Building2 size={16} className="text-orange" /> },
    { id: 'Other', label: 'Other', icon: <CircleDollarSign size={16} className="text-muted" /> }
  ];

  const expenseCategories = [
    { id: 'Food', label: 'Food & Dining', icon: <Utensils size={16} className="text-orange" /> },
    { id: 'Rent', label: 'Rent', icon: <Home size={16} className="text-purple" /> },
    { id: 'Transport', label: 'Transport', icon: <Car size={16} className="text-skyblue" /> },
    { id: 'Shopping', label: 'Shopping', icon: <ShoppingBag size={16} className="text-pink" /> },
    { id: 'Bills', label: 'Bills', icon: <Receipt size={16} className="text-yellow" /> },
    { id: 'Other', label: 'Other', icon: <CircleDollarSign size={16} className="text-muted" /> }
  ];

  // Money making ideas
  const moneyMakingIdeas = []; // No dummy ideas

  // State for investments
  const [investments, setInvestments] = useState([]);

  // State for new transaction form
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    amount: '',
    category: '',
    source: '',
    date: new Date().toISOString().split('T')[0],
    person: '',
    note: ''
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalInvested = investments.reduce((sum, i) => sum + i.amount, 0);
  const currentInvestmentValue = investments.reduce((sum, i) => sum + i.currentValue, 0);
  const investmentProfit = currentInvestmentValue - totalInvested;

  const savings = totalIncome - totalExpenses;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({
      ...prev,
      [name]: value,
      type: activeTab === 'income' ? 'income' : 'expense'
    }));
  };

  // Add new transaction
  const addTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      type: activeTab === 'income' ? 'income' : 'expense',
      amount: parseFloat(newTransaction.amount)
    };
    setTransactions([...transactions, transaction]);
    setNewTransaction({
      type: activeTab === 'income' ? 'income' : 'expense',
      amount: '',
      category: '',
      source: '',
      date: new Date().toISOString().split('T')[0],
      person: '',
      note: ''
    });
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Chart data for income vs expenses
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Group transactions by month for line chart
  const incomeByMonth = Array(12).fill(0);
  const expenseByMonth = Array(12).fill(0);
  transactions.forEach(t => {
    const monthIdx = new Date(t.date).getMonth();
    if (t.type === 'income') incomeByMonth[monthIdx] += t.amount;
    if (t.type === 'expense') expenseByMonth[monthIdx] += t.amount;
  });

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: incomeByMonth,
        borderColor: 'var(--color-green)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3
      },
      {
        label: 'Expenses',
        data: expenseByMonth,
        borderColor: 'var(--color-pink)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.3
      }
    ]
  };

  // Pie chart data for expense categories
  
  const expenseCategoryNames = ['Rent', 'Food', 'Education', 'Medical', 'Investment', 'Other'];
const expenseCategoryTotals = expenseCategoryNames.map(cat =>
  transactions.filter(t => t.type === 'expense' && t.category === cat)
    .reduce((sum, t) => sum + t.amount, 0)
);

const pieChartData = {
  labels: expenseCategoryNames,
    datasets: [
      {
        data: expenseCategoryTotals,
        backgroundColor: [
          'var(--color-accent1)',
          'var(--color-accent2)',
          'var(--color-accent3)',
          'var(--color-accent4)',
          'var(--color-accent5)',
          'var(--color-accent6)'
        ]
      }
    ]
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-main text-main' : 'bg-card text-main'}`}>
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Personal Finance Manager</h1>
          <p className={`${darkMode ? 'text-muted' : 'text-gray-600'}`}>
            Track your income, expenses, and grow your wealth
          </p>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Income Card */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`${darkMode ? 'text-muted' : 'text-main'}`}>Income</p>
            <TrendingUp className="h-5 w-5 text-green" />
          </div>
          <span className="text-2xl font-bold text-green">₹{totalIncome.toLocaleString()}</span>
          <p className="text-green text-xs mt-1">+12% from last month</p>
        </div>

        {/* Expenses Card */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`${darkMode ? 'text-muted' : 'text-main'}`}>Expenses</p>
            <TrendingDown className="h-5 w-5 text-pink" />
          </div>
          <span className="text-2xl font-bold text-pink">₹{totalExpenses.toLocaleString()}</span>
          <p className="text-pink text-xs mt-1">+8% from last month</p>
        </div>

        {/* Investments Card */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`${darkMode ? 'text-muted' : 'text-main'}`}>Investments</p>
            <Wallet className="h-5 w-5 text-skyblue" />
          </div>
          <span className="text-2xl font-bold text-skyblue">₹{currentInvestmentValue.toLocaleString()}</span>
          <p className={`text-xs mt-1 ${investmentProfit >= 0 ? 'text-green' : 'text-pink'}`}>
            {investmentProfit >= 0 ? '+' : ''}{investmentProfit.toLocaleString()} ({((investmentProfit / totalInvested) * 100).toFixed(2)}%)
          </p>
        </div>

        {/* Savings Card */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`${darkMode ? 'text-muted' : 'text-main'}`}>Savings</p>
            <DollarSign className="h-5 w-5 text-purple" />
          </div>
          <span className="text-2xl font-bold text-purple">₹{savings.toLocaleString()}</span>
          <div className="mt-2 pt-2 border-t border-midnight">
            <div className="flex justify-between text-sm">
              <span className={`${darkMode ? 'text-muted' : 'text-main'}`}>Savings Goal</span>
              <span>₹10,000</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden bg-midnight">
                <div
                  className="h-full rounded-full bg-purple"
                  style={{ width: `${(savings / 10000) * 100}%` }}
                />
              </div>
              <span className={`text-sm ${darkMode ? 'text-main' : 'text-muted'}`}>
                {((savings / 10000) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-accent mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-skyblue text-skyblue' : darkMode ? 'text-muted' : 'text-main'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 py-2 font-medium ${activeTab === 'income' ? 'border-b-2 border-skyblue text-skyblue' : darkMode ? 'text-muted' : 'text-main'}`}
        >
          Income
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 font-medium ${activeTab === 'expenses' ? 'border-b-2 border-skyblue text-skyblue' : darkMode ? 'text-muted' : 'text-main'}`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab('investments')}
          className={`px-4 py-2 font-medium ${activeTab === 'investments' ? 'border-b-2 border-skyblue text-skyblue' : darkMode ? 'text-muted' : 'text-main'}`}
        >
          Investments
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Income vs Expenses Chart */}
            <div className={`lg:col-span-2 rounded-xl p-6 ${darkMode ? 'bg-card' : 'bg-main shadow'}`}>
              <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
              <div className="h-64">
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          color: darkMode ? '#E5E7EB' : '#374151',
                        }
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        },
                        ticks: {
                          color: darkMode ? '#9CA3AF' : '#6B7280',
                        }
                      },
                      y: {
                        grid: {
                          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        },
                        ticks: {
                          color: darkMode ? '#9CA3AF' : '#6B7280',
                        }
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Expense Categories */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
              <h2 className="text-xl font-semibold mb-4">Expense Categories</h2>
              <div className="h-64">
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: darkMode ? '#E5E7EB' : '#374151',
                        }
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'income' && (
      <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-card' : 'bg-main'}`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className="text-xl font-semibold">Income Management</h2>
            </div>
            <div className="p-6">
              {/* Income Table */}
              <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-card' : 'bg-main'}`}>
                {/* Table Header */}
                <div className={`grid grid-cols-4 gap-0 border-b ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'} border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>Sources</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'} border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>Type</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'} border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>Amount</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'}`}>Income Chart</div>
                </div>

                {/* Table Content */}
                <div className="grid grid-cols-4 gap-0 h-[400px]">
                  {/* Sources Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                    <div className="space-y-2">
  {transactions.filter(t => t.type === 'income').length > 0 ? (
    transactions.filter(t => t.type === 'income').map(income => (
      <div key={income.id} className="font-medium">{income.source}</div>
    ))
  ) : (
    <div className="text-muted">No income sources</div>
  )}
</div>
                  </div>

                  {/* Type Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                    <div className="space-y-2">
  {transactions.filter(t => t.type === 'income').length > 0 ? (
    transactions.filter(t => t.type === 'income').map(income => (
      <div key={income.id} className="font-medium">{income.category}</div>
    ))
  ) : (
    <div className="text-muted">No income types</div>
  )}
</div>
                  </div>

                  {/* Amount Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                    <div className="space-y-2">
  {transactions.filter(t => t.type === 'income').length > 0 ? (
    transactions.filter(t => t.type === 'income').map(income => (
      <div key={income.id} className="font-medium">₹{income.amount?.toLocaleString?.() ?? income.amount}</div>
    ))
  ) : (
    <div className="text-muted">No income amounts</div>
  )}
</div>
                  </div>

                  {/* Chart Column */}
                  <div className="p-3">
                    <div className="h-48 w-48">
                      <Pie
  data={{
    labels: transactions.filter(t => t.type === 'income').map(i => i.source),
    datasets: [
      {
        data: transactions.filter(t => t.type === 'income').map(i => i.amount),
        backgroundColor: transactions.filter(t => t.type === 'income').map((_, idx) =>
          `var(--color-accent${(idx % 6) + 1})`
        )
      }
    ]
  }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: darkMode ? '#E5E7EB' : '#374151'
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Income Form */}
              <form onSubmit={addTransaction} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-main' : 'text-muted'}`}>Source</label>
                    <select
                      name="source"
                      value={newTransaction.source}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      required
                    >
                      <option value="">Select Source</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Job">Job</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-main' : 'text-muted'}`}>Type</label>
                    <select
                      name="category"
                      value={newTransaction.category}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Stipend">Stipend</option>
                      <option value="Salary">Salary</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount (₹)</label>
                    <input
                      type="number"
                      name="amount"
                      value={newTransaction.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green text-main rounded-lg flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Income
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className="text-xl font-semibold">Expense Management</h2>
            </div>
            <div className="p-6">
              {/* Expense Table */}
              <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-card' : 'bg-main'}`}>
                {/* Table Header */}
                <div className={`grid grid-cols-6 gap-0 border-b ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'} border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>Rent</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'} border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>Food</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'} border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>Education</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'} border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>Medical</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'} border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>Investment</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-main' : 'text-muted'}`}>Extra Cash</div>
                </div>

                {/* Table Content */}
                <div className="grid grid-cols-6 gap-0 h-[400px] overflow-y-scroll">
                  {/* Rent Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Rent')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-main">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Food Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Food')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-main">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Education Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Education')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-main">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Medical Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Medical')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-main">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Investment Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-midnight' : 'border-accent'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Investment')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-main">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Extra Cash Column */}
                  <div className="p-3">
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Other')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-main">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted">{expense.note}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Add Expense Form */}
              <form onSubmit={addTransaction} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-main' : 'text-muted'}`}>Category</label>
                    <select
                      name="category"
                      value={newTransaction.category}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Rent">Rent</option>
                      <option value="Food">Food</option>
                      <option value="Education">Education</option>
                      <option value="Medical">Medical</option>
                      <option value="Investment">Investment</option>
                      <option value="Other">Extra Cash</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount (₹)</label>
                    <input
                      type="number"
                      name="amount"
                      value={newTransaction.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-main' : 'text-muted'}`}>Note</label>
                    <input
                      type="text"
                      name="note"
                      value={newTransaction.note}
                      onChange={handleInputChange}
                      placeholder="Add a note"
                      className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink text-main rounded-lg flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Investment Portfolio</h2>
                <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                  <Plus size={16} className="mr-1 inline" /> Add Investment
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {investments.map(investment => (
                  <div
                    key={investment.id}
                    className={`p-4 rounded-lg ${darkMode ? 'bg-card' : 'bg-main'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{investment.type}</p>
                        <p className={`text-sm ${darkMode ? 'text-main' : 'text-muted'}`}>
                          Invested: ₹{investment.amount.toLocaleString()}
                        </p>
                      </div>
                      <span className={`text-sm font-medium ${investment.currentValue >= investment.amount ? 'text-green' : 'text-pink'
                        }`}>
                        {investment.currentValue >= investment.amount ? '+' : ''}
                        ₹{(investment.currentValue - investment.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className={`${darkMode ? 'text-muted' : 'text-main'}`}>Current Value</span>
                        <span>₹{investment.currentValue.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden bg-midnight">
                        <div
                          className="h-full rounded-full bg-skyblue"
                          style={{
                            width: `${(investment.currentValue / (investment.amount * 1.5)) * 100}%`,
                            maxWidth: '100%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-card' : 'bg-main'}`}>
                <h3 className="font-medium mb-2">Investment Performance</h3>
                <div className="h-64">
                  <Line
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [{
                        label: 'Portfolio Value',
                        data: [8000, 8500, 8200, 8800, 9000, 9200],
                        borderColor: '#6366F1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        tension: 0.3
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                          },
                          ticks: {
                            color: darkMode ? '#9CA3AF' : '#6B7280'
                          }
                        },
                        x: {
                          grid: {
                            display: false
                          },
                          ticks: {
                            color: darkMode ? '#9CA3AF' : '#6B7280'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Money Making Ideas */}
      <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-xl font-semibold">Money Making Ideas</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {moneyMakingIdeas.map(idea => (
              <div
                key={idea.id}
                className={`p-4 rounded-lg ${darkMode ? 'bg-card' : 'bg-main'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{idea.idea}</p>
                    <p className={`text-sm ${darkMode ? 'text-muted' : 'text-gray-500'}`}>
                      Category: {idea.category}
                    </p>
                  </div>
                  <button
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    <Plus size={16} className="mr-1 inline" /> Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;