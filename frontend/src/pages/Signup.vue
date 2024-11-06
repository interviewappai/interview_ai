<template>
  <div class="signup-container">
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
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
            <div class="flex flex-col space-y-1.5">
              <Label for="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" v-model="confirmPassword" placeholder="Confirm your password" />
              <p v-if="errors.confirmPassword" class="text-sm text-red-500">{{ errors.confirmPassword }}</p>
            </div>
          </div>
          <Button class="w-full mt-4" type="submit">Sign Up</Button>
        </form>
      </CardContent>
    </Card>
    <div class="mt-4 text-center">
      <p>Already have an account? <RouterLink to="/login" class="text-blue-500 hover:underline">Log in</RouterLink></p>
    </div>
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { z } from 'zod'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toast'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const { toast } = useToast()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({ email: '', password: '', confirmPassword: '' })

const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const handleSubmit = async () => {
  errors.value = { email: '', password: '', confirmPassword: '' }

  try {
    signupSchema.parse({ email: email.value, password: password.value, confirmPassword: confirmPassword.value })
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0] === 'email') errors.value.email = err.message
        if (err.path[0] === 'password') errors.value.password = err.message
        if (err.path[0] === 'confirmPassword') errors.value.confirmPassword = err.message
      })
      return
    }
  }

  try {
    await authStore.signup(email.value, password.value)
    toast({
      title: "Success",
      description: "Your account has been created. Please log in.",
      variant: "default",
    })
    // Redirect to login page or automatically log in the user
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
.signup-container {
  max-width: 400px;
  margin: 2rem auto;
}
</style>
