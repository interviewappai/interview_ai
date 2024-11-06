<script setup lang="ts">
const features = [
  {
    category: 'Smart Resume Analysis',
    items: [
      'AI-powered improvement suggestions',
      'Recruiter perspective insights',
      'Profile optimization tips',
      'Keyword analysis'
    ]
  },
  {
    category: 'Comprehensive Feedback',
    items: [
      'Response quality assessment',
      'Voice modulation analysis',
      'Answer structure evaluation',
      'Confidence measurement'
    ]
  },
  {
    category: 'Skill Development Hub',
    items: [
      'Industry-specific courses',
      'Interview guides',
      'Soft skills training',
      'Technical preparation'
    ]
  },
  {
    category: 'Practice Tools',
    items: [
      'Voice-based interviews',
      'Real-time feedback',
      'Progress tracking',
      'Custom scenarios'
    ]
  }
]
</script>

<template>
  <section class="section-padding bg-dark-lighter">
    <div class="container-width">
      <h2 class="text-4xl font-bold text-center mb-16 gradient-text">
        Features That Set Us Apart
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="feature in features" 
          :key="feature.category"
          class="p-6 rounded-xl bg-dark"
        >
          <h3 class="text-xl font-semibold mb-4">{{ feature.category }}</h3>
          <ul class="space-y-2">
            <li 
              v-for="item in feature.items" 
              :key="item"
              class="text-gray-400 flex items-center"
            >
              <span class="w-2 h-2 bg-primary rounded-full mr-2"></span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>