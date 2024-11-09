<script setup lang="ts">
defineProps({
    speaking: {
        default: false,
        type: Boolean
    },
    listening: {
        type: Boolean,
        default: false
    },
    processing: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
<div class="h-full w-full min-w-sm p-3 flex flex-col md:flex-row gap-3">
    <div class="bg-gray-800 md:w-1/2 w-full h-full rounded-lg flex items-center justify-center">
       <div class="flex justify-center items-center flex-col">
        <div class="w-24 h-24 bg-gray-700 rounded-full flex justify-center items-center">
            <p class="text-white font-bold">AI</p>
        </div>
        <p class="font-bold mt-4">Interviewer</p>
        <div class="text-gray-400 mt-2">
            <div v-if="speaking"> <img src="@/assets/img/audio_play.gif" class="w-16 h-16"></div>
           
            <div v-if="processing">
                <img src="@/assets/img/ai_processing.gif" class="w-16 h-16">
            </div>
            <div v-if="listening">
                listening...
            </div>
        </div>
       </div>
       
    </div>
    <div class="bg-gray-800 md:w-1/2 w-full h-full rounded-lg flex items-center justify-center">
       <div class="flex justify-center items-center flex-col">
        <div class="w-24 h-24 bg-gray-700 rounded-full flex justify-center items-center">
            <p class="text-white font-bold">You</p>
        </div>
      
       </div>
       
    </div>
</div>
</template>