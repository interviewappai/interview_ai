<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border  shadow-sm border-zinc-800 bg-zinc-950 text-zinc-50',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
