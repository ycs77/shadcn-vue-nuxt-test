<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="handleSubmit">
          <div class="flex flex-col gap-6">
            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="rounded-lg bg-red-50 p-3 text-sm text-red-800 border border-red-200"
            >
              {{ errorMessage }}
            </div>

            <div class="grid gap-3">
              <Label for="email">Email</Label>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="m@example.com"
                :disabled="isLoading"
                required
              />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a
                  href="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  @click.prevent="console.log('Forgot password clicked')"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                v-model="form.password"
                type="password"
                :disabled="isLoading"
                required
              />
            </div>
            <div class="flex flex-col gap-3">
              <Button type="submit" class="w-full" :disabled="isLoading">
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </Button>
              <Button
                variant="outline"
                class="w-full"
                type="button"
                :disabled="isLoading"
                @click="handleGoogleLogin"
              >
                Login with Google
              </Button>
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <a
              href="#"
              class="underline underline-offset-4"
              @click.prevent="console.log('Sign up clicked')"
            >
              Sign up
            </a>
          </div>

          <!-- Demo Credentials Helper -->
          <div class="mt-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-800 border border-blue-200">
            <strong>Demo credentials:</strong><br>
            Email: demo@example.com<br>
            Password: password
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const router = useRouter()

// Form data
const form = reactive({
  email: 'demo@example.com',
  password: 'password',
})
const isLoading = ref(false)
const errorMessage = ref('')

// Mock form submit handler
async function handleSubmit(event: Event) {
  event.preventDefault()

  // Reset messages
  errorMessage.value = ''

  // Validation
  if (!form.email || !form.password) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  // Mock loading state
  isLoading.value = true

  try {
    // Simulate API call with 1.5 second delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock authentication logic
    if (form.email === 'demo@example.com' && form.password === 'password') {
      router.push('/dashboard')
    } else {
      errorMessage.value = 'Invalid email or password. Try: demo@example.com / password'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Mock Google login
function handleGoogleLogin() {
  router.push('/dashboard')
}
</script>
