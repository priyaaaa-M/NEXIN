"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import { 
  User, 
  Camera, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download, 
  Upload, 
  Trash2, 
  Save,
  Moon,
  Sun,
  Monitor,
  Lock,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  HelpCircle,
  ExternalLink
} from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <Avatar className="size-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button size="sm" variant="outline">
                    <Camera className="size-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Personal Information Form */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself..." 
                    defaultValue="Passionate developer and lifelong learner focused on personal growth and productivity."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                      <SelectItem value="mst">Mountain Standard Time</SelectItem>
                      <SelectItem value="cst">Central Standard Time</SelectItem>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button>
                  <Save className="size-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your NEXIN experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {/* Appearance Settings */}
                <AccordionItem value="appearance">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Palette className="size-4" />
                      Appearance
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Theme</Label>
                      <div className="flex gap-3">
                        <Button 
                          variant={theme === "light" ? "default" : "outline"} 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={() => setTheme("light")}
                        >
                          <Sun className="size-4" />
                          Light
                        </Button>
                        <Button 
                          variant={theme === "dark" ? "default" : "outline"} 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={() => setTheme("dark")}
                        >
                          <Moon className="size-4" />
                          Dark
                        </Button>
                        <Button 
                          variant={theme === "system" ? "default" : "outline"} 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={() => setTheme("system")}
                        >
                          <Monitor className="size-4" />
                          System
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Compact Mode</Label>
                        <p className="text-sm text-muted-foreground">Use smaller spacing throughout the app</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Animations</Label>
                        <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Notification Settings */}
                <AccordionItem value="notifications">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Bell className="size-4" />
                      Notifications
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Goal Reminders</Label>
                        <p className="text-sm text-muted-foreground">Daily reminders for your goals</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Study Session Alerts</Label>
                        <p className="text-sm text-muted-foreground">Notifications for study breaks</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Privacy & Security */}
                <AccordionItem value="privacy">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Shield className="size-4" />
                      Privacy & Security
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Lock className="size-4 mr-2" />
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">Who can see your profile</p>
                      </div>
                      <Select defaultValue="private">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Analytics</Label>
                        <p className="text-sm text-muted-foreground">Help improve NEXIN with usage data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Data Management */}
                <AccordionItem value="data">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Globe className="size-4" />
                      Data Management
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button variant="outline" className="justify-start">
                        <Download className="size-4 mr-2" />
                        Export Data
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Upload className="size-4 mr-2" />
                        Import Data
                      </Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label className="text-red-600">Danger Zone</Label>
                      <p className="text-sm text-muted-foreground">
                        These actions cannot be undone. Please be careful.
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="size-4 mr-2" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Plan</span>
                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-1 py-0.5 rounded">
                  PRO
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Member since</span>
                <span className="text-sm text-muted-foreground">Jan 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage used</span>
                <span className="text-sm text-muted-foreground">2.4 GB / 10 GB</span>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                <ExternalLink className="size-4 mr-2" />
                Manage Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <TooltipProvider>
                <div className="grid gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Mail className="size-4 mr-2" />
                        Contact Support
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get help from our support team</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="justify-start">
                        <HelpCircle className="size-4 mr-2" />
                        Help Center
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Browse our help documentation</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Button variant="outline" size="sm" className="justify-start">
                    <Download className="size-4 mr-2" />
                    Backup Data
                  </Button>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Connected Services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connected Services</CardTitle>
              <CardDescription>
                Manage your integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-black text-white flex aspect-square size-8 items-center justify-center rounded">
                    <span className="text-xs font-bold">G</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-xs text-muted-foreground">Connected</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white flex aspect-square size-8 items-center justify-center rounded">
                    <span className="text-xs font-bold">G</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Google Calendar</p>
                    <p className="text-xs text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
