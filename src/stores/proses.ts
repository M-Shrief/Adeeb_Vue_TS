import { defineStore } from 'pinia';
import axios from 'axios';

export interface ProseInfo {
  _id: string;
  poet: string | object;
  tags: string;
  qoute: string;
  reviewed: boolean;
}

export const useProseStore = defineStore('proses', {
  state: () => ({
    proses: [] as ProseInfo[],
  }),
  getters: {
    getProses(state): ProseInfo[] {
      return state.proses;
    },
  },
  actions: {
    async fetchProses() {
      try {
        const req = await axios.get(`http://localhost:3000/api/proses`);
        this.proses = req.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    // async fetchRandomProses(num) {
    //   try {
    //     const req = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/proses_random/${num}`
    //     );
    //     this.proses = req.data;
    //   } catch (error) {
    //     alert(error);
    //     console.log(error);
    //   }
    // },
  },
});
