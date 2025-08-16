import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  GraduationCap, 
  BookOpen,
  TrendingUp,
  Calendar,
  Plus
} from "lucide-react"

export default function AcademicPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <GraduationCap className="size-8" />
          Academic Excellence
        </h1>
        <p className="text-muted-foreground">
          Track your learning progress and manage your academic journey
        </p>
      </div>

      {/* Academic Tabs */}
      <Tabs defaultValue="subjects" className="space-y-6">
        <div className="w-full overflow-x-auto">
          <TabsList className="inline-flex h-10 w-max items-center justify-center rounded-md bg-muted p-1 text-muted-foreground min-w-full">
            <TabsTrigger value="subjects" className="whitespace-nowrap">Subjects</TabsTrigger>
            <TabsTrigger value="progress" className="whitespace-nowrap">Progress Tracker</TabsTrigger>
            <TabsTrigger value="notes" className="whitespace-nowrap">My Notes</TabsTrigger>
            <TabsTrigger value="resources" className="whitespace-nowrap">Resources</TabsTrigger>
            <TabsTrigger value="planner" className="whitespace-nowrap">Study Planner</TabsTrigger>
            <TabsTrigger value="reflection" className="whitespace-nowrap">Reflection</TabsTrigger>
          </TabsList>
        </div>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">My Subjects</h2>
            <Button>
              <Plus className="size-4 mr-2" />
              Add Subject
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Mathematics */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Mathematics
                  <Badge variant="secondary">85%</Badge>
                </CardTitle>
                <CardDescription>Calculus & Linear Algebra</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={85} className="h-2" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Assignments</span>
                    <span>8/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exams</span>
                    <span>2/3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grade</span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">A-</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Computer Science */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Computer Science
                  <Badge variant="secondary">92%</Badge>
                </CardTitle>
                <CardDescription>Data Structures & Algorithms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={92} className="h-2" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Projects</span>
                    <span>5/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labs</span>
                    <span>12/12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grade</span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">A</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Physics */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Physics
                  <Badge variant="secondary">78%</Badge>
                </CardTitle>
                <CardDescription>Quantum Mechanics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={78} className="h-2" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Problem Sets</span>
                    <span>6/8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labs</span>
                    <span>4/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grade</span>
                    <Badge variant="outline">B+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Progress Tracker Tab */}
        <TabsContent value="progress" className="space-y-6">
          <h2 className="text-2xl font-semibold">Progress Overview</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="size-5" />
                  Overall GPA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">3.78</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Target: 3.80</span>
                    <Badge variant="outline">97.4%</Badge>
                  </div>
                  <Progress value={97.4} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Hours This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-2">32.5h</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Goal: 35h</span>
                    <Badge variant="secondary">92.9%</Badge>
                  </div>
                  <Progress value={92.9} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">My Notes</h2>
            <Button>
              <Plus className="size-4 mr-2" />
              New Note
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Calculus Chapter 5</CardTitle>
                <CardDescription>Integration Techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Mathematics</span>
                  <span>2 days ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Binary Trees</CardTitle>
                <CardDescription>Traversal Algorithms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Computer Science</span>
                  <span>1 week ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Wave Functions</CardTitle>
                <CardDescription>Schrödinger Equation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Physics</span>
                  <span>3 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <h2 className="text-2xl font-semibold">Learning Resources</h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="size-5" />
                  Recommended Books
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">Introduction to Algorithms (CLRS)</p>
                    <p className="text-sm text-muted-foreground">Computer Science</p>
                  </div>
                  <Badge variant="outline">Required</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">Principles of Mathematical Analysis</p>
                    <p className="text-sm text-muted-foreground">Mathematics</p>
                  </div>
                  <Badge variant="secondary">Recommended</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Study Planner Tab */}
        <TabsContent value="planner" className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Calendar className="size-6" />
            Study Planner
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div>
                  <p className="font-medium">Physics Lab Report</p>
                  <p className="text-sm text-muted-foreground">Due in 2 days</p>
                </div>
                <Badge variant="destructive">Urgent</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <div>
                  <p className="font-medium">Math Assignment 9</p>
                  <p className="text-sm text-muted-foreground">Due in 5 days</p>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reflection Tab */}
        <TabsContent value="reflection" className="space-y-6">
          <h2 className="text-2xl font-semibold">Academic Reflection</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Reflection</CardTitle>
              <CardDescription>Reflect on your learning progress and challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full h-40 p-3 text-sm border rounded-md resize-none"
                placeholder="What did you learn this week? What challenges did you face? What would you like to improve?"
              />
              <div className="flex justify-end mt-4">
                <Button>Save Reflection</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
