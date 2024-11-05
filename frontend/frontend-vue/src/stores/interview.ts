import { defineStore } from "pinia";
import axios from "axios";

export const useInterviewStore = defineStore("interview", {
  state: () => ({
    loading: false,
    error: null as Error | null,
    interviews: [],
  }),
  actions: {
    async startInterview(data: { profile: any; jobDescription: string }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("/api/interview/start", data);
        return response.data;
      } catch (err) {
        this.error = err as Error;
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});
