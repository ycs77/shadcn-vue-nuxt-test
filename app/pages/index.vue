<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-muted">
    <!-- Header / Navbar -->
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <span class="text-2xl font-bold">Acme</span>
          </NuxtLink>

          <!-- Login Button -->
          <Button as-child>
            <NuxtLink to="/login">
              Login
            </NuxtLink>
          </Button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="container mx-auto px-4 pt-20 pb-32">
      <div class="flex flex-col items-center text-center space-y-8">
        <!-- Main Headline -->
        <div class="space-y-4 max-w-4xl">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
            Build the Future<br>with <span class="text-primary">Modern Technology</span>
          </h1>
        </div>

        <!-- Slogan -->
        <p class="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl delay-300">
          Empowering developers to create innovative solutions with cutting-edge tools and seamless experiences
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-8 delay-500">
          <Button size="lg" class="text-lg px-8 py-6" as-child>
            <NuxtLink to="/login">
              Login
            </NuxtLink>
          </Button>
          <Button size="lg" variant="outline" class="text-lg px-8 py-6" as-child>
            <NuxtLink to="/dashboard">
              Go to Dashboard
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card class="border-2">
          <CardHeader>
            <CardTitle class="text-2xl">⚡ Lightning Fast</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-base">
              Built with Nuxt 4 and Vue 3 for optimal performance and developer experience
            </CardDescription>
          </CardContent>
        </Card>

        <Card class="border-2">
          <CardHeader>
            <CardTitle class="text-2xl">🎨 Beautiful UI</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-base">
              Powered by shadcn/ui components with modern design and full customization
            </CardDescription>
          </CardContent>
        </Card>

        <Card class="border-2">
          <CardHeader>
            <CardTitle class="text-2xl">🔧 Type Safe</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-base">
              Built with TypeScript for better code quality and developer productivity
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="container mx-auto px-4 py-20">
      <div class="text-center space-y-12 max-w-4xl mx-auto">
        <div class="space-y-4">
          <h3 class="text-4xl md:text-5xl font-bold tracking-tight">
            Powered by Industry Leaders
          </h3>
          <p class="text-xl text-muted-foreground">
            Built with the most trusted technologies in modern web development
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          <div class="text-center space-y-2">
            <div class="text-5xl font-bold text-primary">Nuxt</div>
            <p class="text-sm text-muted-foreground">Framework</p>
          </div>
          <div class="text-center space-y-2">
            <div class="text-5xl font-bold text-primary">Vue</div>
            <p class="text-sm text-muted-foreground">Library</p>
          </div>
          <div class="text-center space-y-2">
            <div class="text-5xl font-bold text-primary">TS</div>
            <p class="text-sm text-muted-foreground">Language</p>
          </div>
          <div class="text-center space-y-2">
            <div class="text-5xl font-bold text-primary">shadcn</div>
            <p class="text-sm text-muted-foreground">UI</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer CTA -->
    <section class="container mx-auto px-4 py-32">
      <div class="text-center space-y-8 max-w-3xl mx-auto">
        <h3 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Ready to Start Building?
        </h3>
        <p class="text-xl md:text-2xl text-muted-foreground">
          Join thousands of developers creating amazing applications
        </p>
        <Button size="lg" class="text-lg px-12 py-6" as-child>
          <NuxtLink to="/login">
            Start Your Journey
          </NuxtLink>
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

useSeoMeta({
  title: 'Build the Future with Modern Technology',
  description: 'Empowering developers to create innovative solutions with cutting-edge tools and seamless experiences',
})
</script>
