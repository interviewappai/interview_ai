<script setup lang="ts">
import { 
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

const benefits = [
  {
    icon: ChatBubbleBottomCenterTextIcon,
    title: 'Realistic AI Conversations',
    description: 'Experience natural, voice-based interviews that feel just like talking to a human recruiter'
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'Industry-Specific Questions',
    description: 'From tech to finance, healthcare to marketing - we\'ve got you covered'
  },
  {
    icon: ChartBarIcon,
    title: 'Detailed Performance Analysis',
    description: 'Get insights on your communication skills, response quality, and body language'
  },
  {
    icon: ClockIcon,
    title: '24/7 Availability',
    description: 'Practice whenever you want, as many times as you need'
  }
]
</script>

<template>
  <section class="section-padding bg-dark-lighter">
    <div class="container-width">
      <h2 class="text-4xl font-bold text-center mb-16 gradient-text">
        Why Choose Zreo?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="benefit in benefits" 
          :key="benefit.title"
          class="p-6 rounded-xl bg-dark hover:bg-dark/50 transition-colors duration-200"
        >
          <component 
            :is="benefit.icon" 
            class="w-12 h-12 text-primary mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">{{ benefit.title }}</h3>
          <p class="text-gray-400">{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>