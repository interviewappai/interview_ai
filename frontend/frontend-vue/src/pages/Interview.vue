<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <Card v-if="!interviewStarted || !interviewEnded" class="w-full max-w-md p-6 shadow-lg">
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
        <Button @click="startInterview" class="w-full">Start Interview</Button>
        <RouterLink to="/profile">
          <Button variant="outline" class="mt-4">Update Profile</Button>
        </RouterLink>
      </CardFooter>
    </Card>

    <div v-if="interviewStarted " class="flex flex-col items-center">
      <div class="voice-indicator rounded-full bg-green-500 h-16 w-16 flex items-center justify-center">
        <span class="text-white">🎤</span> <!-- Placeholder for voice indicator -->
      </div>
      <div class="flex space-x-4 mt-4">
        <Button @click="toggleRecording" class="">{{ isRecording ? 'Stop Recording' : 'Start Recording' }}</Button>
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
const scoreCardVisible = ref(false); // Track if the scorecard is visible
const score = ref(0); // Score percentage
const audio = ref(null); // Add this ref

// Add base64 to audio conversion function
const playAudioFromBase64 = (base64Audio) => {
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
    audio.value.play();
    
    // Clean up URL when done
    audio.value.onended = () => URL.revokeObjectURL(audioUrl);
  } catch (error) {
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
  try {
    const response = await interviewStore.startInterview({
      resume_details: profileStore.userProfile,
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
      console.log("Interview not started:", response);
    }
  } catch (error) {
    console.error("Error starting interview:", error);
  }
}

const toggleRecording = async () => {
  if (isRecording.value) {
    // Stop recording
    mediaRecorder?.stop();
    isRecording.value = false;
  } else {
    // Start recording
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    isRecording.value = true;

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      audioChunks = []; // Reset the chunks for the next recording
      audioBlobUrl.value = URL.createObjectURL(audioBlob); // Create a Blob URL for downloading
      console.log("Recording stopped, audioBlob ready for use:", audioBlob);
    };
  }
};

const endInterview = () => {
  // Logic to end the interview
  console.log("Ending interview...");
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
