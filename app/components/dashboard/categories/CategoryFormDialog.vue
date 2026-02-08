<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ category ? 'Edit Category' : 'New Category' }}</DialogTitle>
        <DialogDescription>
          {{ category ? 'Update the category name.' : 'Add a new category for your posts.' }}
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <FieldGroup>
          <VeeField v-slot="{ field, errors }" name="name">
            <Field :data-invalid="!!errors.length">
              <FieldLabel for="category-form-name">
                Name
              </FieldLabel>
              <Input
                id="category-form-name"
                v-bind="field"
                placeholder="Category name"
                :disabled="isLoading"
                autocomplete="off"
                :aria-invalid="!!errors.length"
              />
              <FieldError v-if="errors.length" :errors />
            </Field>
          </VeeField>
        </FieldGroup>

        <DialogFooter class="mt-4">
          <DialogClose as-child>
            <Button type="button" variant="outline" :disabled="isLoading">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Saving...' : 'Save' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import type { Category } from '~~/shared/types/category'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  category?: Category | null
  isLoading?: boolean
}>()

const emit = defineEmits<{
  submit: [name: string]
}>()

const open = defineModel<boolean>('open', { default: false })

const schema = toTypedSchema(z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be 50 characters or less'),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
  },
})

watch(open, isOpen => {
  if (isOpen) {
    nextTick(() => {
      resetForm({
        values: {
          name: props.category?.name,
        },
      })
    })
  }
})

const onSubmit = handleSubmit(values => {
  emit('submit', values.name)
})
</script>
