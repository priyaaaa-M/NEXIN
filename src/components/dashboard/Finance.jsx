import React, { useState, useEffect } from 'react';
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
  const [transactions, setTransactions] = useState([
    // Income transactions
    { id: 1, type: 'income', amount: 9000, category: 'Stipend', source: 'Freelance', date: '2023-10-15' },
    { id: 2, type: 'income', amount: 2000, category: 'Salary', source: 'Job', date: '2023-10-10' },
    // Expense transactions
    { id: 3, type: 'expense', amount: 15000, category: 'Rent', note: 'Monthly House Rent', date: '2023-10-01' },
    { id: 4, type: 'expense', amount: 8000, category: 'Food', note: 'Monthly Groceries', date: '2023-10-05' },
    { id: 5, type: 'expense', amount: 12000, category: 'Education', note: 'Course Fee', date: '2023-10-08' },
    { id: 6, type: 'expense', amount: 5000, category: 'Medical', note: 'Health Checkup', date: '2023-10-12' },
    { id: 7, type: 'expense', amount: 20000, category: 'Investment', note: 'Stock Market', date: '2023-10-15' },
    { id: 8, type: 'expense', amount: 3000, category: 'Other', note: 'Miscellaneous', date: '2023-10-18' }
  ]);

  // Categories for income and expenses
  const incomeCategories = [
    { id: 'Salary', label: 'Salary', icon: <Briefcase size={16} className="text-blue-500" /> },
    { id: 'Freelance', label: 'Freelance', icon: <Laptop size={16} className="text-green-500" /> },
    { id: 'Investment', label: 'Investment', icon: <TrendingUp size={16} className="text-purple-500" /> },
    { id: 'Business', label: 'Business', icon: <Building2 size={16} className="text-orange-500" /> },
    { id: 'Other', label: 'Other', icon: <CircleDollarSign size={16} className="text-gray-500" /> }
  ];

  const expenseCategories = [
    { id: 'Food', label: 'Food & Dining', icon: <Utensils size={16} className="text-orange-500" /> },
    { id: 'Rent', label: 'Rent', icon: <Home size={16} className="text-purple-500" /> },
    { id: 'Transport', label: 'Transport', icon: <Car size={16} className="text-blue-500" /> },
    { id: 'Shopping', label: 'Shopping', icon: <ShoppingBag size={16} className="text-pink-500" /> },
    { id: 'Bills', label: 'Bills', icon: <Receipt size={16} className="text-yellow-500" /> },
    { id: 'Other', label: 'Other', icon: <CircleDollarSign size={16} className="text-gray-500" /> }
  ];

  // Money making ideas
  const moneyMakingIdeas = [
    { id: 1, idea: 'Start freelancing on Fiverr/Upwork', category: 'Freelancing' },
    { id: 2, idea: 'Create a blog or YouTube channel', category: 'Content Creation' },
    { id: 3, idea: 'Rent out unused items', category: 'Passive Income' },
    { id: 4, idea: 'Invest in mutual funds or stocks', category: 'Investment' },
    { id: 5, idea: 'Teach coding or other skills online', category: 'Education' }
  ];

  // State for investments
  const [investments, setInvestments] = useState([
    { id: 1, type: 'Mutual Funds', amount: 5000, currentValue: 5200 },
    { id: 2, type: 'Stocks', amount: 3000, currentValue: 3100 },
    { id: 3, type: 'SIP', amount: 2000, currentValue: 2100 },
  ]);

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
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Income',
        data: [1500, 1700, 1600, 1800, 1900, 2000, 2100, 2000, 1900, 2450],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Expenses',
        data: [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1700, 1600, 1840],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
      },
    ],
  };

  // Pie chart data for expenses
  const expenseCategoriesData = [
    { name: 'Rent', amount: 800, color: '#6366F1' },
    { name: 'Food', amount: 400, color: '#3B82F6' },
    { name: 'Education', amount: 250, color: '#F59E0B' },
    { name: 'Medical', amount: 120, color: '#EC4899' },
    { name: 'Transportation', amount: 150, color: '#10B981' },
    { name: 'Entertainment', amount: 120, color: '#F97316' },
  ];

  const pieChartData = {
    labels: expenseCategoriesData.map(c => c.name),
    datasets: [
      {
        data: expenseCategoriesData.map(c => c.amount),
        backgroundColor: expenseCategoriesData.map(c => c.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Personal Finance Manager</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your income, expenses, and grow your wealth
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {/* TODO: Implement report generation */}}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} flex items-center gap-2`}
            title="Generate Monthly Report"
          >
            <FileText size={20} />
          </button>
          <button
            onClick={() => {/* TODO: Implement notifications */}}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} flex items-center gap-2`}
            title="Notifications"
          >
            <Bell size={20} />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Income Card */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Income</p>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <span className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</span>
          <p className="text-green-500 text-xs mt-1">+12% from last month</p>
        </div>

        {/* Expenses Card */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expenses</p>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <span className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</span>
          <p className="text-red-500 text-xs mt-1">+8% from last month</p>
        </div>

        {/* Investments Card */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Investments</p>
            <Wallet className="h-5 w-5 text-blue-500" />
          </div>
          <span className="text-2xl font-bold">₹{currentInvestmentValue.toLocaleString()}</span>
          <p className={`text-xs mt-1 ${investmentProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {investmentProfit >= 0 ? '+' : ''}{investmentProfit.toLocaleString()} ({((investmentProfit / totalInvested) * 100).toFixed(2)}%)
          </p>
        </div>

        {/* Savings Card */}
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
          <div className="flex items-center justify-between mb-1">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Savings</p>
            <DollarSign className="h-5 w-5 text-purple-500" />
          </div>
          <span className="text-2xl font-bold">₹{savings.toLocaleString()}</span>
          <div className="mt-2 pt-2 border-t border-gray-300">
            <div className="flex justify-between text-sm">
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Savings Goal</span>
              <span>₹10,000</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden bg-gray-300">
                <div
                  className="h-full rounded-full bg-purple-500"
                  style={{ width: `${(savings / 10000) * 100}%` }}
                />
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {((savings / 10000) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 py-2 font-medium ${activeTab === 'income' ? 'border-b-2 border-blue-500 text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Income
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 font-medium ${activeTab === 'expenses' ? 'border-b-2 border-blue-500 text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab('investments')}
          className={`px-4 py-2 font-medium ${activeTab === 'investments' ? 'border-b-2 border-blue-500 text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Investments
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Income vs Expenses Chart */}
            <div className={`lg:col-span-2 rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
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
          <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className="text-xl font-semibold">Income Management</h2>
            </div>
            <div className="p-6">
              {/* Income Table */}
              <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                {/* Table Header */}
                <div className={`grid grid-cols-4 gap-0 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'} border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Sources</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'} border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Type</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'} border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Amount</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Income Chart</div>
                </div>

                {/* Table Content */}
                <div className="grid grid-cols-4 gap-0 h-[400px]">
                  {/* Sources Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <div className="space-y-2">
                      <div className="font-medium">Freelance</div>
                      <div className="font-medium">Job</div>
                    </div>
                  </div>

                  {/* Type Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <div className="space-y-2">
                      <div className="font-medium">Stipend</div>
                      <div className="font-medium">Salary</div>
                    </div>
                  </div>

                  {/* Amount Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <div className="space-y-2">
                      <div className="font-medium">₹9,000</div>
                      <div className="font-medium">₹2,000</div>
                    </div>
                  </div>

                  {/* Chart Column */}
                  <div className="p-3">
                    <div className="h-48 w-48">
                      <Pie
                        data={{
                          labels: ['Rent', 'Free', 'Job'],
                          datasets: [{
                            data: [30, 40, 30],
                            backgroundColor: [
                              '#10B981',
                              '#3B82F6',
                              '#8B5CF6'
                            ]
                          }]
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
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Source</label>
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
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type</label>
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
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
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
              <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                {/* Table Header */}
                <div className={`grid grid-cols-6 gap-0 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'} border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Rent</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'} border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Food</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'} border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Education</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'} border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Medical</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'} border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Investment</div>
                  <div className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Extra Cash</div>
                </div>

                {/* Table Content */}
                <div className="grid grid-cols-6 gap-0 h-[400px] overflow-y-scroll">
                  {/* Rent Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Rent')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-gray-500">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Food Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Food')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-gray-500">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Education Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Education')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-gray-500">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Medical Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Medical')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-gray-500">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Investment Column */}
                  <div className={`p-3 border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Investment')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-gray-500">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">{expense.note}</div>
                        </div>
                      ))}
                  </div>

                  {/* Extra Cash Column */}
                  <div className="p-3">
                    {transactions
                      .filter(t => t.type === 'expense' && t.category === 'Other')
                      .map(expense => (
                        <div key={expense.id} className="mb-2 p-2 rounded bg-opacity-10 hover:bg-opacity-20 bg-gray-500">
                          <div className="font-medium">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">{expense.note}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Add Expense Form */}
              <form onSubmit={addTransaction} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Category</label>
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
                    <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Note</label>
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
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
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
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{investment.type}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Invested: ₹{investment.amount.toLocaleString()}
                        </p>
                      </div>
                      <span className={`text-sm font-medium ${investment.currentValue >= investment.amount ? 'text-green-500' : 'text-red-500'
                        }`}>
                        {investment.currentValue >= investment.amount ? '+' : ''}
                        ₹{(investment.currentValue - investment.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Value</span>
                        <span>₹{investment.currentValue.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden bg-gray-300">
                        <div
                          className="h-full rounded-full bg-blue-500"
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

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
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
                className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{idea.idea}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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