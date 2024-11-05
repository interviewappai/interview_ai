import { defineStore } from "pinia";
import axios from "axios";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    userProfile: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUserProfile() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/profile/"); // Adjust the API endpoint as needed
        this.userProfile = response.data;
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async updateUserProfile(profileData, resumePdf, isEditing) {
      this.loading = true;
      this.error = null;
      const formData = new FormData();
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }
      if (resumePdf) {
        formData.append("resume_pdf", resumePdf);
      }

      try {
        // Adjusted the logic to use isEditing for the request method
        const url = "/api/profile/" + (isEditing ? "update/" : "create/"); // Adjust the API endpoint as needed
        const method = isEditing ? "patch" : "post"; // Use 'patch' if isEditing is true
        const response = await axios[method](url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.userProfile = response.data; // Update the local state
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    isProfileComplete() {
      return this.userProfile !== null; // Check if userProfile is not null
    },
  },
});
