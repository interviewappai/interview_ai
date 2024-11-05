<script setup lang="ts">
const testimonials = [
  {
    quote: "Zreo helped me land my dream job at a top tech company. The AI interviews felt so real, and the feedback was invaluable.",
    name: "Sarah K.",
    position: "Software Engineer",
    image: "/avatars/sarah.jpg"
  },
  {
    quote: "After 20 practice sessions with Zreo, my confidence skyrocketed. Nailed my interview at my target company!",
    name: "James M.",
    position: "Marketing Manager",
    image: "/avatars/james.jpg"
  },
  {
    quote: "The detailed feedback and industry-specific questions made all the difference in my interview preparation.",
    name: "Emma W.",
    position: "Product Manager",
    image: "/avatars/emma.jpg"
  }
]
</script>

<template>
  <section class="section-padding bg-dark-lighter">
    <div class="container-width">
      <h2 class="text-4xl font-bold text-center mb-16 gradient-text">
        Success Stories
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="testimonial in testimonials" 
          :key="testimonial.name"
          class="p-6 rounded-xl bg-dark"
        >
          <p class="text-gray-300 mb-6">"{{ testimonial.quote }}"</p>
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-primary/20 mr-4"></div>
            <div>
              <h4 class="font-semibold">{{ testimonial.name }}</h4>
              <p class="text-sm text-gray-400">{{ testimonial.position }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>