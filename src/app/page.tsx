"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  QrCode,
  Users,
  Smartphone,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowRight,
  Timer,
  Bell,
  Target,
  Award,
  Clock,
  Check,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const onFreeTrialClick = () => {
    router.push("/auth/signup");
  };
  const onWatchDemoClick = () => {
    router.push("/demo-org");
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span>🎉</span>
            <span>
              New Feature: Advanced Analytics Dashboard Now Available!
            </span>
            <Button
              variant="link"
              className="text-primary-foreground underline p-0 h-auto"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-xl font-bold text-green-600">QFlow</div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => router.push("/auth/signin")}
                className="hidden md:inline-flex"
              >
                Log in
              </Button>
              <Button onClick={onFreeTrialClick}>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-secondary text-secondary-foreground">
                  Smart Queue Management
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
                  Effortless Queue Management,{" "}
                  <span className="text-primary">Anywhere</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  Transform your business with QFlow's smart queuing system. QR
                  code check-in, real-time updates, and digital queue management
                  for businesses of any size.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={onFreeTrialClick}
                  className="text-lg px-8"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onWatchDemoClick}
                  className="text-lg px-8 bg-transparent"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-white border border-border shadow-sm p-8">
                <Card className="bg-card border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-card-foreground">
                          Queue Status
                        </h3>
                        <Badge className="bg-primary/10 text-primary">
                          Live
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            12
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Waiting
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">
                            3
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Serving
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-muted-foreground">
                            45
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Completed
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">
                          Average wait: 15 minutes
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                50%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Reduced wait times
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                95%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Customer satisfaction
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                10k+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Businesses served
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                24/7
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Support available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to manage queues
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your operations and
              delight your customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  QR Code Check-in
                </h3>
                <p className="text-muted-foreground">
                  Customers scan a QR code to join the queue instantly. No app
                  downloads required.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Real-time Updates
                </h3>
                <p className="text-muted-foreground">
                  Live notifications keep customers informed about their queue
                  position and wait times.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive insights into queue performance, peak times, and
                  customer behavior.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Mobile Optimized
                </h3>
                <p className="text-muted-foreground">
                  Works perfectly on any device. Responsive design ensures great
                  experience everywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Staff Management
                </h3>
                <p className="text-muted-foreground">
                  Manage multiple counters, staff schedules, and service types
                  from one dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Secure & Reliable
                </h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security with 99.9% uptime guarantee and data
                  protection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary">
                  About QFlow
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                  Revolutionizing queue management for the digital age
                </h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Founded in 2020, QFlow emerged from a simple observation:
                  waiting in line shouldn't be a frustrating experience. Our
                  team of engineers and customer experience experts set out to
                  create a solution that benefits both businesses and their
                  customers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      Our Mission
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Eliminate waiting frustration and optimize business
                      operations through smart technology.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      Our Values
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Innovation, reliability, and customer-first approach in
                      everything we build.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      Our Impact
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Over 2 million hours saved in customer waiting time across
                      our platform.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">
                    Why Choose QFlow?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-card-foreground">
                          Proven Results
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          50% reduction in perceived wait times across all
                          implementations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-card-foreground">
                          Easy Implementation
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Get started in under 30 minutes with our simple setup
                          process
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-card-foreground">
                          24/7 Support
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Dedicated support team available whenever you need
                          assistance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-card-foreground">
                          Scalable Solution
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          From single locations to enterprise chains, we grow
                          with you
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your business needs. All plans include
              our core features with no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-border relative">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      Starter
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Perfect for small businesses
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-card-foreground">
                      $10
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per month
                    </div>
                  </div>
                  <Button className="w-full">Start Free Trial</Button>
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Up to 250 customers/day
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        QR code check-in
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Real-time updates
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Basic analytics
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Email support
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      Professional
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      For growing businesses
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-card-foreground">
                      $20
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per month
                    </div>
                  </div>
                  <Button className="w-full">Start Free Trial</Button>
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Up to 500 customers/day
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        All Starter features
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Advanced analytics
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Multiple service types
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Staff management
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Priority support
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-border relative">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      Enterprise
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      For large organizations
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-card-foreground">
                      Custom
                    </div>
                    <div className="text-sm text-muted-foreground">
                      contact us
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Sales
                  </Button>
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Unlimited customers
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        All Professional features
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Custom integrations
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        White-label options
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Dedicated account manager
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        24/7 phone support
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>30-day money back</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Ready to transform your queue management?
            </h2>
            <p className="text-xl opacity-90 text-pretty">
              Join thousands of businesses already using QFlow to improve
              customer experience and operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to get started? Have questions? Our team is here to help you
              transform your queue management.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">
                          Email Us
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Get in touch with our team for any questions or
                          support needs.
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Sales:</span>{" "}
                            <a
                              href="mailto:sales@qflow.com"
                              className="text-primary hover:underline"
                            >
                              sales@qflow.com
                            </a>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Support:</span>{" "}
                            <a
                              href="mailto:support@qflow.com"
                              className="text-primary hover:underline"
                            >
                              support@qflow.com
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">
                          Call Us
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Speak directly with our team during business hours.
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Sales:</span>{" "}
                            <a
                              href="tel:+1-555-0123"
                              className="text-primary hover:underline"
                            >
                              +1 (555) 012-3456
                            </a>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Support:</span>{" "}
                            <a
                              href="tel:+1-555-0124"
                              className="text-primary hover:underline"
                            >
                              +1 (555) 012-3457
                            </a>
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Mon-Fri, 9AM-6PM EST
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">
                          Visit Us
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Stop by our headquarters for in-person meetings.
                        </p>
                        <div className="text-sm">
                          <p>123 Innovation Drive</p>
                          <p>Tech District, San Francisco</p>
                          <p>CA 94105, United States</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Quick Response Times
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {"< 2h"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Sales inquiries
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {"< 1h"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Support tickets
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-card-foreground">
                        Send us a message
                      </h3>
                    </div>

                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-foreground mb-2"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="w-full px-3 py-2 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-foreground mb-2"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="w-full px-3 py-2 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-3 py-2 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          className="w-full px-3 py-2 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Your Company"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          className="w-full px-3 py-2 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select a topic</option>
                          <option value="sales">Sales Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="demo">Request Demo</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-3 py-2 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="Tell us about your queue management needs..."
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="QFlow" className="h-12 w-auto" />
              </div>
              <p className="text-muted-foreground">
                Smart queue management for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 QFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
