<script setup lang="ts">
const plans = [
  {
    name: 'Starter Pack',
    price: 0,
    credits: '100',
    features: [
      '100 FREE credits upon signup',
      '1 credit = 1 Question',
      'Basic resume analysis',
      'Standard question bank'
    ]
  },
  {
    name: 'Professional Pack',
    price: 49,
    credits: '500',
    features: [
      '500 practice credits',
      '2 detailed resume reviews',
      'Premium question bank',
      'Priority support',
      'Progress analytics'
    ],
    popular: true
  },
  {
    name: 'Expert Pack',
    price: 99,
    credits: '1200',
    features: [
      '1200 practice credits',
      'Unlimited resume reviews',
      'Custom interview scenarios',
      'Priority feature access',
      'Advanced analytics',
      '24/7 support'
    ]
  }
]
</script>

<template>
  <section class="section-padding">
    <div class="container-width">
      <h2 class="text-4xl font-bold text-center mb-16 gradient-text">
        Flexible Credit System
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="plan in plans" 
          :key="plan.name"
          class="p-8 rounded-xl bg-dark-lighter relative"
          :class="{ 'border-2 border-primary': plan.popular }"
        >
          <div 
            v-if="plan.popular" 
            class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm"
          >
            Most Popular
          </div>
          <h3 class="text-2xl font-bold mb-2">{{ plan.name }}</h3>
          <div class="mb-6">
            <span class="text-4xl font-bold">{{ plan.price }}</span>
            <span class="text-gray-400">/pack</span>
          </div>
          <p class="text-gray-400 mb-6">{{ plan.credits }} Credits</p>
          <ul class="space-y-4 mb-8">
            <li 
              v-for="feature in plan.features" 
              :key="feature"
              class="flex items-center text-gray-300"
            >
              <span class="w-2 h-2 bg-primary rounded-full mr-2"></span>
              {{ feature }}
            </li>
          </ul>
          <button 
            class="w-full btn-primary"
            :class="{ 'bg-primary': !plan.popular, 'bg-primary-dark': plan.popular }"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </section>
</template>