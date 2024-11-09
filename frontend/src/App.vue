<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { useColorMode } from '@vueuse/core'
import { Menu, X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const route = useRoute()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isMobileMenuOpen = ref(false)

onMounted(async () => {
  await authStore.checkAuth()
})
const router = useRouter()
const handleLogout = () => {
  authStore.logout()
  isMobileMenuOpen.value = false
  router.push('/login')
}

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Interview', path: '/interview' },
  { name: 'Profile', path: '/profile' },
]

const isActive = (path: string) => route.path === path
let mode = useColorMode()
mode.value='dark'
</script>

<template>
  <div class="h-dvh">
    <header class="border-b border-black sticky top-0 z-50 bg-dark h-20 px-4 py-2">
      <div class="">
        <nav class="flex items-center justify-between">
          <RouterLink to="/" class="text-xl font-bold">Zreo</RouterLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-4">
            <RouterLink
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              :class="[
                'text-sm font-medium transition-colors hover:text-primary',
                isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
              ]"
            >
              {{ item.name }}
            </RouterLink>
            <template v-if="!isAuthenticated"><RouterLink to="/login">
              <Button class="flex items-center justify-center">
                Login
              </Button></RouterLink>
              <RouterLink to="/signup">
              <Button variant="ghost" class="flex items-center justify-center">
                Sign Up
              </Button>
            </RouterLink>
            </template>
            <Button v-else variant="destructive" @click="handleLogout">Logout</Button>
          </div>

          <!-- Mobile Navigation -->
          <div class="md:hidden">
            <Button variant="ghost" size="icon" @click="isMobileMenuOpen = !isMobileMenuOpen">
              <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
              <X v-else class="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden">
        <div class="px-4 py-10 space-y-2 bg-dark">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'block py-2 text-sm font-medium transition-colors hover:text-primary',
              isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
            ]"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </RouterLink>
          <RouterLink to="/profile" @click="isMobileMenuOpen = false" v-if="isAuthenticated" class="block py-2 text-sm font-medium transition-colors hover:text-primary">Profile</RouterLink>
          <template v-if="!isAuthenticated">
            <Button variant="ghost" asChild class="w-full justify-start">
              <RouterLink to="/login" @click="isMobileMenuOpen = false">Login</RouterLink>
            </Button>
            <Button asChild class="w-full justify-start">
              <RouterLink to="/signup" @click="isMobileMenuOpen = false">Sign Up</RouterLink>
            </Button>
          </template>
          <Button v-else variant="destructive" class="w-full justify-start" @click="handleLogout">
            Logout
          </Button>
        </div>
      </div>
    </header>

    <main class="">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;

}

nav a {
  display: inline-block;
  padding:  1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}




</style>
