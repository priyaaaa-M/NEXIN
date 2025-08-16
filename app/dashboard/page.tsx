import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { 
  GraduationCap, 
  FolderKanban, 
  Target, 
  Wallet, 
  MessageCircle, 
  BookOpen,
  TrendingUp,
  Clock,
  Calendar,
  Award
} from "lucide-react"

export default function DashboardPage() {
  // Mock data - in real app this would come from API/database
  const currentDate = new Date()
  const greeting = () => {
    const hour = currentDate.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    if (hour < 21) return "Good Evening"
    return "Good Night"
  }

  const stats = {
    studyTime: "4h 32m",
    completedGoals: 8,
    activeProjects: 3,
    journalEntries: 24
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src="" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">
              {greeting()}, John!
            </h1>
            <p className="text-muted-foreground">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        <Separator />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.studyTime}</div>
            <p className="text-xs text-muted-foreground">
              +20% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedGoals}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              2 due this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.journalEntries}</div>
            <p className="text-xs text-muted-foreground">
              5-day streak
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Academic Card */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer">
          <Link href="/dashboard/academic">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-chart-1/10 text-chart-1 flex aspect-square size-12 items-center justify-center rounded-lg">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">Academic</CardTitle>
                  <CardDescription>Track your learning progress</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mathematics</span>
                  <Badge variant="secondary">85%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Computer Science</span>
                  <Badge variant="secondary">92%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Physics</span>
                  <Badge variant="secondary">78%</Badge>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Projects Card */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer">
          <Link href="/dashboard/projects">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-chart-2/10 text-chart-2 flex aspect-square size-12 items-center justify-center rounded-lg">
                  <FolderKanban className="size-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">Projects</CardTitle>
                  <CardDescription>Manage your portfolio</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>E-commerce App</span>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Portfolio Website</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>AI Chatbot</span>
                  <Badge variant="outline">Planning</Badge>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Goals Card */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer">
          <Link href="/dashboard/goals">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-chart-3/10 text-chart-3 flex aspect-square size-12 items-center justify-center rounded-lg">
                  <Target className="size-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">Goals</CardTitle>
                  <CardDescription>Stay focused and motivated</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Study</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">✓</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Exercise</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">✓</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Read 30 min</span>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Finance Card */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer">
          <Link href="/dashboard/finance">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-chart-4/10 text-chart-4 flex aspect-square size-12 items-center justify-center rounded-lg">
                  <Wallet className="size-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">Finance</CardTitle>
                  <CardDescription>Track your money</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Budget</span>
                  <Badge variant="secondary">75% used</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Savings Goal</span>
                  <Badge variant="secondary">$2,400</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Investments</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">+12%</Badge>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Work Done Desk Card */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer">
          <Link href="/dashboard/work-done-desk">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-chart-5/10 text-chart-5 flex aspect-square size-12 items-center justify-center rounded-lg">
                  <MessageCircle className="size-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">Work Done Desk</CardTitle>
                  <CardDescription>Communication hub</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Scheduled Messages</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Email Templates</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>WhatsApp Queue</span>
                  <Badge variant="outline">Empty</Badge>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        {/* Journal Card */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer">
          <Link href="/dashboard/journal">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex aspect-square size-12 items-center justify-center rounded-lg">
                  <BookOpen className="size-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">Journal</CardTitle>
                  <CardDescription>Reflect and grow</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This Month</span>
                  <Badge variant="secondary">24 entries</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Current Streak</span>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">5 days</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mood Average</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">😊</Badge>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest achievements and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="bg-green-100 text-green-700 flex aspect-square size-8 items-center justify-center rounded-full">
                <Award className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Completed Mathematics Assignment</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="bg-blue-100 text-blue-700 flex aspect-square size-8 items-center justify-center rounded-full">
                <BookOpen className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Added journal entry: "Daily Reflection"</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="bg-purple-100 text-purple-700 flex aspect-square size-8 items-center justify-center rounded-full">
                <Target className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Achieved daily study goal</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
