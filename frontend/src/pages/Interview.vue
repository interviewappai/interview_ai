<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <Toaster />
    <Card v-if="!interviewStarted && !interviewEnded" class="w-full max-w-md p-6 shadow-lg">
      <CardHeader>
        <CardTitle>Welcome to Your Interview</CardTitle>
       
        <CardDescription>Here are your profile details:</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col space-y-2">
          <p><strong>Name:</strong> {{ profileStore.userProfile?.name || 'N/A' }}</p>
          <p><strong>Age:</strong> {{ profileStore.userProfile?.age || 'N/A' }}</p>
          <p class="h-40 overflow-y-auto"><strong>Resume:</strong> {{ profileStore.userProfile?.resume_data || 'N/A' }}
          </p>
          <div>
            <Label for="jobDescription">Job Description</Label>
            <Textarea id="jobDescription" v-model="jobDescription" rows="3" placeholder="Enter job description" />
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex flex-col items-center">
        <Button @click="startInterview" class="w-full"><svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>Start Interview</Button>
        <RouterLink to="/profile">
          <Button variant="outline" class="mt-4">Update Profile</Button>
        </RouterLink>
      </CardFooter>
    </Card>

    <div v-if="interviewStarted " class="flex flex-col items-center">
      <div class="flex flex-col space-y-4 py-5 font-bold text-xl">
        <div v-if="currentAIState.speaking==true">speaking ...</div>
        <div v-if="currentAIState.listening==true">listening ...</div>
        <div v-if="currentAIState.processing==true">processing ...</div>
      </div>
      <div class="rounded-full bg-green-500 h-16 w-16 flex items-center justify-center" :class="currentAIState.speaking ? 'voice-indicator' : ''">
        <span class="text-white">🎤</span> <!-- Placeholder for voice indicator -->
      </div>
      <div class="flex space-x-4 mt-4">
        <Button @click="toggleRecording" v-if="!isRecording && !audioBlobUrl" class="" :disabled="currentAIState.speaking||currentAIState.processing">Start Recording</Button>
        <Button @click="toggleRecording" v-if="isRecording" class="" :disabled="currentAIState.speaking||currentAIState.processing">Stop Recording</Button>

        <Button @click="submitAnswer" v-if="!isRecording && audioBlobUrl!==null">Submit Answer</Button>
        <Button @click="()=>audioBlobUrl=null" v-if="!isRecording && audioBlobUrl!==null">Cancel Answer</Button>

        <Button @click="endInterview" class="" variant="outline">End Interview</Button>
      </div>
      <div v-if="audioBlobUrl">
        <a :href="audioBlobUrl" download="recording.wav">
          <Button variant="outline">Download Recording</Button>
        </a>
      </div>
    </div>

    <Dialog v-model:open="showDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Access Denied</DialogTitle>
          <DialogDescription>
            You cannot access this page without completing your profile.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <RouterLink to="/profile"><Button>Complete Profile</Button></RouterLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <div v-if="scoreCardVisible" class="mt-6 p-4 border rounded shadow-lg">
      <h2 class="text-xl font-bold">Interview Score</h2>
      <p class="text-lg">Score: {{ score }}%</p>
      <h3 class="font-semibold">Points for Improvement:</h3>
      <ul>
        <li>1. Practice answering common interview questions.</li>
        <li>2. Improve body language and eye contact.</li>
        <li>3. Research the company and role thoroughly.</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProfileStore } from '@/stores/profile';
import { useInterviewStore } from '@/stores/interview'; // Import the interview store
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from '@/components/ui/toast';
import { useToast } from '@/components/ui/toast';
import { AudioConverter } from '@/lib/convertToWav';


const { toast } = useToast();

