<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    MicrophoneIcon,
    PhoneIcon,
    XCircleIcon,
    StopCircleIcon,
    CheckCircleIcon
} from '@heroicons/vue/24/solid'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
defineProps(['isRecording', 'currentAIState', 'AudioBlobUrl'])
const emits = defineEmits(['toggleRecording', 'cancelRecording', 'submitAnswer', 'endInterview'])

let popoverOpen = ref(false)
let audio_gif = ref(null as HTMLVideoElement | null)

// a timer to stop recording after 2 minutes
const MAX_DURATION: number = 120 // 2 minutes in seconds
const timeLeft = ref<number>(MAX_DURATION)
const timerId = ref<null | number>(null)

const formattedTimeLeft = computed((): string => {
  const minutes: number = Math.floor(timeLeft.value / 60)
  const seconds: number = timeLeft.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const startTimer = (): void => {
  timeLeft.value = MAX_DURATION
  timerId.value = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      stopRecording()
    }
  }, 1000)
}

const stopTimer = (): void => {
  if (timerId.value !== null) {
    window.clearInterval(timerId.value)
    timerId.value = null
  }
}

function startRecording() {
    startTimer()
    emits('toggleRecording')
    
}

function stopRecording() {
    stopTimer()
    emits('toggleRecording')

    if (audio_gif.value != null) audio_gif.value.pause()

}
</script>

<template>
    <div class="fixed bottom-0 left-0 w-full">
        <div class="flex justify-center space-x-4 bg-gray-800 w-full  p-4 max-w-sm md:max-w-md mx-auto rounded-t-lg">
            <Popover v-model:open="popoverOpen">
                <PopoverTrigger as-child>
                    <Button variant="ghost" size="icon" class="rounded-full bg-blue-500"
                        :disabled="currentAIState.speaking == true || currentAIState.processing == true || isRecording == true"
                        @click="startRecording">
                        <MicrophoneIcon class="w-6 h-6" />
                        <span class="sr-only">Start Recording</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent @pointerDownOutside="(event) => event.preventDefault()">
                    <div>
                        <div>Recording... <span class="text-white" >{{ formattedTimeLeft }} / 2:00 </span></div>
                        <div class="flex justify-center items-center space-x-2 text-center">
                            <video ref="audio_gif" loop autoplay muted class="w-32 object-cover">
                                <source src="@/assets/img/audio_animation_2.webm" type="video/webm">
                            </video>

                            <Button v-if="isRecording == true" variant="ghost" @click="stopRecording">
                                <StopCircleIcon class="w-6 mr-2" /> Stop
                            </Button>
                        </div>
                        <div v-if="isRecording == false && AudioBlobUrl !== null"
                            class="flex justify-center items-center space-x-2 text-center">

                            <Button variant="ghost" @click="() => {
                                $emit('cancelRecording')
                                popoverOpen = false
                            }">
                                <XCircleIcon class="w-6 mr-2 text-red-500" /> Cancel
                            </Button>
                            <Button variant="ghost" @click="()=>{
                                $emit('submitAnswer')
                                popoverOpen = false
                            }">
                                <CheckCircleIcon class="w-6 mr-2 text-green-500" /> Submit
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Button variant="ghost" size="icon" class="rounded-full bg-red-500" @click="()=>{
                $emit('cancelRecording')
                $emit('endInterview')
            }">
                <PhoneIcon class="w-6 h-6" />
                <span class="sr-only">End Interview</span>
            </Button>

        </div>
    </div>
</template>