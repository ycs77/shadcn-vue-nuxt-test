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
          <Select v-model="selectedPeriod">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1week">
                1 week
              </SelectItem>
              <SelectItem value="1month">
                1 month
              </SelectItem>
              <SelectItem value="3months">
                3 months
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <AreaChart
        :data="filteredData"
        index="date"
        :categories="['total', 'predicted']"
        height="260px"
      />
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card'
import { AreaChart } from '@/components/ui/chart-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarDate } from '@internationalized/date'

definePageMeta({
  layout: 'dashboard',
})

useSeoMeta({
  title: 'Dashboard - shadcn-vue Demo',
  description: 'Welcome to the dashboard page of our application.',
})

const selectedPeriod = ref('3months')

const data: {
  date: string
  total: number
  predicted: number
}[] = []
const startDate = new CalendarDate(2025, 2, 1)
const endDate = new CalendarDate(2025, 4, 30)

let currentDate = startDate
while (currentDate.compare(endDate) <= 0) {
  const dateStr = `${currentDate.year}/${String(currentDate.month).padStart(2, '0')}/${String(currentDate.day).padStart(2, '0')}`
  data.push({
    date: dateStr,
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500,
  })
  currentDate = currentDate.add({ days: 1 })
}

const filteredData = computed(() => {
  let dataLength: number

  switch (selectedPeriod.value) {
    case '1week':
      dataLength = 7
      break
    case '1month':
      dataLength = 30
      break
    case '3months':
    default:
      dataLength = data.length
      break
  }

  return data.slice(-dataLength)
})
</script>
