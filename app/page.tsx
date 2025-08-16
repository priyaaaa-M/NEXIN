import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg font-bold">
              N
            </div>
            <span className="text-xl font-bold">NEXIN</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Personal Development Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Transform Your Potential Into Achievement
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            NEXIN is your comprehensive personal development ecosystem. Track academics, manage projects, 
            achieve goals, and grow professionally with our premium suite of productivity tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/signup">Take Action</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link href="/login">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Premium Features
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to elevate your personal and professional development journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Academic Management */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="bg-chart-1/10 text-chart-1 flex aspect-square size-12 items-center justify-center rounded-lg mb-4">
                📚
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Academic Excellence</CardTitle>
              <CardDescription>
                Track subjects, monitor progress, organize notes, and plan study sessions with advanced analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Progress Tracking</Badge>
                <Badge variant="secondary">Study Planner</Badge>
                <Badge variant="secondary">Notes Manager</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Project Portfolio */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="bg-chart-2/10 text-chart-2 flex aspect-square size-12 items-center justify-center rounded-lg mb-4">
                🚀
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Project Portfolio</CardTitle>
              <CardDescription>
                Showcase your work with professional project cards, GitHub integration, and progress visualization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">GitHub Sync</Badge>
                <Badge variant="secondary">Tech Stack</Badge>
                <Badge variant="secondary">Live Demos</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Goals & Productivity */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="bg-chart-3/10 text-chart-3 flex aspect-square size-12 items-center justify-center rounded-lg mb-4">
                🎯
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Goals & Productivity</CardTitle>
              <CardDescription>
                Study timer, music player, todo lists, and motivational tools to keep you focused and inspired.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Study Timer</Badge>
                <Badge variant="secondary">Music Player</Badge>
                <Badge variant="secondary">Daily Goals</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Finance Management */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="bg-chart-4/10 text-chart-4 flex aspect-square size-12 items-center justify-center rounded-lg mb-4">
                💰
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Finance Tracker</CardTitle>
              <CardDescription>
                Comprehensive financial management with categorized expenses, income tracking, and investment insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Expense Categories</Badge>
                <Badge variant="secondary">Analytics</Badge>
                <Badge variant="secondary">Investment Tips</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Communication Hub */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="bg-chart-5/10 text-chart-5 flex aspect-square size-12 items-center justify-center rounded-lg mb-4">
                📧
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Work Done Desk</CardTitle>
              <CardDescription>
                Schedule WhatsApp messages and emails with our integrated communication management system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">WhatsApp</Badge>
                <Badge variant="secondary">Email Scheduler</Badge>
                <Badge variant="secondary">Templates</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Journal & Reflection */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="bg-primary/10 text-primary flex aspect-square size-12 items-center justify-center rounded-lg mb-4">
                📝
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Journal & Reflection</CardTitle>
              <CardDescription>
                Document your thoughts, track progress, and reflect on your journey with advanced writing tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Templates</Badge>
                <Badge variant="secondary">Tags</Badge>
                <Badge variant="secondary">Analytics</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-16" />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of achievers who are already using NEXIN to unlock their full potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/signup">Start Your Journey</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link href="/login">Access Your Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg font-bold">
                N
              </div>
              <span className="text-xl font-bold">NEXIN</span>
            </div>
            <p className="text-muted-foreground">
              © 2025 NEXIN. Transform your potential into achievement.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
