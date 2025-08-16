"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  MessageSquare,
  Mail,
  Send,
  Clock,
  Calendar as CalendarIcon,
  Plus,
  Search,
  Filter,
  MessageCircle,
  Phone,
  User,
  Settings,
  Archive,
  Star,
  Paperclip,
  Image,
  Smile,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function WorkDoneDeskPage() {
  const [date, setDate] = useState<Date>()
  const [isScheduled, setIsScheduled] = useState(false)
  const [selectedContact, setSelectedContact] = useState("")

  const messageTemplates = [
    {
      id: 1,
      title: "Meeting Reminder",
      category: "Business",
      content: "Hi {name}, just a friendly reminder about our meeting scheduled for {date} at {time}. Looking forward to speaking with you!",
      tags: ["meeting", "reminder", "business"]
    },
    {
      id: 2,
      title: "Follow-up",
      category: "Personal",
      content: "Hey {name}! Hope you're doing well. Just wanted to follow up on our conversation about {topic}. Let me know your thoughts!",
      tags: ["follow-up", "personal", "casual"]
    },
    {
      id: 3,
      title: "Thank You",
      category: "Business",
      content: "Dear {name}, Thank you for taking the time to meet with me today. I really appreciate your insights on {topic}. Looking forward to our next steps!",
      tags: ["thank-you", "professional", "meeting"]
    },
    {
      id: 4,
      title: "Project Update",
      category: "Work",
      content: "Hi {name}, Quick update on the {project} project: {status}. Expected completion: {date}. Let me know if you have any questions!",
      tags: ["project", "update", "work"]
    }
  ]

  const contacts = [
    { id: 1, name: "John Smith", type: "WhatsApp", phone: "+1234567890", email: "john@example.com", lastContact: "2 days ago", status: "online" },
    { id: 2, name: "Sarah Johnson", type: "Email", phone: "+1234567891", email: "sarah@example.com", lastContact: "1 week ago", status: "offline" },
    { id: 3, name: "Mike Davis", type: "WhatsApp", phone: "+1234567892", email: "mike@example.com", lastContact: "3 days ago", status: "online" },
    { id: 4, name: "Emily Brown", type: "Email", phone: "+1234567893", email: "emily@example.com", lastContact: "5 days ago", status: "offline" },
  ]

  const messageHistory = [
    { id: 1, contact: "John Smith", platform: "WhatsApp", message: "Meeting reminder sent", time: "10:30 AM", status: "delivered", type: "sent" },
    { id: 2, contact: "Sarah Johnson", platform: "Email", message: "Project proposal attached", time: "9:15 AM", status: "read", type: "sent" },
    { id: 3, contact: "Mike Davis", platform: "WhatsApp", message: "Thanks for the update!", time: "Yesterday", status: "delivered", type: "received" },
    { id: 4, contact: "Emily Brown", platform: "Email", message: "Follow-up on collaboration", time: "2 days ago", status: "sent", type: "sent" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="size-3 text-green-600" />
      case "read":
        return <CheckCircle className="size-3 text-blue-600" />
      case "sent":
        return <Loader2 className="size-3 text-orange-600" />
      case "failed":
        return <XCircle className="size-3 text-red-600" />
      default:
        return <Clock className="size-3 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageSquare className="size-8" />
              Work Done Desk
            </h1>
            <p className="text-muted-foreground">
              Streamline your WhatsApp and Email communication
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="size-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        <Separator />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Messages</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 pending today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +5 new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="whatsapp" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        {/* WhatsApp Tab */}
        <TabsContent value="whatsapp" className="space-y-6" suppressHydrationWarning>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Message Composer */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="size-5 text-green-600" />
                    Send WhatsApp Message
                  </CardTitle>
                  <CardDescription>
                    Compose and send WhatsApp messages with scheduling options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (234) 567-8900" type="tel" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-select">Or Select Contact</Label>
                      <Select value={selectedContact} onValueChange={setSelectedContact}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose from contacts" />
                        </SelectTrigger>
                        <SelectContent>
                          {contacts.filter(c => c.type === "WhatsApp").map((contact) => (
                            <SelectItem key={contact.id} value={contact.name}>
                              <div className="flex items-center gap-2">
                                <div className={cn(
                                  "size-2 rounded-full",
                                  contact.status === "online" ? "bg-green-500" : "bg-gray-400"
                                )} suppressHydrationWarning />
                                {contact.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Type your message here..."
                      className="min-h-[120px]"
                    />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>0/1000 characters</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="schedule-message" 
                      checked={isScheduled}
                      onCheckedChange={setIsScheduled}
                    />
                    <Label htmlFor="schedule-message">Schedule message</Label>
                  </div>

                  <div className={cn(
                    "transition-all duration-200 ease-in-out overflow-hidden",
                    isScheduled ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )} suppressHydrationWarning>
                    <div className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg bg-muted/50">
                      <div className="space-y-2">
                        <Label>Schedule Date</Label>
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
                      <div className="space-y-2">
                        <Label htmlFor="schedule-time">Time</Label>
                        <Input id="schedule-time" type="time" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <Send className="size-4 mr-2" />
                      {isScheduled ? "Schedule Message" : "Send Now"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Paperclip className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Image className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Smile className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Message History */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Messages</CardTitle>
                      <CardDescription>Your WhatsApp message history</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="size-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="size-4 mr-2" />
                        Archive
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messageHistory.filter(m => m.platform === "WhatsApp").map((message) => (
                      <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <MessageCircle className="size-5" />
                          </div>
                          <div>
                            <div className="font-medium">{message.contact}</div>
                            <div className="text-sm text-muted-foreground">{message.message}</div>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-sm text-muted-foreground">{message.time}</div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(message.status)}
                            <span className="text-xs text-muted-foreground capitalize">{message.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contacts & Templates Sidebar */}
            <div className="space-y-6">
              {/* Active Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>WhatsApp Contacts</span>
                    <Badge variant="secondary">{contacts.filter(c => c.type === "WhatsApp").length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                      <Input placeholder="Search contacts..." className="pl-10" />
                    </div>
                    <div className="space-y-2">
                      {contacts.filter(c => c.type === "WhatsApp").map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "size-2 rounded-full",
                              contact.status === "online" ? "bg-green-500" : "bg-gray-400"
                            )} suppressHydrationWarning />
                            <div>
                              <div className="font-medium text-sm">{contact.name}</div>
                              <div className="text-xs text-muted-foreground">{contact.lastContact}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="size-6">
                            <MessageCircle className="size-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message Templates */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Templates</CardTitle>
                  <CardDescription>Pre-made message templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {messageTemplates.slice(0, 3).map((template) => (
                      <div key={template.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm">{template.title}</div>
                          <Badge variant="outline" className="text-xs">{template.category}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{template.content}</div>
                        <div className="flex gap-1 mt-2">
                          {template.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full text-sm">
                      View All Templates
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Email Composer */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="size-5 text-blue-600" />
                    Compose Email
                  </CardTitle>
                  <CardDescription>
                    Send professional emails with scheduling and templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email-to">To</Label>
                      <Input id="email-to" placeholder="recipient@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-contact-select">Or Select Contact</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose from contacts" />
                        </SelectTrigger>
                        <SelectContent>
                          {contacts.filter(c => c.type === "Email").map((contact) => (
                            <SelectItem key={contact.id} value={contact.email}>
                              <div className="flex items-center gap-2">
                                <Mail className="size-3" />
                                {contact.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Subject</Label>
                    <Input id="email-subject" placeholder="Enter email subject" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-body">Message</Label>
                    <Textarea 
                      id="email-body" 
                      placeholder="Compose your email..."
                      className="min-h-[200px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="schedule-email" 
                      checked={isScheduled}
                      onCheckedChange={setIsScheduled}
                    />
                    <Label htmlFor="schedule-email">Schedule email</Label>
                  </div>

                  {isScheduled && (
                    <div className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg bg-muted/50">
                      <div className="space-y-2">
                        <Label>Schedule Date</Label>
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
                      <div className="space-y-2">
                        <Label htmlFor="email-schedule-time">Time</Label>
                        <Input id="email-schedule-time" type="time" />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <Send className="size-4 mr-2" />
                      {isScheduled ? "Schedule Email" : "Send Now"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Paperclip className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Star className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Email History */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Sent Emails</CardTitle>
                      <CardDescription>Your email history and status</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="size-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messageHistory.filter(m => m.platform === "Email").map((message) => (
                      <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Mail className="size-5" />
                          </div>
                          <div>
                            <div className="font-medium">{message.contact}</div>
                            <div className="text-sm text-muted-foreground">{message.message}</div>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-sm text-muted-foreground">{message.time}</div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(message.status)}
                            <span className="text-xs text-muted-foreground capitalize">{message.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Email Contacts & Templates */}
            <div className="space-y-6">
              {/* Email Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Email Contacts</span>
                    <Badge variant="secondary">{contacts.filter(c => c.type === "Email").length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                      <Input placeholder="Search contacts..." className="pl-10" />
                    </div>
                    <div className="space-y-2">
                      {contacts.filter(c => c.type === "Email").map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <div>
                            <div className="font-medium text-sm">{contact.name}</div>
                            <div className="text-xs text-muted-foreground">{contact.email}</div>
                          </div>
                          <Button variant="ghost" size="icon" className="size-6">
                            <Mail className="size-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Templates */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Professional email templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {messageTemplates.filter(t => t.category === "Business").map((template) => (
                      <div key={template.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm">{template.title}</div>
                          <Badge variant="outline" className="text-xs">{template.category}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{template.content}</div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full text-sm">
                      Manage Templates
                    </Button>
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
