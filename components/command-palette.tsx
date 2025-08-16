"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Target,
  BookOpen,
  FolderKanban,
  MessageSquare,
  Wallet,
  GraduationCap,
  Home,
  Search,
  Plus,
  FileText,
  Clock,
  Star,
  Zap,
  Heart,
  Music,
  Timer,
  TrendingUp,
  BarChart3,
  Mail,
  Phone,
  Camera,
  Download,
  Upload,
  Copy,
  Archive,
  Bookmark,
  Share,
  Edit,
  Trash2,
  RefreshCw,
  LogOut
} from "lucide-react"

interface CommandPaletteProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [setOpen])

  const pages = [
    {
      name: "Dashboard",
      icon: Home,
      action: () => router.push("/dashboard"),
      keywords: ["home", "overview", "main"]
    },
    {
      name: "Goals & Productivity",
      icon: Target,
      action: () => router.push("/dashboard/goals"),
      keywords: ["goals", "productivity", "timer", "focus", "pomodoro", "music", "todos"]
    },
    {
      name: "Academic Progress",
      icon: GraduationCap,
      action: () => router.push("/dashboard/academic"),
      keywords: ["academic", "subjects", "grades", "education", "study", "learning"]
    },
    {
      name: "Projects Portfolio",
      icon: FolderKanban,
      action: () => router.push("/dashboard/projects"),
      keywords: ["projects", "portfolio", "github", "coding", "development"]
    },
    {
      name: "Finance Dashboard",
      icon: Wallet,
      action: () => router.push("/dashboard/finance"),
      keywords: ["finance", "money", "budget", "expenses", "income", "investments"]
    },
    {
      name: "Work Done Desk",
      icon: MessageSquare,
      action: () => router.push("/dashboard/work-done-desk"),
      keywords: ["communication", "whatsapp", "email", "messages", "contacts"]
    },
    {
      name: "Personal Journal",
      icon: BookOpen,
      action: () => router.push("/dashboard/journal"),
      keywords: ["journal", "writing", "reflection", "thoughts", "diary", "notes"]
    },
    {
      name: "Settings",
      icon: Settings,
      action: () => router.push("/dashboard/settings"),
      keywords: ["settings", "preferences", "profile", "account", "configuration"]
    }
  ]

  const quickActions = [
    {
      name: "Start Study Timer",
      icon: Timer,
      action: () => {
        router.push("/dashboard/goals")
        // Simulate starting timer
      },
      keywords: ["timer", "study", "pomodoro", "focus"]
    },
    {
      name: "Add New Goal",
      icon: Plus,
      action: () => router.push("/dashboard/goals"),
      keywords: ["goal", "add", "create", "new", "objective"]
    },
    {
      name: "Create Journal Entry",
      icon: FileText,
      action: () => router.push("/dashboard/journal"),
      keywords: ["journal", "write", "entry", "reflection"]
    },
    {
      name: "Add Transaction",
      icon: CreditCard,
      action: () => router.push("/dashboard/finance"),
      keywords: ["transaction", "expense", "income", "money"]
    },
    {
      name: "New Project",
      icon: FolderKanban,
      action: () => router.push("/dashboard/projects"),
      keywords: ["project", "create", "portfolio"]
    },
    {
      name: "Send Message",
      icon: Mail,
      action: () => router.push("/dashboard/work-done-desk"),
      keywords: ["message", "email", "whatsapp", "send"]
    }
  ]

  const settings = [
    {
      name: "Profile Settings",
      icon: User,
      action: () => router.push("/dashboard/settings"),
      keywords: ["profile", "account", "user", "settings"]
    },
    {
      name: "Preferences",
      icon: Settings,
      action: () => router.push("/dashboard/settings"),
      keywords: ["preferences", "config", "options"]
    },
    {
      name: "Sign Out",
      icon: LogOut,
      action: () => router.push("/"),
      keywords: ["logout", "signout", "exit"]
    }
  ]

  const tools = [
    {
      name: "Calculator",
      icon: Calculator,
      action: () => {
        // Open calculator widget
        window.open("https://www.google.com/search?q=calculator", "_blank")
      },
      keywords: ["calculator", "math", "calculate"]
    },
    {
      name: "Calendar",
      icon: Calendar,
      action: () => {
        // Open calendar widget
        window.open("https://calendar.google.com", "_blank")
      },
      keywords: ["calendar", "date", "schedule"]
    },
    {
      name: "Search",
      icon: Search,
      action: () => {
        // Focus search in current page
      },
      keywords: ["search", "find", "look"]
    }
  ]

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          {pages.map((page) => (
            <CommandItem
              key={page.name}
              value={`${page.name} ${page.keywords.join(" ")}`}
              onSelect={() => runCommand(page.action)}
            >
              <page.icon className="mr-2 h-4 w-4" />
              <span>{page.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Quick Actions">
          {quickActions.map((action) => (
            <CommandItem
              key={action.name}
              value={`${action.name} ${action.keywords.join(" ")}`}
              onSelect={() => runCommand(action.action)}
            >
              <action.icon className="mr-2 h-4 w-4" />
              <span>{action.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Tools">
          {tools.map((tool) => (
            <CommandItem
              key={tool.name}
              value={`${tool.name} ${tool.keywords.join(" ")}`}
              onSelect={() => runCommand(tool.action)}
            >
              <tool.icon className="mr-2 h-4 w-4" />
              <span>{tool.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Settings">
          {settings.map((setting) => (
            <CommandItem
              key={setting.name}
              value={`${setting.name} ${setting.keywords.join(" ")}`}
              onSelect={() => runCommand(setting.action)}
            >
              <setting.icon className="mr-2 h-4 w-4" />
              <span>{setting.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
