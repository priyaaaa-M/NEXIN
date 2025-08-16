"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Target,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  TrendingUp,
  Star,
  Music,
  Timer,
  ListTodo,
  Heart,
  Zap,
  Trophy,
  Clock
} from "lucide-react"
import { useState, useEffect } from "react"

export default function GoalsPage() {
  // Study Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work')

  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState("lofi-study")
  const [volume, setVolume] = useState([65])

  // Music tracks library
  const musicTracks = [
    {
      id: "lofi-study",
      name: "Lofi Hip Hop - Study Beats",
      category: "Lofi",
      duration: "1:23:45",
      description: "Chill beats perfect for studying and focus"
    },
    {
      id: "lofi-jazz",
      name: "Lofi Jazz Cafe",
      category: "Lofi", 
      duration: "58:32",
      description: "Smooth jazz with lofi aesthetic"
    },
    {
      id: "rain-forest",
      name: "Forest Rain",
      category: "Natural",
      duration: "∞",
      description: "Gentle rain sounds in a peaceful forest"
    },
    {
      id: "ocean-waves",
      name: "Ocean Waves",
      category: "Natural",
      duration: "∞", 
      description: "Calming ocean waves on a peaceful shore"
    },
    {
      id: "wind-leaves",
      name: "Wind Through Trees",
      category: "Natural",
      duration: "∞",
      description: "Gentle wind rustling through leaves"
    },
    {
      id: "water-stream",
      name: "Mountain Stream",
      category: "Natural", 
      duration: "∞",
      description: "Flowing water over rocks and pebbles"
    },
    {
      id: "thunderstorm",
      name: "Distant Thunder",
      category: "Natural",
      duration: "∞",
      description: "Peaceful thunderstorm in the distance"
    },
    {
      id: "piano-ambient",
      name: "Ambient Piano",
      category: "Instrumental",
      duration: "45:22",
      description: "Soft piano melodies for deep focus"
    },
    {
      id: "string-meditation",
      name: "Meditation Strings",
      category: "Instrumental", 
      duration: "1:12:18",
      description: "Peaceful string arrangements for relaxation"
    },
    {
      id: "brown-noise",
      name: "Brown Noise",
      category: "White Noise",
      duration: "∞",
      description: "Deep, steady brown noise for concentration"
    },
    {
      id: "pink-noise", 
      name: "Pink Noise",
      category: "White Noise",
      duration: "∞",
      description: "Balanced pink noise for better sleep"
    }
  ]

  const getCurrentTrackInfo = () => {
    return musicTracks.find(track => track.id === currentTrack) || musicTracks[0]
  }

  // Todo State
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete React project documentation", completed: true },
    { id: 2, text: "Review and practice TypeScript concepts", completed: true },
    { id: 3, text: "Prepare presentation for team meeting", completed: false },
    { id: 4, text: "Update portfolio with new projects", completed: false },
    { id: 5, text: "Schedule weekly review session", completed: false }
  ])

  // Monthly Goals
  const monthlyGoals = [
    { 
      id: 1, 
      title: "Complete Full-Stack Project", 
      description: "Build and deploy a complete web application with React and Node.js",
      progress: 75,
      target: "January 31st",
      category: "Development"
    },
    {
      id: 2,
      title: "Learn Advanced TypeScript",
      description: "Master advanced TypeScript patterns and implement in projects",
      progress: 60,
      target: "January 31st", 
      category: "Learning"
    },
    {
      id: 3,
      title: "Improve Problem Solving",
      description: "Solve 100 coding challenges and algorithm problems",
      progress: 45,
      target: "January 31st",
      category: "Skills"
    },
    {
      id: 4,
      title: "Build Professional Network",
      description: "Connect with 50 developers and attend 4 tech meetups",
      progress: 30,
      target: "January 31st",
      category: "Networking"
    }
  ]

  // Daily Affirmations
  const affirmations = [
    "I am capable of achieving my goals through consistent effort and dedication.",
    "Every challenge I face is an opportunity to grow and improve my skills.",
    "I embrace learning and view mistakes as stepping stones to success.",
    "My persistence and hard work will lead me to accomplish great things.",
    "I am building valuable skills that will serve me throughout my career."
  ]

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsTimerRunning(false)
      // Switch timer mode when time is up
      if (timerMode === 'work') {
        setTimerMode('break')
        setTimeLeft(5 * 60) // 5 minute break
      } else {
        setTimerMode('work')
        setTimeLeft(25 * 60) // 25 minute work session
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timeLeft, timerMode])

  // Helper functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimeLeft(timerMode === 'work' ? 25 * 60 : 5 * 60)
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const completedTodos = todos.filter(todo => todo.completed).length
  const totalTodos = todos.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Target className="size-8" />
              Goals & Productivity
            </h1>
            <p className="text-muted-foreground">
              Track your progress and stay motivated with productivity tools
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="size-4 mr-2" />
              View Calendar
            </Button>
            <Button>
              <Plus className="size-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </div>
        <Separator />
      </div>

      {/* Productivity Dashboard */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Study Timer */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Timer className="size-5 text-blue-600" />
              Study Timer
            </CardTitle>
            <CardDescription>
              {timerMode === 'work' ? 'Focus time' : 'Break time'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold font-mono">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {timerMode === 'work' ? 'Work Session' : 'Break Time'}
              </div>
            </div>
            
            <Progress 
              value={timerMode === 'work' 
                ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
                : ((5 * 60 - timeLeft) / (5 * 60)) * 100
              } 
              className="h-2"
            />
            
            <div className="flex gap-2">
              <Button 
                onClick={toggleTimer} 
                className="flex-1"
                variant={isTimerRunning ? "destructive" : "default"}
              >
                {isTimerRunning ? <Pause className="size-4 mr-2" /> : <Play className="size-4 mr-2" />}
                {isTimerRunning ? 'Pause' : 'Start'}
              </Button>
              <Button variant="outline" size="icon" onClick={resetTimer}>
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Music Player */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Music className="size-5 text-purple-600" />
              Music Player
            </CardTitle>
            <CardDescription>
              Background music for focus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="font-medium text-sm">{getCurrentTrackInfo().name}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">{getCurrentTrackInfo().category}</Badge>
                <span>•</span>
                <span>{getCurrentTrackInfo().duration}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {getCurrentTrackInfo().description}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Select Track</Label>
              <Select value={currentTrack} onValueChange={setCurrentTrack}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <div className="font-medium text-xs text-muted-foreground px-2 py-1">Lofi & Chill</div>
                  {musicTracks.filter(track => track.category === "Lofi").map((track) => (
                    <SelectItem key={track.id} value={track.id} className="text-sm">
                      <div className="flex items-center gap-2">
                        <Music className="size-3" />
                        {track.name}
                      </div>
                    </SelectItem>
                  ))}
                  
                  <div className="font-medium text-xs text-muted-foreground px-2 py-1 mt-2">Natural Sounds</div>
                  {musicTracks.filter(track => track.category === "Natural").map((track) => (
                    <SelectItem key={track.id} value={track.id} className="text-sm">
                      <div className="flex items-center gap-2">
                        {track.id === "rain-forest" && "🌧️"}
                        {track.id === "ocean-waves" && "🌊"}
                        {track.id === "wind-leaves" && "🍃"}
                        {track.id === "water-stream" && "💧"}
                        {track.id === "thunderstorm" && "⛈️"}
                        {track.name}
                      </div>
                    </SelectItem>
                  ))}

                  <div className="font-medium text-xs text-muted-foreground px-2 py-1 mt-2">Instrumental</div>
                  {musicTracks.filter(track => track.category === "Instrumental").map((track) => (
                    <SelectItem key={track.id} value={track.id} className="text-sm">
                      <div className="flex items-center gap-2">
                        🎹 {track.name}
                      </div>
                    </SelectItem>
                  ))}

                  <div className="font-medium text-xs text-muted-foreground px-2 py-1 mt-2">White Noise</div>
                  {musicTracks.filter(track => track.category === "White Noise").map((track) => (
                    <SelectItem key={track.id} value={track.id} className="text-sm">
                      <div className="flex items-center gap-2">
                        🔊 {track.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant={isPlaying ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1"
              >
                {isPlaying ? <Pause className="size-4 mr-2" /> : <Play className="size-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Volume2 className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{volume[0]}%</span>
              </div>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {isPlaying && (
              <div className="flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-purple-600 rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-5 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-4 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-1 h-6 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Todo List */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTodo className="size-5 text-green-600" />
              Quick Tasks
            </CardTitle>
            <CardDescription>
              {completedTodos}/{totalTodos} completed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={(completedTodos / totalTodos) * 100} className="h-2" />
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {todos.slice(0, 4).map((todo) => (
                <div key={todo.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-sm flex-1 cursor-pointer ${
                      todo.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {todo.text}
                  </label>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="size-4 mr-2" />
              Add Task
            </Button>
          </CardContent>
        </Card>

        {/* Daily Affirmations */}
        <Card className="border-2 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/10 dark:to-pink-900/10 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="size-5 text-pink-600" />
              Daily Affirmation
            </CardTitle>
            <CardDescription>
              Positive mindset boost
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-center italic">
              "{affirmations[0]}"
            </div>
            
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3 fill-current text-yellow-400" />
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <RotateCcw className="size-4 mr-2" />
              New Affirmation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goals Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="size-5 text-yellow-600" />
                Monthly Goals Progress
              </CardTitle>
              <CardDescription>
                Track your key objectives for January 2024
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              January 2024
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {monthlyGoals.map((goal) => (
              <Card key={goal.id} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <Badge variant="secondary">{goal.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{goal.progress}%</div>
                      <div className="text-xs text-muted-foreground">complete</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="text-muted-foreground">Target: {goal.target}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <TrendingUp className="size-4 mr-2" />
                      Update Progress
                    </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-5 text-orange-600" />
            Quick Notes & Reflections
          </CardTitle>
          <CardDescription>
            Capture thoughts and insights from your productivity sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What insights did you gain today? What strategies worked well? What would you like to improve tomorrow?"
            className="min-h-[120px] resize-none"
          />
          <div className="flex justify-between items-center mt-3">
            <div className="text-sm text-muted-foreground">
              Auto-saved • Last updated 2 minutes ago
            </div>
            <Button size="sm">
              <Plus className="size-4 mr-2" />
              Save Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}