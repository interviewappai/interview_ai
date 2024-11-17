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
    loading: false,
    serverStatus: {
      isWarmedUp: false,
      isChecking: false,
      error: null as string | null,
      retry_count: 0
    }
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isServerReady: (state) => state.serverStatus.isWarmedUp,
    isCheckingServer: (state) => state.serverStatus.isChecking,
    serverError: (state) => state.serverStatus.error,
    
  },
  actions: {
    async warmupServer() {
      if (this.serverStatus.isWarmedUp || this.serverStatus.isChecking) return

      this.serverStatus.isChecking = true
      this.serverStatus.error = null
      
      try {
        // Send a lightweight request to warm up the server
        await axios.get('/api/profile/health-check/')
        this.serverStatus.isWarmedUp = true
      } catch (error) {
        this.serverStatus.error = 'Server is starting up, please wait...'
        // Retry after 5 seconds if the server is not ready
        // stop after 1 minute
       
        const intervalId = setInterval(() => {
          if (this.serverStatus.retry_count > 2) {
            clearInterval(intervalId)
            this.serverStatus.error = 'Server failed to start'
            return
          }
          this.serverStatus.retry_count++
          this.warmupServer()
        }, 5000)
       
      } finally {
        this.serverStatus.isChecking = false
      }
    },
    async login(email: string, password: string) {
      // Ensure server is warmed up before attempting login
      if (!this.serverStatus.isWarmedUp) {
        await this.warmupServer()
      }
      this.loading = true
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
      } finally {
        this.loading = false
      }
    },
    async signup(email: string, password: string) {
      // Ensure server is warmed up before attempting signup
      if (!this.serverStatus.isWarmedUp) {
        await this.warmupServer()
      }
      this.loading = true

      try {
        const response = await axios.post('/api/auth/signup', { email, password })
        return response.data
      } catch (error) {
        this.loading = false
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error || 'Signup failed')
        } else {
          throw new Error('An unexpected error occurred')
        }
      }finally {
        this.loading = false
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
          const response = await axios.get('/api/profile/', {
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
