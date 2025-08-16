"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from "@/components/ui/context-menu"
import { 
  FolderKanban,
  Search,
  Plus,
  Github,
  ExternalLink,
  Edit,
  Trash2,
  Calendar,
  Users,
  Star,
  GitBranch,
  Globe,
  Copy,
  Archive
} from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      type: "Web App",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
      techStack: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      progress: 85,
      status: "In Progress",
      githubUrl: "https://github.com/johndoe/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.vercel.app",
      lastUpdated: "2 days ago",
      contributors: 3,
      stars: 24
    },
    {
      id: 2,
      title: "Portfolio Website",
      type: "Website",
      description: "Personal portfolio website showcasing my projects and skills. Built with Next.js and deployed on Vercel.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      progress: 100,
      status: "Completed",
      githubUrl: "https://github.com/johndoe/portfolio",
      liveUrl: "https://johndoe.dev",
      lastUpdated: "1 week ago",
      contributors: 1,
      stars: 12
    },
    {
      id: 3,
      title: "AI Chat Assistant",
      type: "API",
      description: "An intelligent chatbot using OpenAI's GPT API with conversation memory and context awareness.",
      techStack: ["Python", "FastAPI", "OpenAI API", "Redis", "Docker"],
      progress: 45,
      status: "Planning",
      githubUrl: "https://github.com/johndoe/ai-chatbot",
      liveUrl: null,
      lastUpdated: "5 days ago",
      contributors: 2,
      stars: 8
    },
    {
      id: 4,
      title: "Task Management App",
      type: "Mobile App",
      description: "Cross-platform mobile app for task management with real-time synchronization and offline support.",
      techStack: ["React Native", "Firebase", "Redux", "Expo"],
      progress: 70,
      status: "In Progress",
      githubUrl: "https://github.com/johndoe/task-manager",
      liveUrl: null,
      lastUpdated: "1 day ago",
      contributors: 2,
      stars: 15
    },
    {
      id: 5,
      title: "Weather Dashboard",
      type: "Web App",
      description: "Interactive weather dashboard with data visualization, location-based forecasts, and weather alerts.",
      techStack: ["Vue.js", "D3.js", "OpenWeather API", "Chart.js"],
      progress: 95,
      status: "Completed",
      githubUrl: "https://github.com/johndoe/weather-dashboard",
      liveUrl: "https://weather-dash.netlify.app",
      lastUpdated: "3 weeks ago",
      contributors: 1,
      stars: 18
    },
    {
      id: 6,
      title: "Blockchain Voting System",
      type: "DApp",
      description: "Decentralized voting application built on Ethereum with smart contracts for transparent and secure elections.",
      techStack: ["Solidity", "Web3.js", "React", "Truffle", "MetaMask"],
      progress: 30,
      status: "Planning",
      githubUrl: "https://github.com/johndoe/blockchain-voting",
      liveUrl: null,
      lastUpdated: "1 week ago",
      contributors: 4,
      stars: 31
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "In Progress":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      case "Planning":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Web App":
        return "🌐"
      case "Mobile App":
        return "📱"
      case "API":
        return "⚡"
      case "Website":
        return "🎨"
      case "DApp":
        return "⛓️"
      default:
        return "📁"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FolderKanban className="size-8" />
              Projects Portfolio
            </h1>
            <p className="text-muted-foreground">
              Showcase your work and track project progress
            </p>
          </div>
          <Button>
            <Plus className="size-4 mr-2" />
            New Project
          </Button>
        </div>
        <Separator />
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Find Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <Input 
              placeholder="Search projects by name, technology, or type..." 
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              {projects.filter(p => p.status === "Completed").length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((projects.filter(p => p.status === "Completed").length / projects.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stars</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.reduce((acc, project) => acc + project.stars, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              GitHub stars
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.reduce((acc, project) => acc + project.contributors, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total collaborators
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ContextMenu key={project.id}>
            <ContextMenuTrigger>
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors cursor-pointer">
                            <span className="text-xl">{getTypeIcon(project.type)}</span>
                            {project.title}
                          </CardTitle>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">{project.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {project.description}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <Star className="size-3" />
                                <span>{project.stars} stars</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="size-3" />
                                <span>{project.contributors} contributors</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last updated: {project.lastUpdated}
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {project.type}
                        </Badge>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="size-8">
                        <Edit className="size-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="size-8 text-red-600 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-sm line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Tech Stack</div>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="size-4 mr-1" />
                    Code
                  </a>
                </Button>
                {project.liveUrl && (
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Globe className="size-4 mr-1" />
                      Live
                    </a>
                  </Button>
                )}
              </div>

              {/* Project Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="size-3" />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-3" />
                    {project.contributors}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {project.lastUpdated}
                </div>
              </div>
            </CardContent>
          </Card>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem onClick={() => window.open(project.githubUrl, '_blank')}>
                <Github className="size-4 mr-2" />
                View on GitHub
              </ContextMenuItem>
              {project.liveUrl && (
                <ContextMenuItem onClick={() => window.open(project.liveUrl, '_blank')}>
                  <Globe className="size-4 mr-2" />
                  Open Live Demo
                </ContextMenuItem>
              )}
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Edit className="size-4 mr-2" />
                Edit Project
              </ContextMenuItem>
              <ContextMenuItem>
                <Copy className="size-4 mr-2" />
                Clone Repository
              </ContextMenuItem>
              <ContextMenuItem>
                <Archive className="size-4 mr-2" />
                Archive Project
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-red-600" onClick={() => console.log('Delete:', project.title)}>
                <Trash2 className="size-4 mr-2" />
                Delete Project
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>

      {/* GitHub Integration Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="size-5" />
            GitHub Integration
          </CardTitle>
          <CardDescription>
            Connect your GitHub account to automatically sync repositories and track contributions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex aspect-square size-10 items-center justify-center rounded-full">
                <Github className="size-5" />
              </div>
              <div>
                <div className="font-medium">GitHub Account</div>
                <div className="text-sm text-muted-foreground">@johndoe • Connected</div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Connected
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-sm text-muted-foreground">Total Repositories</div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Repository Breakdown</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Public:</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Private:</span>
                      <span className="font-medium">38</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Forks:</span>
                      <span className="font-medium">24</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="text-2xl font-bold">1,543</div>
                  <div className="text-sm text-muted-foreground">Total Commits</div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Commit Activity</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>This month:</span>
                      <span className="font-medium">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last month:</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average/month:</span>
                      <span className="font-medium">142</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="text-center space-y-1 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-muted-foreground">Contributors</div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Top Contributors</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>You:</span>
                      <span className="font-medium">892 commits</span>
                    </div>
                    <div className="flex justify-between">
                      <span>alex-dev:</span>
                      <span className="font-medium">234 commits</span>
                    </div>
                    <div className="flex justify-between">
                      <span>sarah-ui:</span>
                      <span className="font-medium">187 commits</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <GitBranch className="size-4 mr-2" />
              Sync Repositories
            </Button>
            <Button variant="outline">
              <ExternalLink className="size-4 mr-2" />
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
