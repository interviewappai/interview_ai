<template>
  <div class="login-container">
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email and password to log in</CardDescription>
      </CardHeader>
      <CardContent>
         <!-- Add this server status alert -->
         <div v-if="!authStore.isServerReady" class="mb-4 p-4 rounded-lg" :class="authStore.serverError ? 'bg-red-100' : 'bg-blue-100'">
          <p class="text-sm" :class="authStore.serverError ? 'text-red-700' : 'text-blue-700'">
            <span v-if="authStore.isCheckingServer">Connecting to server...</span>
            <span v-else-if="authStore.serverError">{{ authStore.serverError }}</span>
          </p>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="email">Email</Label>
              <Input id="email" type="email" v-model="email" placeholder="Enter your email" />
              <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Password</Label>
              <Input id="password" type="password" v-model="password" placeholder="Enter your password" />
              <p v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</p>
            </div>
          </div>
          <Button class="w-full mt-4" type="submit"><svg v-if="authStore.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg> Login</Button>
        </form>
      </CardContent>
    </Card>
    <div class="mt-4 text-center">
      <p>Don't have an account? <RouterLink to="/signup" class="text-blue-500 hover:underline">Sign up</RouterLink></p>
    </div>
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { z } from 'zod'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toast'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const { toast } = useToast()

const email = ref('')
const password = ref('')
const errors = ref({ email: '', password: '' })

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

const handleSubmit = async () => {
  errors.value = { email: '', password: '' }

  try {
    loginSchema.parse({ email: email.value, password: password.value })
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0] === 'email') errors.value.email = err.message
        if (err.path[0] === 'password') errors.value.password = err.message
      })
      return
    }
  }

  try {
    await authStore.login(email.value, password.value)
    toast({
      title: "Success",
      description: "You have successfully logged in.",
      variant: "default",
    })
    // Redirect to interview page after successful login
    router.push('/interview')
  } catch (error) {
    let errorMessage = 'An unexpected error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    })
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
}
</style>
