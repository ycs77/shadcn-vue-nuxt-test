<template>
  <div class="space-y-4">
    <h1 class="text-3xl font-bold tracking-tight">
      Dashboard
    </h1>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card class="gap-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Total Revenue
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            $45,231.89
          </div>
          <p class="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card class="gap-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Subscriptions
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            +2350
          </div>
          <p class="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card class="gap-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Sales
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            +12,234
          </div>
          <p class="text-xs text-muted-foreground">
            +19% from last month
          </p>
        </CardContent>
      </Card>
      <Card class="gap-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            Active Now
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            class="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">
            +573
          </div>
          <p class="text-xs text-muted-foreground">
            +201 since last hour
          </p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <div>
          <CardTitle>Total Visitors</CardTitle>
          <CardDescription>Total for the selected period</CardDescription>
        </div>

        <CardAction>
          <Select v-model="timeRange">
            <SelectTrigger class="w-[180px]" aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
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
              :x="(d: Data) => d.date"
              :y="[(d: Data) => d.predicted, (d: Data) => d.total]"
              :color="(d: Data, i: number) => ['url(#fillPredicted)', 'url(#fillTotal)'][i]"
              :opacity="0.6"
            />
            <VisLine
              :x="(d: Data) => d.date"
              :y="[(d: Data) => d.predicted, (d: Data) => d.predicted + d.total]"
              :color="(d: Data, i: number) => [chartConfig.predicted.color, chartConfig.total.color][i]"
              :line-width="1"
            />
            <VisAxis
              type="x"
              :x="(d: Data) => d.date"
              :tick-line="false"
              :domain-line="false"
              :grid-line="false"
              :num-ticks="6"
              :tick-format="(d: number, index: number) => {
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
              :color="(d: Data, i: number) => [chartConfig.predicted.color, chartConfig.total.color][i % 2]"
            />
          </VisXYContainer>

          <ChartLegendContent />
        </ChartContainer>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart'
import { CalendarDate } from '@internationalized/date'
import { VisArea, VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
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

interface Data {
  date: Date
  total: number
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

const timeRange = ref('90d')

const data: Data[] = []
const startDate = new CalendarDate(2025, 2, 1)
const endDate = new CalendarDate(2025, 4, 30)

let currentDate = startDate
while (currentDate.compare(endDate) <= 0) {
  const date = new Date(currentDate.year, currentDate.month - 1, currentDate.day)
  data.push({
    date,
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  })
  currentDate = currentDate.add({ days: 1 })
}

const filteredData = computed(() => {
  let dataLength = data.length

  if (timeRange.value === '7d') {
    dataLength = 7
  } else if (timeRange.value === '30d') {
    dataLength = 30
  }

  return data.slice(-dataLength)
})

const chartConfig = {
  total: {
    label: 'Total',
    color: 'var(--chart-1)',
  },
  predicted: {
    label: 'Predicted',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

const svgDefs = `
  <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-total)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-total)"
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