const profileStore = useProfileStore();
const interviewStore = useInterviewStore(); // Create an instance of the interview store
const showDialog = ref(false);
const jobDescription = ref(''); // Reactive variable for job description
const interviewStarted = ref(false); // Track if the interview has started
const isRecording = ref(false); // Track if recording is in progress
const interviewEnded = ref(false); // Track if the interview has ended
let mediaRecorder: MediaRecorder | null = null; // MediaRecorder instance
let audioChunks: Blob[] = []; // Store audio chunks
const audioBlobUrl = ref<string | null>(null); // URL for the audio blob
let audioFile = ref(null as Blob | null);
const scoreCardVisible = ref(false); // Track if the scorecard is visible
const score = ref(0); // Score percentage
const audio = ref(null as HTMLAudioElement | null); // Add this ref

// current state
let currentAIState = ref({
  speaking: false,
  listening: false,
  processing: false,
})
let loading = ref(false);

// Add base64 to audio conversion function
const playAudioFromBase64 = (base64Audio: string) => {
  try {
    // Decode base64
    const audioBytes = atob(base64Audio);
    
    // Convert to Uint8Array
    const arrayBuffer = new Uint8Array(audioBytes.length);
    for (let i = 0; i < audioBytes.length; i++) {
      arrayBuffer[i] = audioBytes.charCodeAt(i);
    }
    
    // Create blob and URL
    const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(blob);
    
    // Create and play audio
    if (audio.value) {
      URL.revokeObjectURL(audio.value.src); // Clean up old URL
    }
    audio.value = new Audio(audioUrl);
    currentAIState.value.speaking = true;
    currentAIState.value.listening=false
    audio.value.play();
    
    // Clean up URL when done
    audio.value.onended = () =>{ 
      URL.revokeObjectURL(audioUrl);
currentAIState.value.speaking = false;
currentAIState.value.listening = true
currentAIState.value.processing=false

    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to play audio",
      variant: "destructive",
    });
    console.error("Error playing audio:", error);
  }
};

onMounted(async () => {
  await profileStore.fetchUserProfile(); // Fetch the user profile when the component mounts
  if (!profileStore.isProfileComplete()) {
    showDialog.value = true; // Show the dialog if the profile is not complete
  }
});

const startInterview = async () => {
  loading.value = true;
  try {
    const response = await interviewStore.startInterview({
      resume_data: profileStore.userProfile?.resume_data,
      job_description: jobDescription.value,
    });
    if (response) {
      console.log("Interview started:", response);
      interviewStarted.value = true; // Set interviewStarted to true
      // Play the audio response
      if (response.response) {
        playAudioFromBase64(response.response);
      }
    } else {
      toast({
        title: "Error",
        description: "Failed to start interview",
        variant: "destructive",
      });
      console.log("Interview not started:", response);
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to start interview",
      variant: "destructive",
    });
    console.error("Error starting interview:", error);
  }
  loading.value = false;
}

const toggleRecording = async (cancel=false) => {
  if (isRecording.value) {
    // Stop recording
    mediaRecorder?.stop();
    if(cancel==true) audioBlobUrl.value = null
    isRecording.value = false;
  } else {
    // Start recording
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder =  new MediaRecorder(stream, {
        mimeType: 'audio/webm' // Browser usually supports this format
      })
    mediaRecorder.start();
    isRecording.value = true;

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async() => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      
      audioFile.value = await AudioConverter.convertToWav(audioBlob);
      audioChunks = []; // Reset the chunks for the next recording
      audioBlobUrl.value = URL.createObjectURL(audioBlob); // Create a Blob URL for downloading
    };
  }
};
const submitAnswer = async () => {
currentAIState.value.processing=true
currentAIState.value.listening=false
currentAIState.value.speaking=false
if(audioFile.value==null) return
const res = await interviewStore.submitAnswer(audioFile.value);
currentAIState.value.processing=false
if(res!=null) 
audioBlobUrl.value = null
playAudioFromBase64(res.response);
}

const endInterview = async() => {
  // Logic to end the interview
  console.log("Ending interview...");
  const res = await interviewStore.endInterview();
  if(res!=null) score.value = res?.score
  interviewStarted.value = false; // Reset the interview state
  interviewEnded.value = true; // Set interviewEnded to true
  scoreCardVisible.value = true; // Show the scorecard
  audioBlobUrl.value = null; // Reset the audio blob URL

};

</script>

<style scoped>
.voice-indicator {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
