<script setup lang="ts">

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'

const faqs = [
  {
    question: "How realistic are the AI interviews?",
    answer: "Our AI interviews use advanced natural language processing to create conversations that feel human-like. The system adapts to your responses and industry context, providing a realistic interview experience."
  },
  {
    question: "What industries do you cover?",
    answer: "We cover a wide range of industries including technology, finance, healthcare, marketing, sales, and more. Each industry has its specific question bank and evaluation criteria."
  },
  {
    question: "How do credits work?",
    answer: "One credit equals one minute of interview practice. You get 100 free credits upon signup, and can purchase more credits through our flexible pricing plans. Unused credits never expire."
  },
  {
    question: "Can I pause my practice session?",
    answer: "Yes, you can pause and resume your practice sessions at any time. Your progress is automatically saved, and credits are only consumed for actual practice time."
  },
  {
    question: "What's included in the free trial?",
    answer: "The free trial includes 100 credits, basic resume analysis, access to our standard question bank, and performance feedback. It's everything you need to get started and experience the platform."
  }
]
</script>

<template>
  <section class="section-padding">
    <div class="container-width">
      <h2 class="text-4xl font-bold text-center mb-16 gradient-text">
        Frequently Asked Questions
      </h2>
      <div class="max-w-3xl mx-auto">
        <div 
          v-for="faq in faqs" 
          :key="faq.question"
          class="mb-4"
        >
          <Disclosure v-slot="{ open }" as="div" class="bg-dark-lighter rounded-lg">
            <DisclosureButton class="flex w-full justify-between rounded-lg px-4 py-4 text-left">
              <span class="font-medium">{{ faq.question }}</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-primary"
              />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pb-4 text-gray-400">
              {{ faq.answer }}
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>
  </section>
</template>