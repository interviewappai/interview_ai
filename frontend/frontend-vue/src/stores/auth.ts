import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  username: string
  // Add other user properties as needed
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('/api/auth/login', { email, password })
        this.user = response.data.user
        this.token = response.data.access
        localStorage.setItem('token', this.token as string)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error || 'Login failed')
        } else {
          throw new Error('An unexpected error occurred')
        }
      }
    },
    async signup(email: string, password: string) {
      try {
        const response = await axios.post('/api/auth/signup', { email, password })
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error || 'Signup failed')
        } else {
          throw new Error('An unexpected error occurred')
        }
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        try {
          // Validate the token with the backend
          const response = await axios.get('/api/auth/validate-token', {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.user = response.data.user
        } catch (error) {
          this.logout() // Invalid token, log out the user
        }
      }
    },
  },
})
