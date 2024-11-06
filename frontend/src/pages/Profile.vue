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
      <Button type="submit">{{ isEditing ? 'Update Profile' : 'Create Profile' }}</Button>
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

onMounted(async () => {
  await profileStore.fetchUserProfile(); // Fetch user profile from the store
  if (profileStore.userProfile) {
    profile.value = profileStore.userProfile;
    isEditing.value = true;
  }
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
    toast({
      title: 'Success',
      description: `Profile ${isEditing.value ? 'updated' : 'created'} successfully`,
    });
  }
};
</script>
