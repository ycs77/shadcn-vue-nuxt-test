<template>
  <form class="space-y-6" @submit="onSubmit">
    <FieldGroup class="gap-6">
      <!-- Title -->
      <VeeField v-slot="{ field, errors }" name="title">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="post-title">
            Title
          </FieldLabel>
          <Input
            id="post-title"
            v-bind="field"
            placeholder="Post title"
            :disabled="isLoading"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>

      <!-- Excerpt -->
      <VeeField v-slot="{ field, errors }" name="excerpt">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="post-excerpt">
            Excerpt
          </FieldLabel>
          <Textarea
            id="post-excerpt"
            v-bind="field"
            placeholder="A brief summary of the post"
            class="min-h-[80px]"
            :disabled="isLoading"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>

      <!-- Content -->
      <VeeField v-slot="{ field, errors }" name="content">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="post-content">
            Content
          </FieldLabel>
          <Textarea
            id="post-content"
            v-bind="field"
            placeholder="Write the post content..."
            class="min-h-[200px]"
            :disabled="isLoading"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>

      <!-- Category -->
      <VeeField v-slot="{ field, errors }" name="categoryId">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="post-category">
            Category
          </FieldLabel>
          <Select
            :model-value="field.value"
            :disabled="isLoading"
            @update:model-value="field.onChange"
            @blur="field.onBlur"
          >
            <SelectTrigger
              id="post-category"
              :aria-invalid="!!errors.length"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in categoryOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>

      <!-- Status -->
      <VeeField v-slot="{ field, errors }" name="status">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="post-status">
            Status
          </FieldLabel>
          <Select
            :model-value="field.value"
            :disabled="isLoading"
            @update:model-value="field.onChange"
            @blur="field.onBlur"
          >
            <SelectTrigger
              id="post-status"
              :aria-invalid="!!errors.length"
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">
                Published
              </SelectItem>
              <SelectItem value="draft">
                Draft
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>

      <!-- Date -->
      <VeeField v-slot="{ field, errors }" name="date">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="post-date">
            Date
          </FieldLabel>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                id="post-date"
                variant="outline"
                :class="cn(
                  'w-full justify-start text-left font-normal',
                  !field.value && 'text-muted-foreground',
                )"
                :disabled="isLoading"
                :aria-invalid="!!errors.length"
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ field.value || 'Pick a date' }}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar
                :model-value="toCalendarDate(field.value)"
                @update:model-value="(val) => {
                  if (val) {
                    field.onChange(formatDate(val))
                  }
                }"
              />
            </PopoverContent>
          </Popover>
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>
    </FieldGroup>

    <div class="flex gap-2">
      <Button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Saving...' : 'Save' }}
      </Button>
      <Button type="button" variant="outline" :disabled="isLoading" @click="navigateTo('/dashboard/posts')">
        Cancel
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { Post } from '~~/shared/types/post'
import { CalendarDate } from '@internationalized/date'
import { CalendarIcon } from '@lucide/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useDateFormatter } from 'reka-ui'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export interface PostFormValues {
  title: string
  excerpt: string
  content: string
  categoryId: string
  status: 'published' | 'draft'
  date: string
}

const props = defineProps<{
  post?: Post | null
  isLoading?: boolean
}>()

const emit = defineEmits<{
  submit: [values: PostFormValues]
}>()

const { categoryOptions } = usePosts()

const formatter = useDateFormatter('en-US')

function formatDate(date: DateValue): string {
  const jsDate = new Date(date.year, date.month - 1, date.day)
  return formatter.custom(jsDate, { dateStyle: 'long' })
}

function toCalendarDate(dateStr: string | undefined): CalendarDate | undefined {
  if (!dateStr) return undefined
  const parsed = new Date(dateStr)
  if (Number.isNaN(parsed.getTime())) return undefined
  return new CalendarDate(parsed.getFullYear(), parsed.getMonth() + 1, parsed.getDate())
}

const schema = toTypedSchema(z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or less'),
  excerpt: z
    .string()
    .min(1, 'Excerpt is required')
    .max(500, 'Excerpt must be 500 characters or less'),
  content: z
    .string()
    .min(1, 'Content is required'),
  categoryId: z
    .string()
    .min(1, 'Category is required'),
  status: z.enum(['published', 'draft'], {
    required_error: 'Status is required',
  }),
  date: z
    .string()
    .min(1, 'Date is required'),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    title: '',
    excerpt: '',
    content: '',
    categoryId: '',
    status: 'draft' as const,
    date: '',
  },
})

watch(() => props.post, post => {
  if (post) {
    nextTick(() => {
      resetForm({
        values: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.body.join('\n\n'),
          categoryId: String(post.categoryId),
          status: post.status,
          date: post.date,
        },
      })
    })
  }
}, { immediate: true })

const onSubmit = handleSubmit(values => {
  emit('submit', values as PostFormValues)
})
</script>
