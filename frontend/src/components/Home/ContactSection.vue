<template>
    <section class="section-padding bg-dark-lighter">
      <div class="container-width">
        <h2 class="text-4xl font-bold text-center mb-16 gradient-text">
          Get in Touch
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-semibold mb-6">Contact Information</h3>
            <div class="space-y-4 text-gray-300">
              <p>Email: support@mockpros.in</p>
              <p>Phone: 123789900</p>
              <p>Chat: Available 24/7</p>
            </div>
            <div class="mt-8">
              <h4 class="font-semibold mb-4">Support Hours</h4>
              <p class="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p class="text-gray-400">24/7 support available for enterprise customers</p>
            </div>
          </div>
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2">Name</label>
              <input 
                type="text" 
                class="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                class="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Message</label>
              <textarea 
                rows="4" 
                class="w-full px-4 py-2 rounded-lg bg-dark border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
              ></textarea>
            </div>
            <button type="submit" class="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </template>