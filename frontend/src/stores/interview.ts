import { defineStore } from "pinia";
import axios from "axios";

export const useInterviewStore = defineStore("interview", {
  state: () => ({
    loading: false,
    error: null as Error | null,
    interviews: [],
  }),
  actions: {
    async startInterview(data: { resume_data: any; job_description: string }) {
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
    async submitAnswer(audioBlob:Blob) {
      try {
        const formData = new FormData();
        formData.append('answer', audioBlob, 'recording.wav')
        const response = await axios.post("/api/interview/answer", formData);
        return response.data;
      } catch (err) {
        this.error = err as Error;
        return null;
      } finally {
        this.loading = false;
      }
    },
    async endInterview() {
      try {
        const response = await axios.post("/api/interview/end");
        return response;
      } catch (err) {
        this.error = err as Error;
        return null;
      } finally {
        this.loading = false;
      }
    }
  },

});
