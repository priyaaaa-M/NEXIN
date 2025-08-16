"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  Calendar as CalendarIcon,
  Plus,
  Download,
  Filter,
  Search,
  Wallet,
  CreditCard,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  Utensils,
  GraduationCap,
  Heart,
  Briefcase,
  MoreHorizontal
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Area, AreaChart } from "recharts"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function FinancePage() {
  const [date, setDate] = useState<Date>()

  // Sample data for charts
  const monthlyData = [
    { month: "Jan", income: 4000, expenses: 2400, savings: 1600 },
    { month: "Feb", income: 3000, expenses: 1398, savings: 1602 },
    { month: "Mar", income: 2000, expenses: 9800, savings: -7800 },
    { month: "Apr", income: 2780, expenses: 3908, savings: -1128 },
    { month: "May", income: 1890, expenses: 4800, savings: -2910 },
    { month: "Jun", income: 2390, expenses: 3800, savings: -1410 },
    { month: "Jul", income: 3490, expenses: 4300, savings: -810 },
  ]

  const categoryData = [
    { name: "Rent", value: 1200, color: "#8884d8" },
    { name: "Food", value: 800, color: "#82ca9d" },
    { name: "Education", value: 600, color: "#ffc658" },
    { name: "Medical", value: 300, color: "#ff7300" },
    { name: "Investment", value: 500, color: "#00ff88" },
    { name: "Others", value: 400, color: "#ff6b6b" },
  ]

  const recentTransactions = [
    { id: 1, type: "expense", category: "Food", description: "Grocery Shopping", amount: 85.50, date: "2024-01-15", icon: <Utensils className="size-4" /> },
    { id: 2, type: "income", category: "Salary", description: "Monthly Salary", amount: 3500.00, date: "2024-01-01", icon: <Briefcase className="size-4" /> },
    { id: 3, type: "expense", category: "Rent", description: "Monthly Rent", amount: 1200.00, date: "2024-01-01", icon: <Home className="size-4" /> },
    { id: 4, type: "expense", category: "Education", description: "Online Course", amount: 49.99, date: "2024-01-14", icon: <GraduationCap className="size-4" /> },
    { id: 5, type: "expense", category: "Medical", description: "Doctor Visit", amount: 120.00, date: "2024-01-13", icon: <Heart className="size-4" /> },
  ]

  const investments = [
    { name: "Stock Portfolio", amount: 15000, return: 12.5, status: "up" },
    { name: "Mutual Funds", amount: 8500, return: -2.3, status: "down" },
    { name: "Crypto", amount: 2000, return: 45.6, status: "up" },
    { name: "Fixed Deposit", amount: 10000, return: 6.5, status: "up" },
  ]

  const chartConfig = {
    income: {
      label: "Income",
      color: "#22c55e",
    },
    expenses: {
      label: "Expenses", 
      color: "#ef4444",
    },
    savings: {
      label: "Savings",
      color: "#3b82f6",
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Wallet className="size-8" />
              Finance Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your income, expenses, and investments
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="size-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>
        <Separator />
      </div>

      {/* Financial Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,580</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="size-3 mr-1 text-green-600" />
              +12.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$3,500</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$2,850</div>
            <p className="text-xs text-muted-foreground">
              -2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.6%</div>
            <p className="text-xs text-muted-foreground">
              Goal: 20%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Monthly Trends Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>
                  Income, expenses, and savings over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-hidden">
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="income" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="expenses" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Expense Categories Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>
                  Breakdown of your monthly expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-hidden">
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <RechartsPieChart>
                          <Cell fill="#8884d8" />
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    Your latest financial activity
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="size-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="size-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex aspect-square size-10 items-center justify-center rounded-full",
                        transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      )}>
                        {transaction.icon}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</div>
                      </div>
                    </div>
                    <div className={cn(
                      "font-medium",
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    )}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Income Tab */}
        <TabsContent value="income" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Add Income Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add Income</CardTitle>
                <CardDescription>
                  Record a new income transaction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="income-amount">Amount</Label>
                  <Input id="income-amount" placeholder="Enter amount" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income-source">Source</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select income source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="investment">Investment Return</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income-description">Description</Label>
                  <Input id="income-description" placeholder="Enter description" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button className="w-full">
                  <Plus className="size-4 mr-2" />
                  Add Income
                </Button>
              </CardContent>
            </Card>

            {/* Income Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Income Summary</CardTitle>
                <CardDescription>
                  Your income breakdown this month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Salary</span>
                    <span className="font-medium">$3,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Freelance</span>
                    <span className="font-medium">$500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Investment Returns</span>
                    <span className="font-medium">$0</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total Income</span>
                    <span className="text-green-600">$3,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Add Expense Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add Expense</CardTitle>
                <CardDescription>
                  Record a new expense transaction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expense-amount">Amount</Label>
                  <Input id="expense-amount" placeholder="Enter amount" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">🏠 Rent</SelectItem>
                      <SelectItem value="food">🍽️ Food</SelectItem>
                      <SelectItem value="education">🎓 Education</SelectItem>
                      <SelectItem value="medical">❤️ Medical</SelectItem>
                      <SelectItem value="investment">💰 Investment</SelectItem>
                      <SelectItem value="transport">🚗 Transport</SelectItem>
                      <SelectItem value="entertainment">🎮 Entertainment</SelectItem>
                      <SelectItem value="others">📦 Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-description">Description</Label>
                  <Input id="expense-description" placeholder="Enter description" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button className="w-full">
                  <Plus className="size-4 mr-2" />
                  Add Expense
                </Button>
              </CardContent>
            </Card>

            {/* Expense Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>
                  Your expenses by category this month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{category.name}</span>
                      <span className="font-medium">${category.value}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all" 
                        style={{ 
                          backgroundColor: category.color,
                          width: `${(category.value / Math.max(...categoryData.map(c => c.value))) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Investments Tab */}
        <TabsContent value="investments" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {investments.map((investment, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{investment.name}</CardTitle>
                  <div className={cn(
                    "flex aspect-square size-8 items-center justify-center rounded-full",
                    investment.status === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  )}>
                    {investment.status === "up" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${investment.amount.toLocaleString()}</div>
                  <p className={cn(
                    "text-xs font-medium flex items-center",
                    investment.status === "up" ? "text-green-600" : "text-red-600"
                  )}>
                    {investment.status === "up" ? "+" : ""}{investment.return}% return
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Investment Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Performance</CardTitle>
              <CardDescription>
                Portfolio performance over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-hidden">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
