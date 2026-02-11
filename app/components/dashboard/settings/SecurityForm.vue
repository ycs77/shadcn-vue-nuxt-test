<template>
  <form class="space-y-6" @submit="onSubmit">
    <FieldGroup class="gap-6">
      <!-- Current Password -->
      <VeeField v-slot="{ field, errors }" name="currentPassword">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="current-password">
            Current Password
          </FieldLabel>
          <Input
            id="current-password"
            v-bind="field"
            type="password"
            placeholder="Enter current password"
            :disabled="isLoading"
            autocomplete="current-password"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>

      <!-- New Password -->
      <VeeField v-slot="{ field, errors }" name="newPassword">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="new-password">
            New Password
          </FieldLabel>
          <Input
            id="new-password"
            v-bind="field"
            type="password"
            placeholder="Enter new password"
            :disabled="isLoading"
            autocomplete="new-password"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>

      <!-- Confirm New Password -->
      <VeeField v-slot="{ field, errors }" name="confirmPassword">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="confirm-password">
            Confirm New Password
          </FieldLabel>
          <Input
            id="confirm-password"
            v-bind="field"
            type="password"
            placeholder="Confirm new password"
            :disabled="isLoading"
            autocomplete="new-password"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>
    </FieldGroup>

    <Button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Updating...' : 'Update Password' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

defineProps<{
  isLoading?: boolean
}>()

const emit = defineEmits<{
  submit: []
}>()

const schema = toTypedSchema(z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your new password'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
})

const onSubmit = handleSubmit(() => {
  emit('submit')
  resetForm()
})
</script>
