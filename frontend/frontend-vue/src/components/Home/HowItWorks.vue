<script setup lang="ts">
const steps = [
  {
    number: '01',
    title: 'Upload Your Resume',
    description: 'Get instant analysis and improvement suggestions. Receive tailored interview questions based on your experience.'
  },
  {
    number: '02',
    title: 'Choose Your Interview Type',
    description: 'Select from technical interviews, behavioral assessments, role-specific simulations, and company-focused preparation.'
  },
  {
    number: '03',
    title: 'Practice & Improve',
    description: 'Engage in natural voice conversations, receive real-time feedback, and track your progress over time.'
  }
]
</script>

<template>
  <section class="section-padding">
    <div class="container-width">
      <h2 class="text-4xl font-bold text-center mb-16 gradient-text">
        How It Works
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div 
          v-for="step in steps" 
          :key="step.number"
          class="relative"
        >
          <div class="text-6xl font-bold text-primary/20 mb-4">
            {{ step.number }}
          </div>
          <h3 class="text-2xl font-semibold mb-4">{{ step.title }}</h3>
          <p class="text-gray-400">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>