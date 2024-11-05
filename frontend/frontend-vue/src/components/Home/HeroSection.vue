<script setup lang="ts">
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-dark-lighter to-dark z-0"></div>
    <div class="gradient absolute z-10 w-full h-full  opacity-30 top-0 left-5"></div>
    <div class="container-width relative z-10 text-center px-4 max-w-7xl px-4">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 gradient-text">
        Ace Your Next Interview with Zreo
      </h1>
      <p class="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
        Where AI-Powered Practice Meets Real Success
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="btn-primary">Get Started - 100 Free Credits</button>
        <button class="btn-secondary">Learn More</button>
      </div>
    </div>
    <div class="absolute bottom-0 w-full h-64 bg-gradient-to-t from-dark to-transparent"></div>
  </section>
</template>

<style scoped>
@keyframes rotate {
	0% {
		transform: rotate(0deg);
        background-color: blue;
	}
    25% {
		transform: rotate(90deg);
        transform: translateX(calc(var(--size) / 4)) translateY(calc(var(--size) / 4));
        background-color: teal;
	}
	50% {
		transform: scale(0.7);
        transform: translateX(calc(var(--size) / 2)) translateY(calc(var(--size) / 2));
        background-color: blue;
	}
    75% {
		transform: rotate(270deg);
        transform: translateX(calc(var(--size) / -4)) translateY(calc(var(--size) / -4));
        background-color: tomato;
	}
	100% {
		transform: rotate(360deg);
		transfrom: scale(2);
        background-color: blue;
	}
}
/* This is just to transition when you change the viewport size. */
.gradient {
	--size: 750px;
	--speed: 20s;
	--easing: cubic-bezier(0.8, 0.2, 0.2, 0.8);
	width: var(--size);
	height: var(--size);
	filter: blur(calc(var(--size) / 5));
	animation: rotate var(--speed) var(--easing) alternate infinite;
	border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
}

* {
	transition: all 0.5s ease-out;
}
@media (max-width: 720px) {
	.gradient {
		--size: 300px;
	}
}
</style>