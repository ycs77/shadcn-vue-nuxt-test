<template>
  <form class="space-y-6" @submit="onSubmit">
    <FieldGroup class="gap-6">
      <!-- Avatar -->
      <VeeField v-slot="{ field, errors }" name="avatar">
        <Field :data-invalid="!!errors.length">
          <FieldLabel>Avatar</FieldLabel>
          <AvatarUpload
            :model-value="field.value"
            @update:model-value="field.onChange"
          />
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>

      <!-- Display Name -->
      <VeeField v-slot="{ field, errors }" name="name">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="profile-name">
            Display Name
          </FieldLabel>
          <Input
            id="profile-name"
            v-bind="field"
            placeholder="Your display name"
            :disabled="isLoading"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>

      <!-- Email (read-only) -->
      <Field>
        <FieldLabel for="profile-email">
          Email
        </FieldLabel>
        <Input
          id="profile-email"
          :model-value="user.email"
          disabled
        />
        <FieldDescription>
          Email cannot be changed.
        </FieldDescription>
      </Field>

      <!-- Bio -->
      <VeeField v-slot="{ field, errors }" name="bio">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="profile-bio">
            Bio
          </FieldLabel>
          <Textarea
            id="profile-bio"
            v-bind="field"
            placeholder="Tell us about yourself"
            class="min-h-[120px]"
            :disabled="isLoading"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors />
        </Field>
      </VeeField>
    </FieldGroup>

    <Button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Saving...' : 'Save' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import type { User } from '~~/shared/types/user'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import AvatarUpload from '@/components/dashboard/settings/AvatarUpload.vue'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export interface ProfileFormValues {
  name: string
  bio: string
  avatar: string
}

const props = defineProps<{
  user: User
  isLoading?: boolean
}>()

const emit = defineEmits<{
  submit: [values: ProfileFormValues]
}>()

const schema = toTypedSchema(z.object({
  name: z
    .string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be 50 characters or less'),
  bio: z
    .string()
    .max(500, 'Bio must be 500 characters or less')
    .optional()
    .default(''),
  avatar: z.string().default(''),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    bio: '',
    avatar: '',
  },
})

watch(() => props.user, user => {
  if (user) {
    nextTick(() => {
      resetForm({
        values: {
          name: user.name,
          bio: user.bio,
          avatar: user.avatar,
        },
      })
    })
  }
}, { immediate: true })

const onSubmit = handleSubmit(values => {
  emit('submit', values as ProfileFormValues)
})
</script>
