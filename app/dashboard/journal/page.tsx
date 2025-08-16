"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { 
  BookOpen,
  PenTool,
  Search,
  Filter,
  Plus,
  Calendar,
  Tag,
  Star,
  Edit,
  Trash2,
  Share,
  Download,
  MoreHorizontal,
  Target,
  TrendingUp,
  Heart,
  Lightbulb,
  Coffee,
  Moon,
  Sun,
  Feather,
  Bookmark,
  Archive,
  Eye,
  Clock
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function JournalPage() {
  const [selectedTag, setSelectedTag] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  // Sample data for analytics
  const writingData = [
    { month: "Jan", entries: 15, words: 3500 },
    { month: "Feb", entries: 12, words: 2800 },
    { month: "Mar", entries: 18, words: 4200 },
    { month: "Apr", entries: 22, words: 5100 },
    { month: "May", entries: 20, words: 4600 },
    { month: "Jun", entries: 25, words: 5800 },
    { month: "Jul", entries: 28, words: 6200 },
  ]

  const moodData = [
    { day: "Mon", mood: 4 },
    { day: "Tue", mood: 3 },
    { day: "Wed", mood: 5 },
    { day: "Thu", mood: 2 },
    { day: "Fri", mood: 4 },
    { day: "Sat", mood: 5 },
    { day: "Sun", mood: 4 },
  ]

  const journalEntries = [
    {
      id: 1,
      title: "Morning Reflections",
      content: "Started the day with meditation and a warm cup of coffee. Feeling grateful for the opportunities ahead...",
      date: "2024-01-15",
      time: "08:30 AM",
      mood: "positive",
      tags: ["morning", "gratitude", "meditation"],
      wordCount: 145,
      template: "Daily Reflection",
      favorite: true
    },
    {
      id: 2,
      title: "Project Milestone Celebration",
      content: "Finally completed the first phase of my personal development project. The journey was challenging but incredibly rewarding...",
      date: "2024-01-14",
      time: "07:15 PM",
      mood: "excited",
      tags: ["achievement", "project", "milestone"],
      wordCount: 289,
      template: "Achievement Log",
      favorite: false
    },
    {
      id: 3,
      title: "Learning from Setbacks",
      content: "Today didn't go as planned, but I'm learning to see setbacks as opportunities for growth and self-discovery...",
      date: "2024-01-13",
      time: "09:45 PM",
      mood: "reflective",
      tags: ["growth", "resilience", "learning"],
      wordCount: 178,
      template: "Challenge Reflection",
      favorite: false
    },
    {
      id: 4,
      title: "Weekend Adventures",
      content: "Spent the weekend exploring new places and trying new experiences. These moments remind me of the joy in simple discoveries...",
      date: "2024-01-12",
      time: "06:20 PM",
      mood: "joyful",
      tags: ["adventure", "weekend", "discovery"],
      wordCount: 195,
      template: "Experience Log",
      favorite: true
    }
  ]

  const templates = [
    {
      id: 1,
      name: "Daily Reflection",
      category: "Personal Growth",
      description: "Reflect on your day, emotions, and learnings",
      prompts: [
        "How did I feel today?",
        "What did I learn about myself?",
        "What am I grateful for?",
        "How can I improve tomorrow?"
      ],
      icon: <Sun className="size-4" />
    },
    {
      id: 2,
      name: "Goal Progress",
      category: "Achievement",
      description: "Track progress towards your personal goals",
      prompts: [
        "What progress did I make today?",
        "What obstacles did I encounter?",
        "What strategies worked well?",
        "Next steps for tomorrow?"
      ],
      icon: <Target className="size-4" />
    },
    {
      id: 3,
      name: "Gratitude Practice",
      category: "Mindfulness",
      description: "Focus on appreciation and positive moments",
      prompts: [
        "Three things I'm grateful for today:",
        "Someone who made my day better:",
        "A small moment that brought me joy:",
        "How did gratitude change my perspective?"
      ],
      icon: <Heart className="size-4" />
    },
    {
      id: 4,
      name: "Creative Inspiration",
      category: "Creativity",
      description: "Capture ideas, inspiration, and creative thoughts",
      prompts: [
        "What inspired me today?",
        "New ideas I want to explore:",
        "Creative challenges I'm facing:",
        "How can I nurture my creativity?"
      ],
      icon: <Lightbulb className="size-4" />
    },
    {
      id: 5,
      name: "Evening Wind-Down",
      category: "Wellness",
      description: "Reflect and prepare for restful sleep",
      prompts: [
        "How was my energy today?",
        "What can I let go of?",
        "What went well today?",
        "Setting intentions for tomorrow:"
      ],
      icon: <Moon className="size-4" />
    }
  ]

  const tags = [
    { name: "gratitude", count: 12, color: "bg-green-100 text-green-700" },
    { name: "growth", count: 8, color: "bg-blue-100 text-blue-700" },
    { name: "achievement", count: 6, color: "bg-purple-100 text-purple-700" },
    { name: "reflection", count: 15, color: "bg-orange-100 text-orange-700" },
    { name: "goals", count: 9, color: "bg-pink-100 text-pink-700" },
    { name: "mindfulness", count: 7, color: "bg-teal-100 text-teal-700" },
    { name: "learning", count: 11, color: "bg-indigo-100 text-indigo-700" },
    { name: "creativity", count: 5, color: "bg-yellow-100 text-yellow-700" }
  ]

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "positive":
        return <Sun className="size-4 text-yellow-600" />
      case "excited":
        return <Star className="size-4 text-purple-600" />
      case "reflective":
        return <Moon className="size-4 text-blue-600" />
      case "joyful":
        return <Heart className="size-4 text-red-600" />
      default:
        return <Coffee className="size-4 text-gray-600" />
    }
  }

  const chartConfig = {
    entries: {
      label: "Entries",
      color: "#3b82f6",
    },
    words: {
      label: "Words",
      color: "#10b981",
    },
    mood: {
      label: "Mood",
      color: "#f59e0b",
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="size-8" />
              Personal Journal
            </h1>
            <p className="text-muted-foreground">
              Capture thoughts, track growth, and reflect on your journey
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="size-4 mr-2" />
                  New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Journal Entry</DialogTitle>
                  <DialogDescription>
                    Write your thoughts and reflections
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="entry-title">Title</Label>
                      <Input id="entry-title" placeholder="Enter entry title..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entry-template">Template</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.name}>
                              <div className="flex items-center gap-2">
                                {template.icon}
                                {template.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="entry-content">Content</Label>
                    <Textarea 
                      id="entry-content" 
                      placeholder="Start writing your thoughts..."
                      className="min-h-[300px]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="entry-mood">Mood</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="How are you feeling?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excited">😄 Excited</SelectItem>
                          <SelectItem value="happy">😊 Happy</SelectItem>
                          <SelectItem value="calm">😌 Calm</SelectItem>
                          <SelectItem value="reflective">🤔 Reflective</SelectItem>
                          <SelectItem value="grateful">🙏 Grateful</SelectItem>
                          <SelectItem value="motivated">💪 Motivated</SelectItem>
                          <SelectItem value="peaceful">☮️ Peaceful</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entry-tags">Tags</Label>
                      <Input id="entry-tags" placeholder="Add tags (comma separated)" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <PenTool className="size-4 mr-2" />
                      Save Entry
                    </Button>
                    <Button variant="outline">
                      <Eye className="size-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Separator />
      </div>

      {/* Stats Dashboard */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journalEntries.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              Daily writing streak
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Writing Streak</CardTitle>
            <Feather className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Days in a row
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5</div>
            <p className="text-xs text-muted-foreground">
              +0.3 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="entries" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Entries Tab */}
        <TabsContent value="entries" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Main Entries List */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Filter */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Journal Entries</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="size-4 mr-2" />
                        Filter
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Tag className="size-4 mr-2" />
                            Tags
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-3">
                            <h4 className="font-medium">Filter by Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              {tags.map((tag) => (
                                <Badge 
                                  key={tag.name} 
                                  variant={selectedTag === tag.name ? "default" : "secondary"}
                                  className={cn("cursor-pointer", selectedTag !== tag.name && tag.color)}
                                  onClick={() => setSelectedTag(selectedTag === tag.name ? "" : tag.name)}
                                >
                                  {tag.name} ({tag.count})
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                    <Input placeholder="Search entries..." className="pl-10" />
                  </div>
                </CardContent>
              </Card>

              {/* Entry Cards */}
              <div className="space-y-4">
                {journalEntries.map((entry) => (
                  <Card key={entry.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {entry.title}
                            </CardTitle>
                            {entry.favorite && <Star className="size-4 text-yellow-500 fill-current" />}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="size-3" />
                            {entry.date}
                            <Clock className="size-3 ml-2" />
                            {entry.time}
                            {getMoodIcon(entry.mood)}
                            <Badge variant="outline" className="ml-2">{entry.template}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="size-8">
                            <Edit className="size-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="size-8">
                            <Share className="size-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="size-8">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground line-clamp-3">
                        {entry.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {entry.wordCount} words
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Target className="size-4 mr-2" />
                    Goal Reflection
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Heart className="size-4 mr-2" />
                    Gratitude Entry
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Moon className="size-4 mr-2" />
                    Evening Review
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Lightbulb className="size-4 mr-2" />
                    Creative Ideas
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 6).map((tag) => (
                      <Badge key={tag.name} variant="secondary" className={cn("cursor-pointer", tag.color)}>
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Writing Prompt */}
              <Card className="border-2 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="size-5 text-yellow-600" />
                    Today's Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    "What's one thing you learned about yourself this week that surprised you?"
                  </p>
                  <Button size="sm" className="w-full">
                    <PenTool className="size-4 mr-2" />
                    Start Writing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {template.icon}
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {template.name}
                      </CardTitle>
                    </div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Guided Prompts:</div>
                    <div className="space-y-1">
                      {template.prompts.map((prompt, index) => (
                        <div key={index} className="text-xs text-muted-foreground">
                          • {prompt}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    <PenTool className="size-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6">
            {/* Writing Statistics */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Writing Activity</CardTitle>
                  <CardDescription>
                    Monthly entries and word count
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={writingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="entries" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mood Tracker</CardTitle>
                  <CardDescription>
                    Your emotional journey this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={moodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis domain={[1, 5]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="mood" stroke="#f59e0b" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Insights Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Writing Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average entry length</span>
                    <span className="font-medium">187 words</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Most productive time</span>
                    <span className="font-medium">Evening</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Favorite template</span>
                    <span className="font-medium">Daily Reflection</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consistency score</span>
                    <span className="font-medium text-green-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reflection depth</span>
                    <span className="font-medium text-blue-600">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Goal alignment</span>
                    <span className="font-medium text-purple-600">92%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="size-4 text-yellow-500" />
                    <span className="text-sm">7-day streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="size-4 text-blue-500" />
                    <span className="text-sm">50 total entries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="size-4 text-red-500" />
                    <span className="text-sm">Mood improvement</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
