<template>
  <div class="space-y-4">
    <h1 class="text-3xl font-bold tracking-tight">
      Dashboard
    </h1>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card class="gap-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Total Posts
          </CardTitle>
          <FileTextIcon class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ totalPosts }}
          </div>
          <p class="text-xs text-muted-foreground">
            +2 new this month
          </p>
        </CardContent>
      </Card>

      <Card class="gap-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Total Views
          </CardTitle>
          <EyeIcon class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ totalViews.toLocaleString('en-US') }}
          </div>
          <p class="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card class="gap-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Categories
          </CardTitle>
          <FolderOpenIcon class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ totalCategories }}
          </div>
          <p class="text-xs text-muted-foreground">
            3 categories with new posts
          </p>
        </CardContent>
      </Card>

      <Card class="gap-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Total Users
          </CardTitle>
          <UsersIcon class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            {{ totalUsers }}
          </div>
          <p class="text-xs text-muted-foreground">
            +24 new this month
          </p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div>
          <CardTitle>Views Trend</CardTitle>
          <CardDescription>Views trend for the selected period</CardDescription>
        </div>

        <CardAction>
          <Select v-model="timeRange">
            <SelectTrigger class="w-[180px]" aria-label="Select a value">
              <SelectValue placeholder="3 months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">
                3 months
              </SelectItem>
              <SelectItem value="30d">
                1 month
              </SelectItem>
              <SelectItem value="7d">
                1 week
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer :config="chartConfig" class="aspect-auto h-[250px] w-full" :cursor="false">
          <VisXYContainer
            :data="filteredData"
            :svg-defs
            :margin="{ left: -40 }"
            :y-domain="[0, 6000]"
          >
            <VisArea
              :x="(d: ChartData) => d.date"
              :y="[(d: ChartData) => d.predicted, (d: ChartData) => d.actual]"
              :color="(_d: ChartData, i: number) => ['url(#fillPredicted)', 'url(#fillActual)'][i]"
              :opacity="0.6"
            />
            <VisLine
              :x="(d: ChartData) => d.date"
              :y="[(d: ChartData) => d.predicted, (d: ChartData) => d.predicted + d.actual]"
              :color="(_d: ChartData, i: number) => [chartConfig.predicted.color, chartConfig.actual.color][i]"
              :line-width="1"
            />
            <VisAxis
              type="x"
              :x="(d: ChartData) => d.date"
              :tick-line="false"
              :domain-line="false"
              :grid-line="false"
              :num-ticks="6"
              :tick-format="(d: number) => {
                const date = new Date(d)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }"
            />
            <VisAxis
              type="y"
              :num-ticks="3"
              :tick-line="false"
              :domain-line="false"
            />
            <ChartTooltip />
            <ChartCrosshair
              :template="componentToString(chartConfig, ChartTooltipContent, {
                labelFormatter: (d) => {
                  return new Date(d).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                },
              })"
              :color="(_d: ChartData, i: number) => [chartConfig.predicted.color, chartConfig.actual.color][i % 2]"
            />
          </VisXYContainer>

          <ChartLegendContent />
        </ChartContainer>
      </CardContent>
    </Card>

    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>Latest 5 published posts</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div
            v-for="post in recentPosts"
            :key="post.id"
            class="flex items-center justify-between gap-4"
          >
            <div class="min-w-0 flex-1 space-y-1">
              <NuxtLink
                :to="`/dashboard/posts/${post.id}/edit`"
                class="truncate text-sm font-medium hover:underline"
              >
                {{ post.title }}
              </NuxtLink>
              <div class="flex items-center gap-2">
                <Badge variant="outline">
                  {{ post.categoryName }}
                </Badge>
                <Badge :variant="post.status === 'published' ? 'default' : 'secondary'">
                  {{ post.status }}
                </Badge>
              </div>
            </div>
            <div class="shrink-0 text-xs text-muted-foreground">
              {{ post.date }}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Overview</CardTitle>
          <CardDescription>Post count and proportion by category</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div
            v-for="category in categoriesWithCount"
            :key="category.id"
            class="space-y-1"
          >
            <div class="flex items-center justify-between text-sm">
              <span>{{ category.name }}</span>
              <span class="text-muted-foreground">{{ category.postCount }} posts</span>
            </div>
            <div class="h-2 w-full rounded-full bg-muted">
              <div
                class="h-2 rounded-full bg-primary"
                :style="{ width: `${totalPosts > 0 ? (category.postCount / totalPosts) * 100 : 0}%` }"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { CalendarDate } from '@internationalized/date'
import { VisArea, VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import { Eye as EyeIcon, FileText as FileTextIcon, FolderOpen as FolderOpenIcon, Users as UsersIcon } from 'lucide-vue-next'
import { users } from '~~/data/users'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ChartData {
  date: Date
  actual: number
  predicted: number
}

definePageMeta({
  layout: 'dashboard',
  breadcrumbs: [
    { title: 'Dashboard' },
  ],
})

useSeoMeta({
  title: 'Dashboard',
})

const { postsWithCategory } = usePosts()
const { categoriesWithCount } = useCategories()

const totalPosts = computed(() => postsWithCategory.value.length)
const totalViews = computed(() => postsWithCategory.value.reduce((sum, p) => sum + p.views, 0))
const totalCategories = computed(() => categoriesWithCount.value.length)
const totalUsers = computed(() => users.length)

const recentPosts = computed(() => postsWithCategory.value.slice(0, 5))

const timeRange = ref('90d')

const chartData: ChartData[] = []
const startDate = new CalendarDate(2025, 2, 1)
const endDate = new CalendarDate(2025, 4, 30)

let currentDate = startDate
while (currentDate.compare(endDate) <= 0) {
  const date = new Date(currentDate.year, currentDate.month - 1, currentDate.day)
  chartData.push({
    date,
    actual: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  })
  currentDate = currentDate.add({ days: 1 })
}

const filteredData = computed(() => {
  let dataLength = chartData.length

  if (timeRange.value === '7d') {
    dataLength = 7
  } else if (timeRange.value === '30d') {
    dataLength = 30
  }

  return chartData.slice(-dataLength)
})

const chartConfig = {
  actual: {
    label: 'Actual Views',
    color: 'var(--chart-1)',
  },
  predicted: {
    label: 'Predicted Views',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

const svgDefs = `
  <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-actual)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-actual)"
      stop-opacity="0.1"
    />
  </linearGradient>
  <linearGradient id="fillPredicted" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-predicted)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-predicted)"
      stop-opacity="0.1"
    />
  </linearGradient>
`
</script>
