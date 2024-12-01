<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">User Profile</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <Label for="name">Name</Label>
        <Input id="name" v-model="profile.name" required />
      </div>
      <div>
        <Label for="age">Age</Label>
        <Input id="age" v-model="profile.age" type="number" required />
      </div>
      <div>
        <Label for="phone">Phone</Label>
        <Input id="phone" v-model="profile.phone" required />
      </div>
      <div>
        <Label for="resume_data">Resume Data</Label>
        <Textarea id="resume_data" v-model="profile.resume_data" rows="5" />
      </div>
      <div>
        <Label for="resume_pdf">Resume PDF (Optional)</Label>
        <Input id="resume_pdf" type="file" accept=".pdf" @change="handleFileUpload" />
      </div>
      <div class="flex items-center justify-center gap-3">
      <Button type="submit"><svg v-if="profileStore.loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg> {{ isEditing ? 'Update Profile' : 'Create Profile' }}</Button>
     <div v-if="profile.name && profile.age && profile.phone && profile.resume_data">
        <RouterLink to="/interview">
          <Button class="w-full bg-blue-500" variant="ghost">Start Interview</Button>
        </RouterLink>
      </div>
      </div>
    </form>
   
    <Toaster />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useProfileStore } from '@/stores/profile';
import { Toaster } from '@/components/ui/toast';
const profileStore = useProfileStore();
const profile = ref({
  name: '',
  age: '',
  phone: '',
  resume_data: '',
});
const isEditing = ref(false);
const resumePdf = ref(null);
const { toast } = useToast();
async function fetchUserProfile() {
  await profileStore.fetchUserProfile(); // Fetch user profile from the store
  if (profileStore.userProfile) {
    profile.value = profileStore.userProfile;
    isEditing.value = true;
  }
}
onMounted(async () => {
  await fetchUserProfile();
});

const handleFileUpload = (event) => {
  resumePdf.value = event.target.files[0];
};

const submitForm = async () => {
  await profileStore.updateUserProfile(profile.value, resumePdf.value, isEditing.value); // Use store action to update profile
  if (profileStore.error) {
    toast({
      title: 'Error',
      description: `Failed to ${isEditing.value ? 'update' : 'create'} profile`,
      variant: 'destructive',
    });
  } else {
    await fetchUserProfile();
    toast({
      title: 'Success',
      description: `Profile ${isEditing.value ? 'updated' : 'created'} successfully`,
    });
  }
};
</script>
